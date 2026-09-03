const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries)=>{
  entries.forEach((entry)=>{ if(entry.isIntersecting){ entry.target.classList.add('visible'); io.unobserve(entry.target); } });
},{threshold:0.08,rootMargin:'0px 0px -30px 0px'});
reveals.forEach(el=>io.observe(el));
const bar=document.getElementById('progressBar');
const updateProgress=()=>{const h=document.documentElement;const max=h.scrollHeight-h.clientHeight;bar.style.width=(max>0?(h.scrollTop/max)*100:0)+'%';};
window.addEventListener('scroll',updateProgress,{passive:true});updateProgress();
