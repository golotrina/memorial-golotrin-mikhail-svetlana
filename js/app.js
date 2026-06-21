// ==========================================
// 1. ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ
// ==========================================
let currentLang = 'ua';
let baseFontSize = 16;
let editCandleIndex = null;
let isCandlesExpanded = false;
let isGalleryExpanded = { motherGallery: false, fatherGallery: false };
const MAX_VISIBLE_GALLERY = 6;
let currentGalleryImages = [];
let currentGalleryIndex = 0;
let currentUploadId = null;
let hasUnsavedChanges = false;

const candleData = {
  classic: { glow: 'rgba(255, 180, 0, 0.4)', flame: 'linear-gradient(to bottom, #FFF, #FFB400)', nameRu: 'Свеча памяти', nameUa: "Свічка пам'яті" },
  amber: { glow: 'rgba(255, 100, 0, 0.4)', flame: 'linear-gradient(to bottom, #FFD700, #FF6400)', nameRu: 'Янтарный свет', nameUa: 'Бурштинове світло' },
  heavenly: { glow: 'rgba(200, 230, 255, 0.4)', flame: 'linear-gradient(to bottom, #FFF, #87CEEB)', nameRu: 'Небесное сияние', nameUa: 'Небесне сяйво' },
  unquenchable: { glow: 'rgba(255, 0, 50, 0.5)', flame: 'linear-gradient(to bottom, #FFB6C1, #E60026)', nameRu: 'Неугасаемое пламя', nameUa: "Незгасне полум'я" }
};

// ==========================================
// 2. УТИЛИТЫ И СКРОЛЛ
// ==========================================
function escapeHTML(str) {
  if (!str) return '';
  return str.replace(/[&<>'"]/g, tag => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  }[tag]));
}

function showToast(text) {
  const toast = document.createElement('div');
  toast.className = 'toast-notification';
  toast.innerHTML = text;
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 10);
  setTimeout(() => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 400); }, 3000);
}

function showLongWarningToast(text) {
  const toast = document.createElement('div');
  toast.className = 'toast-notification';
  toast.innerHTML = text;
  toast.style.backgroundColor = 'rgba(180, 30, 30, 0.95)';
  toast.style.border = '1px solid #ff6b6b';
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 10);
  setTimeout(() => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 400); }, 10000);
}

function customConfirm(text, onConfirm) {
  document.getElementById('confirmModalText').innerText = text;
  document.getElementById('confirmModal').classList.add('active');
  document.body.classList.add('body-overflow-hidden');
  window.currentConfirmCallback = () => { 
    closeConfirmModal();
    onConfirm(); 
  };
}

function closeConfirmModal() {
  document.getElementById('confirmModal').classList.remove('active');
  restoreBodyOverflow();
}

