document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const header = document.querySelector(".site-header");
    const themeToggle = document.querySelector(".theme-toggle");
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    const menuToggle = document.querySelector(".menu-toggle");
    const navigation = document.querySelector(".main-nav");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const storedTheme = localStorage.getItem("alef-theme");
    const initialTheme = storedTheme === "dark" ? "dark" : "light";

    function setTheme(theme) {
        const isDark = theme === "dark";

        body.dataset.theme = isDark ? "dark" : "light";
        themeToggle?.setAttribute("aria-pressed", String(isDark));
        themeColorMeta?.setAttribute("content", isDark ? "#07111D" : "#081522");
        localStorage.setItem("alef-theme", isDark ? "dark" : "light");
    }

    setTheme(initialTheme);

    themeToggle?.addEventListener("click", () => {
        const nextTheme = body.dataset.theme === "dark" ? "light" : "dark";
        setTheme(nextTheme);
    });

    function closeMenu() {
        navigation?.classList.remove("is-open");
        menuToggle?.setAttribute("aria-expanded", "false");
        menuToggle?.setAttribute("aria-label", "Abrir menu");
        body.classList.remove("menu-open");
    }

    menuToggle?.addEventListener("click", () => {
        const isOpen = navigation.classList.toggle("is-open");

        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
        body.classList.toggle("menu-open", isOpen);
    });

    navigation?.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", (event) => {
        if (!navigation?.classList.contains("is-open")) return;
        if (navigation.contains(event.target) || menuToggle?.contains(event.target)) return;
        closeMenu();
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") closeMenu();
    });

    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetId = link.getAttribute("href");
            const target = targetId ? document.querySelector(targetId) : null;

            if (!target) return;

            event.preventDefault();
            const offset = (header?.offsetHeight || 0) + 10;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;

            window.scrollTo({
                top,
                behavior: reduceMotion ? "auto" : "smooth"
            });
        });
    });

    const year = document.querySelector("[data-year]");
    if (year) year.textContent = new Date().getFullYear();

    const revealElements = document.querySelectorAll(".reveal");

    if (reduceMotion || !("IntersectionObserver" in window)) {
        revealElements.forEach((element) => element.classList.add("is-visible"));
    } else {
        const observer = new IntersectionObserver((entries, observerInstance) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("is-visible");
                observerInstance.unobserve(entry.target);
            });
        }, { threshold: 0.14, rootMargin: "0px 0px -40px 0px" });

        revealElements.forEach((element) => observer.observe(element));
    }
});
