// ─── LOADER ───
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("loader").classList.add("hidden");
    setTimeout(() => {
      document.getElementById("loader").remove();
    }, 700);
  }, 1600);
});

// ─── CURSOR ───
const cursor = document.getElementById("cursor");
const follower = document.getElementById("cursorFollower");
let mx = 0,
  my = 0,
  fx = 0,
  fy = 0;

document.addEventListener("mousemove", (e) => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.transform = `translate(${mx - 6}px, ${my - 6}px)`;
});

function animFollower() {
  fx += (mx - fx - 18) * 0.12;
  fy += (my - fy - 18) * 0.12;
  follower.style.transform = `translate(${fx}px, ${fy}px)`;
  requestAnimationFrame(animFollower);
}
animFollower();

document
  .querySelectorAll("a, button, .project-card, .skill-card, .infovet-item")
  .forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.style.transform += " scale(2)";
      follower.style.width = "56px";
      follower.style.height = "56px";
      follower.style.borderColor = "rgba(59,107,255,0.6)";
    });
    el.addEventListener("mouseleave", () => {
      follower.style.width = "36px";
      follower.style.height = "36px";
      follower.style.borderColor = "rgba(91,138,255,0.4)";
    });
  });

// ─── NAVBAR SCROLL ───
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(10,10,12,0.95)";
  } else {
    navbar.style.background = "rgba(10,10,12,0.8)";
  }
});

// ─── MOBILE MENU ───
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
let menuOpen = false;
hamburger.addEventListener("click", () => {
  menuOpen = !menuOpen;
  mobileMenu.classList.toggle("open", menuOpen);
  hamburger.querySelectorAll("span")[0].style.transform = menuOpen
    ? "rotate(45deg) translate(5px,5px)"
    : "";
  hamburger.querySelectorAll("span")[1].style.opacity = menuOpen ? "0" : "1";
  hamburger.querySelectorAll("span")[2].style.transform = menuOpen
    ? "rotate(-45deg) translate(5px,-5px)"
    : "";
});
function closeMobileMenu() {
  menuOpen = false;
  mobileMenu.classList.remove("open");
  hamburger.querySelectorAll("span").forEach((s) => {
    s.style.transform = "";
    s.style.opacity = "1";
  });
}

// ─── INTERSECTION OBSERVER ───
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        // Skill bars
        if (e.target.classList.contains("skill-fill")) {
          const w = parseFloat(e.target.dataset.width);
          e.target.style.transform = `scaleX(${w})`;
        }
      }
    });
  },
  { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
);

document
  .querySelectorAll(".reveal, .skill-fill, .timeline-item")
  .forEach((el) => io.observe(el));

// ─── SMOOTH SCROLL ───
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const target = document.querySelector(a.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// ─── PARALLAX HERO ───
const heroImg = document.querySelector(".hero-image img");
if (heroImg) {
  window.addEventListener("scroll", () => {
    const scrolled = window.scrollY;
    heroImg.style.transform = `translateY(${scrolled * 0.3}px)`;
  });
}

// ─── STAGGERED TIMELINE ANIMATION ───
const tlItems = document.querySelectorAll(".timeline-item");
const tlObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        const idx = Array.from(tlItems).indexOf(e.target);
        setTimeout(() => e.target.classList.add("visible"), idx * 150);
      }
    });
  },
  { threshold: 0.1 }
);
tlItems.forEach((item) => tlObserver.observe(item));

// ─── ACTIVE NAV LINK ───
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - 100)
      current = section.getAttribute("id");
  });
  navLinks.forEach((link) => {
    link.style.color =
      link.getAttribute("href") === `#${current}` ? "var(--white)" : "";
  });
});
