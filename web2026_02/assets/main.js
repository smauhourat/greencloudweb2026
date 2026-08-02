// Nav shadow on scroll
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 8);
onScroll(); window.addEventListener('scroll', onScroll, { passive:true });

// Reveal on scroll — gated on html.js so content is never trapped invisible
// if JS fails. A timeout fallback reveals everything in case IO misses.
document.documentElement.classList.add('js');
(function(){
  const slides = [...document.querySelectorAll('#hero-slider .hero-slide')];
  const dots = [...document.querySelectorAll('#hero-slider .hero-dots button')];
  let idx = 0, timer;
  function go(n){
    slides[idx].classList.remove('active'); dots[idx].classList.remove('on');
    idx = (n + slides.length) % slides.length;
    slides[idx].classList.add('active'); dots[idx].classList.add('on');
  }
  function next(){ go(idx + 1); }
  function restart(){ clearInterval(timer); timer = setInterval(next, 6000); }
  dots.forEach((d,i)=>d.addEventListener('click', ()=>{ go(i); restart(); }));
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
