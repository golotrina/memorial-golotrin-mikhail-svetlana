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
let hasUnsavedChanges = false; // Тот самый "замок" от случайного закрытия

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
  toast.innerText = text;
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 10);
  setTimeout(() => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 400); }, 3000);
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
  const shareTitle = currentLang === 'ua' 
    ? "Цифровий Меморіал родини Голотріних" 
    : "Цифровой Мемориал семьи Голотриных";
    
  const shareText = currentLang === 'ua' 
    ? "Світла пам'ять та історія родини Голотріних, дбайливо збережена для майбутніх поколінь." 
    : "Светлая память и история семьи Голотриных, бережно сохранена для будущих поколений.";
    
  if (navigator.share) {
    navigator.share({ 
      title: shareTitle, 
      text: shareText,
      url: window.location.href 
    });
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
  const activeModal = document.querySelector('.bio-modal.active');
  if (activeModal) {
    activeModal.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  }
}

// ==========================================
// 3. УПРАВЛЕНИЕ ИНТЕРФЕЙСОМ И МОБИЛЬНОЕ МЕНЮ
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

function changeZoom(step) {
  if (step === 0) baseFontSize = 16; else baseFontSize += step; 
  if (baseFontSize < 14) baseFontSize = 14; if (baseFontSize > 26) baseFontSize = 26;
  document.documentElement.style.fontSize = baseFontSize + 'px';
  document.getElementById('zoomValueDisplay').innerText = Math.round((baseFontSize / 16) * 100) + '%';
}

function setLang(lang) {
  currentLang = lang;
  
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

// === ГЕНЕРАТОР РОССЫПИ ИСКР ===
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
// 4. АДМИН-ПАНЕЛЬ И СКАЧИВАНИЕ
// ==========================================
function promptAdmin() {
  document.getElementById('adminAuthModal').classList.add('active');
  document.getElementById('adminPwdInput').value = '';
  document.getElementById('adminPwdInput').focus();
}

function checkAdminPassword() {
  const pwd = document.getElementById('adminPwdInput').value;
  // Скрываем прямую видимость пароля
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
    // ПУНКТ 2: Убираем редактирование текста внутри кнопок и ссылок навигации.
    // ДОБАВЛЕНО: Исключение для '.accordion-header', чтобы аккордеон можно было редактировать.
    if ((el.closest('button') && !el.closest('.accordion-header')) || el.closest('a')) {
      el.contentEditable = "false";
    } else {
      el.contentEditable = isAdm ? "true" : "false";
    }
  });
}


