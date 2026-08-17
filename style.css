const screens = Object.fromEntries(
  ["intro","reveal","balloons","moments","cake","letter","final"]
    .map(id => [id, document.getElementById(id)])
);

const $ = id => document.getElementById(id);

function show(name){
  Object.values(screens).forEach(s => s && s.classList.remove("active"));
  screens[name]?.classList.add("active");
  window.scrollTo(0,0);
}

function burstHearts(count=20){
  const layer=$("hearts");
  for(let i=0;i<count;i++){
    const el=document.createElement("div");
    el.className="heart";
    el.textContent=Math.random()>.2?"♥":"♡";
    el.style.left=Math.random()*100+"vw";
    el.style.fontSize=12+Math.random()*26+"px";
    el.style.animationDuration=4+Math.random()*5+"s";
    el.style.animationDelay=Math.random()*.7+"s";
    layer.appendChild(el);
    setTimeout(()=>el.remove(),10000);
  }
}

function confetti(count=90){
  for(let i=0;i<count;i++){
    const el=document.createElement("i");
    el.className="confetti-piece";
    el.style.left=Math.random()*100+"vw";
    el.style.setProperty("--x",(Math.random()*240-120)+"px");
    el.style.animationDuration=(2.5+Math.random()*3)+"s";
    el.style.animationDelay=Math.random()*.5+"s";
    el.style.transform=`rotate(${Math.random()*360}deg)`;
    el.style.borderRadius=Math.random()>.5?"50%":"2px";
    document.body.appendChild(el);
    setTimeout(()=>el.remove(),6000);
  }
}

function makeSparkles(){
  const layer=$("sparkles");
  for(let i=0;i<70;i++){
    const el=document.createElement("i");
    el.className="spark";
    el.style.left=Math.random()*100+"vw";
    el.style.top=Math.random()*100+"vh";
    el.style.animationDelay=Math.random()*3+"s";
    el.style.animationDuration=1.2+Math.random()*2.5+"s";
    layer.appendChild(el);
  }
}

function createBalloons(){
  const layer=$("balloonLayer");
  const palette=[
    ["#ff7096","#b52e55"],["#ffb0c7","#d34c72"],["#f4c96b","#c88a31"],
    ["#b98cff","#7041a9"],["#74d9d1","#238e87"],["#ff8a67","#b83e2d"]
  ];
  for(let i=0;i<18;i++){
    const b=document.createElement("div");
    b.className="balloon";
    const p=palette[i%palette.length];
    b.style.left=(2+Math.random()*94)+"%";
    b.style.width=(48+Math.random()*35)+"px";
    b.style.height=(65+Math.random()*42)+"px";
    b.style.background=`radial-gradient(circle at 30% 25%,rgba(255,255,255,.65),transparent 12%),linear-gradient(145deg,${p[0]},${p[1]})`;
    b.style.color=p[1];
    b.style.animationDuration=(8+Math.random()*9)+"s";
    b.style.animationDelay=(-Math.random()*8)+"s";
    b.addEventListener("click",()=>{
      if(b.classList.contains("pop")) return;
      b.classList.add("pop");
      popped++;
      $("popCount").textContent=popped;
      burstHearts(4);
      confetti(10);
      if(popped>=8){
        $("skipBalloons").textContent="You did it! Continue ❤️";
        $("skipBalloons").animate(
          [{transform:"scale(1)"},{transform:"scale(1.06)"},{transform:"scale(1)"}],
          {duration:500}
        );
      }
    });
    layer.appendChild(b);
  }
}
let popped=0;

function openSurprise(){
  const gift=$("gift");
  gift.classList.add("opening");
  burstHearts(35);
  confetti(45);
  setTimeout(()=>show("reveal"),650);
}

$("gift").addEventListener("click",openSurprise);
$("openGift").addEventListener("click",openSurprise);

$("nextToBalloons").addEventListener("click",()=>{
  burstHearts(15);
  createBalloons();
  show("balloons");
});

$("skipBalloons").addEventListener("click",()=>{
  burstHearts(18);
  show("moments");
});

$("nextToCake").addEventListener("click",()=>{
  burstHearts(16);
  show("cake");
});

$("wishBtn").addEventListener("click",()=>{
  $("flame").classList.add("off");
  $("wishText").textContent="Wish made… now let the magic begin. ❤️";
  $("wishBtn").textContent="Continue to a little letter 💌";
  $("wishBtn").disabled=true;
  $("cake").querySelector(".cake-area").classList.add("wish-made");
  burstHearts(35);
  confetti(110);
  setTimeout(()=>show("letter"),1200);
});

