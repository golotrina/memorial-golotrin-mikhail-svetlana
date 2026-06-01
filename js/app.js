// ==========================================
// 1. ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ И НАСТРОЙКИ
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
  heavenly: { glow: 'rgba(200, 230, 255, 0.4)', flame: 'linear-gradient(to bottom, #FFF, #87CEEB)', nameRu: 'Небесное siяние', nameUa: 'Небесне сяйво' },
  unquenchable: { glow: 'rgba(255, 0, 50, 0.5)', flame: 'linear-gradient(to bottom, #FFB6C1, #E60026)', nameRu: 'Неугасаемое пламя', nameUa: "Незгасне полум'я" }
};

// ==========================================
// 2. УТИЛИТЫ И СКРОЛЛ
// ==========================================
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
  window.currentConfirmCallback = () => { document.getElementById('confirmModal').classList.remove('active'); onConfirm(); };
}

function copyEmailToClipboard(email) {
  navigator.clipboard.writeText(email).then(() => showToast(currentLang === 'ua' ? 'Email скопійовано!' : 'Email скопирован!'));
}

function shareSite() {
  const shareTitle = currentLang === 'ua' ? "Цифровий Меморіал родини Голотріних" : "Цифровой Мемориал семьи Голотриных";
  const shareText = currentLang === 'ua' ? "Світла пам'ять та історія родини Голотріних, дбайливо збережена для майбутніх поколінь." : "Светлая память и история семьи Голотриных, бережно сохранена для будущих поколений.";
  if (navigator.share) {
    navigator.share({ title: shareTitle, text: shareText, url: window.location.href });
  } else {
    showToast(currentLang === 'ua' ? "Скопіюйте посилання з браузера." : "Скопируйте ссылку из браузера."); 
  }
}

window.addEventListener('scroll', function() {
  const btn = document.getElementById('scrollTopBtn');
  if (!document.querySelector('.bio-modal.active') && btn) {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) btn.classList.add('visible'); 
    else btn.classList.remove('visible');
  }
});

document.querySelectorAll('.bio-modal').forEach(modal => {
  modal.addEventListener('scroll', function() {
    const btn = document.getElementById('scrollTopBtn');
    if (btn) {
      if (this.scrollTop > 300) btn.classList.add('visible'); 
      else btn.classList.remove('visible');
    }
  });
});

function scrollToTop() { 
  const activeModal = document.querySelector('.bio-modal.active') || document.getElementById('epochModal');
  if (activeModal && (activeModal.classList.contains('active') || activeModal.style.display === 'flex')) {
    activeModal.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  }
}

// ==========================================
// 3. ДВИЖКИ ДИНАМИЧЕСКОГО РЕНДЕРИНГА
// ==========================================
function toggleTheme() {
  document.body.classList.toggle('dark-theme');
  const isDark = document.body.classList.contains('dark-theme');
  localStorage.setItem('memorial_theme', isDark ? 'dark' : 'light');
  
  const themeIcon = document.getElementById('theme-icon');
  if(themeIcon) {
    themeIcon.innerText = isDark ? '☀️' : '🌙';
    const btn = themeIcon.parentElement;
    btn.setAttribute('data-title-ru', isDark ? 'Светлая тема' : 'Ночная тема');
    btn.setAttribute('data-title-ua', isDark ? 'Світла тема' : 'Нічна тема');
    btn.title = btn.getAttribute(`data-title-${currentLang}`);
  }
}

