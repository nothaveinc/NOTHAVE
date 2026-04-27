// Header scroll effect
const header = document.getElementById("header");

function updateHeader() {
  if (window.scrollY > 50) {
    header.classList.add("header--scrolled");
  } else {
    header.classList.remove("header--scrolled");
  }
}

window.addEventListener("scroll", updateHeader);
updateHeader(); // Check on initial load

// Hamburger menu
const hamburger = document.getElementById("hamburger");
const nav = document.getElementById("nav");

hamburger.addEventListener("click", function () {
  const isOpen = nav.classList.toggle("header__nav--open");
  hamburger.classList.toggle("hamburger--active");
  hamburger.setAttribute("aria-expanded", isOpen);
});

// Close menu on link click
nav.querySelectorAll(".header__nav-link").forEach(function (link) {
  link.addEventListener("click", function () {
    nav.classList.remove("header__nav--open");
    hamburger.classList.remove("hamburger--active");
    hamburger.setAttribute("aria-expanded", "false");
  });
});

// Intersection Observer for fade-in
const fadeElements = document.querySelectorAll(".fade-in");

const observer = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in--visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

fadeElements.forEach(function (el) {
  observer.observe(el);
});

// Contact form submission
const contactForm = document.getElementById("contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const submitBtn = document.getElementById("contact-submit");
    const successMsg = document.getElementById("contact-success");
    const errorMsg = document.getElementById("contact-error");

    submitBtn.disabled = true;
    submitBtn.textContent = "送信中...";
    successMsg.hidden = true;
    errorMsg.hidden = true;

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: new FormData(contactForm),
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        contactForm.reset();
        successMsg.hidden = false;
        submitBtn.textContent = "送信する";
      } else {
        errorMsg.hidden = false;
        submitBtn.textContent = "送信する";
      }
    } catch {
      errorMsg.hidden = false;
      submitBtn.textContent = "送信する";
    }

    submitBtn.disabled = false;
  });
}
