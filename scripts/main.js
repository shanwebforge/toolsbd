// Bangla digit converter
const banglaDigit = (num) => {
  const en = '0123456789';
  const bn = '০১২৩৪৫৬৭৮৯';
  return num.toString().split('').map(d => {
    const index = en.indexOf(d);
    return index !== -1 ? bn[index] : d;
  }).join('');
};

// Time formatter with AM/PM in Bangla
const formatTimeToBangla = (timeStr) => {
  if (!timeStr) return '';
  const [h, m] = timeStr.split(':').map(Number);
  const ampm = h >= 12 ? 'পি.এম' : 'এ.এম';
  const hour = h % 12 || 12;
  return `${banglaDigit(hour)}:${banglaDigit(m.toString().padStart(2, '0'))} ${ampm}`;
};

// Calculate remaining time
const getTimeRemaining = (time) => {
  if (!time) return '';
  const now = new Date();
  const [h, m] = time.split(':').map(Number);
  const target = new Date();
  
  // Bangladesh Timezone (UTC+6)
  target.setUTCHours(h - 6, m, 0, 0);
  if (target < now) target.setDate(target.getDate() + 1);
  
  const diff = target - now;
  const hours = Math.floor(diff / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  
  return `${banglaDigit(hours)} ঘণ্টা ${banglaDigit(minutes)} মিনিট বাকি`;
};

// Reverse geocoding
const reverseGeocode = async (lat, lon) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
      { headers: { 'Accept-Language': 'bn' } }
    );
    const data = await response.json();
    return {
      full: data.address?.city || data.address?.town || data.address?.state || "অজানা",
      details: data.address || {}
    };
  } catch {
    return { full: "অজানা", details: {} };
  }
};