function renderStaticContent() {
  if (!window.SITE_CONTENT) return;
  const content = window.SITE_CONTENT;
  const isUa = currentLang === 'ua';

  document.getElementById('hero-title').innerText = isUa ? content.hero.titleUa : content.hero.titleRu;
  document.getElementById('hero-subtitle').innerText = isUa ? content.hero.subtitleUa : content.hero.subtitleRu;
  document.getElementById('hero-quote').innerText = isUa ? content.hero.quoteUa : content.hero.quoteRu;

  document.getElementById('father-name').innerText = isUa ? content.parents.father.nameUa : content.parents.father.nameRu;
  document.getElementById('father-dates').innerText = isUa ? content.parents.father.datesUa : content.parents.father.datesRu;
  document.getElementById('father-bio-preview').innerText = isUa ? content.parents.father.bioUa : content.parents.father.bioRu;

  document.getElementById('mother-name').innerText = isUa ? content.parents.mother.nameUa : content.parents.mother.nameRu;
  document.getElementById('mother-dates').innerText = isUa ? content.parents.mother.datesUa : content.parents.mother.datesRu;
  document.getElementById('mother-bio-preview').innerText = isUa ? content.parents.mother.bioUa : content.parents.mother.bioRu;

  renderTimeline();
  renderBioModal('father', 'fbio', content.fatherBio);
  renderBioModal('mother', 'mbio', content.motherBio);
  renderEpochModal(content.epochData);
}

function renderTimeline() {
  if (!window.SITE_CONTENT || !window.SITE_CONTENT.timeline) return;
  const tData = window.SITE_CONTENT.timeline;
  const isUa = currentLang === 'ua';

  document.getElementById('timeline-main-title').innerText = isUa ? tData.header.titleUa : tData.header.titleRu;
  document.getElementById('timeline-subtitle').innerText = isUa ? tData.header.subtitleUa : tData.header.subtitleRu;
  document.getElementById('timeline-epoch-btn').innerText = isUa ? tData.header.btnUa : tData.header.btnRu;

  const container = document.getElementById('timeline-container');
  container.innerHTML = '';

  tData.events.forEach(item => {
    const yearText = isUa ? item.yearUa : item.yearRu;
    const titleText = isUa ? item.titleUa : item.titleRu;
    const descText = isUa ? item.textUa : item.textRu;
    
    let textHTML = item.isEpitaph 
      ? `<div class="timeline-epitaph" style="white-space: pre-wrap;">${descText}</div>`
      : `<p style="white-space: pre-wrap;">${descText}</p>`;

    const eventEl = document.createElement('div');
    eventEl.className = 'timeline-item fade-up visible';
    eventEl.innerHTML = `
      <span class="timeline-date">${yearText}</span>
      <div class="timeline-content">
        <h4>${titleText}</h4>
        ${textHTML}
      </div>
    `;
    container.appendChild(eventEl);
  });
}

function renderBioModal(type, prefix, data) {
  if (!data) return;
  const isUa = currentLang === 'ua';

  document.getElementById(`${prefix}-name`).innerText = isUa ? data.nameUa : data.nameRu;
  document.getElementById(`${prefix}-dates`).innerText = isUa ? data.datesUa : data.datesRu;
  document.getElementById(`${prefix}-personal-quote`).innerText = isUa ? data.personalQuoteUa : data.personalQuoteRu;
  document.getElementById(`${prefix}-intro`).innerText = isUa ? data.introUa : data.introRu;

  const accContainer = document.getElementById(`${prefix}-accordion`);
  accContainer.innerHTML = '';
  data.accordion.forEach(item => {
    const title = isUa ? item.titleUa : item.titleRu;
    const paragraphs = isUa ? item.paragraphsUa : item.paragraphsRu;
    const itemEl = document.createElement('div');
    itemEl.className = 'accordion-item';
    let pHTML = paragraphs.map(p => `<p>${p}</p>`).join('');
    itemEl.innerHTML = `
      <button class="accordion-header" onclick="toggleAccordion(this)">
        <span>${title}</span><span class="accordion-icon">+</span>
      </button>
      <div class="accordion-content"><div class="accordion-inner">${pHTML}</div></div>
    `;
    accContainer.appendChild(itemEl);
  });

  const qContainer = document.getElementById(`${prefix}-quotes`);
  qContainer.innerHTML = '';
  data.quotes.forEach(q => {
    const text = isUa ? q.textUa : q.textRu;
    const author = isUa ? q.authorUa : q.authorRu;
    const qEl = document.createElement('div');
    qEl.className = 'quote-card fade-up visible';
    qEl.innerHTML = `<span class="quote-icon">“</span><p class="quote-text">${text}</p><p class="quote-author">${author}</p>`;
    qContainer.appendChild(qEl);
  });
}

