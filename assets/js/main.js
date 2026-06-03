let toastTimeout;

/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll(".nav__link");

const linkAction = () => {
  const navMenu = document.getElementById("nav-menu");
  navMenu.classList.remove("show-menu");
};
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*=============== HOME TYPED JS ===============*/
var typedHome = new Typed("#home-typed", {
  strings: ["Software Engineer", "Backend Developer", "Fullstack Developer"],
  typeSpeed: 80,
  backSpeed: 40,
  backDelay: 2000,
  loop: true,
  cursorChar: "_",
});

/*=============== ADD SHADOW HEADER ===============*/
const shadowHeader = () => {
  const header = document.getElementById("header");
  window.scrollY >= 50
    ? header.classList.add("shadow-header")
    : header.classList.remove("shadow-header");
};
window.addEventListener("scroll", shadowHeader);

/*=============== CONTACT EMAIL JS ===============*/
const contactForm = document.getElementById("contact-form");

const showToast = (message, isSuccess) => {
  const toast = document.getElementById("toast"),
    toastIcon = document.getElementById("toast-icon"),
    toastText = document.getElementById("toast-text");

  toastText.textContent = message;
  if (isSuccess) {
    toastIcon.className = "ri-checkbox-circle-fill";
    toast.classList.add("toast--success");
    toast.classList.remove("toast--error");
  } else {
    toastIcon.className = "ri-error-warning-fill";
    toast.classList.add("toast--error");
    toast.classList.remove("toast--success");
  }

  toast.classList.add("show-toast");

  clearTimeout(toastTimeout);

  toastTimeout = setTimeout(() => {
    toast.classList.remove("show-toast");
  }, 4000);
};

const sendEmail = (e) => {
  e.preventDefault();

  emailjs
    .sendForm(
      CONFIG.EMAILJS_SERVICE_ID,
      CONFIG.EMAILJS_TEMPLATE_ID,
      "#contact-form",
      CONFIG.EMAILJS_PUBLIC_KEY,
    )
    .then(
      () => {
        showToast("Message sent successfully!", true);
        contactForm.reset();
      },
      () => {
        showToast("Message not sent (service error)", false);
      },
    );
};

contactForm.addEventListener("submit", sendEmail);

/*=============== SHOW SCROLL UP ===============*/
const scrollUp = () => {
  const scrollUpBtn = document.getElementById("scroll-up");
  window.scrollY >= 350
    ? scrollUpBtn.classList.add("show-scroll")
    : scrollUpBtn.classList.remove("show-scroll");
};
window.addEventListener("scroll", scrollUp);

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const mainHeader = document.getElementById("header");
const scrollSections = document.querySelectorAll("section[id]");

const scrollActive = () => {
  const scrollY = window.scrollY;
  if (!mainHeader) return;
  
  const headerHeight = mainHeader.offsetHeight;

  scrollSections.forEach((section) => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - headerHeight - window.innerHeight * 0.1;
    const sectionId = section.getAttribute("id");
    const currentLink = document.querySelector(`.nav__menu a[href="#${sectionId}"]`);

    if (currentLink) {
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        currentLink.classList.add("active-link");
      } else {
        currentLink.classList.remove("active-link");
      }
    }
  });
};

window.addEventListener("scroll", scrollActive);

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: 2000,
  reset: false,
  viewFactor: 0.4,
});

sr.reveal(".home__content, .resume__content:nth-child(1), .footer__container");
sr.reveal(".home__data, .resume__content:nth-child(2)", {
  delay: 300,
  origin: "bottom",
});

sr.reveal(".about__content, .contact__content", { origin: "bottom" });
sr.reveal(".about__image, .contact__form", { delay: 300 });

sr.reveal(".projects__card", { interval: 100 });
sr.reveal(".projects__more", { delay: 400, origin: "bottom" });
