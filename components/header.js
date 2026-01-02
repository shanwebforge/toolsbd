document.addEventListener("DOMContentLoaded", function () {
  // Load header
  function loadHeader() {
    fetch('/components/header.html')
      .then(res => {
        if (!res.ok) throw new Error("Header file not found");
        return res.text();
      })
      .then(data => {
        const headerContainer = document.createElement('div');
        headerContainer.innerHTML = data;
        
        const header = headerContainer.querySelector('header');
        if (!header) {
          console.error('Header element not found in HTML');
          return;
        }
        
        document.body.insertBefore(header, document.body.firstChild);
        initializeAll();
      })
      .catch(error => {
        console.error("Header load error:", error.message);
        createFallbackHeader();
      });
  }
  
  function createFallbackHeader() {
    const header = document.createElement('header');
    header.setAttribute('data-header', 'main');
    header.innerHTML = `
      <div class="header-container">
        <div class="logo">
          <img src="/assets/logo.png" alt="ToolsBD" height="40">
        </div>
        <nav class="nav-menu">
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/nav-menu/blog/">Blog</a></li>
            <li><a href="/nav-menu/about/">About</a></li>
          </ul>
        </nav>
      </div>
    `;
    document.body.insertBefore(header, document.body.firstChild);
  }
  
  // Initialize all
  function initializeAll() {
    initializeHeaderLayout();
    initializeSearchFunctionality();
    initializeLanguageToggle();
    initializeDarkMode();
    initializeMobileMenu();
    initializePageTitle();
    initializeCanvasThemeSelector(); // নতুন ফাংশন যোগ করা হয়েছে
  }
  
  // Header layout
  function initializeHeaderLayout() {
    const isHomePage = window.location.pathname === '/' || 
                      window.location.pathname === '/index.html' ||
                      window.location.pathname === '' ||
                      window.location.pathname.endsWith('/index.html');
    
    const isMobile = window.innerWidth <= 768;
    const header = document.querySelector('header[data-header="main"]');
    
    if (!header) return;
    
    header.classList.remove('header-mobile', 'header-desktop', 'has-back-button');
    
    if (isMobile) {
      header.classList.add('header-mobile');
      if (!isHomePage) {
        header.classList.add('has-back-button');
      }
    } else {
      header.classList.add('header-desktop');
    }
    
    if (isMobile && !isHomePage) {
      updatePageTitle();
    }
    
    window.addEventListener('resize', initializeHeaderLayout);
  }
  
  // Page title
  function updatePageTitle() {
    const pageTitle = document.getElementById('pageTitle');
    if (!pageTitle) return;
    
    let titleText = document.title.split('|')[0].split('-')[0].trim();
    if (titleText.length > 25) {
      titleText = titleText.substring(0, 25) + '...';
    }
    pageTitle.textContent = titleText;
  }
  
  // Search functionality
  function initializeSearchFunctionality() {
    const searchIconBtn = document.getElementById('searchIconBtn') || document.querySelector('.search-icon');
    const searchContainer = document.getElementById("searchContainer");
    
    if (searchIconBtn && searchContainer) {
      // Position search container below header
      const header = document.querySelector('header[data-header="main"]');
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
          url: "/islamic/",
          desc: "ইসলামিক ক্যালেন্ডার, নামাজের সময়সূচি, কিবলা দিক নির্ণয় সহ নানা ইসলামিক টুল।",
        },
        {
          title: "Daily Use Tools",
          url: "/daily-use-tools/",
          desc: "প্রতিদিন ব্যবহৃত সহজ ও দরকারি টুল যেমন কনভার্টার, ক্যালকুলেটর ইত্যাদি।",
        },
        {
          title: "Developer & Designer Tools",
          url: "/dev-designer-tools/",
          desc: "JS, HTML, CSS কোড সুন্দরভাবে সাজান ও বিশ্লেষণ করুন।",
        },
        {
          title: "BD Localized Special Tools",
          url: "/bd-Localized-Special-tools/",
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
              closeSearch();
            };
            searchResults.appendChild(p);
          });
        }
      }

      function closeSearch() {
        searchContainer.classList.add("hidden");
        searchPopup.classList.add("hidden");
        searchInput.value = "";
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
        closeSearch();
      });

      document.addEventListener("click", (e) => {
        if (!searchContainer.contains(e.target) &&
            !searchPopup.contains(e.target) &&
            e.target !== searchIconBtn &&
            !searchIconBtn.contains(e.target)) {
          closeSearch();
        }
      });
    }
  }
  
  // Language toggle
  function initializeLanguageToggle() {
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
    }

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
          console.error('Failed to find Google Translate select element');
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
  
  // Dark mode - Main function
  function initializeDarkMode() {
    const themeToggleIcon = document.getElementById('themeToggleIcon');
    const toggleThemeDesktop = document.getElementById('toggleThemeDesktop');
    
    // Apply saved theme
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    let isDark;
    
    if (savedTheme === 'system' || !savedTheme) {
      isDark = prefersDark;
    } else {
      isDark = savedTheme === 'dark';
    }

    if (savedTheme === 'light') {
      document.documentElement.classList.remove('dark-mode');
      isDark = false;
    } else if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark-mode');
      isDark = true;
    } else {
      // System or no saved theme
      document.documentElement.classList.toggle('dark-mode', prefersDark);
      isDark = prefersDark;
    }
    
    if (toggleThemeDesktop) toggleThemeDesktop.checked = isDark;
    
    // Set initial icon based on current theme
    if (themeToggleIcon) {
      themeToggleIcon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    }

    // Global toggle function
    window.toggleDarkMode = function(theme) {
      let enableDark;
      
      if (theme) {
        // If theme is specified (from canvas)
        if (theme === 'system') {
          localStorage.setItem('theme', 'system');
          const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
          document.documentElement.classList.toggle('dark-mode', prefersDark);
          enableDark = prefersDark;
        } else if (theme === 'light') {
          localStorage.setItem('theme', 'light');
          document.documentElement.classList.remove('dark-mode');
          enableDark = false;
        } else if (theme === 'dark') {
          localStorage.setItem('theme', 'dark');
          document.documentElement.classList.add('dark-mode');
          enableDark = true;
        }
      } else {
        // Simple toggle (from header icon)
        enableDark = !document.documentElement.classList.contains("dark-mode");
        const themeToSave = enableDark ? 'dark' : 'light';
        document.documentElement.classList.toggle("dark-mode", enableDark);
        localStorage.setItem("theme", themeToSave);
      }

      // Sync desktop toggle
      if (toggleThemeDesktop) toggleThemeDesktop.checked = enableDark;
      
      // Update icon
      if (themeToggleIcon) {
        themeToggleIcon.className = enableDark ? 'fas fa-sun' : 'fas fa-moon';
      }
      
      // Update canvas theme display
      updateCanvasThemeDisplay();
      
      return enableDark;
    };

    // Event listeners
    if (toggleThemeDesktop) {
      toggleThemeDesktop.addEventListener('change', () => {
        const enableDark = !document.documentElement.classList.contains("dark-mode");
        const themeToSave = enableDark ? 'dark' : 'light';
        window.toggleDarkMode(themeToSave);
      });
    }
    
    if (themeToggleIcon) {
      themeToggleIcon.addEventListener('click', () => {
        const enableDark = !document.documentElement.classList.contains("dark-mode");
        const themeToSave = enableDark ? 'dark' : 'light';
        window.toggleDarkMode(themeToSave);
      });
    }
    
    // Update canvas display initially
    updateCanvasThemeDisplay();
  }
  
  // Update canvas theme display
  function updateCanvasThemeDisplay() {
    const currentThemeElement = document.getElementById('canvasCurrentTheme');
    const themeOptions = document.querySelectorAll('.theme-option');
    
    if (!currentThemeElement) return;
    
    const savedTheme = localStorage.getItem('theme') || 'system';
    let displayText = '';
    
    switch(savedTheme) {
      case 'system':
        displayText = 'System';
        break;
      case 'light':
        displayText = 'Light';
        break;
      case 'dark':
        displayText = 'Dark';
        break;
      default:
        displayText = 'System';
    }
    
    currentThemeElement.textContent = displayText;
    
    // Update active state of theme buttons
    if (themeOptions.length > 0) {
      themeOptions.forEach(option => {
        option.classList.remove('active');
        if (option.getAttribute('data-theme') === savedTheme) {
          option.classList.add('active');
        }
      });
    }
  }
  
  // Initialize canvas theme selector
  function initializeCanvasThemeSelector() {
    const themeOptions = document.querySelectorAll('.theme-option');
    
    if (themeOptions.length > 0) {
      themeOptions.forEach(option => {
        option.addEventListener('click', function() {
          const selectedTheme = this.getAttribute('data-theme');
          window.toggleDarkMode(selectedTheme);
          
          // Update active state
          themeOptions.forEach(opt => opt.classList.remove('active'));
          this.classList.add('active');
        });
      });
      
      // Initial update
      updateCanvasThemeDisplay();
    }
  }
  
  // Mobile menu
  function initializeMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const mobileCanvas = document.getElementById('mobileCanvas');
    const closeCanvasBtn = document.getElementById('closeCanvas');
    const backBtn = document.getElementById('mobileBackBtn');
    
    if (!mobileCanvas) return;
    
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'canvas-overlay';
    overlay.id = 'canvasOverlay';
    document.body.appendChild(overlay);
    
    // Open canvas
    if (menuToggle) {
      menuToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        openCanvas();
      });
    }
    
    // Open canvas function
    function openCanvas() {
      mobileCanvas.classList.add('active');
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      
      // Update canvas theme display when opening
      updateCanvasThemeDisplay();
    }
    
    // Close canvas function
    function closeCanvas() {
      mobileCanvas.classList.remove('active');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
    
    // Close button
    if (closeCanvasBtn) {
      closeCanvasBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        closeCanvas();
      });
    }
    
    // Close on overlay click
    overlay.addEventListener('click', function(e) {
      e.preventDefault();
      closeCanvas();
    });
    
    // Close on ESC key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && mobileCanvas.classList.contains('active')) {
        closeCanvas();
      }
    });
    
    // Close on window resize (if goes to desktop)
    window.addEventListener('resize', function() {
      if (window.innerWidth > 768 && mobileCanvas.classList.contains('active')) {
        closeCanvas();
      }
    });
    
    // Back button
    if (backBtn) {
      backBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (window.history.length > 1) {
          window.history.back();
        } else {
          window.location.href = '/';
        }
      });
    }
    
    // Canvas links
    setTimeout(() => {
      const canvasLinks = document.querySelectorAll('.canvas-link');
      canvasLinks.forEach(link => {
        const newLink = link.cloneNode(true);
        link.parentNode.replaceChild(newLink, link);
        
        newLink.addEventListener('click', function(e) {
          closeCanvas();
        });
      });
    }, 100);
  }
  
  // Page title
  function initializePageTitle() {
    updatePageTitle();
  }
  
  // Load header
  loadHeader();
});