function renderEpochModal(data) {
  if (!data) return;
  const isUa = currentLang === 'ua';

  document.getElementById('epoch-main-title').innerText = isUa ? data.header.titleUa : data.header.titleRu;
  document.getElementById('epoch-subtitle').innerText = isUa ? data.header.subtitleUa : data.header.subtitleRu;

  const container = document.getElementById('epoch-timeline-container');
  container.innerHTML = '';
  data.events.forEach(ev => {
    const dateText = isUa ? ev.dateUa : ev.dateRu;
    const titleText = isUa ? ev.titleUa : ev.titleRu;
    const paragraphs = isUa ? ev.paragraphsUa : ev.paragraphsRu;
    
    const evEl = document.createElement('div');
    evEl.className = 'timeline-item fade-up visible';
    let pHTML = paragraphs.map(p => `<p style="white-space: pre-wrap;">${p}</p>`).join('');
    
    evEl.innerHTML = `
      <span class="timeline-date">${dateText}</span>
      <div class="timeline-content">
        <h4>${titleText}</h4>
        ${pHTML}
      </div>
    `;
    container.appendChild(evEl);
  });
}
function changeZoom(step) {
  if (step === 0) baseFontSize = 16; else baseFontSize += step; 
  if (baseFontSize < 14) baseFontSize = 14; if (baseFontSize > 26) baseFontSize = 26;
  document.documentElement.style.fontSize = baseFontSize + 'px';
  document.getElementById('zoomValueDisplay').innerText = Math.round((baseFontSize / 16) * 100) + '%';
}

function setLang(lang) {
  currentLang = lang;
  renderStaticContent(); 

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
  
  renderCandles(); 
  updateGalleryVisibility('motherGallery'); 
  updateGalleryVisibility('fatherGallery');
}

function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  if (menu) menu.classList.toggle('active');
}

function createSparks() {
  document.querySelectorAll('.c-sparks-wrap').forEach(wrap => {
    if (wrap.children.length > 0) return; 
    
    const sparksCount = 12; 
    for (let i = 0; i < sparksCount; i++) {
      const spark = document.createElement('div');
      spark.className = 'c-spark';
      spark.style.left = Math.random() * 100 + '%';
      spark.style.top = Math.random() * 100 + '%';
      
      const size = Math.random() * 1 + 1.5;
      spark.style.width = size + 'px';
      spark.style.height = size + 'px';
      spark.style.boxShadow = `0 0 ${size * 2}px ${size/2}px rgba(255, 215, 0, 0.5)`;
      spark.style.animation = `floatSpark ${12 + Math.random() * 12}s infinite ${Math.random() * 5}s linear`;
      wrap.appendChild(spark);
    }
  });
}

// ==========================================
// 4. АДМИН-ПАНЕЛЬ И НАСТРОЙКИ
// ==========================================
function promptAdmin() {
  document.getElementById('adminAuthModal').classList.add('active');
  document.getElementById('adminPwdInput').value = '';
  document.getElementById('adminPwdInput').focus();
}

function checkAdminPassword() {
  const pwd = document.getElementById('adminPwdInput').value;
  if (btoa(pwd) === 'MTk3OA==') {
    document.getElementById('adminAuthModal').classList.remove('active');
    document.getElementById('adminPanel').style.display = 'flex';
    if (!document.body.classList.contains('admin-mode')) toggleAdmin(); 
    showToast(currentLang === 'ua' ? 'Режим редактора увімкнено!' : 'Режим редактора включен!');
  } else {
    const errorEl = document.getElementById('adminPwdError');
    if (errorEl) errorEl.style.display = 'block';
  }
}

