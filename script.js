/* ============================================================
   ADVOCACIA ALEF BORGES
   JAVASCRIPT
============================================================ */

document.addEventListener("DOMContentLoaded", () => {

  /* ==========================================================
     ELEMENTOS
  =========================================================== */

  const body = document.body;

  const themeToggle =
    document.querySelector("[data-theme-toggle]");

  const themeIcon =
    document.querySelector(".theme-icon");

  const menuToggle =
    document.querySelector("[data-menu-toggle]");

  const mainNav =
    document.querySelector(".main-nav");

  const backToTop =
    document.getElementById("backToTop");

  const header =
    document.getElementById("header");

  const yearElements =
    document.querySelectorAll("[data-year]");


  /* ==========================================================
     ANO AUTOMÁTICO
  =========================================================== */

  const currentYear =
    new Date().getFullYear();

  yearElements.forEach((element) => {
    element.textContent = currentYear;
  });


  /* ==========================================================
     TEMA
  =========================================================== */

  const savedTheme =
    localStorage.getItem("alef-theme");

  const systemPrefersLight =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: light)").matches;

  let initialTheme =
    savedTheme ||
    (systemPrefersLight ? "light" : "dark");

  if (initialTheme !== "light" && initialTheme !== "dark") {
    initialTheme = "dark";
  }

  applyTheme(initialTheme);


  function applyTheme(theme) {

    body.dataset.theme = theme;

    const isLight =
      theme === "light";

    if (themeToggle) {

      themeToggle.setAttribute(
        "aria-pressed",
        String(isLight)
      );

      themeToggle.setAttribute(
        "aria-label",
        isLight
          ? "Ativar modo escuro"
          : "Ativar modo claro"
      );
    }

    if (themeIcon) {

      themeIcon.textContent =
        isLight
          ? "☾"
          : "☀";
    }

    const metaTheme =
      document.querySelector(
        'meta[name="theme-color"]'
      );

    if (metaTheme) {

      metaTheme.setAttribute(
        "content",
        isLight
          ? "#F4F0E8"
          : "#0C1117"
      );
    }
  }


  if (themeToggle) {

    themeToggle.addEventListener(
      "click",
      () => {

        const currentTheme =
          body.dataset.theme === "light"
            ? "light"
            : "dark";

        const nextTheme =
          currentTheme === "dark"
            ? "light"
            : "dark";

        applyTheme(nextTheme);

        localStorage.setItem(
          "alef-theme",
          nextTheme
        );

      }
    );
  }


  /* ==========================================================
     MENU MOBILE
  =========================================================== */

  function closeMenu() {

    if (!menuToggle || !mainNav) {
      return;
    }

    menuToggle.classList.remove(
      "is-active"
    );

    mainNav.classList.remove(
      "is-open"
    );

    menuToggle.setAttribute(
      "aria-expanded",
      "false"
    );

    menuToggle.setAttribute(
      "aria-label",
      "Abrir menu"
    );

    body.classList.remove(
      "menu-open"
    );
  }


  function toggleMenu() {

    if (!menuToggle || !mainNav) {
      return;
    }

    const isOpen =
      mainNav.classList.toggle(
        "is-open"
      );

    menuToggle.classList.toggle(
      "is-active",
      isOpen
    );

    menuToggle.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

    menuToggle.setAttribute(
      "aria-label",
      isOpen
        ? "Fechar menu"
        : "Abrir menu"
    );

    body.classList.toggle(
      "menu-open",
      isOpen
    );
  }


  if (menuToggle) {

    menuToggle.addEventListener(
      "click",
      toggleMenu
    );
  }


  if (mainNav) {

    mainNav
      .querySelectorAll("a")
      .forEach((link) => {

        link.addEventListener(
          "click",
          closeMenu
        );

      });
  }


  document.addEventListener(
    "keydown",
    (event) => {

      if (event.key === "Escape") {
        closeMenu();
      }

    }
  );


  /* ==========================================================
     SCROLL
  =========================================================== */

  let ticking = false;

  function handleScroll() {

    const scrollY =
      window.scrollY;

    /* HEADER */

    if (header) {

      header.classList.toggle(
        "is-scrolled",
        scrollY > 30
      );
    }


    /* VOLTAR AO TOPO */

    if (backToTop) {

      backToTop.classList.toggle(
        "is-visible",
        scrollY > 550
      );
    }

    ticking = false;
  }


  window.addEventListener(
    "scroll",
    () => {

      if (!ticking) {

        window.requestAnimationFrame(
          handleScroll
        );

        ticking = true;
      }

    },
    { passive: true }
  );


  handleScroll();


  /* ==========================================================
     VOLTAR AO TOPO
  =========================================================== */

  if (backToTop) {

    backToTop.addEventListener(
      "click",
      () => {

        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });

      }
    );
  }


  /* ==========================================================
     INTERSECTION OBSERVER
  =========================================================== */

  const revealElements =
    document.querySelectorAll(
      ".reveal"
    );

  const animatedSections =
    document.querySelectorAll(
      ".section, .statement"
    );


  if ("IntersectionObserver" in window) {

    const revealObserver =
      new IntersectionObserver(
        (entries, observer) => {

          entries.forEach((entry) => {

            if (!entry.isIntersecting) {
              return;
            }

            entry.target.classList.add(
              "is-visible"
            );

            observer.unobserve(
              entry.target
            );

          });

        },
        {
          threshold: .12,
          rootMargin: "0px 0px -70px 0px"
        }
      );


    revealElements.forEach(
      (element) => {
        revealObserver.observe(element);
      }
    );


    const sectionObserver =
      new IntersectionObserver(
        (entries, observer) => {

          entries.forEach((entry) => {

            if (!entry.isIntersecting) {
              return;
            }

            entry.target.classList.add(
              "is-visible"
            );

            observer.unobserve(
              entry.target
            );

          });

        },
        {
          threshold: .08
        }
      );


    animatedSections.forEach(
      (section) => {
        sectionObserver.observe(section);
      }
    );

  } else {

    revealElements.forEach(
      (element) => {
        element.classList.add(
          "is-visible"
        );
      }
    );

    animatedSections.forEach(
      (section) => {
        section.classList.add(
          "is-visible"
        );
      }
    );

  }


  /* ==========================================================
     ACTIVE NAV
  =========================================================== */

  const sections =
    document.querySelectorAll(
      "main section[id]"
    );

  const navLinks =
    document.querySelectorAll(
      ".main-nav a"
    );


  if (
    "IntersectionObserver" in window &&
    sections.length &&
    navLinks.length
  ) {

    const sectionMap =
      new Map();

    navLinks.forEach((link) => {

      const href =
        link.getAttribute("href");

      if (
        href &&
        href.startsWith("#")
      ) {

        sectionMap.set(
          href.substring(1),
          link
        );
      }

    });


    const navObserver =
      new IntersectionObserver(
        (entries) => {

          entries.forEach((entry) => {

            if (!entry.isIntersecting) {
              return;
            }

            navLinks.forEach(
              (link) => {
                link.classList.remove(
                  "is-active"
                );
              }
            );

            const activeLink =
              sectionMap.get(
                entry.target.id
              );

            if (activeLink) {

              activeLink.classList.add(
                "is-active"
              );
            }

          });

        },
        {
          rootMargin:
            "-35% 0px -55% 0px",
          threshold: 0
        }
      );


    sections.forEach(
      (section) => {
        navObserver.observe(section);
      }
    );

  }


  /* ==========================================================
     FECHAMENTO DO MENU AO CLICAR FORA
  =========================================================== */

  document.addEventListener(
    "click",
    (event) => {

      if (!mainNav || !menuToggle) {
        return;
      }

      const clickedInsideMenu =
        mainNav.contains(event.target);

      const clickedButton =
        menuToggle.contains(event.target);

      if (
        mainNav.classList.contains("is-open") &&
        !clickedInsideMenu &&
        !clickedButton
      ) {

        closeMenu();
      }

    }
  );


  /* ==========================================================
     AJUSTE PARA LINKS INTERNOS
  =========================================================== */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach((link) => {

      link.addEventListener(
        "click",
        (event) => {

          const targetId =
            link.getAttribute("href");

          if (
            !targetId ||
            targetId === "#"
          ) {
            return;
          }

          const target =
            document.querySelector(
              targetId
            );

          if (!target) {
            return;
          }

          event.preventDefault();

          const headerHeight =
            header
              ? header.offsetHeight
              : 0;

          const targetPosition =
            target.getBoundingClientRect().top +
            window.scrollY -
            headerHeight +
            1;

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
          });

        }
      );

    });

});