function downloadSiteData() {
  hasUnsavedChanges = false; // Снимаем замок при сохранении

  document.querySelectorAll('.editable-text[contenteditable="true"]').forEach(el => {
    if (el.hasAttribute('data-ru') && el.hasAttribute('data-ua')) {
      el.setAttribute(`data-${currentLang}`, el.innerText.trim());
    }
  });

  const updatedGalleries = { fatherGallery: [], motherGallery: [] };
  ['fatherGallery', 'motherGallery'].forEach(galId => {
    document.querySelectorAll(`#${galId} .gallery-item-wrap`).forEach(wrap => {
      const img = wrap.querySelector('img[id]');
      const cap = wrap.querySelector('.gallery-caption');
      if (img) updatedGalleries[galId].push({ id: img.id, ru: cap.getAttribute('data-ru') || '', ua: cap.getAttribute('data-ua') || '' });
    });
  });

  const dataJsContent = `// === БАЗА ДАННЫХ СВЕЧЕЙ ===\nwindow.DB_CANDLES = ${JSON.stringify(window.DB_CANDLES, null, 2)};\n\n// === БАЗА ДАННЫХ ФОТОГАЛЕРЕЙ И ПОДПИСЕЙ ===\nwindow.DB_GALLERIES = ${JSON.stringify(updatedGalleries, null, 2)};`;

  const clonedDoc = document.documentElement.cloneNode(true);
  const clonedBody = clonedDoc.querySelector('body');
  
  clonedBody.classList.remove('admin-mode');
  clonedBody.style.overflow = 'auto'; 

  const clonedAdminPanel = clonedDoc.querySelector('#adminPanel');
  if (clonedAdminPanel) clonedAdminPanel.style.display = 'none'; 

  clonedDoc.querySelectorAll('.active').forEach(el => el.classList.remove('active'));
  clonedDoc.querySelectorAll('[contenteditable]').forEach(el => el.setAttribute('contenteditable', 'false'));
  
  const candlesGrid = clonedDoc.querySelector('#candlesGrid');
  if (candlesGrid) candlesGrid.innerHTML = '';
  
  clonedDoc.querySelectorAll('.c-sparks-wrap').forEach(wrap => wrap.innerHTML = '');

  ['fatherGallery', 'motherGallery'].forEach(galId => {
    const gal = clonedDoc.querySelector(`#${galId}`);
    if (gal) gal.innerHTML = '';
  });

  clonedDoc.querySelectorAll('img[id]').forEach(img => {
    const srcAttr = img.getAttribute('src');
    if (srcAttr && srcAttr.startsWith('blob:')) {
      img.setAttribute('src', img.id + '.webp'); 
    }
  });

  triggerFileDownload("data.js", dataJsContent, "application/javascript");
  setTimeout(() => triggerFileDownload("index.html", "<!DOCTYPE html>\n" + clonedDoc.outerHTML, "text/html"), 500);
  showToast(currentLang === 'ua' ? 'Файли збережено! Завантажте їх на Netlify.' : 'Файлы сохранены! Загрузите их на Netlify.');
}

function triggerFileDownload(filename, content, mimeType) {
  const link = document.createElement("a");
  link.href = URL.createObjectURL(new Blob([content], { type: mimeType }));
  link.download = filename;
  document.body.appendChild(link); link.click(); document.body.removeChild(link);
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
    if (showMoreBtn) showMoreBtn.innerHTML = isGalleryExpanded[galleryId] ? (currentLang === 'ua' ? '<span class="editable-text" data-ru="Скрыть фото" data-ua="Сховати фото">Сховати фото</span>' : '<span class="editable-text" data-ru="Скрыть фото" data-ua="Сховати фото">Скрыть фото</span>') : (currentLang === 'ua' ? `<span class="editable-text" data-ru="Показать еще" data-ua="Показати ще">Показати ще (${items.length - MAX_VISIBLE_GALLERY})</span>` : `<span class="editable-text" data-ru="Показать еще" data-ua="Показати ще">Показать еще (${items.length - MAX_VISIBLE_GALLERY})</span>`);
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
    hasUnsavedChanges = true; // Включаем защиту от закрытия
  }); 
}

