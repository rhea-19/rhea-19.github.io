const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{ if(entry.isIntersecting){ entry.target.classList.add('visible'); io.unobserve(entry.target); } });
  },{threshold:0.08,rootMargin:'0px 0px -30px 0px'});
  reveals.forEach(el=>io.observe(el));
  document.documentElement.classList.add('reveal-ready');
}
const bar=document.getElementById('progressBar');
const updateProgress=()=>{const h=document.documentElement;const max=h.scrollHeight-h.clientHeight;bar.style.width=(max>0?(h.scrollTop/max)*100:0)+'%';};
window.addEventListener('scroll',updateProgress,{passive:true});updateProgress();
window.addEventListener('resize',updateProgress);
document.addEventListener('toggle',updateProgress,true);

const header = document.querySelector('.nav');
const menuButton = document.querySelector('.menu-toggle');
const mobileLayout = window.matchMedia('(max-width: 850px)');
const setMenuOpen = (open) => {
  header.classList.toggle('menu-open', open);
  menuButton.setAttribute('aria-expanded', String(open));
};
menuButton.addEventListener('click', () => {
  setMenuOpen(menuButton.getAttribute('aria-expanded') !== 'true');
});
header.addEventListener('click', (event) => {
  const link = event.target.closest('a[href^="#"]');
  if (!link || !mobileLayout.matches || !header.classList.contains('menu-open')) return;
  setMenuOpen(false);
  const target = document.querySelector(link.getAttribute('href'));
  if (target) {
    target.setAttribute('tabindex', '-1');
    target.focus({preventScroll: true});
    target.addEventListener('blur', () => target.removeAttribute('tabindex'), {once: true});
  }
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && header.classList.contains('menu-open')) {
    setMenuOpen(false);
    menuButton.focus();
  }
});
document.addEventListener('click', (event) => {
  if (!header.contains(event.target)) setMenuOpen(false);
});
header.addEventListener('focusout', (event) => {
  if (!header.contains(event.relatedTarget)) setMenuOpen(false);
});
mobileLayout.addEventListener('change', () => setMenuOpen(false));
header.classList.add('menu-ready');
menuButton.hidden = false;

const filterBar = document.querySelector('.project-filter-bar');
const filterButtons = filterBar.querySelectorAll('[data-filter]');
const projectGroups = document.querySelectorAll('#project-groups .project-group');
const projectCount = filterBar.querySelector('.project-count');
filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const category = button.dataset.filter;
    let count = 0;
    filterButtons.forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
    projectGroups.forEach((group) => {
      group.hidden = category !== 'all' && group.dataset.category !== category;
      if (!group.hidden) {
        count += group.querySelectorAll('.tech-card').length;
        group.querySelectorAll('.reveal').forEach((card) => card.classList.add('visible'));
      }
    });
    projectCount.textContent = category === 'all'
      ? `Showing all ${count} additional projects`
      : `Showing ${count} projects · ${button.textContent.trim()}`;
    updateProgress();
  });
});
filterBar.hidden = false;
