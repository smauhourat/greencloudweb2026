// Nav shadow on scroll
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 8);
onScroll(); window.addEventListener('scroll', onScroll, { passive:true });

// Mobile nav burger
const navBurger = document.getElementById('nav-burger');
const navLinks = document.getElementById('nav-links');
if (navBurger && navLinks) {
  navBurger.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navBurger.setAttribute('aria-expanded', String(open));
  });
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navBurger.setAttribute('aria-expanded', 'false');
  }));
}

// Reveal on scroll — gated on html.js so content is never trapped invisible
// if JS fails. A timeout fallback reveals everything in case IO misses.
document.documentElement.classList.add('js');
(function(){
  const hero = document.getElementById('hero-slider');
  if (!hero) return;
  const slides = [...document.querySelectorAll('#hero-slider .hero-slide')];
  const dots = [...document.querySelectorAll('#hero-slider .hero-dots button')];
  // Slides 2+ ship as data-src so only the LCP slide's image fetches on
  // load; each later slide loads one dwell cycle ahead of being shown.
  function ensureLoaded(i){
    const el = slides[i] && slides[i].querySelector('image-slot[data-src]');
    if (el) { el.setAttribute('src', el.getAttribute('data-src')); el.removeAttribute('data-src'); }
  }
  ensureLoaded(1);
  let idx = 0, timer;
  function go(n){
    slides[idx].classList.remove('active'); dots[idx].classList.remove('on');
    idx = (n + slides.length) % slides.length;
    slides[idx].classList.add('active'); dots[idx].classList.add('on');
    ensureLoaded(idx);
    ensureLoaded((idx + 1) % slides.length);
  }
  function next(){ go(idx + 1); }
  function restart(){ clearInterval(timer); timer = setInterval(next, 6000); }
  dots.forEach((d,i)=>d.addEventListener('click', ()=>{ go(i); restart(); }));

  let touchX = 0, touchY = 0, swiping = false;
  hero.addEventListener('touchstart', (e)=>{
    touchX = e.touches[0].clientX; touchY = e.touches[0].clientY; swiping = true;
  }, { passive:true });
  hero.addEventListener('touchmove', (e)=>{
    if (!swiping) return;
    const dx = e.touches[0].clientX - touchX, dy = e.touches[0].clientY - touchY;
    if (Math.abs(dx) > Math.abs(dy)) e.preventDefault();
  }, { passive:false });
  hero.addEventListener('touchend', (e)=>{
    if (!swiping) return;
    swiping = false;
    const dx = e.changedTouches[0].clientX - touchX, dy = e.changedTouches[0].clientY - touchY;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
      go(idx + (dx < 0 ? 1 : -1));
      restart();
    }
  });

  restart();
})();
const reveals = [...document.querySelectorAll('.reveal')];
const showAll = () => reveals.forEach(el=>el.classList.add('in'));
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold:0.12, rootMargin:'0px 0px -8% 0px' });
reveals.forEach((el,i)=>{
  el.style.transitionDelay = Math.min(i%3*70, 140) + 'ms';
  io.observe(el);
});
setTimeout(showAll, 1600);
