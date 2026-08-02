// Nav shadow on scroll
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 8);
onScroll(); window.addEventListener('scroll', onScroll, { passive:true });

// Reveal on scroll — gated on html.js so content is never trapped invisible
// if JS fails. A timeout fallback reveals everything in case IO misses.
document.documentElement.classList.add('js');
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
