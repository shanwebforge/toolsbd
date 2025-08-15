
(function () {
  const modal = document.getElementById('appDownloadModal');
  const closeBtn = document.getElementById('appModalClose');
  let reopenTimer = null;

  const SHOW_AFTER_MS = 1200;      // প্রথমবার: পেজ লোডের ~1.2s পর
  const REPEAT_MS = 240000;        // প্রতি 4 মিনিটে (4 * 60 * 1000)

  function lockScroll(lock) {
    document.documentElement.style.overflow = lock ? 'hidden' : '';
    document.body.style.overflow = lock ? 'hidden' : '';
  }

  function showModal() {
    if (!modal) return;
    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
    lockScroll(true);
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

  // লোড হলে দেখাও + প্রতি 4 মিনিটে দেখাও
  window.addEventListener('load', () => {
    // প্রথমবার
    setTimeout(showModal, SHOW_AFTER_MS);

    // বারবার
    reopenTimer = setInterval(showModal, REPEAT_MS);
  });
})();

