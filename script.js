// PERSONALIZE THESE VALUES before publishing.
    const PORTFOLIO_EMAIL = "spatro2401@gmail.com"; // Replace with your real email.
    const menuBtn = document.getElementById("menuBtn");
    const navLinks = document.getElementById("navLinks");
    menuBtn.addEventListener("click", () => {
      const open = navLinks.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", String(open));
      menuBtn.textContent = open ? "✕" : "☰";
    });
    navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      navLinks.classList.remove("open"); menuBtn.setAttribute("aria-expanded", "false"); menuBtn.textContent = "☰";
    }));
    document.getElementById("year").textContent = new Date().getFullYear();
    document.getElementById("emailLink").textContent = PORTFOLIO_EMAIL;
    document.getElementById("emailLink").href = "mailto:" + PORTFOLIO_EMAIL;
    const profileImage = document.getElementById("profileImage");
    profileImage.addEventListener("load", () => { profileImage.style.display = "block"; document.getElementById("initials").style.display = "none"; });
    profileImage.addEventListener("error", () => { profileImage.style.display = "none"; document.getElementById("initials").style.display = "block"; });
    const aboutProfileImage = document.getElementById("aboutProfileImage");
    aboutProfileImage.addEventListener("load", () => { aboutProfileImage.style.display = "block"; document.getElementById("aboutPhotoFallback").style.display = "none"; });
    aboutProfileImage.addEventListener("error", () => { aboutProfileImage.style.display = "none"; document.getElementById("aboutPhotoFallback").style.display = "grid"; });
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); }
    }), { threshold: .12 });
    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
    const sections = [...document.querySelectorAll("main section[id]")];
    const navObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.querySelectorAll("a").forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id));
      }
    }), { rootMargin: "-35% 0px -55% 0px" });
    sections.forEach(section => navObserver.observe(section));
    document.getElementById("contactForm").addEventListener("submit", event => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const subject = encodeURIComponent(data.get("subject"));
      const body = encodeURIComponent(`Name: ${data.get("name")}\nReply email: ${data.get("email")}\n\n${data.get("message")}`);
      document.getElementById("formStatus").textContent = "Opening your email application…";
      window.location.href = `mailto:${PORTFOLIO_EMAIL}?subject=${subject}&body=${body}`;
    });