function moveGalleryPhoto(btn, direction) { 
  const itemWrap = btn.closest('.gallery-item-wrap'); 
  const gallery = itemWrap.parentElement; 
  if (direction === -1 && itemWrap.previousElementSibling) gallery.insertBefore(itemWrap, itemWrap.previousElementSibling); 
  else if (direction === 1 && itemWrap.nextElementSibling) gallery.insertBefore(itemWrap.nextElementSibling, itemWrap); 
  hasUnsavedChanges = true; // Включаем защиту от закрытия
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
  hasUnsavedChanges = true; // Включаем защиту от закрытия
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
// 6. СВЕЧИ И РИТУАЛ (Начало)
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
    
    // Определяем текст в зависимости от языка
    const cName = currentLang === 'ua' ? (c.name_ua || c.name_ru || c.name) : (c.name_ru || c.name_ua || c.name);
    const cMessage = currentLang === 'ua' ? (c.message_ua || c.message_ru || c.message) : (c.message_ru || c.message_ua || c.message);

    // ПУНКТ 3: Логика отображения кнопки "Читать далее..."
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
  
  // ПУНКТ 2: Защита от спама (удаляем ссылки и теги)
  const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+)/gi;
  nameInp = nameInp.replace(urlRegex, '').replace(/</g, "&lt;").replace(/>/g, "&gt;").trim();
  msgInp = msgInp.replace(urlRegex, '').replace(/</g, "&lt;").replace(/>/g, "&gt;").trim();

  const typeRad = document.querySelector('input[name="cType"]:checked').value;  
  const sourceLang = currentLang === 'ua' ? 'uk' : 'ru';
  const targetLang = currentLang === 'ua' ? 'ru' : 'uk';
  const isAdmin = document.body.classList.contains('admin-mode');

  let isEditing = editCandleIndex !== null;
  let c = isEditing ? window.DB_CANDLES[editCandleIndex] : null;

  // Проверяем, изменился ли текст при редактировании
  let nameChanged = true;
  let msgChanged = true;

  if (isEditing) {
    let oldNameCur = currentLang === 'ua' ? (c.name_ua || c.name_ru || c.name) : (c.name_ru || c.name_ua || c.name);
    let oldMsgCur = currentLang === 'ua' ? (c.message_ua || c.message_ru || c.message || '') : (c.message_ru || c.message_ua || c.message || '');
    nameChanged = nameInp !== oldNameCur;
    msgChanged = msgInp !== oldMsgCur;
  }

  let doAutoTranslate = true;

  // Если мы редактируем, текст изменился, и в другой версии уже есть свой перевод
  if (isEditing && isAdmin && (nameChanged || msgChanged)) {
     let targetHasText = currentLang === 'ua' ? (c.name_ru || c.message_ru) : (c.name_ua || c.message_ua);
     if (targetHasText) {
         let msg = currentLang === 'ua'
             ? 'Оновити переклад іншої версії автоматично?\n(ОК - перекласти заново, Скасувати - зберегти ваші минулі ручні правки)'
             : 'Обновить перевод другой версии автоматически?\n(ОК - перевести заново, Отмена - сохранить ваши прошлые ручные правки)';
         // Используем системное окно подтверждения, чтобы остановить процесс и спросить
         doAutoTranslate = confirm(msg);
     }
  }

  // Базовые значения для сохранения
  let final_name_ru = nameInp;
  let final_name_ua = nameInp;
  let final_msg_ru = msgInp;
  let final_msg_ua = msgInp;

  if (isEditing) {
      // Берем старые значения как базу
      final_name_ru = c.name_ru || nameInp;
      final_name_ua = c.name_ua || nameInp;
      final_msg_ru = c.message_ru || msgInp;
      final_msg_ua = c.message_ua || msgInp;

      // Обновляем только текущий активный язык
      if (currentLang === 'ua') { final_name_ua = nameInp; final_msg_ua = msgInp; }
      else { final_name_ru = nameInp; final_msg_ru = msgInp; }
  }

  // Запускаем автоперевод только если пользователь разрешил (или это новая свеча)
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
        hasUnsavedChanges = true; // Защита от закрытия вкладки
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
    headers: {
        'Accept': 'application/json'
    }
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
// 7. МОДАЛКИ (БИОГРАФИЯ И АККОРДЕОН)
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
// 8. QR-КОД 
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
  const url = document.getElementById('qrUrlInput').value.trim();
  if (!url) { showToast(currentLang === 'ua' ? 'Введіть посилання!' : 'Введите ссылку!'); return; }
  
  const qrImg = document.getElementById('qrCodeImg');
  
  // Добавляем текст ссылки под QR-код
  const urlDisplay = document.getElementById('qrUrlDisplay');
  if (urlDisplay) {
    urlDisplay.innerText = url;
  }
  
  qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(url)}&color=322108&bgcolor=ffffff&t=${Date.now()}`;
  qrImg.onload = () => { 
    document.getElementById('qrPrintArea').style.display = 'flex'; 
    document.getElementById('printBtnWrap').style.display = 'flex'; 
  };
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
// 9. ИНИЦИАЛИЗАЦИЯ И ЗАЩИТА ОКНА
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  initGalleries(); renderCandles();
  createSparks(); 
  
  const savedTheme = localStorage.getItem('memorial_theme');
  if (savedTheme === 'dark') toggleTheme(); 
  setLang('ua');

  // Вход в админку по секретной ссылке (например, site.com/?admin=pwd)
  const urlParams = new URLSearchParams(window.location.search);
  const adminParam = urlParams.get('admin');
  // Хешируем полученный из ссылки параметр перед сравнением
  if (adminParam && btoa(adminParam) === 'MTk3OA==') {
    document.getElementById('adminPanel').style.display = 'flex';
    if (!document.body.classList.contains('admin-mode')) {
      toggleAdmin();
    }
    showToast(currentLang === 'ua' ? 'Режим редактора увімкнено через посилання!' : 'Режим редактора включен по ссылке!');
  }


  const pwdInput = document.getElementById('adminPwdInput');
  if (pwdInput) {
    pwdInput.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') checkAdminPassword();
    });
  }

  // ЗАЩИТА ОТ СЛУЧАЙНОГО ЗАКРЫТИЯ ОКНА
  window.addEventListener('beforeunload', function (e) {
    if (hasUnsavedChanges) {
      const confirmationMessage = 'У вас есть несохраненные изменения. Точно хотите выйти?';
      e.returnValue = confirmationMessage;
      return confirmationMessage;
    }
  });

  // ОБРАБОТЧИК УМНОГО АВТОПЕРЕВОДА ПРИ РЕДАКТИРОВАНИИ
  document.addEventListener('focusout', function(e) {
    if (e.target.classList.contains('editable-text') && e.target.getAttribute('contenteditable') === 'true' && document.body.classList.contains('admin-mode')) {
      const el = e.target;
      const text = el.innerText.trim();
      
      if (el.hasAttribute('data-ru') && el.hasAttribute('data-ua')) {
        const oldText = el.getAttribute(`data-${currentLang}`);
        
        if (text === oldText) return; 
        
        hasUnsavedChanges = true;
        el.setAttribute(`data-${currentLang}`, text); 

        if (!text) { 
          el.setAttribute(currentLang === 'ua' ? 'data-ru' : 'data-ua', ''); 
          return; 
        }

        if (el.classList.contains('no-auto-translate')) return;

        const targetAttr = currentLang === 'ua' ? 'data-ru' : 'data-ua';
        const existingTargetText = el.getAttribute(targetAttr);

        const doTranslation = async () => {
          try {
            const sourceLang = currentLang === 'ua' ? 'uk' : 'ru';
            const targetLang = currentLang === 'ua' ? 'ru' : 'uk';
            
            const res = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`);
            const data = await res.json();
            if (data && data[0]) { 
              const translatedText = data[0].map(item => item[0]).join('');
              el.setAttribute(targetAttr, translatedText); 
              showToast(currentLang === 'ua' ? '✨ Перекладено автоматично!' : '✨ Переведено автоматически!'); 
            }
          } catch (err) { console.error(err); }
        };

        if (existingTargetText && existingTargetText.trim() !== '') {
           customConfirm(
             currentLang === 'ua' 
               ? 'Оновити переклад іншої версії автоматично? (Скасуйте, щоб зберегти ручні правки)' 
               : 'Обновить перевод другой версии автоматически? (Отмените, чтобы сохранить ручные правки)',
             doTranslation
           );
        } else {
           doTranslation();
        }
      }
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

            customConfirm(currentLang === 'ua' ? 'Фото оптимізовано! Завантажити .webp файл?' : 'Фото оптимизировано! Скачать .webp файл?', () => {
              const link = document.createElement("a");
              link.href = blobUrl;
              link.download = currentUploadId + ".webp";
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
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
});
