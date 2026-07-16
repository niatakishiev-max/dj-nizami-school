document.documentElement.classList.add('js');
const directions = document.querySelectorAll('.direction');
const setActiveDirection = (item) => {
  directions.forEach((entry) => {
    const isCurrent = entry === item;
    entry.classList.toggle('is-active', isCurrent);
    entry.querySelector('.direction-toggle').setAttribute('aria-expanded', String(isCurrent));
  });
};

const openDirection = (item) => {
  item.classList.add('is-active');
  item.querySelector('.direction-toggle').setAttribute('aria-expanded', 'true');
};

directions.forEach((item) => {
  const button = item.querySelector('.direction-toggle');
  button.addEventListener('click', () => {
    if (mobileDirectionsQuery.matches) {
      const isOpen = item.classList.toggle('is-active');
      button.setAttribute('aria-expanded', String(isOpen));
      return;
    }
    setActiveDirection(item);
  });
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    item.addEventListener('mouseenter', () => setActiveDirection(item));
  }
});

const mobileDirections = document.querySelectorAll('.direction');
const mobileDirectionsQuery = window.matchMedia('(max-width: 800px)');
let mobileDirectionsObserver;

const updateMobileDirectionsObserver = () => {
  mobileDirectionsObserver?.disconnect();
  if (!mobileDirectionsQuery.matches) return;

  mobileDirectionsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) openDirection(entry.target);
    });
  }, { rootMargin: '-30% 0px -35% 0px', threshold: 0.05 });

  mobileDirections.forEach((item) => mobileDirectionsObserver.observe(item));
};

updateMobileDirectionsObserver();
mobileDirectionsQuery.addEventListener('change', updateMobileDirectionsObserver);
const faqItems = document.querySelectorAll('.faq details');
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  faqItems.forEach((item) => item.addEventListener('mouseenter', () => {
    faqItems.forEach((entry) => { entry.open = entry === item; });
  }));
}
const devices = {
  technics: ['Виниловые проигрыватели', 'Technics SL-1200', 'Классический проигрыватель. Золотой стандарт для виниловых диджеев.'],
  'vestax-deck': ['Виниловые проигрыватели', 'Vestax PDX-2000', 'Проигрыватель, специально разработанный для тёрнтейблизма. Оснащён Ultra Pitch, который даёт максимальный контроль над пластинкой.'],
  z2: ['Микшер и DVS', 'Traktor Kontrol Z2', 'Микшер для практики классического DJ-подхода, цифрового управления библиотекой и работы с эффектами, метками и лупами.'],
  pmc: ['DJ-микшер', 'Vestax PMC-06', 'Классический скретч-микшер, на котором можно познакомиться с историей и базовыми приёмами работы с фейдером.']
};
const dialog = document.querySelector('#device-dialog');
const dialogClose = dialog.querySelector('.dialog-close');
document.querySelectorAll('.equipment-card').forEach((card) => card.addEventListener('click', () => {
  const [kicker, title, text] = devices[card.dataset.device];
  document.querySelector('#dialog-kicker').textContent = kicker;
  document.querySelector('#dialog-title').textContent = title;
  document.querySelector('#dialog-text').textContent = text;
  dialog.showModal();
}));
dialogClose.addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});

const revealItems = document.querySelectorAll('.section, .hero-portrait, .equipment-card');
const observer = new IntersectionObserver((entries) => { entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }); }, { threshold: 0.12 });
revealItems.forEach((item) => observer.observe(item));

const backToTop = document.querySelector('.back-to-top');
window.addEventListener('scroll', () => backToTop.classList.toggle('is-visible', window.scrollY > 500), { passive: true });
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
