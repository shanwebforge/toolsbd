document.addEventListener("DOMContentLoaded", function () {
  fetch('/blog/components/header.html')
    .then(res => {
      if (!res.ok) throw new Error("Header file not found");
      return res.text();
    })
    .then(data => {
      const placeholder = document.createElement('div');
      placeholder.innerHTML = data;
      document.body.insertBefore(placeholder, document.body.firstChild);

      // 🔍 Search Functionality
      const searchIconBtn = document.getElementById('searchIconBtn');
      const searchContainer = document.getElementById("searchContainer");
      
      if (searchIconBtn && searchContainer) {
        const header = document.querySelector('header');
        if (header) {
          header.insertAdjacentElement('afterend', searchContainer);
        }

        const searchInput = document.getElementById("searchInput");
        const searchBtn = document.getElementById("searchBtn");
        const searchPopup = document.getElementById("searchPopup");
        const closePopup = document.getElementById("closePopup");
        const searchResults = document.getElementById("searchResults");

        const siteContent = [
          {
            title: "Islamic Tools",
            url: "islamic/",
            desc: "ইসলামিক ক্যালেন্ডার, নামাজের সময়সূচি, কিবলা দিক নির্ণয় সহ নানা ইসলামিক টুল।",
          },
          {
            title: "Daily Use Tools",
            url: "daily-use-tools/",
            desc: "প্রতিদিন ব্যবহৃত সহজ ও দরকারি টুল যেমন কনভার্টার, ক্যালকুলেটর ইত্যাদি।",
          },
          {
            title: "Developer & Designer Tools",
            url: "dev-designer-tools/",
            desc: "JS, HTML, CSS কোড সুন্দরভাবে সাজান ও বিশ্লেষণ করুন।",
          },
          {
            title: "BD Localized Special Tools",
            url: "bd-Localized-Special-tools/",
            desc: "বাংলাদেশ ভিত্তিক প্রয়োজনীয় টুল যেমন এনআইডি যাচাই, BRTC তথ্য ইত্যাদি।",
          },
        ];

        function doSearch() {
          const query = searchInput.value.trim().toLowerCase();
          searchResults.innerHTML = "";

          if (!query) {
            searchResults.innerHTML = "<p>অনুগ্রহ করে সার্চ করুন।</p>";
            return;
          }

          const results = siteContent.filter(item =>
            item.title.toLowerCase().includes(query) ||
            item.desc.toLowerCase().includes(query)
          );

          if (results.length === 0) {
            searchResults.innerHTML = "<p>কোনো ফলাফল পাওয়া যায়নি।</p>";
          } else {
            results.forEach(item => {
              const p = document.createElement("p");
              p.textContent = item.title;
              p.title = item.desc;
              p.onclick = () => {
                window.location.href = item.url;
              };
              searchResults.appendChild(p);
            });
          }
        }

        searchIconBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          searchContainer.classList.toggle("hidden");
          
          if (!searchContainer.classList.contains("hidden")) {
            searchInput.focus();
            searchPopup.classList.add("hidden");
            searchContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        });

        searchBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          doSearch();
          searchPopup.classList.remove("hidden");
        });

        searchInput.addEventListener("keypress", (e) => {
          if (e.key === "Enter") {
            doSearch();
            searchPopup.classList.remove("hidden");
          }
        });

        closePopup.addEventListener("click", () => {
          searchPopup.classList.add("hidden");
        });

        document.addEventListener("click", (e) => {
          if (!searchContainer.contains(e.target) &&
              !searchPopup.contains(e.target) &&
              e.target !== searchIconBtn &&
              !searchIconBtn.contains(e.target)) {
            searchContainer.classList.add("hidden");
            searchPopup.classList.add("hidden");
          }
        });
      }

      // 🌍 Language Toggle Functionality
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
          li.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            langMenu.classList.add('hidden');
            changeLanguage(lang);
          });
        });

        function changeLanguage(lang) {
          if (lang === 'bn') {
            if (!window.google || !google.translate) {
              loadGoogleTranslate(() => setLanguage('bn'));
            } else {
              setLanguage('bn');
            }
          } else {
            resetToEnglish();
          }
        }

        function loadGoogleTranslate(callback) {
          if (!window.google || !google.translate) {
            const script = document.createElement('script');
            script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
            script.async = true;
            document.body.appendChild(script);
            
            window.googleTranslateElementInit = function() {
              new google.translate.TranslateElement({
                pageLanguage: 'en',
                includedLanguages: 'en,bn',
                layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
                autoDisplay: false
              }, 'google_translate_element');
              
              if (callback) callback();
            };
          } else if (callback) {
            callback();
          }
        }

        function setLanguage(lang) {
          let attempts = 0;
          const maxAttempts = 10;
          const interval = setInterval(() => {
            attempts++;
            const select = document.querySelector('.goog-te-combo');
            if (select) {
              select.value = lang;
              select.dispatchEvent(new Event('change'));
              document.cookie = `googtrans=/en/${lang}; path=/; max-age=31536000`;
              clearInterval(interval);
            } else if (attempts >= maxAttempts) {
              clearInterval(interval);
            }
          }, 300);
        }

        function resetToEnglish() {
          document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
          document.cookie = 'googtrans=/en/en; path=/; max-age=31536000';
          if (document.querySelector('.goog-te-combo')) {
            const select = document.querySelector('.goog-te-combo');
            select.value = 'en';
            select.dispatchEvent(new Event('change'));
          }
          setTimeout(() => location.reload(), 100);
        }
      }

      // 🌙 Dark Mode Functionality
      const themeToggleIcon = document.getElementById('themeToggleIcon');
      const toggleThemeDesktop = document.getElementById('toggleThemeDesktop');
      const toggleThemeMobile = document.getElementById('toggleThemeMobile');

      // Apply saved theme
      const savedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const isDark = savedTheme === 'dark' || (!savedTheme && prefersDark);

      document.documentElement.classList.toggle('dark-mode', isDark);
      if (toggleThemeDesktop) toggleThemeDesktop.checked = isDark;
      if (toggleThemeMobile) toggleThemeMobile.checked = isDark;
      if (themeToggleIcon) {
        themeToggleIcon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
      }

      function toggleDarkMode() {
        const enableDark = !document.documentElement.classList.contains("dark-mode");
        document.documentElement.classList.toggle("dark-mode", enableDark);
        localStorage.setItem("theme", enableDark ? "dark" : "light");

        if (toggleThemeDesktop) toggleThemeDesktop.checked = enableDark;
        if (toggleThemeMobile) toggleThemeMobile.checked = enableDark;
        if (themeToggleIcon) {
          themeToggleIcon.className = enableDark ? 'fas fa-sun' : 'fas fa-moon';
        }
      }

      toggleThemeDesktop?.addEventListener('change', toggleDarkMode);
      toggleThemeMobile?.addEventListener('change', toggleDarkMode);
      themeToggleIcon?.addEventListener('click', toggleDarkMode);

      // Mobile Menu Functionality
      const body = document.body;
      const menuToggle = document.getElementById('menuToggle');
      const mobileCanvas = document.getElementById('mobileCanvas');
      const closeCanvasBtn = document.getElementById('closeCanvas');
      const backBtn = document.getElementById('mobileBackBtn');

      menuToggle?.addEventListener('click', () => {
        mobileCanvas.classList.add('active');
        body.style.overflow = 'hidden';
      });

      closeCanvasBtn?.addEventListener('click', () => {
        mobileCanvas.classList.remove('active');
        body.style.overflow = '';
      });

      document.querySelectorAll('.canvas-link').forEach(link => {
        link.addEventListener('click', () => {
          mobileCanvas.classList.remove('active');
          body.style.overflow = '';
        });
      });

      backBtn?.addEventListener('click', function(e) {
        e.preventDefault();
        try {
          if (window.history && window.history.length > 1) {
            window.history.back();
          } else {
            window.location.href = document.referrer || '/';
          }
        } catch (error) {
          console.error('Back navigation failed:', error);
          window.location.href = '/';
        }
      });

      // ✨ NEW: Page Title in Logo Div Functionality
      const logoDiv = document.querySelector('.logo-title');
      if (logoDiv) {
        // Get clean page title (remove site name if present)
        let pageTitle = document.title.split('|')[0].split('-')[0].trim();
        
        // Shorten if needed (15 chars max)
        if (pageTitle.length > 15) {
          pageTitle = pageTitle.substring(0, 30) + '...';
        }
        
        // Insert into logo div
        logoDiv.textContent = pageTitle;
        
        // Add styling classes
        logoDiv.classList.add('dynamic-title');
      }
    })
    .catch(error => {
      console.error("Header load error:", error.message);
    });
});