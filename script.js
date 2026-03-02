/* ============================================================
   Configuration
   ============================================================ */
const anniversaryDate = new Date("2022-05-24");

/* ============================================================
   Countdown Timer
   ============================================================ */
function updateCountdown() {
  const now = new Date();
  const diff = now - anniversaryDate;

  const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
  const months = Math.floor(
    (diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30),
  );
  const days = Math.floor(
    (diff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24),
  );

  document.getElementById("years").textContent = years;
  document.getElementById("months").textContent = months;
  document.getElementById("days").textContent = days;
}

updateCountdown();
setInterval(updateCountdown, 86400000);

/* ============================================================
   Gallery Lightbox
   ============================================================ */
const galleryItems = document.querySelectorAll(".gallery-item");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

galleryItems.forEach((item) => {
  item.addEventListener("click", function () {
    const imgSrc = this.getAttribute("data-image");
    lightboxImg.src = imgSrc;
    lightbox.classList.add("active");
  });
});

function closeLightbox() {
  lightbox.classList.remove("active");
}

lightbox.addEventListener("click", function (e) {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeLightbox();
    closeVideo();
    confirmOverlay.classList.remove("active");
  }
});

/* ============================================================
   Scroll Reveal
   ============================================================ */
function reveal() {
  document.querySelectorAll(".reveal").forEach((el) => {
    if (el.getBoundingClientRect().top < window.innerHeight - 120) {
      el.classList.add("active");
    }
  });
}
window.addEventListener("scroll", reveal);
reveal();

/* ============================================================
   Confetti Animation
   ============================================================ */
const canvas = document.getElementById("confetti-canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let confettiActive = false;

class Confetti {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height - canvas.height;
    this.size = Math.random() * 5 + 5;
    this.speedY = Math.random() * 3 + 2;
    this.speedX = Math.random() * 2 - 1;
    this.color = `hsl(${Math.random() * 360}, 70%, 70%)`;
    this.angle = Math.random() * 360;
    this.rotationSpeed = Math.random() * 5 - 2.5;
  }

  update() {
    this.y += this.speedY;
    this.x += this.speedX;
    this.angle += this.rotationSpeed;
    if (this.y > canvas.height) {
      this.y = -10;
      this.x = Math.random() * canvas.width;
    }
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate((this.angle * Math.PI) / 180);
    ctx.fillStyle = this.color;
    ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
    ctx.restore();
  }
}

let confettiArray = [];

function initConfetti() {
  confettiArray = [];
  for (let i = 0; i < 100; i++) {
    confettiArray.push(new Confetti());
  }
}

function animateConfetti() {
  if (!confettiActive) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  confettiArray.forEach((c) => {
    c.update();
    c.draw();
  });
  requestAnimationFrame(animateConfetti);
}

function triggerConfetti() {
  if (!confettiActive) {
    confettiActive = true;
    initConfetti();
    animateConfetti();
    setTimeout(() => {
      confettiActive = false;
    }, 5000);
  }
}

function checkAnniversary() {
  const today = new Date();
  if (
    today.getMonth() === anniversaryDate.getMonth() &&
    today.getDate() === anniversaryDate.getDate()
  ) {
    confettiActive = true;
    initConfetti();
    animateConfetti();
    setTimeout(() => {
      confettiActive = false;
    }, 10000);
  }
}
checkAnniversary();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

/* ============================================================
   Heart Burst Animation
   ============================================================ */
function createHeartBurst() {
  const burst = document.createElement("div");
  burst.className = "heart-burst";
  for (let i = 0; i < 12; i++) {
    const heart = document.createElement("span");
    heart.textContent = "❤️";
    const angle = (i * 30 * Math.PI) / 180;
    const distance = 200;
    heart.style.setProperty("--x", `${Math.cos(angle) * distance}px`);
    heart.style.setProperty("--y", `${Math.sin(angle) * distance}px`);
    burst.appendChild(heart);
  }
  document.body.appendChild(burst);
  setTimeout(() => burst.remove(), 1000);
}

/* ============================================================
   Smooth Scroll Navigation
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      const navbarCollapse = document.querySelector(".navbar-collapse");
      if (navbarCollapse && navbarCollapse.classList.contains("show")) {
        navbarCollapse.classList.remove("show");
      }
    }
  });
});

/* ============================================================
   Animated Letter — #letter section (envelope in hero)
   ============================================================ */
const letterEnvelope = document.getElementById("letterEnvelope");
const letterPaper = document.getElementById("letterPaper");
const closeLetter = document.getElementById("closeLetter");

