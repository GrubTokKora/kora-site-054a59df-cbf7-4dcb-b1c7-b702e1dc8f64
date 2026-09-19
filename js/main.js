/* Frankie & Fanucci's — shared interactions */
(function () {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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

  function initDropdowns() {
    const nav = document.getElementById("mainNav");
    if (!nav) return;
    const drops = nav.querySelectorAll(".nav-drop");
    if (!drops.length) return;
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)");
    function closeAll(except) {
      drops.forEach((d) => {
        if (except && d === except) return;
        d.classList.remove("open");
        const t = d.querySelector(".nav-drop-btn");
        if (t) t.setAttribute("aria-expanded", "false");
      });
    }
    drops.forEach((drop) => {
      const trigger = drop.querySelector(".nav-drop-btn");
      if (!trigger) return;
      trigger.addEventListener("click", (e) => {
        e.stopPropagation();
        const willOpen = !drop.classList.contains("open");
        closeAll(willOpen ? drop : null);
        drop.classList.toggle("open", willOpen);
        trigger.setAttribute("aria-expanded", willOpen ? "true" : "false");
      });
      drop.addEventListener("mouseenter", () => {
        if (!canHover.matches) return;
        closeAll(drop);
        drop.classList.add("open");
        trigger.setAttribute("aria-expanded", "true");
      });
      drop.addEventListener("mouseleave", () => {
        if (!canHover.matches) return;
        drop.classList.remove("open");
        trigger.setAttribute("aria-expanded", "false");
      });
    });
    document.addEventListener("click", () => closeAll(null));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeAll(null); });
  }

  function initHeroSlideshow() {
    // Legacy slideshow — no-op now; video handled by initHeroVideo()
  }

  function initHeroVideo() {
    const video  = document.getElementById("heroVideo");
    const poster = document.getElementById("heroPoster");
    if (!video || !poster) return;

    // Respect user motion preference — keep the static poster instead
    if (reduceMotion) return;

    const VIDEO_SRC = "https://stream.mux.com/qr1Tugxb5YVPf5qWPtJSxeU3019FIsXHnY00lUuVPgn7g/high.mp4";

    function loadVideo() {
      // Set src now that the page is idle — avoids competing with LCP
      video.src = VIDEO_SRC;

      // Reveal the video ONLY once it is actually playing — if autoplay is
      // blocked, the poster image stays visible underneath (no blank frame).
      video.addEventListener("playing", function () {
        video.classList.add("ready");
      }, { once: true });

      var tryPlay = function () {
        var p = video.play();
        if (p && p.catch) p.catch(() => {});
      };
      video.addEventListener("canplay", tryPlay, { once: true });
      video.addEventListener("loadeddata", tryPlay, { once: true });

      video.load();
    }

    // Use requestIdleCallback to defer src injection until browser is idle
    // so it never blocks the LCP image or first paint
    if ("requestIdleCallback" in window) {
      requestIdleCallback(loadVideo, { timeout: 3000 });
    } else {
      // Fallback for Safari: wait until after load event
      if (document.readyState === "complete") {
        setTimeout(loadVideo, 200);
      } else {
        window.addEventListener("load", () => setTimeout(loadVideo, 200), { once: true });
      }
    }
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
      // Keep loading="lazy" on clones — forcing eager competed with the hero LCP
      // and fetched the full carousel twice on first paint.
      clone.querySelectorAll("img").forEach((img) => {
        img.setAttribute("loading", "lazy");
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

    requestAnimationFrame(() => {
      const vh = window.innerHeight || document.documentElement.clientHeight;
      reveals.forEach((el) => {
        if (el.classList.contains("visible")) return;
        const rect = el.getBoundingClientRect();
        if (rect.top < vh && rect.bottom > 0) {
          el.classList.add("visible");
          observer.unobserve(el);
        }
      });
    });
  }

  function initFaq() {
    const list = document.querySelector(".faq-list");
    if (!list) return;

    const items = Array.from(list.querySelectorAll(".faq-item"));
    if (!items.length) return;

    function setPanelHeight(panel, open) {
      if (!panel) return;
      if (reduceMotion) {
        panel.style.height = open ? "auto" : "0px";
        panel.style.opacity = open ? "1" : "0";
        return;
      }
      if (open) {
        panel.hidden = false;
        panel.style.height = "0px";
        panel.style.opacity = "0";
        // Force reflow so the open transition runs from 0
        void panel.offsetHeight;
        panel.style.height = panel.scrollHeight + "px";
        panel.style.opacity = "1";
      } else {
        panel.style.height = panel.scrollHeight + "px";
        panel.style.opacity = "1";
        void panel.offsetHeight;
        panel.style.height = "0px";
        panel.style.opacity = "0";
      }
    }

    function closeItem(item) {
      const trigger = item.querySelector(".faq-trigger");
      const panel = item.querySelector(".faq-panel");
      if (!trigger || !panel) return;
      if (!item.classList.contains("is-open")) return;

      item.classList.remove("is-open");
      trigger.setAttribute("aria-expanded", "false");
      setPanelHeight(panel, false);

      const onEnd = (e) => {
        if (e.propertyName !== "height") return;
        panel.hidden = true;
        panel.style.height = "";
        panel.removeEventListener("transitionend", onEnd);
      };
      if (reduceMotion) {
        panel.hidden = true;
        panel.style.height = "";
      } else {
        panel.addEventListener("transitionend", onEnd);
      }
    }

    function openItem(item) {
      const trigger = item.querySelector(".faq-trigger");
      const panel = item.querySelector(".faq-panel");
      if (!trigger || !panel) return;

      items.forEach((other) => {
        if (other !== item) closeItem(other);
      });

      item.classList.add("is-open");
      trigger.setAttribute("aria-expanded", "true");
      panel.hidden = false;
      setPanelHeight(panel, true);

      const onEnd = (e) => {
        if (e.propertyName !== "height") return;
        if (item.classList.contains("is-open")) {
          panel.style.height = "auto";
        }
        panel.removeEventListener("transitionend", onEnd);
      };
      if (reduceMotion) {
        panel.style.height = "auto";
        panel.style.opacity = "1";
      } else {
        panel.addEventListener("transitionend", onEnd);
      }
    }

    // Seed open state for the first item (marked is-open in HTML)
    items.forEach((item) => {
      const panel = item.querySelector(".faq-panel");
      const trigger = item.querySelector(".faq-trigger");
      if (!panel || !trigger) return;
      if (item.classList.contains("is-open")) {
        panel.hidden = false;
        panel.style.height = "auto";
        panel.style.opacity = "1";
        trigger.setAttribute("aria-expanded", "true");
      } else {
        panel.hidden = true;
        panel.style.height = "0px";
        panel.style.opacity = "0";
        trigger.setAttribute("aria-expanded", "false");
      }
    });

    items.forEach((item, index) => {
      const trigger = item.querySelector(".faq-trigger");
      if (!trigger) return;

      trigger.addEventListener("click", () => {
        if (item.classList.contains("is-open")) {
          closeItem(item);
        } else {
          openItem(item);
        }
      });

      trigger.addEventListener("keydown", (e) => {
        if (e.key !== "ArrowDown" && e.key !== "ArrowUp" && e.key !== "Home" && e.key !== "End") return;
        e.preventDefault();
        let next = index;
        if (e.key === "ArrowDown") next = (index + 1) % items.length;
        if (e.key === "ArrowUp") next = (index - 1 + items.length) % items.length;
        if (e.key === "Home") next = 0;
        if (e.key === "End") next = items.length - 1;
        const nextTrigger = items[next].querySelector(".faq-trigger");
        if (nextTrigger) nextTrigger.focus();
      });
    });
  }

  function initLazyMaps() {
    const maps = document.querySelectorAll("iframe.map-embed[data-src]");
    if (!maps.length) return;

    function loadMap(iframe) {
      const src = iframe.getAttribute("data-src");
      if (!src || iframe.getAttribute("src")) return;
      iframe.setAttribute("src", src);
      iframe.removeAttribute("data-src");
      iframe.classList.add("is-loaded");
    }

    if (!("IntersectionObserver" in window)) {
      maps.forEach(loadMap);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          loadMap(entry.target);
          observer.unobserve(entry.target);
        });
      },
      {
        // Start loading a bit before it enters the viewport
        rootMargin: "200px 0px",
        threshold: 0.01,
      }
    );

    maps.forEach((iframe) => observer.observe(iframe));
  }

  function start() {
    initNav();
    initDropdowns();
    initHeroSlideshow();
    initHeroVideo();
    initFoodCarousel();
    initMenuTabs();
    initFaq();
    initLazyMaps();
    initReveal();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
