const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".site-nav");

function setMenu(open) {
  menuButton.setAttribute("aria-expanded", String(open));
  navigation.classList.toggle("is-open", open);
}

document.documentElement.classList.add("is-enhanced");
menuButton.addEventListener("click", () => {
  setMenu(menuButton.getAttribute("aria-expanded") !== "true");
});
navigation.addEventListener("click", (event) => {
  if (event.target.closest("a")) setMenu(false);
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
    setMenu(false);
    menuButton.focus();
  }
});

const projects = [...document.querySelectorAll(".project")];
const filters = document.querySelector(".filters");
const filterButtons = [...filters.querySelectorAll("button")];
const result = document.querySelector("#resultat");

filters.hidden = false;
filters.addEventListener("click", (event) => {
  const selected = event.target.closest("button[data-filter]");
  if (!selected) return;

  const category = selected.dataset.filter;
  let count = 0;
  for (const project of projects) {
    project.hidden = category !== "tout" && project.dataset.category !== category;
    if (!project.hidden) count += 1;
  }
  for (const button of filterButtons) {
    button.setAttribute("aria-pressed", String(button === selected));
  }
  result.textContent = `${count} projet${count === 1 ? "" : "s"} affiché${count === 1 ? "" : "s"}.`;
});

const dialog = document.querySelector(".project-dialog");
const detailImage = dialog.querySelector(".detail-image");
const detailTitle = dialog.querySelector("#detail-title");
const detailCategory = dialog.querySelector("#detail-category");
const detailDescription = dialog.querySelector("#detail-description");

if (typeof dialog.showModal === "function") {
  for (const project of projects) {
    const link = project.querySelector(".project-link");
    link.addEventListener("click", (event) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      event.preventDefault();
      detailImage.src = link.href;
      detailImage.alt = link.querySelector("img").alt;
      detailTitle.textContent = project.querySelector("h3").textContent;
      detailCategory.textContent = project.querySelector(".project-caption p").textContent;
      detailDescription.textContent = project.querySelector(".project-description").textContent;
      dialog.showModal();
    });
  }
  dialog.querySelector(".detail-close").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target !== dialog) return;

    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right ||
        event.clientY < bounds.top || event.clientY > bounds.bottom) {
      dialog.close();
    }
  });
}
