const screens = {
  intro: document.getElementById("intro"),
  reveal: document.getElementById("reveal"),
  moments: document.getElementById("moments"),
  cake: document.getElementById("cake"),
  final: document.getElementById("final")
};

const gift = document.getElementById("gift");
const openGift = document.getElementById("openGift");
const nextToMoments = document.getElementById("nextToMoments");
const nextToCake = document.getElementById("nextToCake");
const wishBtn = document.getElementById("wishBtn");
const wishText = document.getElementById("wishText");
const flame = document.getElementById("flame");
const replay = document.getElementById("replay");

function show(name) {
  Object.values(screens).forEach(s => s.classList.remove("active"));
  screens[name].classList.add("active");
}

function burstHearts(count = 22) {
  const layer = document.getElementById("hearts");
  for (let i = 0; i < count; i++) {
    const el = document.createElement("div");
    el.className = "heart";
    el.textContent = Math.random() > .25 ? "♥" : "♡";
    el.style.left = Math.random() * 100 + "vw";
    el.style.fontSize = (12 + Math.random() * 25) + "px";
    el.style.animationDuration = (4 + Math.random() * 5) + "s";
    el.style.animationDelay = (Math.random() * .8) + "s";
    layer.appendChild(el);
    setTimeout(() => el.remove(), 10000);
  }
}

function makeSparkles() {
  const layer = document.getElementById("sparkles");
  for (let i = 0; i < 65; i++) {
    const el = document.createElement("i");
    el.className = "spark";
    el.style.left = Math.random() * 100 + "vw";
    el.style.top = Math.random() * 100 + "vh";
    el.style.animationDelay = (Math.random() * 3) + "s";
    el.style.animationDuration = (1.2 + Math.random() * 2.5) + "s";
    layer.appendChild(el);
  }
}

function openSurprise() {
  burstHearts(35);
  gift.animate([
    { transform: "scale(1)" },
    { transform: "scale(1.12) rotate(-3deg)" },
    { transform: "scale(.95) rotate(3deg)" },
    { transform: "scale(1)" }
  ], { duration: 650, easing: "ease-out" });
  setTimeout(() => show("reveal"), 550);
}

gift.addEventListener("click", openSurprise);
openGift.addEventListener("click", openSurprise);

nextToMoments.addEventListener("click", () => {
  burstHearts(20);
  show("moments");
});

nextToCake.addEventListener("click", () => {
  burstHearts(18);
  show("cake");
});

wishBtn.addEventListener("click", () => {
  flame.classList.add("off");
  wishText.textContent = "Wish made… now let the magic begin. ❤️";
  wishBtn.textContent = "Celebrate! 🎉";
  wishBtn.disabled = true;
  burstHearts(45);

  setTimeout(() => {
    show("final");
    startFireworks();
  }, 1100);
});

replay.addEventListener("click", () => {
  flame.classList.remove("off");
  wishText.textContent = "Close your eyes and make a wish…";
  wishBtn.textContent = "Blow the Candle ✨";
  wishBtn.disabled = false;
  show("intro");
});

makeSparkles();
setInterval(() => burstHearts(2), 1800);

/* Fireworks */
function startFireworks() {
  const canvas = document.getElementById("fireworks");
  const ctx = canvas.getContext("2d");
  let w = canvas.width = window.innerWidth * devicePixelRatio;
  let h = canvas.height = window.innerHeight * devicePixelRatio;
  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight + "px";

  const particles = [];
  const rockets = [];

  function resize() {
    w = canvas.width = window.innerWidth * devicePixelRatio;
    h = canvas.height = window.innerHeight * devicePixelRatio;
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
  }
  window.addEventListener("resize", resize);

  function launch() {
    rockets.push({
      x: Math.random() * w,
      y: h + 10,
      targetY: h * (.18 + Math.random() * .45),
      speed: 10 + Math.random() * 5,
      hue: Math.random() * 360
    });
  }

  function explode(r) {
    for (let i = 0; i < 75; i++) {
      const a = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 6;
      particles.push({
        x: r.x, y: r.y,
        vx: Math.cos(a) * speed,
        vy: Math.sin(a) * speed,
        life: 1,
        hue: r.hue
      });
    }
  }

  function frame() {
    ctx.fillStyle = "rgba(16,3,9,.18)";
    ctx.fillRect(0, 0, w, h);

    if (Math.random() < .08) launch();

    for (let i = rockets.length - 1; i >= 0; i--) {
      const r = rockets[i];
      r.y -= r.speed;
      ctx.fillStyle = `hsla(${r.hue},100%,80%,.9)`;
      ctx.beginPath();
      ctx.arc(r.x, r.y, 2.5 * devicePixelRatio, 0, Math.PI * 2);
      ctx.fill();
      if (r.y <= r.targetY) {
        explode(r);
        rockets.splice(i, 1);
      }
    }

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += .07;
      p.life -= .012;
      ctx.fillStyle = `hsla(${p.hue},100%,75%,${Math.max(p.life,0)})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 1.7 * devicePixelRatio, 0, Math.PI * 2);
      ctx.fill();
      if (p.life <= 0) particles.splice(i, 1);
    }

    requestAnimationFrame(frame);
  }
  frame();

  // Immediate opening sequence
  for (let i = 0; i < 5; i++) setTimeout(launch, i * 300);
}

document.addEventListener("keydown", e => {
  if (e.key === "Enter" && screens.intro.classList.contains("active")) openSurprise();
});