async function apiTranslateText(text, from, to) {
  if (!text) return '';
  try {
    const res = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${from}&tl=${to}&dt=t&q=${encodeURIComponent(text)}`);
    const data = await res.json();
    if (data && data[0]) return data[0].map(item => item[0]).join('');
  } catch (e) { console.error("Translate error:", e); }
  return text;
}

function shareSite() {
  const shareTitle = currentLang === 'ua' ? "Цифровий Меморіал родини Голотріних" : "Цифровой Мемориал семьи Голотриных";
  if (navigator.share) {
    navigator.share({ title: shareTitle, url: window.location.href });
  } else {
    navigator.clipboard.writeText(window.location.href);
    showToast(currentLang === 'ua' ? 'Посилання скопійовано!' : 'Ссылка скопирована!');
  }
}

// Умный скролл (обрабатывает и страницу, и модальные окна)
function scrollToTop() {
  const activeModal = document.querySelector('.bio-modal.active, .qr-modal.active, .mobile-menu.active');
  if (activeModal) activeModal.scrollTo({ top: 0, behavior: 'smooth' });
  else window.scrollTo({ top: 0, behavior: 'smooth' });
}

function restoreBodyOverflow() {
  if (!document.querySelector('.bio-modal.active, .qr-modal.active, .mobile-menu.active, .lightbox.active')) {
    document.body.classList.remove('body-overflow-hidden');
  }
}


// Шпион за прокруткой для кнопки "Вверх"
function handleScroll() {
  const scrollBtn = document.getElementById('scrollTopBtn');
  if (!scrollBtn) return;

  const activeModal = document.querySelector('.bio-modal.active, .qr-modal.active, .mobile-menu.active');
  let scrolled = 0;

  if (activeModal) {
    scrolled = activeModal.scrollTop; // Читаем скролл внутри окна
  } else {
    scrolled = window.scrollY || document.documentElement.scrollTop; // Читаем скролл сайта
  }

  if (scrolled > 300) {
    scrollBtn.classList.add('visible');
  } else {
    scrollBtn.classList.remove('visible');
  }
}

window.addEventListener('scroll', handleScroll);

// Навешиваем шпиона на все модальные окна, чтобы кнопка появлялась внутри них
document.querySelectorAll('.bio-modal, .qr-modal, .mobile-menu').forEach(modal => {
  modal.addEventListener('scroll', handleScroll);
});


// ==========================================
// 3. УМНЫЙ РЕНДЕРИНГ ДАННЫХ
// ==========================================
function renderStaticContent() {
  if (!window.SITE_CONTENT) return;
  const content = window.SITE_CONTENT;
  const isUa = currentLang === 'ua';
  const grid = document.getElementById('parents');
  const modalsContainer = document.getElementById('dynamic-modals-container');

  // Применяем настройки из конфига (Бизнес-настройка)
  if (content.config) {
    document.documentElement.style.setProperty('--gold', content.config.primaryColor);
    document.body.style.fontFamily = content.config.fontFamily;
  }

  const setEdit = (id, text) => {
    const el = document.getElementById(id);
    if (el && text) { el.innerText = text; el.classList.add('editable-text'); }
  };

  setEdit('hero-title', isUa ? content.hero.titleUa : content.hero.titleRu);
  setEdit('hero-subtitle', isUa ? content.hero.subtitleUa : content.hero.subtitleRu);
  setEdit('hero-quote', isUa ? content.hero.quoteUa : content.hero.quoteRu);

  if (grid && content.people) {
    grid.innerHTML = ''; // Очищаем перед рендером
    if (modalsContainer) modalsContainer.innerHTML = '';

    content.people.forEach(person => {
      // Рендерим карточку в сетке
      const card = document.createElement('div');
      card.className = 'parent-card fade-up visible';
      card.innerHTML = `
        <div class="photo-wrapper" onclick="openLightbox(this)">
          <img id="photo-${person.id}" src="img/${person.photo}" alt="Фото" loading="lazy">
          <button class="edit-photo-btn admin-only" onclick="triggerUpload('photo-${person.id}'); event.stopPropagation();">📷 Загрузить фото</button>
        </div>
        <h2 id="${person.id}-name" class="parent-name editable-text">${isUa ? person.nameUa : person.nameRu}</h2>
        <div id="${person.id}-dates" class="parent-dates editable-text">${isUa ? person.datesUa : person.datesRu}</div>
        <p id="${person.id}-bio-preview" class="parent-bio editable-text">${isUa ? person.bioUa : person.bioRu}</p>
        <button class="read-more-btn" onclick="openBio('${person.id}-bio')">
          <span class="editable-text" data-ru="История" data-ua="Історія">${isUa ? 'Історія' : 'История'}</span>
        </button>
      `;
      grid.appendChild(card);

      // Генерируем структуру модального окна для этого человека
      if (modalsContainer) {
        const modalHtml = createBioModalHtml(person.id, person.galleryKey);
        modalsContainer.insertAdjacentHTML('beforeend', modalHtml);
        renderBioModalData(person.id, content[person.bioKey]); // Заполняем данными
      }
    });
  }

  if (typeof renderTimeline === 'function') renderTimeline();
  if (typeof renderEpochModal === 'function') renderEpochModal(content.epochData);

  if (document.body.classList.contains('admin-mode') && typeof toggleAdmin === 'function') toggleAdmin(true);
}

function renderTimeline() {
  if (!window.SITE_CONTENT || !window.SITE_CONTENT.timeline) return;
  const tData = window.SITE_CONTENT.timeline;
  const isUa = currentLang === 'ua';

  const mTitle = document.getElementById('timeline-main-title');
  if (mTitle) { mTitle.innerText = isUa ? tData.header.titleUa : tData.header.titleRu; mTitle.classList.add('editable-text'); }

  const mSub = document.getElementById('timeline-subtitle');
  if (mSub) { mSub.innerText = isUa ? tData.header.subtitleUa : tData.header.subtitleRu; mSub.classList.add('editable-text'); }

  const epBtn = document.getElementById('timeline-epoch-btn');
  if (epBtn) epBtn.innerText = isUa ? tData.header.btnUa : tData.header.btnRu;

  const container = document.getElementById('timeline-container');
  if (!container) return;
  container.innerHTML = '';

  tData.events.forEach((item, idx) => {
    const yearText = isUa ? item.yearUa : item.yearRu;
    const titleText = isUa ? item.titleUa : item.titleRu;
    const descText = isUa ? item.textUa : item.textRu;

    let textHTML = item.isEpitaph
      ? `<div class="timeline-epitaph editable-text">${descText}</div>`
      : `<p class="editable-text">${descText}</p>`;

    const eventEl = document.createElement('div');
    eventEl.className = 'timeline-item fade-up visible';
    eventEl.innerHTML = `
      <span class="timeline-date editable-text">${yearText}</span>
      <div class="timeline-content">
        <h4 class="editable-text">${titleText}</h4>
        ${textHTML}
      </div>
    `;
    container.appendChild(eventEl);
  });
}

// Вспомогательная функция для генерации HTML каркаса модалки
function createBioModalHtml(personId, galleryKey) {
  return `
  <div class="bio-modal" id="${personId}-bio">
    <div class="bio-modal-content">
      <div class="c-sparks-wrap sparks-modal"></div>
      <span class="bio-modal-close" onclick="closeBio('${personId}-bio')">×</span>
      <h2 id="${personId}-modal-name" class="modal-name-title"></h2>
      <div id="${personId}-modal-dates" class="modal-dates modal-relative-z"></div>
      
      <div class="bio-text">
        <p id="${personId}-modal-personal-quote" class="modal-personal-quote"></p>
        <p id="${personId}-modal-intro" class="modal-intro-text"></p>
        
        <div id="${personId}-modal-accordion" class="accordion modal-relative-z"></div>
        <div id="${personId}-modal-quotes" class="quotes-section"></div>

        <h3 class="gallery-title editable-text" data-ru="Воспоминания" data-ua="Спогади">${currentLang === 'ua' ? 'Спогади' : 'Воспоминания'}</h3>
        
        <div class="gallery-wrapper-relative">
          <div class="c-sparks-wrap sparks-gallery"></div>
          <div class="modal-gallery" id="${galleryKey}"></div>
        </div>
        
        <div id="showMoreWrapper-${galleryKey}" class="btn-center-margin">
          <button class="read-more-btn modal-btn-no-margin" onclick="toggleGalleryExpand('${galleryKey}')" id="showMoreBtn-${galleryKey}">
            <span>${currentLang === 'ua' ? 'Показати ще' : 'Показать еще'}</span>
          </button>
        </div>
        
        <div class="admin-only-flex">
          <button class="admin-btn btn-add-photo" onclick="addGalleryPhoto('${galleryKey}')">➕ Добавить фото</button>
        </div>
      </div>
    </div>
  </div>`;
}

function renderBioModalData(personId, data) {
  if (!data) return;
  const isUa = currentLang === 'ua';

  const nameEl = document.getElementById(`${personId}-modal-name`); // Используем корректный ID из каркаса
  if (nameEl) nameEl.innerText = isUa ? data.nameUa : data.nameRu;

  const datesEl = document.getElementById(`${personId}-modal-dates`);
  if (datesEl) datesEl.innerText = isUa ? data.datesUa : data.datesRu;

  const quoteEl = document.getElementById(`${personId}-modal-personal-quote`);
  if (quoteEl) { quoteEl.innerText = isUa ? (data.personalQuoteUa || '') : (data.personalQuoteRu || ''); quoteEl.classList.add('editable-text'); }

  const introEl = document.getElementById(`${personId}-modal-intro`);
  if (introEl) { introEl.innerText = isUa ? (data.introUa || '') : (data.introRu || ''); introEl.classList.add('editable-text'); }

  const accContainer = document.getElementById(`${personId}-modal-accordion`);
  if (accContainer) {
    accContainer.innerHTML = '';
    if (data.accordion) {
      data.accordion.forEach((item, idx) => {
        const itemEl = document.createElement('div');
        itemEl.className = 'accordion-item';
        const paragraphs = isUa ? item.paragraphsUa : item.paragraphsRu;
        const pHTML = paragraphs ? paragraphs.map(p => `<p class="editable-text">${p}</p>`).join('') : '';
        itemEl.innerHTML = `
          <button class="accordion-header" onclick="toggleAccordion(this)">
            <span class="editable-text">${isUa ? item.titleUa : item.titleRu}</span>
            <span class="accordion-icon">+</span>
          </button>
          <div class="accordion-content"><div class="accordion-inner">${pHTML}</div></div>
        `;
        accContainer.appendChild(itemEl);
      });
    }
  }

  const qContainer = document.getElementById(`${personId}-modal-quotes`);
  if (qContainer) {
    qContainer.innerHTML = '';
    if (data.quotes) {
      data.quotes.forEach(q => {
        const qEl = document.createElement('div');
        qEl.className = 'quote-card';
        qEl.innerHTML = `
          <span class="quote-icon">“</span>
          <p class="quote-text editable-text">${isUa ? (q.textUa || q.textRu) : (q.textRu || q.textUa)}</p>
          <p class="quote-author editable-text">${isUa ? (q.authorUa || q.authorRu) : (q.authorRu || q.authorUa)}</p>
        `;
        qContainer.appendChild(qEl);
      });
    }
  }

  // После отрисовки данных инициализируем галереи (чтобы фото подгрузились в новые контейнеры)
  if (typeof initGalleries === 'function') initGalleries();
}

function renderEpochModal(data) {
  if (!data) return;
  const isUa = currentLang === 'ua';

  const mTitle = document.getElementById('epoch-main-title');
  if (mTitle) mTitle.innerText = isUa ? data.header.titleUa : data.header.titleRu;

  const mSub = document.getElementById('epoch-subtitle');
  if (mSub) mSub.innerText = isUa ? data.header.subtitleUa : data.header.subtitleRu;

  const container = document.getElementById('epoch-timeline-container');
  if (!container) return;
  container.innerHTML = '';

  if (data.events) {
    data.events.forEach((ev, idx) => {
      const dateText = isUa ? ev.dateUa : ev.dateRu;
      const titleText = isUa ? ev.titleUa : ev.titleRu;
      const paragraphs = isUa ? ev.paragraphsUa : ev.paragraphsRu;

      const evEl = document.createElement('div');
      evEl.className = 'accordion-item fade-up visible';

      let pHTML = paragraphs ? paragraphs.map((p, pIdx) => `<p class="editable-text" data-epoch-idx="${idx}" data-p-idx="${pIdx}">${p}</p>`).join('') : '';

      evEl.innerHTML = `
        <button class="accordion-header" onclick="toggleAccordion(this)">
          <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
            <span class="editable-text" data-epoch-date-idx="${idx}" style="color: var(--gold); font-weight: bold;">${dateText}</span>
            <span style="color: var(--gold-light);">|</span>
            <span class="editable-text" data-epoch-title-idx="${idx}">${titleText}</span>
          </div>
          <span class="accordion-icon">+</span>
        </button>
        <div class="accordion-content">
          <div class="accordion-inner">
            ${pHTML}
          </div>
        </div>
      `;
      container.appendChild(evEl);
    });
  }
}

function changeZoom(step) {
  if (step === 0) baseFontSize = 16; else baseFontSize += step;
  if (baseFontSize < 14) baseFontSize = 14; if (baseFontSize > 26) baseFontSize = 26;
  document.documentElement.style.fontSize = baseFontSize + 'px';
  document.getElementById('zoomValueDisplay').innerText = Math.round((baseFontSize / 16) * 100) + '%';
}

function setLang(lang) {
  currentLang = lang;
  if (typeof renderStaticContent === 'function') renderStaticContent();

  document.getElementById('btn-lang-ua')?.classList.toggle('active', lang === 'ua');
  document.getElementById('btn-lang-ru')?.classList.toggle('active', lang === 'ru');

  document.querySelectorAll('[data-ua][data-ru]').forEach(el => el.innerHTML = el.getAttribute(`data-${currentLang}`));
  document.querySelectorAll('[data-placeholder-ua][data-placeholder-ru]').forEach(el => el.placeholder = el.getAttribute(`data-placeholder-${currentLang}`));

  document.querySelectorAll('[data-title-ua][data-title-ru]').forEach(el => {
    el.title = el.getAttribute(`data-title-${currentLang}`);
  });

  const creatorLink = document.querySelector('.creator-link');
  if (creatorLink) {
    creatorLink.title = currentLang === 'ua' ? 'Скопіювати Email творця' : 'Скопировать Email создателя';
  }

  document.querySelectorAll('.gallery-caption').forEach(el => {
    el.setAttribute('data-placeholder', el.getAttribute(`data-placeholder-${currentLang}`));
    const text = el.getAttribute(`data-${currentLang}`);
    if (text !== null) el.innerText = text;
  });

  document.title = currentLang === 'ua' ? "Цифровий Меморіал родини Голотріних" : "Цифровой Мемориал семьи Голотриных";

  if (typeof renderCandles === 'function') renderCandles();
  if (typeof updateGalleryVisibility === 'function' && window.SITE_CONTENT?.people) {
    window.SITE_CONTENT.people.forEach(p => updateGalleryVisibility(p.galleryKey));
  }

  // Обновляем слушатели скролла для динамически созданных модальных окон
  document.querySelectorAll('.bio-modal, .qr-modal, .mobile-menu').forEach(modal => {
    modal.addEventListener('scroll', handleScroll);
  });
}

function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  if (menu) {
    menu.classList.toggle('active');
    if (menu.classList.contains('active')) {
      document.body.classList.add('body-overflow-hidden');
    } else {
      restoreBodyOverflow();
    }
  }
}

function createSparks() {
  document.querySelectorAll('.c-sparks-wrap').forEach(wrap => {
    if (wrap.children.length > 0) return;
    const isModal = wrap.closest('.bio-modal');
    const sparksCount = isModal ? 22 : 12;
    for (let i = 0; i < sparksCount; i++) {
      const spark = document.createElement('div');
      spark.className = 'c-spark';
      spark.style.left = Math.random() * 100 + '%';

      const size = Math.random() * 2 + 1.5; // Увеличено: теперь размер варьируется от 1.5px до 3.5px
      spark.style.width = size + 'px';
      spark.style.height = size + 'px';

      // Сделаем ореол чуть более выраженным для видимости в галереях
      const glowOpacity = document.body.classList.contains('dark-theme') ? 0.5 : 0.35;
      spark.style.boxShadow = `0 0 ${size * 2}px rgba(217, 160, 91, ${glowOpacity})`;

      const duration = isModal ? (70 + Math.random() * 70) : (40 + Math.random() * 30);
      const delay = Math.random() * -duration;
      spark.style.animation = `floatSpark ${duration}s infinite ${delay}s linear`;
      wrap.appendChild(spark);
    }
  });
}

function toggleTheme() {
  document.body.classList.toggle('dark-theme');
  const isDark = document.body.classList.contains('dark-theme');
  localStorage.setItem('memorial_theme', isDark ? 'dark' : 'light');

  const themeIcon = document.getElementById('theme-icon');
  if (themeIcon) {
    themeIcon.innerText = isDark ? '☀️' : '🌙';
    const btn = themeIcon.parentElement;
    if (btn) {
      btn.setAttribute('data-title-ru', isDark ? 'Светлая тема' : 'Ночная тема');
      btn.setAttribute('data-title-ua', isDark ? 'Світла тема' : 'Нічна тема');
      btn.title = btn.getAttribute(`data-title-${currentLang}`) || '';
    }
  }
}


// ==========================================
// 4. АДМИН-ПАНЕЛЬ И НАСТРОЙКИ
// ==========================================
function promptAdmin() {
  document.getElementById('adminAuthModal').classList.add('active');
  document.body.classList.add('body-overflow-hidden');
  document.getElementById('adminPwdInput').value = '';
  document.getElementById('adminPwdInput').focus();
}

function closeAdminAuthModal() {
  document.getElementById('adminAuthModal').classList.remove('active');
  restoreBodyOverflow();
}

async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

function openSettingsModal() {
  document.getElementById('settingsModal').classList.add('active');
  document.body.classList.add('body-overflow-hidden');
  const token = localStorage.getItem('gh_token');
  document.getElementById('ghTokenInput').value = token ? token : '';
  document.getElementById('newAdminPwdInput').value = '';
  document.getElementById('ghOwnerInput').value = window.SITE_CONFIG.githubOwner || '';
  document.getElementById('ghRepoInput').value = window.SITE_CONFIG.githubRepo || '';
  document.getElementById('tgBotTokenInput').value = window.SITE_CONFIG.telegramBotToken || '';
  document.getElementById('tgChatIdInput').value = window.SITE_CONFIG.telegramChatId || '';
}

function closeSettingsModal() {
  document.getElementById('settingsModal').classList.remove('active');
  restoreBodyOverflow();
}

async function saveSettings() {
  const token = document.getElementById('ghTokenInput').value.trim();
  const newPwd = document.getElementById('newAdminPwdInput').value.trim();
  const ghOwner = document.getElementById('ghOwnerInput').value.trim();
  const ghRepo = document.getElementById('ghRepoInput').value.trim();
  const tgBotToken = document.getElementById('tgBotTokenInput').value.trim();
  const tgChatId = document.getElementById('tgChatIdInput').value.trim();
  
  if (token) {
    localStorage.setItem('gh_token', token);
  }
  
  if (newPwd) {
    window.SITE_CONFIG.adminPasswordHash = await sha256(newPwd);
    hasUnsavedChanges = true;
  }
  
  if (ghOwner && ghOwner !== window.SITE_CONFIG.githubOwner) {
    window.SITE_CONFIG.githubOwner = ghOwner;
    hasUnsavedChanges = true;
  }

  if (ghRepo && ghRepo !== window.SITE_CONFIG.githubRepo) {
    window.SITE_CONFIG.githubRepo = ghRepo;
    hasUnsavedChanges = true;
  }

  if (tgBotToken !== window.SITE_CONFIG.telegramBotToken) {
    window.SITE_CONFIG.telegramBotToken = tgBotToken;
    hasUnsavedChanges = true;
  }

  if (tgChatId !== window.SITE_CONFIG.telegramChatId) {
    window.SITE_CONFIG.telegramChatId = tgChatId;
    hasUnsavedChanges = true;
  }
  
  closeSettingsModal();
  showToast(currentLang === 'ua' ? 'Налаштування збережено!' : 'Настройки сохранены!');
}

async function checkAdminPassword() {
  const pwd = document.getElementById('adminPwdInput').value;
  const hashed = await sha256(pwd);
  if (hashed === window.SITE_CONFIG.adminPasswordHash) {
    closeAdminAuthModal();
    document.getElementById('adminPanel').style.display = 'flex';
    if (!document.body.classList.contains('admin-mode')) toggleAdmin();
    showToast(currentLang === 'ua' ? 'Режим редактора увімкнено!' : 'Режим редактора включен!');
  } else {
    const errorEl = document.getElementById('adminPwdError');
    if (errorEl) errorEl.style.display = 'block';
  }
}

function toggleAdmin(forceState) {
  if (forceState !== true && forceState !== false) {
    document.body.classList.toggle('admin-mode');
  }
  const isAdm = document.body.classList.contains('admin-mode');

  document.querySelectorAll('.editable-text').forEach(el => {
    const isButton = el.closest('button') && !el.closest('.accordion-header');
    const isLink = el.closest('a');

    if (isButton || isLink) {
      el.setAttribute('contenteditable', 'false');
    } else {
      el.setAttribute('contenteditable', isAdm ? 'true' : 'false');
    }
  });
}

// ==========================================
// 5. ГАЛЕРЕЯ
// ==========================================
function initGalleries() {
  if (!window.DB_GALLERIES) return;
  Object.keys(window.DB_GALLERIES).forEach(galId => {
    const container = document.getElementById(galId);
    if (!container) return;
    container.innerHTML = '';
    window.DB_GALLERIES[galId].forEach(item => {
      const text = currentLang === 'ua' ? item.ua : item.ru;
      const wrap = document.createElement('div');
      wrap.className = 'gallery-item-wrap';
      wrap.innerHTML = `
        <div class="gallery-item" onclick="openLightbox(this)">
          <img id="${item.id}" src="img/${item.id}.webp" alt="Фото" loading="lazy">
          <button class="move-photo-btn move-photo-left" onclick="moveGalleryPhoto(this, -1); event.stopPropagation();" data-title-ru="Сдвинуть влево" data-title-ua="Зсунути ліворуч" title="${currentLang === 'ua' ? 'Зсунути ліворуч' : 'Сдвинуть влево'}">&#10094;</button>
          <button class="move-photo-btn move-photo-right" onclick="moveGalleryPhoto(this, 1); event.stopPropagation();" data-title-ru="Сдвинуть вправо" data-title-ua="Зсунути праворуч" title="${currentLang === 'ua' ? 'Зсунути праворуч' : 'Сдвинуть вправо'}">&#10095;</button>
          <button class="edit-photo-btn" onclick="triggerUpload('${item.id}'); event.stopPropagation();">📷 Загрузить</button>
          <button class="delete-photo-btn" onclick="deleteGalleryPhoto(this); event.stopPropagation();" data-title-ru="Удалить" data-title-ua="Видалити" title="${currentLang === 'ua' ? 'Видалити' : 'Удалить'}">🗑️</button>
        </div>
        <div class="gallery-caption editable-text" contenteditable="false" data-placeholder-ru="Добавить подпись..." data-placeholder-ua="Додати підпис..." data-ru="${item.ru}" data-ua="${item.ua}">${text}</div>
      `;
      container.appendChild(wrap);
    });
    updateGalleryVisibility(galId);
  });
}

function updateGalleryVisibility(galleryId) {
  const gallery = document.getElementById(galleryId);
  if (!gallery) return;
  const items = gallery.querySelectorAll('.gallery-item-wrap');
  const showMoreWrapper = document.getElementById(`showMoreWrapper-${galleryId}`);
  const showMoreBtn = document.getElementById(`showMoreBtn-${galleryId}`);

  items.forEach((item, index) => item.style.display = (!isGalleryExpanded[galleryId] && index >= MAX_VISIBLE_GALLERY) ? 'none' : '');

  if (items.length > MAX_VISIBLE_GALLERY) {
    if (showMoreWrapper) showMoreWrapper.style.display = 'block';
    if (showMoreBtn) showMoreBtn.innerHTML = isGalleryExpanded[galleryId] ? (currentLang === 'ua' ? '<span class="editable-text" data-ru="Сховати фото" data-ua="Сховати фото">Сховати фото</span>' : '<span class="editable-text" data-ru="Скрыть фото" data-ua="Сховати фото">Скрыть фото</span>') : (currentLang === 'ua' ? `<span class="editable-text" data-ru="Показати ще" data-ua="Показати ще">Показати ще (${items.length - MAX_VISIBLE_GALLERY})</span>` : `<span class="editable-text" data-ru="Показать еще" data-ua="Показати ще">Показать еще (${items.length - MAX_VISIBLE_GALLERY})</span>`);
  } else if (showMoreWrapper) showMoreWrapper.style.display = 'none';
}

function toggleGalleryExpand(galleryId) { isGalleryExpanded[galleryId] = !isGalleryExpanded[galleryId]; updateGalleryVisibility(galleryId); }
function triggerUpload(imgId) { currentUploadId = imgId; document.getElementById('file-uploader').click(); }

function deleteGalleryPhoto(btn) {
  customConfirm(currentLang === 'ua' ? 'Видалити це фото?' : 'Удалить это фото?', () => {
    const wrap = btn.closest('.gallery-item-wrap');
    const galleryId = wrap.closest('.modal-gallery').id;
    if (wrap) wrap.remove();
    updateGalleryVisibility(galleryId);
    hasUnsavedChanges = true;
  });
}

function moveGalleryPhoto(btn, direction) {
  const itemWrap = btn.closest('.gallery-item-wrap');
  const gallery = itemWrap.parentElement;
  if (direction === -1 && itemWrap.previousElementSibling) gallery.insertBefore(itemWrap, itemWrap.previousElementSibling);
  else if (direction === 1 && itemWrap.nextElementSibling) gallery.insertBefore(itemWrap.nextElementSibling, itemWrap);
  hasUnsavedChanges = true;
}

function addGalleryPhoto(galleryId) {
  const gallery = document.getElementById(galleryId);
  if (!gallery) return;
  const newId = 'gallery-' + galleryId.charAt(0) + '-' + Date.now();
  const wrap = document.createElement('div');
  wrap.className = 'gallery-item-wrap';
  const isAdm = document.body.classList.contains('admin-mode');
  wrap.innerHTML = `
    <div class="gallery-item" onclick="openLightbox(this)">
      <img id="${newId}" src="https://images.unsplash.com/photo-1506869640319-fea1a278e0db?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Фото" loading="lazy">
      <button class="move-photo-btn move-photo-left" onclick="moveGalleryPhoto(this, -1); event.stopPropagation();" data-title-ru="Сдвинуть влево" data-title-ua="Зсунути ліворуч" title="${currentLang === 'ua' ? 'Зсунути ліворуч' : 'Сдвинуть влево'}">&#10094;</button>
      <button class="move-photo-btn move-photo-right" onclick="moveGalleryPhoto(this, 1); event.stopPropagation();" data-title-ru="Сдвинуть вправо" data-title-ua="Зсунути праворуч" title="${currentLang === 'ua' ? 'Зсунути праворуч' : 'Сдвинуть вправо'}">&#10095;</button>
      <button class="edit-photo-btn" onclick="triggerUpload('${newId}'); event.stopPropagation();">📷 Загрузить</button>
      <button class="delete-photo-btn" onclick="deleteGalleryPhoto(this); event.stopPropagation();" data-title-ru="Удалить" data-title-ua="Видалити" title="${currentLang === 'ua' ? 'Видалити' : 'Удалить'}">🗑️</button>
    </div>
    <div class="gallery-caption editable-text" contenteditable="${isAdm}" data-placeholder="${currentLang === 'ua' ? 'Додати підпис...' : 'Добавить подпись...'}" data-placeholder-ru="Добавить подпись..." data-placeholder-ua="Додати підпис..." data-ru="" data-ua=""></div>
  `;
  gallery.appendChild(wrap);
  updateGalleryVisibility(galleryId);
  hasUnsavedChanges = true;
}

function openLightbox(wrapper) {
  const img = wrapper.querySelector('img');
  const galleryContainer = wrapper.closest('.modal-gallery');
  const lb = document.getElementById('lightbox');

  if (galleryContainer) {
    const items = Array.from(galleryContainer.querySelectorAll('img'));
    currentGalleryImages = items.map(i => i.src); currentGalleryIndex = items.indexOf(img);
    document.querySelector('.lightbox-prev').style.display = 'block'; document.querySelector('.lightbox-next').style.display = 'block';
  } else {
    currentGalleryImages = [img.src]; currentGalleryIndex = 0;
    document.querySelector('.lightbox-prev').style.display = 'none'; document.querySelector('.lightbox-next').style.display = 'none';
  }
  document.getElementById('lightbox-img').src = currentGalleryImages[currentGalleryIndex];
  
  const caption = document.getElementById('lightbox-caption');
  if (caption) {
    if (img.id === 'photo-crest') {
      caption.style.display = 'block';
      caption.innerText = currentLang === 'ua' ? caption.getAttribute('data-ua') : caption.getAttribute('data-ru');
    } else {
      caption.style.display = 'none';
    }
  }

  lb.classList.add('active');
  document.body.classList.add('body-overflow-hidden');
}

function nextImage(e) { if (e) e.stopPropagation(); if (currentGalleryImages.length <= 1) return; currentGalleryIndex = (currentGalleryIndex + 1) % currentGalleryImages.length; document.getElementById('lightbox-img').src = currentGalleryImages[currentGalleryIndex]; }
function prevImage(e) { if (e) e.stopPropagation(); if (currentGalleryImages.length <= 1) return; currentGalleryIndex = (currentGalleryIndex - 1 + currentGalleryImages.length) % currentGalleryImages.length; document.getElementById('lightbox-img').src = currentGalleryImages[currentGalleryIndex]; }
function closeLightbox() { document.getElementById('lightbox').classList.remove('active'); restoreBodyOverflow(); }

// ==========================================
// 6. СВЕЧИ И РИТУАЛ ПАМЯТИ (ИСПРАВЛЕННАЯ ЛОГИКА)
// ==========================================
function renderCandles() {
  const grid = document.getElementById('candlesGrid');
  if (!grid) return;
  grid.innerHTML = '';

  const isAdmin = document.body.classList.contains('admin-mode');

  const MAX_VISIBLE = 4;

  // Фильтруем: админ видит всё, люди видят только одобренные или те, что зажгли сами только что
  const visibleCandles = window.DB_CANDLES.filter(c => {
    return isAdmin || c.status === 'approved' || c.isLocal === true;
  });

  visibleCandles.forEach((c, index) => {
    if (!isCandlesExpanded && index >= MAX_VISIBLE) return;
    const typeInfo = candleData[c.type] || candleData['classic'];
    const typeName = currentLang === 'ru' ? typeInfo.nameRu : typeInfo.nameUa;
    const dateObj = new Date(c.timestamp);
    const dateStr = dateObj.toLocaleDateString('ru-RU') + ', ' + dateObj.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });

    // Берем язык строго по текущей версии, если его нет - fallback на другой
    let cName = currentLang === 'ua' ? (c.name_ua || c.name_ru || c.name) : (c.name_ru || c.name_ua || c.name);
    let cMessage = currentLang === 'ua' ? (c.message_ua || c.message_ru || c.message) : (c.message_ru || c.message_ua || c.message);

    cName = escapeHTML(cName);
    cMessage = escapeHTML(cMessage);

    let isLongMsg = cMessage && (cMessage.length > 150 || (cMessage.match(/\n/g) || []).length >= 3);
    let msgHtml = '';
    if (cMessage) {
      msgHtml = `<div class="candle-msg-text ${isLongMsg ? 'collapsible' : ''}">${cMessage}</div>`;
      if (isLongMsg) {
        msgHtml += `<button class="candle-expand-btn" onclick="this.previousElementSibling.classList.toggle('expanded'); this.innerText = this.previousElementSibling.classList.contains('expanded') ? (currentLang === 'ua' ? 'Сховати' : 'Скрыть') : (currentLang === 'ua' ? 'Читати далі...' : 'Читать далее...')">${currentLang === 'ua' ? 'Читати далі...' : 'Читать далее...'}</button>`;
      }
    }

    const card = document.createElement('div');
    // Подсвечиваем ожидающие модерации свечи для админа
    const isPending = c.status === 'pending' || !c.status;
    card.className = `candle-card fade-up visible ${isAdmin && isPending ? 'pending-moderation' : ''}`;
    card.innerHTML = `
      <div class="candle-admin-actions">
        <button onclick="editCandle('${c.id}')" title="Редактировать">✏️</button>
        <button onclick="deleteCandle('${c.id}')" data-title-ru="Удалить" data-title-ua="Видалити" title="${currentLang === 'ua' ? 'Видалити' : 'Удалить'}">🗑️</button>
      </div>
      <div class="c-sparks-wrap"></div>
      <div style="display: flex; gap: 20px; flex-grow: 1; margin-bottom: 25px; z-index: 1; position: relative;">
        <div class="css-candle"><div class="c-glow" style="background: radial-gradient(circle, ${typeInfo.glow} 0%, transparent 60%);"></div><div class="c-flame" style="background: ${typeInfo.flame};"></div><div class="c-body"></div><div class="c-base"></div></div>
        <div style="flex-grow: 1;">
          <div style="font-family: 'Montserrat', sans-serif; font-weight: 700; font-size: 1rem; color: #FFF; margin-bottom: 15px;">🕯️ <span>${cName}</span></div>
          ${msgHtml}
        </div>
      </div>
      <div class="c-card-footer"><span class="c-card-type">${typeName}</span><span>${dateStr}</span></div>
    `;
    grid.appendChild(card);
  });

  const showMoreWrapper = document.getElementById('showMoreCandlesWrapper');
  const showMoreBtn = document.getElementById('showMoreCandlesBtn');

  if (visibleCandles.length > MAX_VISIBLE) {
    showMoreWrapper.style.display = 'block';
    showMoreBtn.innerText = isCandlesExpanded ? (currentLang === 'ua' ? 'Сховати' : 'Скрыть') : (currentLang === 'ua' ? `Показати ще (${visibleCandles.length - MAX_VISIBLE})` : `Показать еще (${visibleCandles.length - MAX_VISIBLE})`);
  } else if (showMoreWrapper) showMoreWrapper.style.display = 'none';

  createSparks();
}

function toggleCandleForm() {
  const wrapper = document.getElementById('candleFormWrapper');
  const btnWrapper = document.getElementById('openFormBtnWrapper');
  wrapper.classList.toggle('active');
  if (wrapper.classList.contains('active')) {
    btnWrapper.style.display = 'none';
    setTimeout(() => wrapper.scrollIntoView({ behavior: 'smooth', block: 'center' }), 300);
  } else {
    btnWrapper.style.display = 'flex';
    editCandleIndex = null;
    document.getElementById('candleForm').reset();
  }
}

async function handleCandleSubmit(e) {
  e.preventDefault();
  const form = e.target;

  let nameInp = document.getElementById('cName').value.trim();
  let msgInp = document.getElementById('cMessage').value.trim();

  // Защита: удаляем ссылки и HTML-теги полностью
  const securityRegex = /(https?:\/\/[^\s]+|www\.[^\s]+|<([^>+]+)>)/gi;
  nameInp = nameInp.replace(securityRegex, '').trim();
  msgInp = msgInp.replace(securityRegex, '').trim();

  const typeRad = document.querySelector('input[name="cType"]:checked').value;
  const sourceLang = currentLang === 'ua' ? 'uk' : 'ru';
  const targetLang = currentLang === 'ua' ? 'ru' : 'uk';
  const isAdmin = document.body.classList.contains('admin-mode');

  let isEditing = editCandleIndex !== null;
  let c = isEditing ? window.DB_CANDLES[editCandleIndex] : null;

  let nameChanged = true;
  let msgChanged = true;

  if (isEditing) {
    let oldNameCur = currentLang === 'ua' ? (c.name_ua || c.name_ru || c.name) : (c.name_ru || c.name_ua || c.name);
    let oldMsgCur = currentLang === 'ua' ? (c.message_ua || c.message_ru || c.message || '') : (c.message_ru || c.message_ua || c.message || '');
    nameChanged = nameInp !== oldNameCur;
    msgChanged = msgInp !== oldMsgCur;
  }

  // УМНАЯ ЛОГИКА АВТОПЕРЕВОДА
  let doAutoTranslate = true;

  if (isAdmin && isEditing && (nameChanged || msgChanged)) {
    // Админа спрашиваем, переводить ли, чтобы не стереть его возможные ручные правки в другом языке
    let targetHasText = currentLang === 'ua' ? (c.name_ru || c.message_ru) : (c.name_ua || c.message_ua);
    if (targetHasText) {
      let msg = currentLang === 'ua'
        ? 'Оновити переклад іншої версії автоматично?\n(ОК - перекласти заново, Скасувати - зберегти ваші минулі ручні правки)'
        : 'Обновить перевод другой версии автоматически?\n(ОК - перевести заново, Отмена - сохранить ваши прошлые ручные правки)';
      doAutoTranslate = confirm(msg);
    }
  } else if (!isAdmin) {
    // Обычный посетитель: переводим ТИХО, без окон, чтобы сразу заполнить базу на 2 языках
    showToast(currentLang === 'ua' ? 'Запалюємо свічку...' : 'Зажигаем свечу...');
    doAutoTranslate = true;
  }

  let final_name_ru = nameInp;
  let final_name_ua = nameInp;
  let final_msg_ru = msgInp;
  let final_msg_ua = msgInp;

  if (isEditing) {
    final_name_ru = c.name_ru || nameInp;
    final_name_ua = c.name_ua || nameInp;
    final_msg_ru = c.message_ru || msgInp;
    final_msg_ua = c.message_ua || msgInp;

    if (currentLang === 'ua') { final_name_ua = nameInp; final_msg_ua = msgInp; }
    else { final_name_ru = nameInp; final_msg_ru = msgInp; }
  } else {
    if (currentLang === 'ua') { final_name_ua = nameInp; final_msg_ua = msgInp; }
    else { final_name_ru = nameInp; final_msg_ru = msgInp; }
  }

  if (doAutoTranslate && (nameChanged || msgChanged)) {
    if (nameInp && nameChanged) {
      let translatedName = await apiTranslateText(nameInp, sourceLang, targetLang);
      if (currentLang === 'ua') final_name_ru = translatedName; else final_name_ua = translatedName;
    }
    if (msgInp && msgChanged) {
      let translatedMsg = await apiTranslateText(msgInp, sourceLang, targetLang);
      if (currentLang === 'ua') final_msg_ru = translatedMsg; else final_msg_ua = translatedMsg;
    }
  }

  if (isEditing) {
    window.DB_CANDLES[editCandleIndex].name_ru = final_name_ru;
    window.DB_CANDLES[editCandleIndex].name_ua = final_name_ua;
    window.DB_CANDLES[editCandleIndex].message_ru = final_msg_ru;
    window.DB_CANDLES[editCandleIndex].message_ua = final_msg_ua;
    window.DB_CANDLES[editCandleIndex].type = typeRad;
    window.DB_CANDLES[editCandleIndex].status = 'approved'; // При ручном редактировании админом свеча одобряется
    renderCandles(); toggleCandleForm();

    if (isAdmin) {
      hasUnsavedChanges = true;
      showToast(currentLang === 'ua' ? 'Зміни збережено. Не забудьте "Зберегти зміни" в адмінці!' : 'Изменения сохранены. Нажмите "Сохранить изменения" в админке!');
    }
    return;
  }

  const newCandle = {
    id: 'c_' + Date.now(),
    name_ru: final_name_ru,
    name_ua: final_name_ua,
    message_ru: final_msg_ru,
    message_ua: final_msg_ua,
    type: typeRad,
    timestamp: Date.now(),
    status: isAdmin ? 'approved' : 'pending', // Админ сразу одобряет
    isLocal: !isAdmin // Флаг, чтобы человек видел свою свечу до обновления страницы
  };

  window.DB_CANDLES.unshift(newCandle);
  renderCandles();
  toggleCandleForm();

  if (isAdmin) {
    hasUnsavedChanges = true;
    showToast(currentLang === 'ua' ? 'Свічку додано!' : 'Свеча добавлена!');
  } else {
    sendTelegramNotification(newCandle);
    showToast(currentLang === 'ua' ? 'Свічку запалено! Вона з\'явиться назавжди після модерації.' : 'Свеча зажжена! Она появится навсегда после модерации.');
  }
}

function sendTelegramNotification(candle) {
  // Данные бота и администратора берутся из глобальных настроек
  const botToken = window.SITE_CONFIG.telegramBotToken || '';
  const chatId = window.SITE_CONFIG.telegramChatId || '';

  if (!botToken || botToken.includes('ВАШ_ТОКЕН')) return;

  const typeInfo = candleData[candle.type] || candleData['classic'];
  const typeName = typeInfo.nameRu;
  const siteUrl = window.location.origin + window.location.pathname;
  const text = `🕯️ *Новая свеча на Мемориале Родителей!*\n\n*От:* ${candle.name_ru}\n*Тип:* ${typeName}\n*Текст:* ${candle.message_ru || '—'}\n\n[🔗 Открыть Мемориал](${siteUrl})`;

  // Используем parse_mode=Markdown для красоты (жирный текст и ссылка)
  fetch(`https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(text)}&parse_mode=Markdown`)
    .catch(err => console.error("Telegram notify error", err));
}

function deleteCandle(id) {
  customConfirm(currentLang === 'ua' ? 'Видалити цю свічку?' : 'Удалить эту свечу?', () => {
    const idx = window.DB_CANDLES.findIndex(c => c.id === id);
    if (idx !== -1) window.DB_CANDLES.splice(idx, 1);
    renderCandles();
    if (document.body.classList.contains('admin-mode')) hasUnsavedChanges = true;
  });
}

function editCandle(id) {
  const index = window.DB_CANDLES.findIndex(c => c.id === id);
  if (index === -1) return;
  const c = window.DB_CANDLES[index]; // ИСПРАВЛЕНО: объявление переменной c (ранее вызывало ReferenceError)
  document.getElementById('cName').value = currentLang === 'ua' ? (c.name_ua || c.name_ru || c.name) : (c.name_ru || c.name_ua || c.name);
  document.getElementById('cMessage').value = currentLang === 'ua' ? (c.message_ua || c.message_ru || c.message || '') : (c.message_ru || c.message_ua || c.message || '');
  document.querySelector(`input[name="cType"][value="${c.type}"]`).checked = true;
  editCandleIndex = index;
  const wrapper = document.getElementById('candleFormWrapper');
  if (!wrapper.classList.contains('active')) toggleCandleForm();
  wrapper.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function toggleCandlesExpand() { isCandlesExpanded = !isCandlesExpanded; renderCandles(); }

// ==========================================
// 7. МОДАЛКИ И АККОРДЕОНЫ
// ==========================================
function openBio(id) { document.getElementById(id).classList.add('active'); document.body.classList.add('body-overflow-hidden'); }
function closeBio(id) { document.getElementById(id).classList.remove('active'); restoreBodyOverflow(); }
function toggleAccordion(button) {
  const item = button.parentElement;
  if (!item.classList.contains('active')) {
    item.parentElement.querySelectorAll('.accordion-item').forEach(el => el.classList.remove('active'));
    item.classList.add('active');
    setTimeout(() => button.scrollIntoView({ behavior: 'smooth', block: 'center' }), 350);
  }
}

// ==========================================
// 8. УМНЫЙ QR-ГЕНЕРАТОР С МАСКОЙ ЗАЩИТЫ
// ==========================================
function openQrModal() {
  const currentUrl = window.location.href.split('#')[0];
  document.getElementById('qrUrlInput').value = currentUrl;
  document.getElementById('qrPrintArea').style.display = 'none';
  document.getElementById('printBtnWrap').style.display = 'none';
  document.getElementById('qrModal').classList.add('active');
  document.body.classList.add('body-overflow-hidden');
}

function closeQrModal() {
  document.getElementById('qrModal').classList.remove('active');
  restoreBodyOverflow();
}

function generateQr() {
  let url = document.getElementById('qrUrlInput').value.trim();
  if (!url) { showToast(currentLang === 'ua' ? 'Введіть посилання!' : 'Введите ссылку!'); return; }

  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = 'https://' + url;
    document.getElementById('qrUrlInput').value = url;
  }

  const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
  if (!urlPattern.test(url)) {
    showToast(currentLang === 'ua' ? '❌ Некоректний формат посилання!' : '❌ Некорректный формат ссылки!');
    return;
  }

  const qrContainer = document.getElementById('qrCodeImg');
  qrContainer.innerHTML = '';

  const urlDisplay = document.getElementById('qrUrlDisplay');
  if (urlDisplay) urlDisplay.innerText = url;

  new QRCode(qrContainer, {
    text: url, width: 180, height: 180,
    colorDark: "#322108", colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
  });

  document.getElementById('qrPrintArea').style.display = 'flex';
  document.getElementById('printBtnWrap').style.display = 'flex';
}

function downloadQr() {
  const printArea = document.getElementById('qrPrintArea');
  html2canvas(printArea, { scale: 2, useCORS: true, backgroundColor: '#ffffff' }).then(canvas => {
    const link = document.createElement('a');
    link.href = canvas.toDataURL("image/png");
    link.download = 'Memorial_Table_QR.png';
    link.click();
  });
}

// ==========================================
// 9. СБОР ДАННЫХ И ИНИЦИАЛИЗАЦИЯ ПРИЛОЖЕНИЯ
// ==========================================
async function harvestData(doTranslate = false) {
  if (!window.SITE_CONTENT) return false;
  const isUa = currentLang === 'ua';
  const langSuffix = isUa ? 'Ua' : 'Ru';
  const oppSuffix = isUa ? 'Ru' : 'Ua';
  const fromL = isUa ? 'uk' : 'ru';
  const toL = isUa ? 'ru' : 'uk';

  async function syncField(domText, obj, key) {
    if (!obj || domText == null) return;
    if (domText !== obj[key + langSuffix]) {
      if (doTranslate) {
         obj[key + oppSuffix] = await apiTranslateText(domText, fromL, toL);
      }
      obj[key + langSuffix] = domText;
    }
  }

  async function syncArray(domArr, obj, key) {
    if (!obj || !domArr) return;
    if (JSON.stringify(domArr) !== JSON.stringify(obj[key + langSuffix])) {
      if (doTranslate) {
         obj[key + oppSuffix] = await Promise.all(domArr.map(p => apiTranslateText(p, fromL, toL)));
      }
      obj[key + langSuffix] = domArr;
    }
  }

  // Hero
  await syncField(document.getElementById('hero-title')?.innerText.trim(), window.SITE_CONTENT.hero, 'title');
  await syncField(document.getElementById('hero-subtitle')?.innerText.trim(), window.SITE_CONTENT.hero, 'subtitle');
  await syncField(document.getElementById('hero-quote')?.innerText.trim(), window.SITE_CONTENT.hero, 'quote');

  // People
  for (const person of window.SITE_CONTENT.people) {
    await syncField(document.getElementById(`${person.id}-name`)?.innerText.trim(), person, 'name');
    await syncField(document.getElementById(`${person.id}-dates`)?.innerText.trim(), person, 'dates');
    await syncField(document.getElementById(`${person.id}-bio-preview`)?.innerText.trim(), person, 'bio');

    const bioData = window.SITE_CONTENT[person.bioKey];
    if (bioData) {
      bioData['name' + langSuffix] = person['name' + langSuffix];
      if (doTranslate && bioData['name' + langSuffix] !== person['name' + langSuffix]) {
         bioData['name' + oppSuffix] = person['name' + oppSuffix];
      }
      bioData['dates' + langSuffix] = person['dates' + langSuffix];
      if (doTranslate && bioData['dates' + langSuffix] !== person['dates' + langSuffix]) {
         bioData['dates' + oppSuffix] = person['dates' + oppSuffix];
      }

      await syncField(document.getElementById(`${person.id}-modal-personal-quote`)?.innerText.trim(), bioData, 'personalQuote');
      await syncField(document.getElementById(`${person.id}-modal-intro`)?.innerText.trim(), bioData, 'intro');

      const accItems = document.querySelectorAll(`#${person.id}-modal-accordion .accordion-item`);
      for (let idx = 0; idx < accItems.length; idx++) {
        if (bioData.accordion[idx]) {
          await syncField(accItems[idx].querySelector('.accordion-header span')?.innerText.trim(), bioData.accordion[idx], 'title');
          const pEls = accItems[idx].querySelectorAll('.accordion-inner p');
          await syncArray(Array.from(pEls).map(p => p.innerText.trim()), bioData.accordion[idx], 'paragraphs');
        }
      }

      const qCards = document.querySelectorAll(`#${person.id}-modal-quotes .quote-card`);
      for (let idx = 0; idx < qCards.length; idx++) {
        if (bioData.quotes[idx]) {
          await syncField(qCards[idx].querySelector('.quote-text')?.innerText.trim(), bioData.quotes[idx], 'text');
          await syncField(qCards[idx].querySelector('.quote-author')?.innerText.trim(), bioData.quotes[idx], 'author');
        }
      }
    }
  }

  // Timeline
  const tlContainer = document.getElementById('timeline-container');
  if (tlContainer && window.SITE_CONTENT.timeline) {
    const th = window.SITE_CONTENT.timeline.header;
    await syncField(document.getElementById('timeline-main-title')?.innerText.trim(), th, 'title');
    await syncField(document.getElementById('timeline-subtitle')?.innerText.trim(), th, 'subtitle');
    await syncField(document.getElementById('timeline-epoch-btn')?.innerText.trim(), th, 'btn');
    
    const tlItems = tlContainer.querySelectorAll('.timeline-item');
    for (let idx = 0; idx < tlItems.length; idx++) {
      if (window.SITE_CONTENT.timeline.events[idx]) {
        const item = tlItems[idx];
        await syncField(item.querySelector('.timeline-date')?.innerText.trim(), window.SITE_CONTENT.timeline.events[idx], 'year');
        await syncField(item.querySelector('.timeline-content h4')?.innerText.trim(), window.SITE_CONTENT.timeline.events[idx], 'title');
        await syncField(item.querySelector('.timeline-content p, .timeline-content .timeline-epitaph')?.innerText.trim(), window.SITE_CONTENT.timeline.events[idx], 'text');
      }
    }
  }

  // Epoch
  const epochContainer = document.getElementById('epoch-timeline-container');
  if (epochContainer && window.SITE_CONTENT.epochData) {
    const ed = window.SITE_CONTENT.epochData;
    const epItems = epochContainer.querySelectorAll('.timeline-item');
    for (let idx = 0; idx < epItems.length; idx++) {
      if (ed.events[idx]) {
        const item = epItems[idx];
        await syncField(item.querySelector('.timeline-date')?.innerText.trim(), ed.events[idx], 'date');
        await syncField(item.querySelector('.timeline-content h4')?.innerText.trim(), ed.events[idx], 'title');
        const pEls = item.querySelectorAll('.timeline-content p');
        await syncArray(Array.from(pEls).map(p => p.innerText.trim()), ed.events[idx], 'paragraphs');
      }
    }
  }

  // Galleries
  const updatedGalleries = {};
  if (window.SITE_CONTENT.people) {
    for (const person of window.SITE_CONTENT.people) {
      const galId = person.galleryKey;
      updatedGalleries[galId] = [];
      const container = document.getElementById(galId);
      if (container) {
        const wraps = container.querySelectorAll('.gallery-item-wrap');
        for (let wrap of wraps) {
          const img = wrap.querySelector('img[id]');
          const cap = wrap.querySelector('.gallery-caption');
          if (img) {
            const domCap = cap.innerText.trim();
            const oldCap = isUa ? cap.getAttribute('data-ua') : cap.getAttribute('data-ru');
            
            let finalRu = cap.getAttribute('data-ru') || '';
            let finalUa = cap.getAttribute('data-ua') || '';
            
            if (domCap !== oldCap) {
              if (doTranslate) {
                const translated = await apiTranslateText(domCap, fromL, toL);
                if (isUa) { finalUa = domCap; finalRu = translated; }
                else { finalRu = domCap; finalUa = translated; }
              } else {
                if (isUa) finalUa = domCap; else finalRu = domCap;
              }
            } else {
               if (isUa) finalUa = domCap; else finalRu = domCap;
            }
            
            updatedGalleries[galId].push({ id: img.id, ru: finalRu, ua: finalUa });
            cap.setAttribute('data-ru', finalRu);
            cap.setAttribute('data-ua', finalUa);
          }
        }
      } else {
        updatedGalleries[galId] = window.DB_GALLERIES[galId] || [];
      }
    }
  }
  window.DB_GALLERIES = updatedGalleries;
}