if (letterEnvelope && letterPaper && closeLetter) {
  letterEnvelope.addEventListener("click", function () {
    const img = document.getElementById("envelopeImg");
    img.src = "open.png";
    const instruction = document.querySelector(
      "#letterEnvelope .envelope-instruction",
    );
    if (instruction) instruction.style.display = "none";

    setTimeout(() => {
      letterEnvelope.classList.add("hidden");
      letterPaper.classList.add("active");
    }, 800);
  });

  closeLetter.addEventListener("click", function () {
    letterPaper.classList.remove("active");
    setTimeout(() => {
      letterEnvelope.classList.remove("hidden");
      const img = document.getElementById("envelopeImg");
      img.src = "closed.png";
      const instruction = document.querySelector(
        "#letterEnvelope .envelope-instruction",
      );
      if (instruction) instruction.style.display = "block";
    }, 600);
  });
}

/* ============================================================
   Love Letters Section — Image Envelope Cards (#letters)
   ============================================================ */
document.querySelectorAll(".letter-envelope-card").forEach((card) => {
  card.addEventListener("click", () => {
    const id = card.id.replace("envelope-", "");
    const paper = document.getElementById("paper-" + id);
    if (!paper) return;
    card.classList.add("hidden");
    paper.classList.add("active");
  });
});

document.querySelectorAll(".close-letter-btn[data-close]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const paperId = btn.getAttribute("data-close");
    const paper = document.getElementById(paperId);
    const envelopeId = paperId.replace("paper-", "");
    const card = document.getElementById("envelope-" + envelopeId);
    if (paper) paper.classList.remove("active");
    if (card) card.classList.remove("hidden");
  });
});

/* ============================================================
   Open When — Custom Overlay + Video Modal
   ============================================================ */

/* ── Video sources: just update the file paths here ── */
const situations = {
  sad: {
    emoji: "😢",
    title: "When You're Sad",
    desc: "This message is here to hold you through your tears.",
    video: "sad.mp4",
  },
  miss: {
    emoji: "💭",
    title: "When You Miss Me",
    desc: "A little reminder that love has no distance.",
    video: "miss.mp4",
  },
  sleep: {
    emoji: "🌙",
    title: "When You Can't Sleep",
    desc: "Let this video guide you into peaceful rest.",
    video: "sleep.mp4",
  },
  happy: {
    emoji: "🎉",
    title: "When You're Happy",
    desc: "Your happiness deserves to be celebrated!",
    video: "happy.mp4",
  },
  motivation: {
    emoji: "💪",
    title: "When You Need Motivation",
    desc: "You're stronger than you think — watch this.",
    video: "nika.mp4",
  },
  stressed: {
    emoji: "😰",
    title: "When You're Stressed",
    desc: "Take a breath. This message is your reset button.",
    video: "stress.mp4",
  },
};

let currentSituation = null;

const confirmOverlay = document.getElementById("confirmOverlay");
const videoModal = document.getElementById("videoModal");
const videoWrapper = document.getElementById("videoWrapper");
const confirmEmoji = document.getElementById("confirmEmoji");
const confirmTitle = document.getElementById("confirmTitle");
const confirmDesc = document.getElementById("confirmDesc");
const videoTitle = document.getElementById("videoTitle");

/* Card click → confirm overlay */
document.querySelectorAll(".open-when-card").forEach((card) => {
  card.addEventListener("click", () => {
    currentSituation = card.dataset.situation;
    const s = situations[currentSituation];
    confirmEmoji.textContent = s.emoji;
    confirmTitle.textContent = `Open When… ${s.title}`;
    confirmDesc.textContent = s.desc;
    confirmOverlay.classList.add("active");
  });
});

document.getElementById("cancelOpen").addEventListener("click", () => {
  confirmOverlay.classList.remove("active");
});

confirmOverlay.addEventListener("click", (e) => {
  if (e.target === confirmOverlay) confirmOverlay.classList.remove("active");
});

/* Confirm → open video modal */
document.getElementById("confirmOpen").addEventListener("click", () => {
  confirmOverlay.classList.remove("active");

  setTimeout(() => {
    const s = situations[currentSituation];
    videoTitle.textContent = `💌 ${s.title}`;
    videoWrapper.innerHTML = `
      <video controls autoplay playsinline src="${s.video}"></video>
    `;
    videoModal.classList.add("active");

    if (s.confetti) {
      createHeartBurst();
      triggerConfetti();
    }
  }, 300);
});

/* Close video modal */
document
  .getElementById("closeVideoModal")
  .addEventListener("click", closeVideo);
videoModal.addEventListener("click", (e) => {
  if (e.target === videoModal) closeVideo();
});

function closeVideo() {
  videoModal.classList.remove("active");
  setTimeout(() => {
    if (videoWrapper) videoWrapper.innerHTML = "";
  }, 400);
}
