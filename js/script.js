'use strict';
document.documentElement.classList.add('has-js');
const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#route-nav');
const narrow = window.matchMedia('(max-width: 760px)');
menu.hidden = false;
function closeMenu(returnFocus = false) {
  menu.setAttribute('aria-expanded', 'false');
  nav.classList.remove('is-open');
  if (returnFocus) menu.focus();
}
menu.addEventListener('click', () => {
  const opening = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(opening));
  nav.classList.toggle('is-open', opening);
});
nav.addEventListener('click', event => {
  const link = event.target.closest('a');
  if (!link) return;
  closeMenu();
  if (narrow.matches) {
    const target = document.querySelector(link.hash);
    if (target) {
      target.setAttribute('tabindex', '-1');
      target.focus({preventScroll: true});
      target.addEventListener('blur', () => target.removeAttribute('tabindex'), {once: true});
    }
  }
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') closeMenu(true);
});
document.addEventListener('click', event => {
  if (!nav.contains(event.target) && !menu.contains(event.target)) closeMenu();
});
document.addEventListener('focusin', event => {
  if (!nav.contains(event.target) && !menu.contains(event.target)) closeMenu();
});
narrow.addEventListener('change', () => closeMenu());
if ('IntersectionObserver' in window) {
  const sections = [...document.querySelectorAll('main section[id]')];
  const links = [...nav.querySelectorAll('a:not(.nav-contact)')];
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) links.forEach(link => {
        const active = link.hash === '#' + entry.target.id;
        link.classList.toggle('active', active);
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, {rootMargin: '-10% 0px -65% 0px', threshold: 0});
  sections.forEach(section => observer.observe(section));
}
const copy = document.querySelector('.copy-phone');
const status = document.querySelector('#copy-status');
const manual = document.querySelector('#manual-copy');
copy.hidden = false;
copy.addEventListener('click', async () => {
  try {
    if (!navigator.clipboard || !window.isSecureContext) throw new Error('Clipboard unavailable');
    await navigator.clipboard.writeText('956 716 414');
    status.textContent = 'Teléfono copiado: 956 716 414';
    manual.hidden = true;
  } catch {
    manual.hidden = false;
    const input = document.querySelector('#phone-value');
    input.focus();
    input.select();
    status.textContent = 'Copia el número seleccionado con el menú de tu dispositivo o con Ctrl+C / Cmd+C.';
  }
});
document.querySelector('#year').textContent = new Date().getFullYear();