async function runAutoTranslate() {
  const isUa = currentLang === 'ua';
  const msgTranslate = isUa
    ? 'УВАГА: Це розумний автопереклад!\nВін знайде тільки ЗМІНЕНІ вами тексти на цій сторінці і перекладе тільки їх на російську.\nВсі ваші минулі ручні правки російською залишаться недоторканими.\n\nПродовжити?'
    : 'ВНИМАНИЕ: Это умный автоперевод!\nОн найдет только ИЗМЕНЕННЫЕ вами тексты на этой странице и переведет только их на украинский.\nВсе ваши прошлые ручные правки на украинском останутся нетронутыми.\n\nПродолжить?';

  if (!confirm(msgTranslate)) return;

  showToast(currentLang === 'ua' ? 'Виконуємо розумний автопереклад...' : 'Выполняем умный автоперевод...');
  
  await harvestData(true);
  
  hasUnsavedChanges = true;
  showLongWarningToast(currentLang === 'ua' 
    ? '✅ УСПІХ! Змінені блоки успішно перекладені.<br><br><b>ОБОВ\'ЯЗКОВО натисніть "Зберегти на GitHub", щоб зафіксувати переклад.</b>' 
    : '✅ УСПЕХ! Измененные блоки успешно переведены.<br><br><b>ОБЯЗАТЕЛЬНО нажмите "Сохранить на GitHub", чтобы зафиксировать перевод.</b>');
}

