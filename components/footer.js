document.addEventListener("DOMContentLoaded", function() {
  fetch('/components/footer.html')
    .then(res => {
      if (!res.ok) {
        throw new Error("Footer file not found");
      }
      return res.text();
    })
    .then(data => {
      // Footer DOM তৈরি করে body-এর শেষে যোগ করা
      const placeholder = document.createElement('div');
      placeholder.innerHTML = data;
      document.body.appendChild(placeholder);
      
      // ===== FOOTER MARGIN ADJUSTMENT =====
      adjustFooterMargin();
      // ===== END FOOTER MARGIN ADJUSTMENT =====
      
      // Footer menu active link
      const links = document.querySelectorAll(".footer-menu a");
      const currentPath = window.location.pathname;

      links.forEach(link => {
        if (link.getAttribute("href") === currentPath ||
            (currentPath === "/" && link.getAttribute("href") === "/index.html")) {
          link.classList.add("active");
        }
      });
    })
    .catch(error => {
      console.error("Footer load error:", error.message);
    });
  
// আপনার existing JS-এর মধ্যে এই function update করুন
function adjustFooterMargin() {
    const isIndexPage = window.location.pathname === '/' || 
                       window.location.pathname === '/index.html' ||
                       window.location.pathname === '/index' ||
                       window.location.pathname.endsWith('/');
    
    const isDesktop = window.innerWidth >= 992;
    const leftPanel = document.querySelector('.left-panel');
    const footerSection = document.querySelector('.footer-section');
    
    if (!footerSection) return;
    
    // Apply margin only to index.html on desktop with left panel
    if (isIndexPage && isDesktop && leftPanel) {
      footerSection.classList.add('index-footer-margin');
      
      // FORCE apply styles
// FORCE apply styles অংশ update করুন
footerSection.style.cssText = `
  margin-left: 280px !important; /* এখানেও same value দিন */
  width: calc(100% - 280px) !important;
  padding: 0 10px !important;
  box-sizing: border-box !important;
`;
      
      // Also apply to .footer-bg
      const footerBg = footerSection.querySelector('.footer-bg');
      if (footerBg) {
        footerBg.style.cssText = `
          width: 100% !important;
          padding: 10px !important;
          box-sizing: border-box !important;
        `;
      }
    } else {
      footerSection.classList.remove('index-footer-margin');
      footerSection.style.cssText = '';
      
      const footerBg = footerSection.querySelector('.footer-bg');
      if (footerBg) {
        footerBg.style.cssText = '';
      }
    }
}
  
  // Adjust footer on window resize
  window.addEventListener('resize', adjustFooterMargin);
  
  // Adjust footer when left panel visibility changes
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.attributeName === 'style' || mutation.attributeName === 'class') {
        setTimeout(adjustFooterMargin, 100);
      }
    });
  });
  
  const leftPanel = document.querySelector('.left-panel');
  if (leftPanel) {
    observer.observe(leftPanel, { attributes: true });
  }
});