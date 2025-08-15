
(function () {
  function applyLayoutOffsets() {
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');

    const headerH = header ? header.offsetHeight : 0;
    const footerH = footer && getComputedStyle(footer).position === 'fixed'
      ? footer.offsetHeight
      : 0;

    // body padding আপডেট
    document.body.style.paddingTop = headerH + 'px';
    document.body.style.paddingBottom = footerH + 'px';
  }

  // হেডার/ফুটার লোড হলে ও রিসাইজে আপডেট
  window.addEventListener('load', applyLayoutOffsets);
  window.addEventListener('resize', applyLayoutOffsets);

  // হেডার/ফুটার সাইজ ডাইনামিক বদলালে (যেমন সার্চ/মেনু খোলা)
  const ro = new ResizeObserver(applyLayoutOffsets);
  const tryObserve = () => {
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    if (header) ro.observe(header);
    if (footer) ro.observe(footer);
  };
  // হেডার স্ক্রিপ্ট async হলে একটু দেরি করে দেখো
  setTimeout(tryObserve, 0);
})();

