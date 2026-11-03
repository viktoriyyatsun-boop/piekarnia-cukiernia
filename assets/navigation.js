document.getElementById('year').textContent=new Date().getFullYear();
const toggle=document.getElementById('menu-toggle');
const nav=document.getElementById('side-menu');
const mobileMenu=window.matchMedia('(max-width:900px)');
let desktopCollapsed=false;
try{desktopCollapsed=localStorage.getItem('zakalec-menu-collapsed')==='true';}catch{}
function setMenu(open){
 if(mobileMenu.matches){nav.classList.toggle('open',open);document.body.classList.remove('menu-collapsed');}
 else{desktopCollapsed=!open;document.body.classList.toggle('menu-collapsed',!open);nav.classList.remove('open');try{localStorage.setItem('zakalec-menu-collapsed',String(!open));}catch{}}
 toggle.setAttribute('aria-expanded',String(open));
 toggle.setAttribute('aria-label',open?'Zwiń menu':'Rozwiń menu');
 toggle.textContent=open?'✕ Menu':'☰ Menu';
}
toggle.addEventListener('click',()=>setMenu(toggle.getAttribute('aria-expanded')!=='true'));
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{if(mobileMenu.matches)setMenu(false);}));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&toggle.getAttribute('aria-expanded')==='true'){setMenu(false);toggle.focus();}});
mobileMenu.addEventListener('change',()=>setMenu(mobileMenu.matches?false:!desktopCollapsed));
setMenu(mobileMenu.matches?false:!desktopCollapsed);