async function downloadSiteData() {
  if (!window.SITE_CONTENT) return;
  
  // Просто собираем данные текущего языка, без перевода
  await harvestData(false);

  // Перед сохранением переводим все новые свечи в статус "одобрено" и убираем локальные флаги
  window.DB_CANDLES.forEach(c => {
    if (c.status === 'pending' || !c.status) c.status = 'approved';
    if (c.isLocal) delete c.isLocal;
  });

  const dataJsContent = `// === КОНФИГУРАЦИЯ САЙТА (БИЗНЕС-МОДЕЛЬ) ===\nwindow.SITE_CONFIG = ${JSON.stringify(window.SITE_CONFIG, null, 2)};\n\n// === БАЗА ТЕКСТОВОГО КОНТЕНТА ===\nwindow.SITE_CONTENT = ${JSON.stringify(window.SITE_CONTENT, null, 2)};\n\n// === БАЗА ДАННЫХ СВЕЧЕЙ ===\nwindow.DB_CANDLES = ${JSON.stringify(window.DB_CANDLES, null, 2)};\n\n// === БАЗА ДАННЫХ ФОТОГАЛЕРЕЙ И ПОДПИСЕЙ ===\nwindow.DB_GALLERIES = ${JSON.stringify(window.DB_GALLERIES, null, 2)};`;

  let ghOwner = window.SITE_CONFIG.githubOwner;
  let ghRepo = window.SITE_CONFIG.githubRepo;
  let ghToken = localStorage.getItem('gh_token');

  if (!ghToken) {
    alert(currentLang === 'ua' 
      ? "Будь ласка, вкажіть GitHub Token у Налаштуваннях (кнопка ⚙️ Налаштування в адмінці)." 
      : "Пожалуйста, укажите GitHub Token в Настройках (кнопка ⚙️ Настройки в админке).");
    openSettingsModal();
    return;
  }

  showToast(currentLang === 'ua' ? 'Відправка файлів на GitHub...' : 'Отправка файлов на GitHub...');

  try {
    const url = `https://api.github.com/repos/${ghOwner}/${ghRepo}/contents/js/data.js`;
    const getRes = await fetch(url, { headers: { 'Authorization': `token ${ghToken}`, 'Accept': 'application/vnd.github.v3+json' } });

    let sha = null;
    if (getRes.ok) {
      const fileData = await getRes.json();
      sha = fileData.sha;
    }

    const encodedContent = btoa(unescape(encodeURIComponent(dataJsContent)));
    const putRes = await fetch(url, {
      method: 'PUT',
      headers: { 'Authorization': `token ${ghToken}`, 'Accept': 'application/vnd.github.v3+json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Обновление Мемориала: база данных (Авто-коммит)', content: encodedContent, sha: sha })
    });

    if (!putRes.ok) throw new Error(`Ошибка при записи js/data.js`);

    hasUnsavedChanges = false;
    showLongWarningToast(currentLang === 'ua'
      ? '✅ УСПІХ! Дані оновлено на GitHub.<br><br><b>УВАГА: Не оновлюйте сторінку найближчі 2-3 хвилини!</b>'
      : '✅ УСПЕХ! Данные обновлены на GitHub.<br><br><b>ВНИМАНИЕ: Не обновляйте страницу ближайшие 2-3 минуты!</b>');
  } catch (error) {
    console.error(error);
    alert(`Ошибка: ${error.message}`);
  }
}