function toggleAdmin() {
  document.body.classList.toggle('admin-mode');
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
          <img id="${item.id}" src="${item.id}.webp" alt="Фото" loading="lazy">
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
  const showMoreWrapper = document.getElementById(galleryId === 'motherGallery' ? 'showMoreGalleryWrapper' : 'showMoreGalleryWrapperFather');
  const showMoreBtn = document.getElementById(galleryId === 'motherGallery' ? 'showMoreGalleryBtn' : 'showMoreGalleryBtnFather');

  items.forEach((item, index) => item.style.display = (!isGalleryExpanded[galleryId] && index >= MAX_VISIBLE_GALLERY) ? 'none' : '');

  if (items.length > MAX_VISIBLE_GALLERY) {
    if (showMoreWrapper) showMoreWrapper.style.display = 'block';
    if (showMoreBtn) showMoreBtn.innerHTML = isGalleryExpanded[galleryId] ? (currentLang === 'ua' ? '<span class="editable-text" data-ru="Сховати фото" data-ua="Сховати фото">Сховати фото</span>' : '<span class="editable-text" data-ru="Скрыть фото" data-ua="Сховати фото">Скрыть фото</span>') : (currentLang === 'ua' ? `<span class="editable-text" data-ru="Показати ще" data-ua="Показати ще">Показати ще (${items.length - MAX_VISIBLE_GALLERY})</span>` : `<span class="editable-text" data-ru="Показать еще" data-ua="Показати ще">Показать еще (${items.length - MAX_VISIBLE_GALLERY})</span>`);
  } else if (showMoreWrapper) showMoreWrapper.style.display = 'none';
}

function toggleGalleryExpand(galleryId) { isGalleryExpanded[galleryId] = !isGalleryExpanded[galleryId]; updateGalleryVisibility(galleryId); }
function triggerUpload(imgId) { currentUploadId = imgId; document.getElementById('file-uploader').click(); }

function deleteGalleryPhoto(btn) { 
  customConfirm(currentLang === 'ua' ? 'Видалити це photo?' : 'Удалить это фото?', () => { 
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
  wrap.innerHTML = `
    <div class="gallery-item" onclick="openLightbox(this)">
      <img id="${newId}" src="https://images.unsplash.com/photo-1506869640319-fea1a278e0db?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Фото" loading="lazy">
      <button class="move-photo-btn move-photo-left" onclick="moveGalleryPhoto(this, -1); event.stopPropagation();" data-title-ru="Сдвинуть влево" data-title-ua="Зсунути ліворуч" title="${currentLang === 'ua' ? 'Зсунути ліворуч' : 'Сдвинуть влево'}">&#10094;</button>
      <button class="move-photo-btn move-photo-right" onclick="moveGalleryPhoto(this, 1); event.stopPropagation();" data-title-ru="Сдвинуть вправо" data-title-ua="Зсунути праворуч" title="${currentLang === 'ua' ? 'Зсунути праворуч' : 'Сдвинуть вправо'}">&#10095;</button>
      <button class="edit-photo-btn" onclick="triggerUpload('${newId}'); event.stopPropagation();">📷 Загрузить</button>
      <button class="delete-photo-btn" onclick="deleteGalleryPhoto(this); event.stopPropagation();" data-title-ru="Удалить" data-title-ua="Видалити" title="${currentLang === 'ua' ? 'Видалити' : 'Удалить'}">🗑️</button>
    </div>
    <div class="gallery-caption editable-text" contenteditable="true" data-ru="" data-ua=""></div>
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
  lb.classList.add('active'); document.body.style.overflow = 'hidden';
}

function nextImage(e) { if(e) e.stopPropagation(); if(currentGalleryImages.length <= 1) return; currentGalleryIndex = (currentGalleryIndex + 1) % currentGalleryImages.length; document.getElementById('lightbox-img').src = currentGalleryImages[currentGalleryIndex]; }
function prevImage(e) { if(e) e.stopPropagation(); if(currentGalleryImages.length <= 1) return; currentGalleryIndex = (currentGalleryIndex - 1 + currentGalleryImages.length) % currentGalleryImages.length; document.getElementById('lightbox-img').src = currentGalleryImages[currentGalleryIndex]; }
function closeLightbox() { document.getElementById('lightbox').classList.remove('active'); if (!document.querySelector('.bio-modal.active')) document.body.style.overflow = 'auto'; }


