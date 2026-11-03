(() => {
 const show=document.querySelector('.home-show');
 const scenes=[...show.querySelectorAll('.home-scene')];
 const dots=[...show.querySelectorAll('[data-scene]')];
 const pause=document.getElementById('pause-show');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 let current=0,paused=reduced.matches,timer,startX;
 function schedule(){clearTimeout(timer);if(!paused&&!document.hidden)timer=setTimeout(()=>select(current+1,false),7000);}
 function select(index,announce=true){current=(index+scenes.length)%scenes.length;scenes.forEach((scene,i)=>{scene.hidden=i!==current;});dots.forEach((dot,i)=>dot.setAttribute('aria-pressed',String(i===current)));if(announce)show.querySelector('.scene-announcement').textContent=scenes[current].getAttribute('aria-label');schedule();}
 function setPaused(value){paused=value;show.classList.toggle('paused',paused);pause.setAttribute('aria-pressed',String(paused));pause.textContent=paused?'Odtwórz':'Pauza';pause.setAttribute('aria-label',paused?'Odtwórz animację':'Wstrzymaj animację');schedule();}
 document.getElementById('previous-scene').addEventListener('click',()=>select(current-1));
 document.getElementById('next-scene').addEventListener('click',()=>select(current+1));
 dots.forEach(dot=>dot.addEventListener('click',()=>select(Number(dot.dataset.scene))));
 pause.addEventListener('click',()=>setPaused(!paused));
 show.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();select(current+(e.key==='ArrowRight'?1:-1));}});
 show.addEventListener('pointerdown',e=>{if(e.pointerType==='touch')startX=e.clientX;});
 show.addEventListener('pointerup',e=>{if(startX!==undefined&&e.pointerType==='touch'){const delta=e.clientX-startX;if(Math.abs(delta)>60)select(current+(delta<0?1:-1));startX=undefined;}});
 show.addEventListener('pointercancel',()=>{startX=undefined;});
 show.addEventListener('focusin',e=>{if(e.target!==pause)setPaused(true);});
 document.addEventListener('visibilitychange',schedule);
 reduced.addEventListener('change',()=>setPaused(reduced.matches));
 setPaused(paused);
})();
