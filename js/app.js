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

function shareSite() {
  const shareTitle = currentLang === 'ua' ? "Цифровий Меморіал родини Голотріних" : "Цифровой Мемориал семьи Голотриных";
  if (navigator.share) {
    navigator.share({ title: shareTitle, url: window.location.href });
  } else {
    navigator.clipboard.writeText(window.location.href);
    showToast(currentLang === 'ua' ? 'Посилання скопійовано!' : 'Ссылка скопирована!');
  }
}

function scrollToTop() { 
  const activeModal = document.querySelector('.bio-modal.active');
  if (activeModal) activeModal.scrollTo({ top: 0, behavior: 'smooth' });
  else window.scrollTo({ top: 0, behavior: 'smooth' }); 
}

// ==========================================
// 3. УМНЫЙ РЕНДЕРИНГ (С ПОДДЕРЖКОЙ РЕДАКТИРОВАНИЯ)
// ==========================================
function renderStaticContent() {
  if (!window.SITE_CONTENT) return;
  const content = window.SITE_CONTENT;
  const isUa = currentLang === 'ua';

  const setEdit = (id, text) => {
    const el = document.getElementById(id);
    if (el && text) { el.innerText = text; el.classList.add('editable-text'); }
  };

  setEdit('hero-title', isUa ? content.hero.titleUa : content.hero.titleRu);
  setEdit('hero-subtitle', isUa ? content.hero.subtitleUa : content.hero.subtitleRu);
  setEdit('hero-quote', isUa ? content.hero.quoteUa : content.hero.quoteRu);

  setEdit('father-name', isUa ? content.parents.father.nameUa : content.parents.father.nameRu);
  setEdit('father-dates', isUa ? content.parents.father.datesUa : content.parents.father.datesRu);
  setEdit('father-bio-preview', isUa ? content.parents.father.bioUa : content.parents.father.bioRu);

  setEdit('mother-name', isUa ? content.parents.mother.nameUa : content.parents.mother.nameRu);
  setEdit('mother-dates', isUa ? content.parents.mother.datesUa : content.parents.mother.datesRu);
  setEdit('mother-bio-preview', isUa ? content.parents.mother.bioUa : content.parents.mother.bioRu);

  // Защищенный вызов отрисовки
  if (typeof renderTimeline === 'function') renderTimeline();
  if (typeof renderBioModal === 'function') {
    renderBioModal('fbio', content.fatherBio);
    renderBioModal('mbio', content.motherBio);
  }
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
      ? `<div class="timeline-epitaph editable-text" style="white-space: pre-wrap;">${descText}</div>`
      : `<p class="editable-text" style="white-space: pre-wrap;">${descText}</p>`;

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

function renderBioModal(prefix, data) {
  if (!data) return;
  const isUa = currentLang === 'ua';

  const nameEl = document.getElementById(`${prefix}-name`);
  if (nameEl) nameEl.innerText = isUa ? data.nameUa : data.nameRu;
  
  const datesEl = document.getElementById(`${prefix}-dates`);
  if (datesEl) datesEl.innerText = isUa ? data.datesUa : data.datesRu;
  
  const quoteEl = document.getElementById(`${prefix}-personal-quote`);
  if (quoteEl) { quoteEl.innerText = isUa ? data.personalQuoteUa : data.personalQuoteRu; quoteEl.classList.add('editable-text'); }

  const introEl = document.getElementById(`${prefix}-intro`);
  if (introEl) { introEl.innerText = isUa ? data.introUa : data.introRu; introEl.classList.add('editable-text'); }

  const accContainer = document.getElementById(`${prefix}-accordion`);
  if (accContainer) {
    accContainer.innerHTML = '';
    if (data.accordion) {
      data.accordion.forEach((item, idx) => {
        const itemEl = document.createElement('div');
        itemEl.className = 'accordion-item';
        const paragraphs = isUa ? item.paragraphsUa : item.paragraphsRu;
        const pHTML = paragraphs ? paragraphs.map(p => `<p class="editable-text" data-index="${idx}">${p}</p>`).join('') : '';
        
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

  const qContainer = document.getElementById(`${prefix}-quotes`);
  if (qContainer) {
    qContainer.innerHTML = '';
    if (data.quotes) {
      data.quotes.forEach(q => {
        const qEl = document.createElement('div');
        qEl.className = 'quote-card';
        qEl.innerHTML = `
          <span class="quote-icon">“</span>
          <p class="quote-text editable-text">${isUa ? q.textUa : q.textRu}</p>
          <p class="quote-author editable-text">${isUa ? q.authorUa : q.authorRu}</p>
        `;
        qContainer.appendChild(qEl);
      });
    }
  }
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
      evEl.className = 'timeline-item fade-up visible';
      
      let pHTML = paragraphs ? paragraphs.map((p, pIdx) => `<p class="editable-text" data-epoch-idx="${idx}" data-p-idx="${pIdx}" style="white-space: pre-wrap;">${p}</p>`).join('') : '';
      
      evEl.innerHTML = `
        <span class="timeline-date editable-text" data-epoch-date-idx="${idx}">${dateText}</span>
        <div class="timeline-content">
          <h4 class="editable-text" data-epoch-title-idx="${idx}">${titleText}</h4>
          ${pHTML}
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
  
  // Безопасный рендеринг контента из базы данных
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
  if (typeof updateGalleryVisibility === 'function') {
    updateGalleryVisibility('motherGallery'); 
    updateGalleryVisibility('fatherGallery');
  }
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

// ==========================================
// 6. СВЕЧИ И РИТУАЛ ПАМЯТИ
// ==========================================
function renderCandles() {
  const grid = document.getElementById('candlesGrid'); 
  if (!grid) return;
  grid.innerHTML = '';
  
  const MAX_VISIBLE = 4; 
  window.DB_CANDLES.forEach((c, index) => {
    if (!isCandlesExpanded && index >= MAX_VISIBLE) return;
    const typeInfo = candleData[c.type] || candleData['classic']; 
    const typeName = currentLang === 'ru' ? typeInfo.nameRu : typeInfo.nameUa;
    const dateObj = new Date(c.timestamp); 
    const dateStr = dateObj.toLocaleDateString('ru-RU') + ', ' + dateObj.toLocaleTimeString('ru-RU', {hour: '2-digit', minute:'2-digit'});
    
    const cName = currentLang === 'ua' ? (c.name_ua || c.name_ru || c.name) : (c.name_ru || c.name_ua || c.name);
    const cMessage = currentLang === 'ua' ? (c.message_ua || c.message_ru || c.message) : (c.message_ru || c.message_ua || c.message);

    let isLongMsg = cMessage && (cMessage.length > 150 || (cMessage.match(/\n/g) || []).length >= 3);
    let msgHtml = '';
    if (cMessage) {
      msgHtml = `<div class="candle-msg-text ${isLongMsg ? 'collapsible' : ''}">« ${cMessage} »</div>`;
      if (isLongMsg) {
        msgHtml += `<button class="candle-expand-btn" onclick="this.previousElementSibling.classList.toggle('expanded'); this.innerText = this.previousElementSibling.classList.contains('expanded') ? (currentLang === 'ua' ? 'Сховати' : 'Скрыть') : (currentLang === 'ua' ? 'Читати далі...' : 'Читать далее...')">${currentLang === 'ua' ? 'Читати далі...' : 'Читать далее...'}</button>`;
      }
    }

    const card = document.createElement('div'); 
    card.className = 'candle-card fade-up visible';
    card.innerHTML = `
      <div class="candle-admin-actions">
        <button onclick="editCandle(${index})" data-title-ru="Редактировать" data-title-ua="Редагувати" title="${currentLang === 'ua' ? 'Редагувати' : 'Редактировать'}">✏️</button>
        <button onclick="deleteCandle(${index})" data-title-ru="Удалить" data-title-ua="Видалити" title="${currentLang === 'ua' ? 'Видалити' : 'Удалить'}">🗑️</button>
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
  
  if (window.DB_CANDLES.length > MAX_VISIBLE) {
    showMoreWrapper.style.display = 'block';
    showMoreBtn.innerText = isCandlesExpanded ? (currentLang === 'ua' ? 'Сховати' : 'Скрыть') : (currentLang === 'ua' ? `Показати ще (${window.DB_CANDLES.length - MAX_VISIBLE})` : `Показать еще (${window.DB_CANDLES.length - MAX_VISIBLE})`);
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
    btnWrapper.style.display = 'block'; 
    editCandleIndex = null;
    document.getElementById('candleForm').reset();
  }
}

async function handleCandleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  
  let nameInp = document.getElementById('cName').value.trim();
  let msgInp = document.getElementById('cMessage').value.trim();
  
  const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+)/gi;
  nameInp = nameInp.replace(urlRegex, '').replace(/</g, "&lt;").replace(/>/g, "&gt;").trim();
  msgInp = msgInp.replace(urlRegex, '').replace(/</g, "&lt;").replace(/>/g, "&gt;").trim();

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

  let doAutoTranslate = true;

  if (isEditing && isAdmin && (nameChanged || msgChanged)) {
     let targetHasText = currentLang === 'ua' ? (c.name_ru || c.message_ru) : (c.name_ua || c.message_ua);
     if (targetHasText) {
         let msg = currentLang === 'ua'
             ? 'Оновити переклад іншої версії автоматично?\n(ОК - перекласти заново, Скасувати - зберегти ваші минулі ручні правки)'
             : 'Обновить перевод другой версии автоматически?\n(ОК - перевести заново, Отмена - сохранить ваши прошлые ручные правки)';
         doAutoTranslate = confirm(msg);
     }
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
  }

  if (doAutoTranslate && (nameChanged || msgChanged)) {
      try {
          if (nameInp && nameChanged) {
              const resName = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURIComponent(nameInp)}`);
              const dataName = await resName.json();
              if (dataName && dataName[0]) {
                  let translatedName = dataName[0].map(item => item[0]).join('');
                  if (currentLang === 'ua') final_name_ru = translatedName; else final_name_ua = translatedName;
              }
          }
          if (msgInp && msgChanged) {
              const resMsg = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURIComponent(msgInp)}`);
              const dataMsg = await resMsg.json();
              if (dataMsg && dataMsg[0]) {
                  let translatedMsg = dataMsg[0].map(item => item[0]).join('');
                  if (currentLang === 'ua') final_msg_ru = translatedMsg; else final_msg_ua = translatedMsg;
              }
          }
      } catch (err) { console.error("Ошибка перевода свечи:", err); }
  }

  if (isEditing) {
    window.DB_CANDLES[editCandleIndex].name_ru = final_name_ru;
    window.DB_CANDLES[editCandleIndex].name_ua = final_name_ua;
    window.DB_CANDLES[editCandleIndex].message_ru = final_msg_ru;
    window.DB_CANDLES[editCandleIndex].message_ua = final_msg_ua;
    window.DB_CANDLES[editCandleIndex].type = typeRad;
    renderCandles(); toggleCandleForm();

    if (isAdmin) {
        hasUnsavedChanges = true; 
        showToast(currentLang === 'ua' ? 'Зміни збережено. Не забудьте "Зберегти зміни" в адмінці!' : 'Изменения сохранены. Нажмите "Сохранить изменения" в админке!');
    } else {
        showToast(currentLang === 'ua' ? 'Зміни збережено!' : 'Изменения сохранены!');
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
    timestamp: Date.now()
  };

  const successAction = () => {
    window.DB_CANDLES.unshift(newCandle);
    renderCandles();
    toggleCandleForm();

    if (isAdmin) {
        hasUnsavedChanges = true;
        showToast(currentLang === 'ua' ? 'Свічку додано! Збережіть зміни в адмінці.' : 'Свеча добавлена! Сохраните изменения в админке.');
    } else {
        showToast(currentLang === 'ua' ? 'Свічку запалено! Дякуємо за світлу пам\'ять.' : 'Свеча зажжена! Спасибо за светлую память.');
    }
  };

  const formData = new FormData(form);
  fetch('https://formspree.io/f/xpqnezyg', {
    method: 'POST',
    body: formData,
    headers: { 'Accept': 'application/json' }
  }).then(successAction).catch(err => {
    console.warn("Ошибка Formspree, но свеча отрисована локально:", err);
    successAction();
  });
}

function deleteCandle(index) { 
  customConfirm(currentLang === 'ua' ? 'Видалити цю свічку?' : 'Удалить эту свечу?', () => { 
    window.DB_CANDLES.splice(index, 1); 
    renderCandles(); 
    if (document.body.classList.contains('admin-mode')) hasUnsavedChanges = true;
  }); 
}

function editCandle(index) { 
  let c = window.DB_CANDLES[index]; 
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
function openBio(id) { document.getElementById(id).classList.add('active'); document.body.style.overflow = 'hidden'; }
function closeBio(id) { document.getElementById(id).classList.remove('active'); document.body.style.overflow = 'auto'; }
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
}

function closeQrModal() { document.getElementById('qrModal').classList.remove('active'); }

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
    colorDark : "#322108", colorLight : "#ffffff",
    correctLevel : QRCode.CorrectLevel.H
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
// 9. БЕЗОПАСНЫЙ СБОР ВСЕХ ДАННЫХ И ИНИЦИАЛИЗАЦИЯ
// ==========================================
async function downloadSiteData() {
  if (window.SITE_CONTENT) {
    const isUa = currentLang === 'ua';
    const langSuffix = isUa ? 'Ua' : 'Ru';
    
    window.SITE_CONTENT.hero['title' + langSuffix] = document.getElementById('hero-title').innerText.trim();
    window.SITE_CONTENT.hero['subtitle' + langSuffix] = document.getElementById('hero-subtitle').innerText.trim();
    window.SITE_CONTENT.hero['quote' + langSuffix] = document.getElementById('hero-quote').innerText.trim();

    window.SITE_CONTENT.parents.father['name' + langSuffix] = document.getElementById('father-name').innerText.trim();
    window.SITE_CONTENT.parents.father['dates' + langSuffix] = document.getElementById('father-dates').innerText.trim();
    window.SITE_CONTENT.parents.father['bio' + langSuffix] = document.getElementById('father-bio-preview').innerText.trim();

    window.SITE_CONTENT.parents.mother['name' + langSuffix] = document.getElementById('mother-name').innerText.trim();
    window.SITE_CONTENT.parents.mother['dates' + langSuffix] = document.getElementById('mother-dates').innerText.trim();
    window.SITE_CONTENT.parents.mother['bio' + langSuffix] = document.getElementById('mother-bio-preview').innerText.trim();

    ['fbio', 'mbio'].forEach(prefix => {
      const key = prefix === 'fbio' ? 'fatherBio' : 'motherBio';
      const dataObj = window.SITE_CONTENT[key];
      
      dataObj['personalQuote' + langSuffix] = document.getElementById(`${prefix}-personal-quote`).innerText.trim();
      dataObj['intro' + langSuffix] = document.getElementById(`${prefix}-intro`).innerText.trim();

      const accItems = document.querySelectorAll(`#${prefix}-accordion .accordion-item`);
      accItems.forEach((item, idx) => {
        if (!dataObj.accordion[idx]) return;
        dataObj.accordion[idx]['title' + langSuffix] = item.querySelector('.accordion-header span').innerText.trim();
        
        const pEls = item.querySelectorAll('.accordion-inner p');
        dataObj.accordion[idx]['paragraphs' + langSuffix] = Array.from(pEls).map(p => p.innerText.trim());
      });

      const qCards = document.querySelectorAll(`#${prefix}-quotes .quote-card`);
      qCards.forEach((card, idx) => {
        if (!dataObj.quotes[idx]) return;
        dataObj.quotes[idx]['text' + langSuffix] = card.querySelector('.quote-text').innerText.trim();
        dataObj.quotes[idx]['author' + langSuffix] = card.querySelector('.quote-author').innerText.trim();
      });
    });

    const epochContainer = document.getElementById('epoch-timeline-container');
    if (epochContainer && window.SITE_CONTENT.epochData) {
      const epData = window.SITE_CONTENT.epochData;
      const epItems = epochContainer.querySelectorAll('.timeline-item');
      epItems.forEach((item, idx) => {
        if (!epData.events[idx]) return;
        epData.events[idx]['date' + langSuffix] = item.querySelector('.timeline-date').innerText.trim();
        epData.events[idx]['title' + langSuffix] = item.querySelector('.timeline-content h4').innerText.trim();
        
        const pEls = item.querySelectorAll('.timeline-content p');
        epData.events[idx]['paragraphs' + langSuffix] = Array.from(pEls).map(p => p.innerText.trim());
      });
    }
  }

  const updatedGalleries = { fatherGallery: [], motherGallery: [] };
  ['fatherGallery', 'motherGallery'].forEach(galId => {
    document.querySelectorAll(`#${galId} .gallery-item-wrap`).forEach(wrap => {
      const img = wrap.querySelector('img[id]');
      const cap = wrap.querySelector('.gallery-caption');
      if (img) updatedGalleries[galId].push({ 
        id: img.id, 
        ru: cap.getAttribute('data-ru') || '', 
        ua: cap.getAttribute('data-ua') || '' 
      });
    });
  });

  const dataJsContent = `// === БАЗА ТЕКСТОВОГО КОНТЕНТА ===\nwindow.SITE_CONTENT = ${JSON.stringify(window.SITE_CONTENT, null, 2)};\n\n// === БАЗА ДАННЫХ СВЕЧЕЙ ===\nwindow.DB_CANDLES = ${JSON.stringify(window.DB_CANDLES, null, 2)};\n\n// === БАЗА ДАННЫХ ФОТОГАЛЕРЕЙ И ПОДПИСЕЙ ===\nwindow.DB_GALLERIES = ${JSON.stringify(updatedGalleries, null, 2)};`;

  let ghOwner = localStorage.getItem('gh_owner');
  let ghRepo = localStorage.getItem('gh_repo');
  let ghToken = localStorage.getItem('gh_token');

  if (!ghOwner || !ghRepo || !ghToken) {
    ghOwner = prompt("Настройка GitHub (Шаг 1 из 3)\nВведите ваш логин на GitHub:", ghOwner || "");
    if (!ghOwner) return;
    ghRepo = prompt("Настройка GitHub (Шаг 2 из 3)\nВведите название репозитория:", ghRepo || "");
    if (!ghRepo) return;
    ghToken = prompt("Настройка GitHub (Шаг 3 из 3)\nВведите ваш Personal Access Token:", ghToken || "");
    if (!ghToken) return;

    localStorage.setItem('gh_owner', ghOwner.trim());
    localStorage.setItem('gh_repo', ghRepo.trim());
    localStorage.setItem('gh_token', ghToken.trim());
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

// ГЛАВНЫЙ ЗАПУСК АППЛИКАЦИИ: Полная защита от рассинхронизации событий браузера
function initializeMemorialApp() {
  initGalleries(); 
  renderCandles();
  createSparks(); 
  
  const savedTheme = localStorage.getItem('memorial_theme');
  if (savedTheme === 'dark') toggleTheme(); 
  setLang('ua'); // Принудительно разложит все тексты при старте

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && e.target.classList.contains('editable-text') && e.target.getAttribute('contenteditable') === 'true') {
      e.preventDefault(); 
      document.execCommand('insertText', false, '\n'); 
      hasUnsavedChanges = true; 
    }
  });

  document.addEventListener('paste', function(e) {
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

  document.getElementById('file-uploader').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file && currentUploadId) {
      const reader = new FileReader();
      reader.onload = function(event) {
        const img = new Image();
        img.onload = function() {
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
              uploadImageToGitHub(blob, currentUploadId + '.webp');
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

// Умная проверка состояния документа: если поезд ушел, прыгаем в него на ходу
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeMemorialApp);
} else {
  initializeMemorialApp();
}

// ==========================================
// 10. ЗАГРУЗКА ИЗОБРАЖЕНИЙ НА GITHUB API
// ==========================================
async function uploadImageToGitHub(blob, filename) {
  let ghOwner = localStorage.getItem('gh_owner');
  let ghRepo = localStorage.getItem('gh_repo');
  let ghToken = localStorage.getItem('gh_token');

  if (!ghOwner || !ghRepo || !ghToken) {
    ghOwner = prompt("Настройка GitHub (Шаг 1 из 3)\nВведите ваш логин на GitHub:", ghOwner || "");
    if (!ghOwner) return;
    ghRepo = prompt("Настройка GitHub (Шаг 2 из 3)\nВведите название репозитория:", ghRepo || "");
    if (!ghRepo) return;
    ghToken = prompt("Настройка GitHub (Шаг 3 из 3)\nВведите ваш Personal Access Token:", ghToken || "");
    if (!ghToken) return;
    
    localStorage.setItem('gh_owner', ghOwner.trim());
    localStorage.setItem('gh_repo', ghRepo.trim());
    localStorage.setItem('gh_token', ghToken.trim());
  }

  showToast(currentLang === 'ua' ? 'Відправка фото на GitHub...' : 'Отправка фото на GitHub...');

  const reader = new FileReader();
  reader.readAsDataURL(blob);
  reader.onloadend = async function() {
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
      } catch(e) {}

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
