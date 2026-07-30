const workspace = document.querySelector("#workspace");
const dockButtons = document.querySelectorAll("[data-toggle]");
const closeButtons = document.querySelectorAll("[data-close]");
const projectButtons = document.querySelectorAll("[data-project]");
const dialog = document.querySelector("#projectDialog");
const dialogTitle = document.querySelector("#dialogTitle");
const dialogContent = document.querySelector("#dialogContent");
const dialogClose = document.querySelector(".dialog-close");
const nextProject = document.querySelector("#nextProject");
const prevProject = document.querySelector("#prevProject");
const cursorTrail = document.querySelector("#cursorTrail");
const trailContext = cursorTrail.getContext("2d");

let isDragging = false;
let startX = 0;
let scrollStart = 0;
let audioContext;
let audioOutput;
const clickVolume = 0.75;
const trailPixels = [];
const trailColors = ["#ff62bd", "#98ff6d", "#69c4ff", "#ffe36d", "#ffffff"];
let lastTrailX = 0;
let lastTrailY = 0;
let lastTrailTime = 0;
const caseStudies = {
  "wlfi-app": {
    eyebrow: ">> WLFI APP CASE",
    pages: Array.from(
      { length: 18 },
      (_, index) => `./assets/projects/wlfi-case/page-${String(index + 1).padStart(2, "0")}.webp`
    ),
  },
  "gate-community": {
    eyebrow: ">> GATE.IO COMMUNITY CASE",
    pages: Array.from(
      { length: 14 },
      (_, index) => `./assets/projects/gate-community-case/page-${String(index + 1).padStart(2, "0")}.webp`
    ),
  },
  "web3-wallet": {
    eyebrow: ">> WEB3 WALLET CASE",
    pages: Array.from(
      { length: 16 },
      (_, index) => `./assets/projects/web3-wallet/page-${String(index + 1).padStart(2, "0")}.webp`
    ),
  },
  worldclaw: {
    eyebrow: ">> WORLDCLAW CASE",
    pages: Array.from(
      { length: 7 },
      (_, index) => `./assets/projects/worldclaw/page-${index + 1}.webp`
    ),
  },
  newsbreak: {
    eyebrow: ">> NEWSBREAK CASE",
    pages: Array.from(
      { length: 32 },
      (_, index) => `./assets/projects/newsbreak-case/page-${String(index + 1).padStart(2, "0")}.webp`
    ),
  },
};

function resizeTrailCanvas() {
  const ratio = window.devicePixelRatio || 1;
  cursorTrail.width = Math.floor(window.innerWidth * ratio);
  cursorTrail.height = Math.floor(window.innerHeight * ratio);
  cursorTrail.style.width = `${window.innerWidth}px`;
  cursorTrail.style.height = `${window.innerHeight}px`;
  trailContext.setTransform(ratio, 0, 0, ratio, 0, 0);
}

function addTrailBurst(x, y, intensity = 1) {
  const count = Math.round(5 + intensity * 8);

  for (let i = 0; i < count; i += 1) {
    trailPixels.push({
      x: x + (Math.random() - 0.5) * 18 * intensity,
      y: y + (Math.random() - 0.5) * 14 * intensity,
      vx: (Math.random() - 0.5) * 1.8 * intensity,
      vy: (Math.random() - 0.5) * 1.2 * intensity,
      width: 5 + Math.random() * 22 * intensity,
      height: 3 + Math.random() * 7,
      life: 18 + Math.random() * 20,
      maxLife: 38,
      color: trailColors[Math.floor(Math.random() * trailColors.length)],
    });
  }

  if (trailPixels.length > 220) {
    trailPixels.splice(0, trailPixels.length - 220);
  }
}

function drawTrail() {
  trailContext.clearRect(0, 0, window.innerWidth, window.innerHeight);

  for (let i = trailPixels.length - 1; i >= 0; i -= 1) {
    const pixel = trailPixels[i];
    pixel.x += pixel.vx;
    pixel.y += pixel.vy;
    pixel.life -= 1;

    if (pixel.life <= 0) {
      trailPixels.splice(i, 1);
      continue;
    }

    const alpha = Math.max(pixel.life / pixel.maxLife, 0);
    trailContext.globalAlpha = alpha;
    trailContext.fillStyle = pixel.color;
    trailContext.fillRect(
      Math.round(pixel.x),
      Math.round(pixel.y),
      Math.round(pixel.width),
      Math.round(pixel.height)
    );
  }

  trailContext.globalAlpha = 1;
  requestAnimationFrame(drawTrail);
}

function handleTrailPointer(event) {
  const now = performance.now();
  const dx = event.clientX - lastTrailX;
  const dy = event.clientY - lastTrailY;
  const distance = Math.hypot(dx, dy);
  const targetIsInteractive = Boolean(event.target.closest("button, a, .project, .window-bar"));
  const intensity = (targetIsInteractive ? 1.6 : 1) + (isDragging ? 1.1 : 0);

  if (distance > 8 || now - lastTrailTime > 45) {
    addTrailBurst(event.clientX, event.clientY, intensity);
    lastTrailX = event.clientX;
    lastTrailY = event.clientY;
    lastTrailTime = now;
  }
}

resizeTrailCanvas();
drawTrail();
window.addEventListener("resize", resizeTrailCanvas);
window.addEventListener("pointermove", handleTrailPointer);
window.addEventListener("pointerdown", (event) => addTrailBurst(event.clientX, event.clientY, 2.2));