const letterText =
"On your birthday, I just want you to know how special you are. " +
"May every dream you carry find its way to you, and may your days be filled " +
"with laughter, peace, beautiful surprises and people who truly care about you. " +
"Keep smiling, keep shining, and never forget how wonderfully unique you are. ❤️";

let typed=false;
$("openLetter").addEventListener("click",()=>{
  if(typed) return;
  typed=true;
  $("envelope").classList.add("open");
  $("openLetter").textContent="A message just for you ❤️";
  const target=$("typedLetter");
  let i=0;
  const type=()=>{
    if(i<letterText.length){
      target.textContent+=letterText[i++];
      setTimeout(type,24);
    }else{
      $("toFinal").classList.add("show");
      burstHearts(15);
      petals();
    }
  };
  setTimeout(type,650);
});

$("toFinal").addEventListener("click",()=>{
  confetti(140);
  burstHearts(35);
  show("final");
  startFireworks();
});

function petals(){
  const layer=$("petals");
  for(let i=0;i<24;i++){
    const p=document.createElement("i");
    p.className="petal";
    p.style.left=Math.random()*100+"%";
    p.style.animationDuration=(5+Math.random()*6)+"s";
    p.style.animationDelay=Math.random()*3+"s";
    layer.appendChild(p);
    setTimeout(()=>p.remove(),12000);
  }
}

$("replay").addEventListener("click",()=>{
  popped=0;
  $("popCount").textContent="0";
  $("balloonLayer").innerHTML="";
  $("envelope").classList.remove("open");
  $("typedLetter").textContent="";
  $("openLetter").textContent="Open My Letter 💌";
  $("toFinal").classList.remove("show");
  $("flame").classList.remove("off");
  $("wishText").textContent="Close your eyes and make a wish…";
  $("wishBtn").textContent="Blow the Candle ✨";
  $("wishBtn").disabled=false;
  $("gift").classList.remove("opening");
  show("intro");
});

document.addEventListener("keydown",e=>{
  if(e.key==="Enter" && screens.intro.classList.contains("active")) openSurprise();
});

makeSparkles();
setInterval(()=>burstHearts(2),1800);

/* Cinematic 2D fireworks */
let fireworksStarted=false;
function startFireworks(){
  if(fireworksStarted) return;
  fireworksStarted=true;
  const canvas=$("fireworks"),ctx=canvas.getContext("2d");
  let dpr=Math.min(devicePixelRatio||1,2);
  const resize=()=>{
    canvas.width=innerWidth*dpr; canvas.height=innerHeight*dpr;
    canvas.style.width=innerWidth+"px"; canvas.style.height=innerHeight+"px";
    ctx.setTransform(dpr,0,0,dpr,0,0);
  };
  resize(); addEventListener("resize",resize);
  const rockets=[],particles=[];
  function launch(){
    rockets.push({x:Math.random()*innerWidth,y:innerHeight+10,
      target:innerHeight*(.14+Math.random()*.42),
      speed:7+Math.random()*5,hue:Math.random()*360});
  }
  function explode(r){
    for(let i=0;i<95;i++){
      const a=Math.random()*Math.PI*2,sp=1.5+Math.random()*6;
      particles.push({x:r.x,y:r.y,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp,
        life:1,hue:r.hue,size:1+Math.random()*2.5});
    }
    burstHearts(5);
  }
  function frame(){
    ctx.fillStyle="rgba(16,3,9,.2)";ctx.fillRect(0,0,innerWidth,innerHeight);
    if(Math.random()<.055)launch();
    for(let i=rockets.length-1;i>=0;i--){
      const r=rockets[i];r.y-=r.speed;
      ctx.fillStyle=`hsla(${r.hue},100%,85%,.9)`;
      ctx.beginPath();ctx.arc(r.x,r.y,2.3,0,Math.PI*2);ctx.fill();
      if(r.y<=r.target){explode(r);rockets.splice(i,1);}
    }
    for(let i=particles.length-1;i>=0;i--){
      const p=particles[i];p.x+=p.vx;p.y+=p.vy;p.vy+=.055;p.life-=.012;
      ctx.fillStyle=`hsla(${p.hue},100%,75%,${Math.max(p.life,0)})`;
      ctx.beginPath();ctx.arc(p.x,p.y,p.size,0,Math.PI*2);ctx.fill();
      if(p.life<=0)particles.splice(i,1);
    }
    requestAnimationFrame(frame);
  }
  for(let i=0;i<7;i++)setTimeout(launch,i*260);
  frame();
}
