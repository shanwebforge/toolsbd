document.addEventListener("DOMContentLoaded", function () {
  fetch('/components/headerhome.html')
    .then(res => {
      if (!res.ok) throw new Error("Header file not found");
      return res.text();
    })
    .then(data => {
      const placeholder = document.createElement('div');
      placeholder.innerHTML = data;
      document.body.insertBefore(placeholder, document.body.firstChild);

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