function initializeMemorialApp() {
  initGalleries();
  renderCandles();
  createSparks();

  const savedTheme = localStorage.getItem('memorial_theme');
  if (savedTheme === 'light' && document.body.classList.contains('dark-theme')) {
    toggleTheme();
  } else if (savedTheme === 'dark' && !document.body.classList.contains('dark-theme')) {
    toggleTheme();
  }
  const themeIcon = document.getElementById('theme-icon');
  if (themeIcon) themeIcon.innerText = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';

  setLang('ua');

  document.addEventListener('input', function (e) {
    if (e.target.classList.contains('editable-text')) {
      hasUnsavedChanges = true;
      // Синхронизируем текст подписи с атрибутами данных
      if (e.target.classList.contains('gallery-caption')) {
        e.target.setAttribute(`data-${currentLang}`, e.target.innerText.trim());
      }
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && e.target.classList.contains('editable-text') && e.target.getAttribute('contenteditable') === 'true') {
      e.preventDefault();
      document.execCommand('insertText', false, '\n');
      hasUnsavedChanges = true;
    }
  });

  document.addEventListener('paste', function (e) {
    if (e.target.classList.contains('editable-text') && e.target.getAttribute('contenteditable') === 'true') {
      e.preventDefault();
      const text = (e.originalEvent || e).clipboardData.getData('text/plain');
      document.execCommand('insertText', false, text);
      hasUnsavedChanges = true;
    }
  });

  const urlParams = new URLSearchParams(window.location.search);
  const adminParam = urlParams.get('admin');
  if (adminParam && btoa(adminParam) === 'MTk3OA==') {
    document.getElementById('adminPanel').style.display = 'flex';
    if (!document.body.classList.contains('admin-mode')) toggleAdmin();
    showToast(currentLang === 'ua' ? 'Режим редактора увімкнено через посилання!' : 'Режим редактора включен по ссылке!');
  }

  const pwdInput = document.getElementById('adminPwdInput');
  if (pwdInput) {
    pwdInput.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') checkAdminPassword();
    });
  }

  window.addEventListener('beforeunload', function (e) {
    if (hasUnsavedChanges) {
      const confirmationMessage = 'У вас есть несохраненные изменения. Точно хотите выйти?';
      e.returnValue = confirmationMessage;
      return confirmationMessage;
    }
  });

  document.getElementById('file-uploader').addEventListener('change', function (e) {
    const file = e.target.files[0];
    if (file && currentUploadId) {
      const reader = new FileReader();
      reader.onload = function (event) {
        const img = new Image();
        img.onload = function () {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          let width = img.width, height = img.height; const maxWidth = 1600;
          if (width > maxWidth) { height = Math.round((height * maxWidth) / width); width = maxWidth; }
          canvas.width = width; canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob((blob) => {
            if (!blob) return;
            const blobUrl = URL.createObjectURL(blob);
            document.getElementById(currentUploadId).src = blobUrl;
            hasUnsavedChanges = true;

            customConfirm(currentLang === 'ua' ? 'Фото оптимізовано! Завантажити його одразу на GitHub?' : 'Фото оптимизировано! Загрузить его сразу на GitHub?', () => {
              uploadImageToGitHub(blob, 'img/' + currentUploadId + '.webp');
            });
          }, 'image/webp', 0.85);
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  });

  const observer = new IntersectionObserver((entries) => { entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); }); }, { threshold: 0.1 });
  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
}

