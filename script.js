const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(open));
  menuBtn.textContent = open ? "✕" : "☰";
});

navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  navLinks.classList.remove("open");
  menuBtn.setAttribute("aria-expanded", "false");
  menuBtn.textContent = "☰";
}));

document.getElementById("year").textContent = new Date().getFullYear();

const profileImage = document.getElementById("profileImage");
profileImage.addEventListener("load", () => {
  profileImage.style.display = "block";
  document.getElementById("initials").style.display = "none";
});
profileImage.addEventListener("error", () => {
  profileImage.style.display = "none";
  document.getElementById("initials").style.display = "block";
});

const aboutProfileImage = document.getElementById("aboutProfileImage");
aboutProfileImage.addEventListener("load", () => {
  aboutProfileImage.style.display = "block";
  document.getElementById("aboutPhotoFallback").style.display = "none";
});
aboutProfileImage.addEventListener("error", () => {
  aboutProfileImage.style.display = "none";
  document.getElementById("aboutPhotoFallback").style.display = "grid";
});

const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) {
    entry.target.classList.add("visible");
    observer.unobserve(entry.target);
  }
}), { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

const sections = [...document.querySelectorAll("main section[id]")];
const navObserver = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) {
    navLinks.querySelectorAll("a").forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id));
  }
}), { rootMargin: "-35% 0px -55% 0px" });
sections.forEach(section => navObserver.observe(section));

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

contactForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const originalBtnText = submitBtn.innerHTML;
  submitBtn.disabled = true;
  submitBtn.textContent = "Sending...";
  formStatus.textContent = "";

  const formData = new FormData(contactForm);

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const result = await response.json();

    if (result.success) {
      formStatus.textContent = "Message sent successfully! I'll get back to you soon.";
      contactForm.reset();
    } else {
      formStatus.textContent = result.message || "Something went wrong. Please try again.";
    }
  } catch (error) {
    formStatus.textContent = "Network error. Please check your connection and try again.";
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalBtnText;
  }
});