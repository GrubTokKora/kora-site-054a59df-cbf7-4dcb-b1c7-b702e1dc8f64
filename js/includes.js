/* Frankie & Fanucci's — shared chrome */
(function () {
  const ORDER = "https://order.toasttab.com/online/fandfpizza";
  const GIFTCARDS = "https://order.toasttab.com/egiftcards/fandfpizza";
  const INSTAGRAM = "https://www.instagram.com/fandfpizza";
  const PHONE = "9146304360";
  const PHONE_DISPLAY = "(914) 630-4360";
  const EMAIL = "info@FandFpizza.com";
  const MAPS = "https://maps.app.goo.gl/46oFBpwPPzhscmRL8";
  const LOGO =
    "https://quseprdus1.blob.core.windows.net/kora-business-images/user-media/054a59df-cbf7-4dcb-b1c7-b702e1dc8f64/de8c94d8-887e-4625-825f-ec262dbc28df/1786683078_rrbxh1.jpg";

  window.FF_LINKS = { ORDER, GIFTCARDS, INSTAGRAM, PHONE, PHONE_DISPLAY, EMAIL, MAPS, LOGO };

  function active(page, id) {
    return page === id ? ' aria-current="page"' : "";
  }

  function mountNav(el, page) {
    el.innerHTML = `
<a class="nav-logo" href="index.html">
  <img alt="Frankie &amp; Fanucci's logo" src="${LOGO}" width="48" height="48"/>
  <div class="nav-logo-text">Frankie &amp;<br/>Fanucci's</div>
</a>
<ul class="nav-links">
  <li><a href="menu.html"${active(page, "menu")}>Menu</a></li>
  <li><a href="delivery.html"${active(page, "delivery")}>Delivery</a></li>
  <li><a href="catering.html"${active(page, "catering")}>Catering</a></li>
  <li><a href="groups.html"${active(page, "groups")}>Groups</a></li>
  <li><a href="happy-hour.html"${active(page, "happyhour")}>Happy Hour</a></li>
  <li><a href="rewards.html"${active(page, "rewards")}>Rewards</a></li>
  <li><a href="contact.html"${active(page, "contact")}>Find Us</a></li>
</ul>
<a class="nav-order-btn" href="${ORDER}" target="_blank" rel="noopener noreferrer">Order Online</a>
<button aria-label="Open menu" aria-expanded="false" class="nav-hamburger" id="hamburgerBtn" type="button">
  <span></span><span></span><span></span>
</button>`;
  }

  function mountMobile(el, page) {
    el.innerHTML = `
<a class="mobile-nav-link" href="index.html"${active(page, "home")}>Home</a>
<a class="mobile-nav-link" href="menu.html"${active(page, "menu")}>Menu</a>
<a class="mobile-nav-link" href="delivery.html"${active(page, "delivery")}>Delivery &amp; Pickup</a>
<a class="mobile-nav-link" href="catering.html"${active(page, "catering")}>Catering</a>
<a class="mobile-nav-link" href="groups.html"${active(page, "groups")}>Groups &amp; Events</a>
<a class="mobile-nav-link" href="happy-hour.html"${active(page, "happyhour")}>Happy Hour</a>
<a class="mobile-nav-link" href="rewards.html"${active(page, "rewards")}>Rewards</a>
<a class="mobile-nav-link" href="${GIFTCARDS}" target="_blank" rel="noopener noreferrer">Gift Cards</a>
<a class="mobile-nav-link" href="contact.html"${active(page, "contact")}>Find Us</a>
<a class="mobile-nav-link" href="${ORDER}" style="color:var(--gold-light)" target="_blank" rel="noopener noreferrer">Order Online →</a>`;
  }

  function mountFooter(el) {
    const koraBranding = Array.from(
      el.querySelectorAll('[data-kora-branding-footer="true"], .kora-powered-by')
    );

    el.innerHTML = `
<div class="footer-inner">
  <div class="footer-top">
    <div class="footer-brand">
      <img alt="Frankie &amp; Fanucci's logo" loading="lazy" src="${LOGO}" width="72" height="72"/>
      <p>Frankie &amp; Fanucci's — Mamaroneck's award-winning neighborhood pizzeria. Wood-fired, scratch-made, and always fresh since day one.</p>
      <div class="footer-social-links">
        <a aria-label="Instagram" href="${INSTAGRAM}" target="_blank" rel="noopener noreferrer">
          <svg fill="none" height="16" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" width="16" aria-hidden="true">
            <rect height="20" rx="5" width="20" x="2" y="2"></rect>
            <circle cx="12" cy="12" r="4"></circle>
            <circle cx="17.5" cy="6.5" fill="currentColor" r="1" stroke="none"></circle>
          </svg>
        </a>
        <a aria-label="Phone" href="tel:${PHONE}">
          <svg fill="none" height="16" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" width="16" aria-hidden="true">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"></path>
          </svg>
        </a>
        <a aria-label="Email" href="mailto:${EMAIL}">
          <svg fill="none" height="16" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" width="16" aria-hidden="true">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
        </a>
      </div>
    </div>
    <div class="footer-col footer-col-nav">
      <div class="footer-col-title">Navigate</div>
      <ul class="footer-links">
        <li><a href="index.html">Home</a></li>
        <li><a href="menu.html">Menu</a></li>
        <li><a href="catering.html">Catering</a></li>
        <li><a href="groups.html">Groups &amp; Events</a></li>
        <li><a href="happy-hour.html">Happy Hour</a></li>
        <li><a href="rewards.html">Rewards</a></li>
        <li><a href="contact.html">Find Us</a></li>
      </ul>
    </div>
    <div class="footer-col footer-col-order">
      <div class="footer-col-title">Order</div>
      <ul class="footer-links">
        <li><a href="${ORDER}" target="_blank" rel="noopener noreferrer">Order Online</a></li>
        <li><a href="delivery.html">Delivery &amp; Pickup</a></li>
        <li><a href="${ORDER}" target="_blank" rel="noopener noreferrer">Takeout</a></li>
        <li><a href="${GIFTCARDS}" target="_blank" rel="noopener noreferrer">Gift Cards</a></li>
      </ul>
    </div>
    <div class="footer-col footer-col-contact">
      <div class="footer-col-title">Contact</div>
      <ul class="footer-links">
        <li><a href="tel:${PHONE}">${PHONE_DISPLAY}</a></li>
        <li><a href="mailto:${EMAIL}">${EMAIL}</a></li>
        <li><a href="${MAPS}" target="_blank" rel="noopener noreferrer">301 Mamaroneck Ave<br/>Mamaroneck, NY 10543</a></li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <p>© ${new Date().getFullYear()} Frankie &amp; Fanucci's. All rights reserved.</p>
    <p><a href="${INSTAGRAM}" target="_blank" rel="noopener noreferrer">@FandFpizza</a></p>
  </div>
</div>`;

    koraBranding.forEach((node) => el.appendChild(node));
  }

  function init() {
    const page = document.body.getAttribute("data-page") || "home";
    const nav = document.getElementById("mainNav");
    const mobile = document.getElementById("mobileMenu");
    const footer = document.querySelector("footer[data-footer]");
    if (nav) mountNav(nav, page);
    if (mobile) mountMobile(mobile, page);
    if (footer) mountFooter(footer);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
