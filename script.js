/* =========================
   ELEMENTS
========================= */

const gate = document.getElementById("gate");
const checking = document.getElementById("checking");
const main = document.getElementById("main");

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

const choiceArea = document.getElementById("choiceArea");
const hint = document.getElementById("hint");


/* =========================
   NO BUTTON ESCAPES 😭
========================= */

let noCount = 0;

function moveNoButton() {

  noCount++;

  const area = choiceArea.getBoundingClientRect();

  const maxX = Math.max(0, area.width - noBtn.offsetWidth);
  const maxY = Math.max(0, area.height - noBtn.offsetHeight);

  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;

  const messages = [
    "Nope 😭",
    "Wrong answer baby 😂",
    "Try again 👀",
    "You know the answer 😭❤️",
    "Nice try 😂",
    "Nijitha detected... just say YES 😌",
    "The NO button has given up 💀",
    "YES is waiting ❤️"
  ];

  hint.textContent =
    messages[Math.min(noCount - 1, messages.length - 1)];
}

noBtn.addEventListener("mouseenter", moveNoButton);

noBtn.addEventListener("touchstart", function(e) {
  e.preventDefault();
  moveNoButton();
});


/* =========================
   YES BUTTON
========================= */

yesBtn.addEventListener("click", () => {

  createHeartExplosion();

  gate.classList.add("hidden");

  checking.classList.remove("hidden");

  setTimeout(() => {

    checking.classList.add("hidden");

    main.classList.remove("hidden");

    window.scrollTo({
      top: 0,
      behavior: "instant"
    });

    startEffects();

  }, 3500);

});


/* =========================
   FLOATING HEARTS
========================= */

function createHeart() {

  const heart = document.createElement("div");

  heart.className = "floating-heart";

  const hearts = [
    "♥",
    "♡",
    "❤",
    "💕",
    "💗",
    "🌸"
  ];

  heart.textContent =
    hearts[Math.floor(Math.random() * hearts.length)];

  heart.style.left =
    Math.random() * 100 + "vw";

  heart.style.fontSize =
    (12 + Math.random() * 25) + "px";

  heart.style.animationDuration =
    (5 + Math.random() * 6) + "s";

  heart.style.setProperty(
    "--move",
    (Math.random() * 200 - 100) + "px"
  );

  document.body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 12000);
}


/* =========================
   HEART EXPLOSION
========================= */

function createHeartExplosion() {

  for (let i = 0; i < 35; i++) {

    const heart = document.createElement("div");

    heart.textContent = "♥";

    heart.style.position = "fixed";
    heart.style.left = "50%";
    heart.style.top = "50%";
    heart.style.zIndex = "999";

    heart.style.color =
      i % 2 === 0 ? "#ff6fae" : "#ffb6d5";

    heart.style.fontSize =
      (12 + Math.random() * 25) + "px";

    heart.style.pointerEvents = "none";

    const x =
      (Math.random() - .5) * 500;

    const y =
      (Math.random() - .5) * 500;

    heart.animate(
      [
        {
          transform: "translate(-50%, -50%) scale(0)",
          opacity: 1
        },
        {
          transform:
            `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(1.4)`,
          opacity: 0
        }
      ],
      {
        duration: 1200 + Math.random() * 600,
        easing: "cubic-bezier(.2,.8,.2,1)"
      }
    );

    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 2000);
  }
}


/* =========================
   SPARKLES
========================= */

function createSparkles() {

  for (let i = 0; i < 40; i++) {

    const sparkle = document.createElement("div");

    sparkle.className = "sparkle";

    sparkle.style.left =
      Math.random() * 100 + "vw";

    sparkle.style.top =
      Math.random() * 100 + "vh";

    sparkle.style.animationDelay =
      Math.random() * 3 + "s";

    sparkle.style.animationDuration =
      (1.5 + Math.random() * 3) + "s";

    document.body.appendChild(sparkle);
  }
}


/* =========================
   SCROLL REVEAL
========================= */

function setupReveal() {

  const elements = document.querySelectorAll(
    ".timeline article, .memory-photo, .letter > div, .numbers div"
  );

  elements.forEach(el => {
    el.classList.add("reveal");
  });

  const observer = new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add("active");

          observer.unobserve(entry.target);
        }

      });

    },
    {
      threshold: .15
    }
  );

  elements.forEach(el => observer.observe(el));
}


/* =========================
   PHOTO CLICK
========================= */

function setupPhotos() {

  const photos =
    document.querySelectorAll(".memory-photo");

  photos.forEach(photo => {

    photo.addEventListener("click", () => {

      photo.classList.toggle("selected");

      createHeartExplosion();
    });

  });
}


/* =========================
   START EFFECTS
========================= */

function startEffects() {

  createSparkles();

  setupReveal();

  setupPhotos();

  setInterval(createHeart, 1800);
}


/* =========================
   PREVENT IMAGE DRAG
========================= */

document.querySelectorAll("img").forEach(img => {

  img.addEventListener("dragstart", e => {
    e.preventDefault();
  });

});