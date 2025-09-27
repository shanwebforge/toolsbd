
(function () {
  const modal = document.getElementById('appDownloadModal');
  const closeBtn = document.getElementById('appModalClose');

  const SHOW_AFTER_MS = 1200;   // প্রথমবার: পেজ লোডের ~1.2s পর
  const REPEAT_MS = 4 * 60 * 1000; // প্রতি 8 মিনিটে

  function lockScroll(lock) {
    document.documentElement.style.overflow = lock ? 'hidden' : '';
    document.body.style.overflow = lock ? 'hidden' : '';
  }

  function showModal() {
    if (!modal) return;
    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
    lockScroll(true);

    // দেখার সময় localStorage এ সেভ কর
    localStorage.setItem('lastAppModal', Date.now());
  }

  function hideModal() {
    if (!modal) return;
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    lockScroll(false);
  }

  // backdrop এ ক্লিক করলে বন্ধ
  modal?.addEventListener('click', (e) => {
    if (e.target.classList.contains('app-modal-backdrop')) hideModal();
  });

  // X বাটনে ক্লিক করলে বন্ধ
  closeBtn?.addEventListener('click', hideModal);

  // ESC প্রেস করলে বন্ধ
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') hideModal();
  });

  // লোড হলে দেখাও
  window.addEventListener('load', () => {
    const lastShown = localStorage.getItem('lastAppModal');
    const now = Date.now();

    // যদি আগের দেখানো থেকে 8 মিনিট পেরিয়ে গেছে অথবা প্রথমবার
    if (!lastShown || now - lastShown > REPEAT_MS) {
      setTimeout(showModal, SHOW_AFTER_MS);
    }

    // প্রতি 8 মিনিট পর দেখানোর জন্য interval
    setInterval(() => {
      const last = localStorage.getItem('lastAppModal');
      if (!last || Date.now() - last > REPEAT_MS) {
        showModal();
      }
    }, 1000 * 60); // প্রতি মিনিটে চেক করবে
  });
})();


