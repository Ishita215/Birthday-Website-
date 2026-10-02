const surprise = document.getElementById("surprise");
const main = document.getElementById("main");
const openBtn = document.getElementById("openBtn");
const letterBtn = document.getElementById("letterBtn");
const closeLetter = document.getElementById("closeLetter");
const modal = document.getElementById("letterModal");
const heartLayer = document.getElementById("heart-layer");
const envelope = document.getElementById("envelope");

function popHearts(count=24){
  for(let i=0;i<count;i++){
    const h=document.createElement("span");
    h.className="floating-heart";
    h.textContent=Math.random()>.5?"♥":"♡";
    h.style.left=(Math.random()*100)+"vw";
    h.style.fontSize=(12+Math.random()*25)+"px";
    h.style.animationDuration=(4+Math.random()*5)+"s";
    h.style.animationDelay=(Math.random()*1.8)+"s";
    heartLayer.appendChild(h);
    setTimeout(()=>h.remove(),9000);
  }
}
function tinyChime(){
  try{
    const C=window.AudioContext||window.webkitAudioContext;
    const ctx=new C();
    [523.25,659.25,783.99].forEach((freq,i)=>{
      const o=ctx.createOscillator(), g=ctx.createGain();
      o.frequency.value=freq; o.type="sine";
      o.connect(g); g.connect(ctx.destination);
      g.gain.setValueAtTime(0,ctx.currentTime+i*.09);
      g.gain.linearRampToValueAtTime(.055,ctx.currentTime+i*.09+.03);
      g.gain.exponentialRampToValueAtTime(.001,ctx.currentTime+i*.09+.45);
      o.start(ctx.currentTime+i*.09); o.stop(ctx.currentTime+i*.09+.5);
    });
  }catch(e){}
}
openBtn.addEventListener("click",()=>{
  tinyChime();
  popHearts(35);
  surprise.style.transition="opacity .8s ease, transform .8s ease";
  surprise.style.opacity="0";
  surprise.style.transform="scale(1.04)";
  setTimeout(()=>{
    surprise.classList.add("hidden");
    main.classList.remove("hidden");
    window.scrollTo(0,0);
  },800);
});
function openLetter(){
  modal.classList.add("open");
  modal.setAttribute("aria-hidden","false");
  document.body.classList.add("locked");
  popHearts(18);
  envelope?.classList.add("opened");
}
function closeLetterFn(){
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden","true");
  document.body.classList.remove("locked");
}
letterBtn.addEventListener("click",openLetter);
envelope.addEventListener("click",openLetter);
closeLetter.addEventListener("click",closeLetterFn);
modal.querySelector(".modal-backdrop").addEventListener("click",closeLetterFn);
document.addEventListener("keydown",e=>{if(e.key==="Escape") closeLetterFn()});

// Soft ambient hearts after the surprise is opened.
setInterval(()=>{
  if(!main.classList.contains("hidden") && !document.hidden) popHearts(1);
},4500);
