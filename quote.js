const quoteForm = document.querySelector("#quote-form");
const description = quoteForm.elements.description;
const draft = document.querySelector("#draft");
const draftText = document.querySelector("#draft-text");
const openMail = document.querySelector("#open-mail");
const recipient = "Misstickrealms@gmail.com";

quoteForm.hidden = false;
quoteForm.addEventListener("input", () => {
  description.setCustomValidity("");
  draft.hidden = true;
});

quoteForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const fields = new FormData(quoteForm);
  const kind = fields.get("kind");
  const size = fields.get("size").trim();
  const details = description.value.trim();
  if (!details) {
    description.setCustomValidity("Décris brièvement la pièce que tu souhaites fabriquer.");
    description.reportValidity();
    return;
  }

  const lines = [
    "Bonjour Misstick Realms,",
    "",
    "J’aimerais demander un devis pour un projet d’impression 3D.",
    `Type de projet : ${kind}`,
  ];
  if (size) lines.push(`Dimensions approximatives : ${size}`);
  lines.push("", details, "", "Merci !");

  const subject = "Demande de devis — Impression 3D";
  draftText.value = lines.join("\n");
  openMail.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\r\n"))}`;
  draft.hidden = false;
  openMail.focus();
});
