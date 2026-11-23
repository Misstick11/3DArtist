const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const typewriter = document.querySelector("[data-typewriter]");
const replay = document.querySelector("[data-replay]");

if (typewriter && replay && !reducedMotion.matches) {
  const message = typewriter.textContent.trim();
  const letters = Array.from(message);
  const accessibleText = document.createElement("span");
  accessibleText.className = "visually-hidden";
  accessibleText.textContent = message;
  const visibleText = document.createElement("span");
  visibleText.setAttribute("aria-hidden", "true");
  typewriter.dataset.message = message;
  typewriter.replaceChildren(accessibleText, visibleText);
  replay.hidden = false;

  let timer;

  function playIntro() {
    window.clearTimeout(timer);
    let index = 0;
    visibleText.textContent = "";
    typewriter.classList.add("is-typing");

    function typeNext() {
      const letter = letters[index];
      visibleText.textContent += letter;
      index += 1;
      if (index < letters.length && !reducedMotion.matches) {
        timer = window.setTimeout(typeNext, letter === " " ? 82 : 30 + (index % 4) * 8);
        return;
      }

      visibleText.textContent = message;
      typewriter.classList.remove("is-typing");
    }

    timer = window.setTimeout(typeNext, 240);
  }

  replay.addEventListener("click", playIntro);
  reducedMotion.addEventListener("change", (event) => {
    replay.hidden = event.matches;
    if (!event.matches) return;

    window.clearTimeout(timer);
    visibleText.textContent = message;
    typewriter.classList.remove("is-typing");
  });
  playIntro();
}

if (!reducedMotion.matches && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;

      entry.target.classList.add("revealed");
      observer.unobserve(entry.target);
    }
  }, { threshold: 0.14 });

  for (const element of document.querySelectorAll("[data-reveal]")) {
    observer.observe(element);
  }
}
