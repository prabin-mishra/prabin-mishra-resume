/* ============================================================
   Site interactions: theme, reveals, counters, timeline, nav.
   No dependencies. Everything respects prefers-reduced-motion.
   ============================================================ */

(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------- Theme toggle ---------------- */

  const themeBtn = document.getElementById("theme-toggle");
  const themeMeta = document.querySelector('meta[name="theme-color"]');

  function applyThemeUI() {
    const theme = document.documentElement.dataset.theme;
    if (themeMeta) themeMeta.content = theme === "dark" ? "#0a0a0c" : "#fafafa";
    themeBtn.setAttribute("aria-pressed", theme === "light" ? "true" : "false");
    themeBtn.querySelector(".sr-only").textContent =
      theme === "dark" ? "Switch to light theme" : "Switch to dark theme";
  }

  themeBtn.addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("pm-theme", next); } catch (e) { /* private mode */ }
    applyThemeUI();
  });
  applyThemeUI();

  /* ---------------- Header state ---------------- */

  const header = document.getElementById("site-header");
  function onHeaderScroll() {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  }
  window.addEventListener("scroll", onHeaderScroll, { passive: true });
  onHeaderScroll();

  /* ---------------- Mobile nav ---------------- */

  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");

  navToggle.addEventListener("click", () => {
    const open = navMenu.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(open));
  });
  navMenu.addEventListener("click", e => {
    if (e.target.closest("a")) {
      navMenu.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });

  /* ---------------- Scroll-spy ---------------- */

  const navLinks = Array.from(navMenu.querySelectorAll("a[href^='#']"));
  const spyTargets = navLinks
    .map(a => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window && spyTargets.length) {
    const spy = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navLinks.forEach(a =>
          a.classList.toggle("is-active", a.getAttribute("href") === "#" + entry.target.id));
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    spyTargets.forEach(t => spy.observe(t));
  }

  /* ---------------- Reveal on scroll ---------------- */

  const revealEls = Array.from(document.querySelectorAll(".reveal"));
  if (!reduceMotion && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(entries => {
      let batch = 0;
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.style.setProperty("--reveal-delay", Math.min(batch++ * 70, 350) + "ms");
        entry.target.classList.add("in-view");
        io.unobserve(entry.target);
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -8% 0px" });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add("in-view"));
  }

  /* ---------------- Animated counters ---------------- */

  const counters = Array.from(document.querySelectorAll(".count"));

  function formatValue(el, value) {
    const prefix = el.dataset.prefix || "";
    const suffix = el.dataset.suffix || "";
    const num = el.dataset.format === "comma"
      ? Math.round(value).toLocaleString("en-US")
      : String(Math.round(value));
    return prefix + num + suffix;
  }

  function animateCount(el) {
    const target = parseFloat(el.dataset.countTo);
    const duration = 1500;
    const start = performance.now();
    function frame(now) {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3); /* easeOutCubic */
      el.textContent = formatValue(el, target * eased);
      if (t < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  /* Final values are hard-coded in the HTML, so no-JS and
     reduced-motion visitors always see the real numbers. */
  if (!reduceMotion && "IntersectionObserver" in window && counters.length) {
    const cio = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        animateCount(entry.target);
        cio.unobserve(entry.target);
      });
    }, { threshold: 0.5 });
    counters.forEach(el => cio.observe(el));
  }

  /* ---------------- Timeline: expand / collapse ---------------- */

  document.querySelectorAll(".tl-toggle").forEach(btn => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".tl-item");
      const open = item.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", String(open));
    });
  });

  /* ---------------- Timeline: scroll-driven progress line ---------------- */

  const timeline = document.getElementById("timeline");
  const fill = document.getElementById("timeline-fill");

  if (timeline && fill && !reduceMotion) {
    let ticking = false;
    function updateFill() {
      const rect = timeline.getBoundingClientRect();
      const focal = window.innerHeight * 0.7; /* line fills as items pass 70% of viewport */
      const progress = Math.min(1, Math.max(0, (focal - rect.top) / rect.height));
      fill.style.transform = "scaleY(" + progress.toFixed(4) + ")";
      ticking = false;
    }
    function requestFill() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateFill);
      }
    }
    window.addEventListener("scroll", requestFill, { passive: true });
    window.addEventListener("resize", requestFill, { passive: true });
    updateFill();
  }
})();