// Load prayer times
const getPrayerTimes = async (lat, lon, displayName) => {
  const url = `https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}&method=2&school=1&timezonestring=Asia/Dhaka`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.code !== 200) throw new Error('API Error');
    
    const timings = data.data.timings;
    const locationEl = document.getElementById("location");
    
    if (locationEl) {
      locationEl.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${displayName}`;
    }
    
    const prayers = [
      { name: "🕋 ফজর", time: timings.Fajr },
      { name: "🕌 যোহর", time: timings.Dhuhr },
      { name: "🕒 আসর", time: timings.Asr },
      { name: "🌇 মাগরিব", time: timings.Maghrib },
      { name: "🌙 এশা", time: timings.Isha }
    ];
    
    const prayerListEl = document.getElementById("prayer-list");
    if (prayerListEl) {
      prayerListEl.innerHTML = prayers.map(prayer => `
        <div class="prayer-box">
          <div class="prayer-name">${prayer.name}</div>
          <div class="prayer-time">${formatTimeToBangla(prayer.time)}</div>
          <div class="time-remaining">${getTimeRemaining(prayer.time)}</div>
        </div>
      `).join('');
    }
    
  } catch (error) {
    console.error('Prayer times error:', error);
    const prayerListEl = document.getElementById("prayer-list");
    if (prayerListEl) {
      prayerListEl.innerHTML = '<p class="error">❌ নামাজের সময় লোড ব্যর্থ</p>';
    }
  }
};

// Get user location for prayer times
const getUserLocation = () => {
  const locationEl = document.getElementById("location");
  
  if (!locationEl) return;
  
  if (!navigator.geolocation) {
    locationEl.textContent = "⚠️ লোকেশন সাপোর্ট নেই";
    getPrayerTimes(23.8103, 90.4125, "ঢাকা");
    return;
  }
  
  const onSuccess = async (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const location = await reverseGeocode(lat, lon);
    await getPrayerTimes(lat, lon, location.full);
  };
  
  const onError = () => {
    getPrayerTimes(23.8103, 90.4125, "ঢাকা");
  };
  
  navigator.geolocation.getCurrentPosition(onSuccess, onError, {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 60000
  });
};

// ============================================
// 2. DOM CONTENT LOADING
// ============================================

// Configuration for section loading
const SECTION_CONFIG = {
  sections: [
    { path: "/highlight-page/img-slide.html", id: "img-slide-section" },
    { path: "/update-notice/notice-home.html", id: "latest-updates-section" },
    { path: "/highlight-page/intro.html", id: "intro-section" },
    { path: "/highlight-page/count.html", id: "count-section" },
    { path: "/home-cetegories/help-cetegories/help-desk.html", id: "help-section" },
    { path: "home-cetegories/slide-cetegories/slide-cat.html", id: "slide-cat-section" },
    { path: "home-cetegories/keyboard-sortcut/key-sort.html", id: "key-section" },
    { path: "home-cetegories/tools-cetegories/catagory.html", id: "catagory-section" },
    { path: "home-cetegories/oparator/oparator.html", id: "sort-section" },
    { path: "/islamic/islamic.html", id: "islamic-section" },
    { path: "/daily-use-tools/daily-use.html", id: "daily-section" },
    { path: "/dev-designer-tools/dev-design.html", id: "dev-section" },
    { path: "/educational-tools/edu.html", id: "edu-section" },
    { path: "/freelanching-tools/free.html", id: "free-section" },
    { path: "/dokan-tools/dokan.html", id: "dokan-section" },
    { path: "/money-tools/money.html", id: "money-section" },
    { path: "/media-tools/media.html", id: "media-section" },
    { path: "/bd-Localized-Special-tools/localized.html", id: "localized-section" },
    { path: "/tools-for-general-people/general.html", id: "general-section" }
  ],
  
  // Batch loading configuration
  batchSize: 3,
  delayBetweenBatches: 100
};

// Load a single section
const loadSection = async (path, elementId) => {
  const element = document.getElementById(elementId);
  if (!element) return;
  
  try {
    const response = await fetch(path);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const html = await response.text();
    element.innerHTML = html;
    
    // Initialize components if needed
    if (elementId === "slide-cat-section") {
      initTabSwitching();
      initArrowNavigation();
    }
    
  } catch (error) {
    console.error(`Failed to load ${path}:`, error);
    element.innerHTML = '<div class="error-message">কনটেন্ট লোড করতে সমস্যা হয়েছে!</div>';
  }
};

// Load all sections with batching
const loadAllSections = () => {
  const { sections, batchSize, delayBetweenBatches } = SECTION_CONFIG;
  
  const loadBatch = (startIndex) => {
    const endIndex = Math.min(startIndex + batchSize, sections.length);
    const batch = sections.slice(startIndex, endIndex);
    
    // Load current batch in parallel
    const promises = batch.map(({ path, id }) => loadSection(path, id));
    
    Promise.all(promises).then(() => {
      // Load next batch if exists
      if (endIndex < sections.length) {
        setTimeout(() => loadBatch(endIndex), delayBetweenBatches);
      }
    });
  };
  
  loadBatch(0);
};


// ============================================
// 4. APP DOWNLOAD FUNCTIONALITY
// ============================================

const initAppDownload = () => {
  const downloadLink = document.getElementById('downloadLink');
  const downloadBtn = document.getElementById('downloadBtn');
  const progressBar = document.getElementById('progressBar');
  const progressPercent = document.getElementById('progressPercent');
  const installBtn = document.getElementById('installBtn');
  
  if (!downloadLink || !downloadBtn) return;
  
  let downloadComplete = false;
  let progressInterval = null;
  
  const resetDownload = () => {
    if (progressInterval) clearInterval(progressInterval);
    downloadComplete = false;
    if (progressBar) progressBar.style.width = '0%';
    if (progressPercent) {
      progressPercent.textContent = '0%';
      progressPercent.style.display = 'none';
    }
    if (installBtn) installBtn.style.display = 'none';
    if (downloadBtn) downloadBtn.classList.remove('download-complete');
  };
  
  downloadLink.addEventListener('click', (e) => {
    if (downloadComplete) return;
    
    e.preventDefault();
    resetDownload();
    
    if (progressPercent) progressPercent.style.display = 'block';
    
    let progress = 0;
    progressInterval = setInterval(() => {
      progress += Math.floor(Math.random() * 10) + 5;
      
      if (progress >= 100) {
        progress = 100;
        clearInterval(progressInterval);
        downloadComplete = true;
        
        if (installBtn) installBtn.style.display = 'block';
        if (downloadBtn) downloadBtn.classList.add('download-complete');
      }
      
      if (progressPercent) progressPercent.textContent = progress + '%';
      if (progressBar) progressBar.style.width = progress + '%';
    }, 300);
  });
  
  if (installBtn) {
    installBtn.addEventListener('click', () => {
      window.location.href = "/assets/ToolsBD.apk";
    });
  }
  
  // Reset on page visibility change
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      resetDownload();
    }
  });
};

// ============================================
// 5. TAB SWITCHING (Slide Categories)
// ============================================

const initTabSwitching = () => {
  const tabs = document.querySelectorAll(".sc-tab");
  const contents = document.querySelectorAll(".sc-category-box");
  
  if (!tabs.length || !contents.length) return;
  
  const activateTab = (tab) => {
    // Deactivate all
    tabs.forEach(t => t.classList.remove("active"));
    contents.forEach(c => c.classList.remove("active"));
    
    // Activate selected
    tab.classList.add("active");
    const targetContent = document.getElementById(tab.dataset.target);
    if (targetContent) targetContent.classList.add("active");
  };
  
  tabs.forEach(tab => {
    tab.addEventListener("click", () => activateTab(tab));
  });
  
  // Activate first tab by default
  if (tabs[0]) activateTab(tabs[0]);
};

// ============================================
// 6. ARROW NAVIGATION
// ============================================

const initArrowNavigation = () => {
  const slider = document.getElementById('categorySlider');
  const leftArrow = document.getElementById('arrowLeft');
  const rightArrow = document.getElementById('arrowRight');
  
  if (!slider || !leftArrow || !rightArrow) return;
  
  const scrollAmount = 120; // pixels per click
  
  leftArrow.addEventListener('click', () => {
    slider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });
  
  rightArrow.addEventListener('click', () => {
    slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!document.activeElement.closest('#categorySlider')) return;
    
    if (e.key === 'ArrowLeft') {
      slider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else if (e.key === 'ArrowRight') {
      slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  });
};

// ============================================
// 7. FAST SCROLL BEHAVIOR
// ============================================

const initFastScroll = () => {
  // Set fast scroll by default
  document.documentElement.style.scrollBehavior = "auto";
  
  // Handle anchor links with fast scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === "#") return;
      
      const target = document.querySelector(href);
      if (!target) return;
      
      e.preventDefault();
      target.scrollIntoView({
        behavior: 'auto', // Fast scroll
        block: 'start'
      });
    });
  });
};

// ============================================
// 8. MAIN INITIALIZATION
// ============================================

const init = () => {
  console.log('🚀 ToolsBD - Initializing...');
  
  // Load all sections
  loadAllSections();
  
  // Initialize app download
  initAppDownload();
  
  // Initialize prayer times if elements exist
  if (document.getElementById("prayer-list") && document.getElementById("location")) {
    getUserLocation();
  }
  
  // Initialize fast scroll
  initFastScroll();
  
  console.log('✅ ToolsBD - Initialization complete');
};

// ============================================
// 9. EVENT LISTENERS & EXPORTS
// ============================================

// DOM Ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Make utility functions available globally if needed
if (typeof window !== 'undefined') {
  window.ToolsBD = {
    banglaDigit,
    formatTimeToBangla,
    getTimeRemaining,
    reverseGeocode,
    getPrayerTimes,
    loadSection
  };
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    banglaDigit,
    formatTimeToBangla,
    getTimeRemaining,
    reverseGeocode,
    getPrayerTimes,
    loadSection,
    init
  };
}