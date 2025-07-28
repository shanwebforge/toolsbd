// ✅ 1. GLOBAL TRANSLATE INIT FUNCTION
window.googleTranslateElementInit = function() {
  console.log('Google Translate initialized');
  new google.translate.TranslateElement({
    pageLanguage: 'en',
    includedLanguages: 'en,bn',
    layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
    autoDisplay: false
  }, 'google_translate_element');
  
  // Check for pending language change
  if (window.pendingLangChange) {
    console.log('Executing pending language change to', window.pendingLangChange);
    triggerGoogleTranslate(window.pendingLangChange);
    window.pendingLangChange = null;
  }
};

// ✅ 2. LOAD GOOGLE TRANSLATE SCRIPT
(function() {
  const script = document.createElement('script');
  script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
  script.async = true;
  document.body.appendChild(script);
  console.log('Google Translate script loaded');
})();

document.addEventListener("DOMContentLoaded", function() {
  fetch('/components/headerhome.html')
    .then(res => res.text())
    .then(data => {
      const placeholder = document.createElement('div');
      placeholder.innerHTML = data;
      document.body.insertBefore(placeholder, document.body.firstChild);

      const langToggleIcon = document.getElementById('langToggleIcon');
      const langMenu = document.getElementById('langMenu');

      if (langToggleIcon && langMenu) {
        langToggleIcon.addEventListener('click', (e) => {
          e.stopPropagation();
          langMenu.classList.toggle('hidden');
        });

        document.addEventListener('click', (e) => {
          if (!langMenu.contains(e.target) && e.target !== langToggleIcon) {
            langMenu.classList.add('hidden');
          }
        });

        langMenu.querySelectorAll('li').forEach(li => {
          li.addEventListener('click', () => {
            const lang = li.getAttribute('data-lang');
            console.log('Language selected:', lang);
            langMenu.classList.add('hidden');
            
            if (lang === 'en') {
              resetToEnglish();
            } else {
              translateToBangla();
            }
          });
        });
      }

      function translateToBangla() {
        console.log('Attempting to translate to Bangla');
        
        // Check if Google Translate is loaded
        if (window.google && google.translate && google.translate.TranslateElement) {
          console.log('Google Translate API is available');
          triggerGoogleTranslate('bn');
        } else {
          console.log('Google Translate API not yet loaded, setting pending action');
          window.pendingLangChange = 'bn';
        }
      }

      function resetToEnglish() {
        console.log('Resetting to English');
        
        // Clear translation cookies
        document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = 'googtrans=/en/en; path=/;';
        
        // If widget is loaded, reset it
        if (document.querySelector('.goog-te-combo')) {
          const select = document.querySelector('.goog-te-combo');
          select.value = 'en';
          select.dispatchEvent(new Event('change'));
        }
        
        // Reload to ensure full reset
        setTimeout(() => location.reload(), 300);
      }

      function triggerGoogleTranslate(lang) {
        console.log('Triggering translation to', lang);
        let attempts = 0;
        const maxAttempts = 10;
        
        const interval = setInterval(() => {
          attempts++;
          const select = document.querySelector('.goog-te-combo');
          
          if (select) {
            console.log('Found translate select element');
            select.value = lang;
            select.dispatchEvent(new Event('change'));
            clearInterval(interval);
            
            // Set cookie manually
            document.cookie = `googtrans=/en/${lang}; path=/; max-age=${30*24*60*60}`;
            console.log('Translation cookie set for', lang);
          } else if (attempts >= maxAttempts) {
            console.log('Failed to find translate select element after', maxAttempts, 'attempts');
            clearInterval(interval);
          }
        }, 300);
      }








      const body = document.body;
      const menuToggle = document.getElementById('menuToggle');
      const mobileCanvas = document.getElementById('mobileCanvas');
      const closeCanvasBtn = document.getElementById('closeCanvas');

      const toggleThemeDesktop = document.getElementById('toggleThemeDesktop');
      const toggleThemeMobile = document.getElementById('toggleThemeMobile');

      // 🌙 Apply saved theme
      const savedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const isDark = savedTheme === 'dark' || (!savedTheme && prefersDark);

      document.documentElement.classList.toggle('dark-mode', isDark);
      if (toggleThemeDesktop) toggleThemeDesktop.checked = isDark;
      if (toggleThemeMobile) toggleThemeMobile.checked = isDark;

      // 🌙 Toggle theme logic
      function toggleDarkMode() {
        const enableDark = !document.documentElement.classList.contains("dark-mode");
        document.documentElement.classList.toggle("dark-mode", enableDark);
        localStorage.setItem("theme", enableDark ? "dark" : "light");

        // Sync both toggle checkboxes
        if (toggleThemeDesktop) toggleThemeDesktop.checked = enableDark;
        if (toggleThemeMobile) toggleThemeMobile.checked = enableDark;
      }

      toggleThemeDesktop?.addEventListener('change', toggleDarkMode);
      toggleThemeMobile?.addEventListener('change', toggleDarkMode);




      // 🌙 Icon-based theme toggle (follow same logic)
      const themeToggleIcon = document.getElementById('themeToggleIcon');

      if (themeToggleIcon) {
        // Set initial icon based on current theme
        themeToggleIcon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';

        // Icon click triggers same dark mode logic
        themeToggleIcon.addEventListener('click', () => {
          toggleDarkMode(); // Call your existing function

          // After theme toggled, update icon
          const nowDark = document.documentElement.classList.contains("dark-mode");
          themeToggleIcon.className = nowDark ? 'fas fa-sun' : 'fas fa-moon';
        });
      }



      // Open mobile canvas menu
      menuToggle?.addEventListener('click', () => {
        mobileCanvas.classList.add('active');
        body.style.overflow = 'hidden';
      });

      // Close mobile canvas menu
      closeCanvasBtn?.addEventListener('click', () => {
        mobileCanvas.classList.remove('active');
        body.style.overflow = '';
      });

      // Close menu when link clicked
      document.querySelectorAll('.canvas-link').forEach(link => {
        link.addEventListener('click', () => {
          mobileCanvas.classList.remove('active');
          body.style.overflow = '';
        });
      });
    })
    .catch(error => {
      console.error("Header load error:", error.message);
    });
});





// Home Dark Toggle
document.addEventListener("DOMContentLoaded", function () {
  setTimeout(() => {
    const icon = document.getElementById('themeToggleIcon');
    if (!icon) return;

    // Detect initial state
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    
    // FULL class names here!
    icon.className = isDark ? 'fas fa-moon-over-sun' : 'fas fa-moon';

    // On click, call the existing toggleDarkMode()
    icon.addEventListener('click', () => {
      if (typeof toggleDarkMode === 'function') {
        toggleDarkMode(); // Call your existing function

        // Update icon after toggle
        const nowDark = document.documentElement.classList.contains("dark-mode");
        icon.className = nowDark ? 'fas fa-moon-over-sun' : 'fas fa-moon';
      } else {
        console.warn('toggleDarkMode() function not found.');
      }
    });
  }, 100); // Delay ensures header is loaded
});






