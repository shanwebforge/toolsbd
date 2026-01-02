document.addEventListener("DOMContentLoaded", function() {
  fetch('/components/footer.html')
    .then(res => {
      if (!res.ok) {
        throw new Error("Footer file not found");
      }
      return res.text();
    })
    .then(data => {
      const placeholder = document.createElement('div');
      placeholder.innerHTML = data;
      document.body.appendChild(placeholder);
      
      // Force adjust footer margin for ALL pages
      forceAdjustFooterMargin();
      
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
  
  // Strong function to force footer margin
  function forceAdjustFooterMargin() {
    console.log('=== FORCE ADJUSTING FOOTER MARGIN ===');
    
    const isDesktop = window.innerWidth >= 992;
    const leftPanel = document.querySelector('.left-panel');
    const footerSection = document.querySelector('.footer-section');
    
    if (!footerSection) {
      console.error('Footer section not found!');
      return;
    }
    
    console.log('Desktop:', isDesktop);
    console.log('Left Panel exists:', !!leftPanel);
    
    // ALWAYS apply margin on desktop regardless of left panel
    if (isDesktop) {
      console.log('Applying desktop footer styling');
      
      // Remove any existing classes first
      footerSection.classList.remove('has-left-panel-margin');
      
      // Force reflow
      void footerSection.offsetWidth;
      
      // Add the class
      footerSection.classList.add('has-left-panel-margin');
      
      // Apply inline styles as backup
      footerSection.style.cssText = `
        margin-left: 280px !important;
        width: calc(100% - 280px) !important;
        max-width: calc(1400px - 280px) !important;
        padding: 10px 15px 20px !important;
        box-sizing: border-box !important;
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
      `;
      
      console.log('Footer style applied:', footerSection.style.cssText);
    } else {
      console.log('Mobile/Tablet - Removing margin');
      footerSection.classList.remove('has-left-panel-margin');
      footerSection.style.cssText = `
        margin-left: auto !important;
        margin-right: auto !important;
        max-width: 1400px !important;
        width: 100% !important;
        padding: 10px 15px 20px !important;
        box-sizing: border-box !important;
      `;
    }
    
    console.log('=== FOOTER ADJUSTMENT COMPLETE ===');
  }
  
  // Adjust on resize with debounce
  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(forceAdjustFooterMargin, 250);
  });
  
  // Run again after a short delay to ensure everything loaded
  setTimeout(forceAdjustFooterMargin, 500);
  setTimeout(forceAdjustFooterMargin, 1000);
  
  // Also run when window loads completely
  window.addEventListener('load', function() {
    setTimeout(forceAdjustFooterMargin, 300);
  });
  
  // Use MutationObserver for dynamic content
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'childList' || mutation.attributeName === 'style' || mutation.attributeName === 'class') {
        setTimeout(forceAdjustFooterMargin, 100);
      }
    });
  });
  
  // Observe body for any changes
  observer.observe(document.body, { 
    childList: true, 
    subtree: true,
    attributes: true,
    attributeFilter: ['style', 'class']
  });
});