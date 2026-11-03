document.getElementById('year').textContent=new Date().getFullYear();
const toggle=document.getElementById('menu-toggle');
const nav=document.getElementById('side-menu');
function setMenu(open){nav.classList.toggle('open',open);toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Zamknij menu':'Otwórz menu');}
toggle.addEventListener('click',()=>setMenu(toggle.getAttribute('aria-expanded')!=='true'));
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&toggle.getAttribute('aria-expanded')==='true'){setMenu(false);toggle.focus();}});
window.matchMedia('(max-width:900px)').addEventListener('change',()=>setMenu(false));
