const progress = document.querySelector(".progress");
const navLinks = [...document.querySelectorAll(".nav-pills a")];
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

function updateScrollState() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
  progress.style.width = `${pct}%`;

  let current = sections[0]?.id;
  sections.forEach((section) => {
    if (section.getBoundingClientRect().top <= 160) current = section.id;
  });
  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
}

window.addEventListener("scroll", updateScrollState, { passive: true });
window.addEventListener("load", updateScrollState);

document.querySelectorAll("[data-theme-card]").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    document.querySelectorAll("[data-theme-card]").forEach((item) => item.classList.remove("active"));
    card.classList.add("active");
  });
});

document.querySelectorAll(".filter-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    document.querySelectorAll(".filter-btn").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    document.querySelectorAll(".publication-card").forEach((card) => {
      card.classList.toggle("hidden", filter !== "all" && card.dataset.year !== filter);
    });
  });
});

document.querySelectorAll(".tab-btn").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".tab-btn").forEach((item) => item.classList.remove("active"));
    document.querySelectorAll("[data-recognition-panel]").forEach((panel) => panel.classList.remove("active"));
    button.classList.add("active");
    document.getElementById(button.dataset.panel)?.classList.add("active");
  });
});

const dialog = document.getElementById("imageDialog");
const hotspot = document.querySelector(".signal-card");
if (dialog && hotspot) {
  hotspot.addEventListener("click", () => {
    dialog.querySelector("p").textContent =
      "The profile focuses on practical electrode strategies for efficient, stable, scalable perovskite photovoltaics, including indoor PV modules for IoT applications.";
    dialog.showModal();
  });
  dialog.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
}
