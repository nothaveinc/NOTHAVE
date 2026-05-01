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

// Close menu on outside click
document.addEventListener("click", function (e) {
  if (
    nav.classList.contains("header__nav--open") &&
    !nav.contains(e.target) &&
    !hamburger.contains(e.target)
  ) {
    nav.classList.remove("header__nav--open");
    hamburger.classList.remove("hamburger--active");
    hamburger.setAttribute("aria-expanded", "false");
  }
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
  { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
);

fadeElements.forEach(function (el) {
  observer.observe(el);
});

// Pre-select plan from plan card CTA
document.querySelectorAll(".plan-card__cta[data-plan]").forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const planName = this.dataset.plan;
    const planSelect = document.getElementById("plan-select");
    const contactSection = document.getElementById("contact");

    if (planSelect) {
      planSelect.value = planName;
    }
    if (contactSection) {
      const headerHeight = document.getElementById("header")
        ? document.getElementById("header").offsetHeight
        : 64;
      const top = contactSection.getBoundingClientRect().top + window.scrollY - headerHeight;
      window.scrollTo({ top: top, behavior: "smooth" });
    }
    if (planSelect) {
      setTimeout(function () {
        planSelect.focus();
        planSelect.closest(".contact__form-group").classList.add("contact__form-group--highlighted");
        setTimeout(function () {
          planSelect.closest(".contact__form-group").classList.remove("contact__form-group--highlighted");
        }, 1800);
      }, 600);
    }
  });
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
    submitBtn.setAttribute("aria-busy", "true");
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
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("plan-select").value = "";
        document.getElementById("message").value = "";
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

    submitBtn.setAttribute("aria-busy", "false");
    submitBtn.disabled = false;
  });
}

// ========================================
// 数値カウンターアニメーション
// [data-count] 属性を持つ要素が画面内に入ったとき
// 0 から目標値まで 60 フレームかけてカウントアップする
// ========================================
(function () {
  var countEls = document.querySelectorAll("[data-count]");
  if (!countEls.length) return;

  var FRAMES = 60;

  function animateCount(el) {
    var target = parseInt(el.getAttribute("data-count"), 10);
    if (isNaN(target)) return;

    var current = 0;
    var increment = target / FRAMES;
    var frame = 0;

    var timer = setInterval(function () {
      frame++;
      current += increment;
      if (frame >= FRAMES) {
        el.textContent = target;
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(current);
      }
    }, 1000 / 60); // ~60fps
  }

  var countObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          countObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3, rootMargin: "0px 0px -40px 0px" }
  );

  countEls.forEach(function (el) {
    countObserver.observe(el);
  });
})();