function getAudioContext() {
  const AudioCtor = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtor) return null;

  if (!audioContext) {
    audioContext = new AudioCtor();
    const masterGain = audioContext.createGain();
    const compressor = audioContext.createDynamicsCompressor();

    masterGain.gain.value = 0.55;
    compressor.threshold.value = -18;
    compressor.knee.value = 8;
    compressor.ratio.value = 12;
    compressor.attack.value = 0.003;
    compressor.release.value = 0.08;

    masterGain.connect(compressor);
    compressor.connect(audioContext.destination);
    audioOutput = masterGain;
  }

  if (audioContext.state === "suspended") {
    audioContext.resume();
  }

  return audioContext;
}

function playClickSound(type = "click") {
  const context = getAudioContext();
  if (!context) return;

  const now = context.currentTime + 0.008;
  const oscillator = context.createOscillator();
  const gain = context.createGain();

  const settings = {
    click: [520, 740, 0.045, 0.035],
    open: [360, 690, 0.07, 0.045],
    close: [420, 180, 0.08, 0.04],
    love: [620, 960, 0.09, 0.055],
    project: [270, 520, 0.1, 0.05],
  }[type] || [520, 740, 0.045, 0.035];

  oscillator.type = "square";
  oscillator.frequency.setValueAtTime(settings[0], now);
  oscillator.frequency.exponentialRampToValueAtTime(settings[1], now + settings[2]);

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(Math.min(settings[3] * clickVolume, 0.16), now + 0.006);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + settings[2]);

  oscillator.connect(gain);
  gain.connect(audioOutput || context.destination);
  oscillator.start(now);
  oscillator.stop(now + settings[2] + 0.01);
}

function setCardState(name, isOpen) {
  const card = document.querySelector(`[data-card="${name}"]`);
  const button = document.querySelector(`[data-toggle="${name}"]`);

  if (!card || !button) return;

  card.classList.toggle("is-hidden", !isOpen);
  button.classList.toggle("is-open", isOpen);

  if (isOpen) {
    requestAnimationFrame(() => {
      card.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    });
  }
}

dockButtons.forEach((button) => {
  const card = document.querySelector(`[data-card="${button.dataset.toggle}"]`);
  button.classList.toggle("is-open", Boolean(card && !card.classList.contains("is-hidden")));
});

dockButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const name = button.dataset.toggle;
    const card = document.querySelector(`[data-card="${name}"]`);
    playClickSound(card.classList.contains("is-hidden") ? "open" : "close");
    setCardState(name, card.classList.contains("is-hidden"));
  });
});

closeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    playClickSound("close");
    setCardState(button.dataset.close, false);
  });
});

projectButtons.forEach((button) => {
  button.addEventListener("click", () => {
    playClickSound("project");
    dialogTitle.textContent = button.dataset.project;
    const caseStudy = caseStudies[button.dataset.case];

    if (caseStudy) {
      dialog.querySelector(".section-title").textContent = caseStudy.eyebrow;
      dialogContent.innerHTML = caseStudy.pages
        .map(
          (src, index) =>
            `<figure class="case-page"><img src="${src}" alt="${button.dataset.project} page ${
              index + 1
            }" loading="lazy" /></figure>`
        )
        .join("");
    } else {
      dialog.querySelector(".section-title").textContent = ">> CASE NOTE";
      dialogContent.innerHTML = `<p>A focused Iris case study placeholder. Replace this with project goals, scope, role, outcomes, and screenshots when the final designer information is ready.</p>`;
    }

    if (typeof dialog.showModal === "function") {
      dialog.showModal();
    } else {
      alert(`${button.dataset.project}\n\nReplace this placeholder with Iris' final case study.`);
    }
  });
});

dialogClose.addEventListener("click", () => {
  playClickSound("close");
  dialog.close();
});

dialog.addEventListener("click", (event) => {
  if (event.target !== dialog) return;
  playClickSound("close");
  dialog.close();
});

if (nextProject) {
  nextProject.addEventListener("click", () => {
    playClickSound("click");
    workspace.scrollBy({ left: 420, behavior: "smooth" });
  });
}

if (prevProject) {
  prevProject.addEventListener("click", () => {
    playClickSound("click");
    workspace.scrollBy({ left: -420, behavior: "smooth" });
  });
}

document.addEventListener("pointerdown", (event) => {
  if (event.target.closest("a")) {
    playClickSound("click");
  }
});

workspace.addEventListener("pointerdown", (event) => {
  if (event.target.closest("button, a, dialog")) return;
  isDragging = true;
  startX = event.clientX;
  scrollStart = workspace.scrollLeft;
  workspace.setPointerCapture(event.pointerId);
});

workspace.addEventListener("pointermove", (event) => {
  if (!isDragging) return;
  const distance = event.clientX - startX;
  workspace.scrollLeft = scrollStart - distance;
});

workspace.addEventListener("pointerup", () => {
  isDragging = false;
});

workspace.addEventListener("pointercancel", () => {
  isDragging = false;
});

workspace.addEventListener(
  "wheel",
  (event) => {
    if (event.target.closest("dialog")) return;
    if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;

    const currentWindow = event.target.closest(".window");
    if (currentWindow) {
      const canScrollDown =
        event.deltaY > 0 &&
        currentWindow.scrollTop + currentWindow.clientHeight < currentWindow.scrollHeight - 1;
      const canScrollUp = event.deltaY < 0 && currentWindow.scrollTop > 0;

      if (canScrollDown || canScrollUp) {
        return;
      }
    }

    event.preventDefault();
    workspace.scrollBy({ left: event.deltaY, behavior: "auto" });
  },
  { passive: false }
);

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && dialog.open) {
    dialog.close();
  }
});
