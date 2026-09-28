const contactMessages = {
  demo: 'Olá! Quero conhecer o Leal Sistema e solicitar uma demonstração para minha loja.',
  quote: 'Olá! Quero um orçamento do Leal Sistema para minha loja.'
};

document.querySelectorAll('[data-contact]').forEach((link) => {
  const segmentMessages = {
    'Moda e vestuário': 'Tenho uma loja de roupas',
    'Supermercados': 'Tenho um supermercado',
    'Farmácias': 'Tenho uma farmácia',
    'Restaurantes': 'Tenho um restaurante',
    'Materiais de construção': 'Tenho uma loja de materiais de construção',
    'Lojas em geral': 'Tenho uma loja'
  };
  const message = link.dataset.contact === 'segment'
    ? 'Olá! ' + segmentMessages[link.dataset.segment] + ' e quero conhecer o Leal Sistema.'
    : contactMessages[link.dataset.contact];
  link.href = 'https://wa.me/5511977861991?text=' + encodeURIComponent(message);
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
});

const menuButton = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('#mobile-menu');

function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Abrir menu');
  mobileMenu.hidden = true;
}

menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  mobileMenu.hidden = !open;
});

mobileMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});
window.matchMedia('(min-width: 681px)').addEventListener('change', (event) => {
  if (event.matches) closeMenu();
});

const motionButton = document.querySelector('.motion-toggle');
const motionLabel = motionButton.querySelector('.motion-label');
const motionIcon = motionButton.querySelector('.motion-icon');
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
let savedMotion;
try { savedMotion = localStorage.getItem('leal-motion'); } catch {}
const requestedMotion = new URLSearchParams(location.search).get('motion');
let motionEnabled = requestedMotion === 'on' || (requestedMotion !== 'off' && (savedMotion === 'on' || (savedMotion !== 'off' && !motionPreference.matches)));

function applyMotion() {
  document.body.classList.toggle('motion-enabled', motionEnabled);
  document.body.classList.toggle('motion-paused', !motionEnabled);
  const label = motionEnabled ? 'Pausar animações' : 'Ativar animações';
  motionButton.setAttribute('aria-label', label);
  motionLabel.textContent = label;
  motionIcon.textContent = motionEnabled ? 'Ⅱ' : '▶';
}

applyMotion();
motionButton.addEventListener('click', () => {
  motionEnabled = !motionEnabled;
  try { localStorage.setItem('leal-motion', motionEnabled ? 'on' : 'off'); } catch {}
  applyMotion();
});

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('visible'));
}

document.querySelector('#year').textContent = String(new Date().getFullYear());