function checkAndStartApp() {
  if (window.SITE_CONTENT && window.DB_CANDLES && window.DB_GALLERIES) {
    initializeMemorialApp();
  } else {
    setTimeout(checkAndStartApp, 50);
  }
}

checkAndStartApp();

// ==========================================
// 10. ЗАГРУЗКА ИЗОБРАЖЕНИЙ НА GITHUB API
// ==========================================
async function uploadImageToGitHub(blob, filename) {
  let ghOwner = window.SITE_CONFIG.githubOwner;
  let ghRepo = window.SITE_CONFIG.githubRepo;
  let ghToken = localStorage.getItem('gh_token');

  if (!ghToken) {
    alert(currentLang === 'ua' 
      ? "Будь ласка, вкажіть GitHub Token у Налаштуваннях (кнопка ⚙️ Налаштування в адмінці)." 
      : "Пожалуйста, укажите GitHub Token в Настройках (кнопка ⚙️ Настройки в админке).");
    openSettingsModal();
    return;
  }

  showToast(currentLang === 'ua' ? 'Відправка фото на GitHub...' : 'Отправка фото на GitHub...');

  const reader = new FileReader();
  reader.readAsDataURL(blob);
  reader.onloadend = async function () {
    const base64data = reader.result.split(',')[1];

    try {
      const url = `https://api.github.com/repos/${ghOwner}/${ghRepo}/contents/${filename}`;
      let sha = null;
      try {
        const getRes = await fetch(url, { headers: { 'Authorization': `token ${ghToken}`, 'Accept': 'application/vnd.github.v3+json' } });
        if (getRes.ok) {
          const fileData = await getRes.json();
          sha = fileData.sha;
        }
      } catch (e) { }

      const bodyData = { message: `Обновление фото: ${filename}`, content: base64data };
      if (sha) bodyData.sha = sha;

      const putRes = await fetch(url, {
        method: 'PUT',
        headers: { 'Authorization': `token ${ghToken}`, 'Accept': 'application/vnd.github.v3+json', 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyData)
      });

      if (!putRes.ok) throw new Error('Ошибка записи в репозиторий');

      hasUnsavedChanges = false;
      showToast(currentLang === 'ua' ? '✅ Фото успішно завантажено!' : '✅ Фото успешно загружено!');
    } catch (error) {
      console.error(error);
      alert('Ошибка загрузки фото: ' + error.message);
    }
  };
}
