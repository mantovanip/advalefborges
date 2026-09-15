/* =========================================================
   ADVOCACIA ALEF BORGES
   JavaScript
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       LINKS INTERNOS — SCROLL SUAVE
    ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach((link) => {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") {
                event.preventDefault();
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            const header = document.querySelector(".site-header");
            const headerHeight = header ? header.offsetHeight : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* =====================================================
       HEADER — SOMBRA AO ROLAR
    ===================================================== */

    const header = document.querySelector(".site-header");

    function updateHeader() {

        if (!header) return;

        if (window.scrollY > 20) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    }

    window.addEventListener("scroll", updateHeader, {
        passive: true
    });

    updateHeader();


    /* =====================================================
       ANIMAÇÃO DE ENTRADA DAS SEÇÕES
    ===================================================== */

    const animatedElements = document.querySelectorAll(
        ".hero-content, .hero-visual, .intro-text, " +
        ".analysis-card, .practice-card, .about-image, " +
        ".about-content, .article-card, .final-cta-inner"
    );

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            (entries, observerInstance) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) return;

                    entry.target.classList.add("is-visible");

                    observerInstance.unobserve(entry.target);

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );

        animatedElements.forEach((element) => {
            element.classList.add("animate-on-scroll");
            observer.observe(element);
        });

    } else {

        animatedElements.forEach((element) => {
            element.classList.add("is-visible");
        });

    }


    /* =====================================================
       ANO AUTOMÁTICO NO FOOTER
    ===================================================== */

    const footerYear = document.querySelector(".footer-bottom span");

    if (footerYear) {

        footerYear.textContent =
            footerYear.textContent.replace(
                /\b20\d{2}\b/,
                new Date().getFullYear()
            );

    }


    /* =====================================================
       PROTEÇÃO CONTRA CLIQUE EM LINKS "#"
    ===================================================== */

    document.querySelectorAll('a[href="#"]').forEach((link) => {

        link.addEventListener("click", (event) => {
            event.preventDefault();
        });

    });

});