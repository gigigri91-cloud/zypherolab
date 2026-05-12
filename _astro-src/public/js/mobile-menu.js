(function() {
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
  const mobileMenuClose = document.querySelector('.mobile-menu-close');
  const mobileMenuNavLinks = document.querySelectorAll('.mobile-menu-nav a');
  if (!(hamburger && mobileMenu && mobileMenuOverlay)) return;

  function setMobileMenuFocusable(isOpen) {
    mobileMenu.querySelectorAll('a, button').forEach((el) => {
      if (isOpen) {
        el.removeAttribute('tabindex');
      } else {
        el.setAttribute('tabindex', '-1');
      }
    });
  }

  function openMobileMenu() {
    mobileMenu.classList.add('is-active');
    mobileMenuOverlay.classList.add('is-active');
    document.body.classList.add('mobile-menu-open');
    hamburger.setAttribute('aria-expanded', 'true');
    hamburger.setAttribute('aria-label', hamburger.getAttribute('aria-label').replace('Deschide', 'Închide').replace('Open', 'Close'));
    mobileMenu.setAttribute('aria-hidden', 'false');
    mobileMenuOverlay.setAttribute('aria-hidden', 'false');
    setMobileMenuFocusable(true);
    const firstLink = mobileMenuNavLinks[0];
    if (firstLink) firstLink.focus();
  }

  function closeMobileMenu() {
    mobileMenu.classList.remove('is-active');
    mobileMenuOverlay.classList.remove('is-active');
    document.body.classList.remove('mobile-menu-open');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', hamburger.getAttribute('aria-label').replace('Închide', 'Deschide').replace('Close', 'Open'));
    mobileMenu.setAttribute('aria-hidden', 'true');
    mobileMenuOverlay.setAttribute('aria-hidden', 'true');
    setMobileMenuFocusable(false);
    hamburger.focus();
  }

  function toggleMobileMenu() {
    const isOpen = mobileMenu.classList.contains('is-active');
    if (isOpen) { closeMobileMenu(); } else { openMobileMenu(); }
  }

  setMobileMenuFocusable(false);

  if (hamburger) hamburger.addEventListener('click', toggleMobileMenu);
  if (mobileMenuClose) mobileMenuClose.addEventListener('click', closeMobileMenu);
  if (mobileMenuOverlay) mobileMenuOverlay.addEventListener('click', closeMobileMenu);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('is-active')) closeMobileMenu();
  });

  mobileMenuNavLinks.forEach(link => {
    link.addEventListener('click', () => closeMobileMenu());
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && mobileMenu.classList.contains('is-active')) closeMobileMenu();
  });
})();
