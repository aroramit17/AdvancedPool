const header = document.querySelector("[data-header]");
const nav = document.querySelector("#site-nav");
const navToggle = document.querySelector(".nav-toggle");
const revealItems = document.querySelectorAll(".section-reveal");
const quoteForm = document.querySelector("[data-quote-form]");
const formNote = document.querySelector("[data-form-note]");
const mobileCall = document.querySelector(".mobile-call");

const updateHeader = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 20);
  mobileCall.classList.toggle("is-visible", window.scrollY > 420);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

navToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  header.classList.toggle("is-open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

nav.addEventListener("click", (event) => {
  if (event.target.tagName !== "A") return;
  nav.classList.remove("is-open");
  header.classList.remove("is-open");
  navToggle.setAttribute("aria-expanded", "false");
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  revealItems.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
    observer.observe(item);
  });
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

quoteForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(quoteForm);
  const body = [
    `Name: ${data.get("name")}`,
    `Phone: ${data.get("phone")}`,
    `Email: ${data.get("email")}`,
    `City: ${data.get("city")}`,
    `Service needed: ${data.get("service")}`,
    "",
    "Message:",
    data.get("message") || ""
  ].join("\n");

  const subject = encodeURIComponent("Advanced Pool & Spa quote request");
  const mailBody = encodeURIComponent(body);
  window.location.href = `mailto:advancedpool2023@gmail.com?subject=${subject}&body=${mailBody}`;
  formNote.textContent = "Your email app should open with the quote request filled in.";
});
