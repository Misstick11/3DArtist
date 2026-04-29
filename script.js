// MENU MOBILE
const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
    });
  });
}

// EFFET TERMINAL
const terminal = document.querySelector(".terminal-line");

if (terminal) {
  const content = terminal.innerHTML.replaceAll("<br>", "\n");
  terminal.innerHTML = "";

  let index = 0;

  function typeWriter() {
    if (index < content.length) {
      if (content[index] === "\n") {
        terminal.innerHTML += "<br>";
      } else {
        terminal.innerHTML += content[index];
      }

      index++;
      setTimeout(typeWriter, 24);
    }
  }

  setTimeout(typeWriter, 500);
}

// APPARITION AU SCROLL
const animatedElements = document.querySelectorAll(
  ".card, .asset-card, .breakdown-card, .service, .print-layout, .section-title"
);

animatedElements.forEach((el) => {
  el.classList.add("reveal");
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.15,
  }
);

animatedElements.forEach((el) => observer.observe(el));
