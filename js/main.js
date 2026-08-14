/* Frankie & Fanucci's — shared interactions */
(function () {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function initCursor() {
    const cursor = document.getElementById("cursor");
    const ring = document.getElementById("cursorRing");
    if (!cursor || !ring) return;
    if (reduceMotion || window.matchMedia("(pointer: coarse)").matches) {
      cursor.style.display = "none";
      ring.style.display = "none";
      document.body.style.cursor = "auto";
      return;
    }

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + "px";
      cursor.style.top = mouseY + "px";
    });

    (function animateRing() {
      ringX += (mouseX - ringX) * 0.14;
      ringY += (mouseY - ringY) * 0.14;
      ring.style.left = ringX + "px";
      ring.style.top = ringY + "px";
      requestAnimationFrame(animateRing);
    })();

    document.querySelectorAll("a, button, .menu-tab, .food-card, .explore-card").forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursor.classList.add("hover");
        ring.classList.add("hover");
      });
      el.addEventListener("mouseleave", () => {
        cursor.classList.remove("hover");
        ring.classList.remove("hover");
      });
    });
  }

  function initNav() {
    const nav = document.getElementById("mainNav");
    if (!nav) return;
    const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const btn = document.getElementById("hamburgerBtn");
    const mob = document.getElementById("mobileMenu");
    if (!btn || !mob) return;

    function setMenuOpen(open) {
      mob.classList.toggle("open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      mob.setAttribute("aria-hidden", open ? "false" : "true");
      document.body.classList.toggle("mobile-menu-open", open);
      if (open) {
        mob.scrollTop = 0;
      }
    }

    btn.addEventListener("click", () => {
      setMenuOpen(!mob.classList.contains("open"));
    });

    mob.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setMenuOpen(false));
    });

    window.closeMobile = function closeMobile() {
      setMenuOpen(false);
    };
  }

  function initHeroSlideshow() {
    const slides = document.querySelectorAll(".hero-slide");
    if (slides.length < 2 || reduceMotion) return;
    let current = 0;
    setInterval(() => {
      slides[current].classList.remove("active");
      current = (current + 1) % slides.length;
      slides[current].classList.add("active");
    }, 5000);
  }

  function initFoodCarousel() {
    const track = document.querySelector("[data-food-carousel]");
    if (!track) return;

    const set = track.querySelector(".carousel-set");
    if (!set) return;

    if (reduceMotion) return;

    if (!track.dataset.cloned) {
      const clone = set.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      clone.querySelectorAll("img").forEach((img) => {
        img.setAttribute("loading", "eager");
        img.removeAttribute("fetchpriority");
      });
      track.appendChild(clone);
      track.dataset.cloned = "true";
    }

    // Match previous 40s full-loop timing; px/s is identical in Safari & Chrome
    const LOOP_DURATION_MS = 40000;
    let distance = 0;
    let offset = 0;
    let hoverPaused = false;
    let rafId = 0;
    let lastTs = 0;

    function isPaused() {
      return hoverPaused || document.hidden;
    }

    function applyTransform() {
      const value = "translate3d(" + -offset + "px, 0, 0)";
      track.style.transform = value;
      track.style.webkitTransform = value;
    }

    function measure() {
      const styles = window.getComputedStyle(track);
      const gap = parseFloat(styles.columnGap || styles.gap) || 0;
      const next = set.getBoundingClientRect().width + gap;
      if (next > 0) {
        distance = next;
        if (offset >= distance) offset = offset % distance;
        applyTransform();
      }
    }

    function tick(ts) {
      if (!lastTs) lastTs = ts;
      const delta = Math.min(ts - lastTs, 64);
      lastTs = ts;

      if (!isPaused() && distance > 0) {
        offset += (distance / LOOP_DURATION_MS) * delta;
        while (offset >= distance) offset -= distance;
        applyTransform();
      }

      rafId = requestAnimationFrame(tick);
    }

    measure();
    requestAnimationFrame(measure);
    rafId = requestAnimationFrame(tick);

    const imgs = track.querySelectorAll("img");
    imgs.forEach((img) => {
      if (img.complete) return;
      img.addEventListener("load", measure, { once: true });
      img.addEventListener("error", measure, { once: true });
    });

    let resizeTimer = 0;
    window.addEventListener(
      "resize",
      () => {
        window.clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(measure, 150);
      },
      { passive: true }
    );

    // Sticky :hover on iOS pauses forever; only pause for real desktop hover
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (canHover) {
      track.addEventListener("mouseenter", () => {
        hoverPaused = true;
      });
      track.addEventListener("mouseleave", () => {
        hoverPaused = false;
        lastTs = 0;
      });
    }

    document.addEventListener("visibilitychange", () => {
      lastTs = 0;
    });

    window.addEventListener(
      "pagehide",
      () => {
        if (rafId) cancelAnimationFrame(rafId);
      },
      { once: true }
    );
  }

  function initMenuTabs() {
    const tabs = document.querySelectorAll(".menu-tab");
    if (!tabs.length) return;

    window.switchTab = function switchTab(id, evt) {
      document.querySelectorAll(".menu-tab").forEach((t) => t.classList.remove("active"));
      document.querySelectorAll(".menu-panel").forEach((p) => p.classList.remove("active"));
      const trigger = evt && evt.currentTarget ? evt.currentTarget : document.querySelector(`.menu-tab[data-tab="${id}"]`);
      if (trigger) trigger.classList.add("active");
      const panel = document.getElementById("panel-" + id);
      if (panel) panel.classList.add("active");
    };

    tabs.forEach((tab) => {
      tab.addEventListener("click", (e) => {
        const id = tab.getAttribute("data-tab");
        if (id) window.switchTab(id, e);
      });
    });
  }

  function initReveal() {
    const reveals = document.querySelectorAll(".reveal");
    if (!reveals.length) return;
    if (reduceMotion) {
      reveals.forEach((el) => el.classList.add("visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    reveals.forEach((el) => observer.observe(el));
  }

  window.KORA_CONFIG = window.KORA_CONFIG || {
    apiBaseUrl: "https://kora-agent.grubtok.com",
    businessId: "054a59df-cbf7-4dcb-b1c7-b702e1dc8f64"
  };

  window.handleNewsletter = async function handleNewsletter(e) {
    e.preventDefault();

    const cfg = window.KORA_CONFIG || {};
    const apiBaseUrl = (cfg.apiBaseUrl || "").replace(/\/+$/, "");
    const businessId = (cfg.businessId || "").trim();

    const emailEl = document.getElementById("newsletter-email");
    const phoneEl = document.getElementById("newsletter-phone");
    const emailOptEl = document.getElementById("newsletter-email-optin");
    const smsOptEl = document.getElementById("newsletter-sms-optin");
    const messageEl = document.getElementById("newsletter-message");
    const submitBtn = e.target.querySelector('button[type="submit"]');

    const email = emailEl ? emailEl.value.trim() : "";
    const phone = phoneEl ? phoneEl.value.trim() : "";
    const emailOptIn = emailOptEl ? emailOptEl.checked : false;
    const smsOptIn = smsOptEl ? smsOptEl.checked : false;

    function showMessage(text, isError) {
      if (!messageEl) return;
      messageEl.textContent = text || "";
      messageEl.style.color = isError ? "#ffb4b4" : "#9ff0b1";
    }

    if (!apiBaseUrl || !businessId) {
      showMessage("Newsletter is not configured yet.", true);
      return;
    }
    if (!emailOptIn && !smsOptIn) {
      showMessage("Select at least one option: email or SMS.", true);
      return;
    }
    if (emailOptIn && !email) {
      showMessage("Enter your email for email updates.", true);
      return;
    }
    if (smsOptIn && !phone) {
      showMessage("Enter your phone number for SMS updates.", true);
      return;
    }
    const emailValid = !email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (emailOptIn && !emailValid) {
      showMessage("Enter a valid email address.", true);
      return;
    }

    if (submitBtn) submitBtn.disabled = true;
    showMessage("Subscribing...", false);

    try {
      const response = await fetch(`${apiBaseUrl}/api/v1/public/newsletter/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          business_id: businessId,
          email: emailOptIn ? email : null,
          phone_number: smsOptIn ? phone : null,
          email_opt_in: emailOptIn,
          sms_opt_in: smsOptIn,
          source: "static_site_widget"
        })
      });
      if (!response.ok) throw new Error("Subscription failed");
      const data = await response.json();
      showMessage(data.message || "Thank you for subscribing!", false);
      if (emailEl) emailEl.value = "";
      if (phoneEl) phoneEl.value = "";
      if (emailOptEl) emailOptEl.checked = false;
      if (smsOptEl) smsOptEl.checked = false;
    } catch (error) {
      showMessage("Something went wrong. Please try again.", true);
    } finally {
      if (submitBtn) submitBtn.disabled = false;
    }
  };

  function start() {
    initCursor();
    initNav();
    initHeroSlideshow();
    initFoodCarousel();
    initMenuTabs();
    initReveal();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
