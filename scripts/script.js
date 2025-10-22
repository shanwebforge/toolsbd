 
   function loadSection(path, elementId) {
    fetch(path)
      .then(res => res.text())
      .then(html => {
        document.getElementById(elementId).innerHTML = html;
      })
      .catch(err => {
        document.getElementById(elementId).innerHTML = "কনটেন্ট লোড করতে সমস্যা হয়েছে!";
        console.error(err);
      });
  }
  
  loadSection("/highlight-page/img-slide.html", "img-slide-section");
  loadSection("/update-notice/notice-home.html", "latest-updates-section");
  loadSection("/highlight-page/intro.html", "intro-section");
  loadSection("/highlight-page/count.html", "count-section");
  loadSection("/highlight-page/help-desk.html", "help-section");
  loadSection("/keyboard-sortcut/key-sort.html", "key-section");
  loadSection("/oparator/oparator.html", "sort-section");
  loadSection("/islamic/islamic.html", "islamic-section");
  loadSection("/daily-use-tools/daily-use.html", "daily-section");
  loadSection("/dev-designer-tools/dev-design.html", "dev-section");
  loadSection("/educational-tools/edu.html", "edu-section");
  loadSection("/freelanching-tools/free.html", "free-section");
  loadSection("/dokan-tools/dokan.html", "dokan-section");
  loadSection("/money-tools/money.html", "money-section");
  loadSection("/media-tools/media.html", "media-section");
  loadSection("/bd-Localized-Special-tools/localized.html", "localized-section");
  loadSection("/tools-for-general-people/general.html", "general-section");

 
 
 // io
  document.addEventListener("contextmenu", (e) => e.preventDefault());

  // io
  document.addEventListener("keydown", function (e) {
    if (
      e.key === "F12" ||
      (e.ctrlKey && e.shiftKey && e.key === "I") ||
      (e.ctrlKey && e.key === "U")
    ) {
      e.preventDefault();
    }
  });


document.addEventListener('contextmenu', function(e) {
  e.preventDefault();
});

// Disable text selection
document.addEventListener('selectstart', function(e) {
  e.preventDefault();
});

// Disable drag (for images & content)
document.addEventListener('dragstart', function(e) {
  e.preventDefault();
});

// Optional: Prevent saving images via right-click or dragging
document.querySelectorAll('img').forEach(function(img) {
  img.setAttribute('draggable', 'false');
  img.addEventListener('contextmenu', function(e) {
    e.preventDefault();
  });
});





// App Download
  const downloadLink = document.getElementById('downloadLink');
  const downloadBtn = document.getElementById('downloadBtn');
  const progressBar = document.getElementById('progressBar');
  const progressPercent = document.getElementById('progressPercent');
  const installBtn = document.getElementById('installBtn');
  let downloadComplete = false;
  let apkBlobUrl = '';

  // Simulate download progress
  downloadLink.addEventListener('click', function(e) {
    if (!downloadComplete) {
      e.preventDefault();
      progressPercent.style.display = 'block';
      let progress = 0;
      const progressInterval = setInterval(() => {
        progress += Math.floor(Math.random() * 10) + 5;
        if (progress >= 100) {
          progress = 100;
          clearInterval(progressInterval);
          downloadComplete = true;
          installBtn.style.display = 'block';
          downloadLink.href = "/assets/ToolsBD.apk";
          downloadBtn.classList.add('download-complete');
        }
        progressPercent.textContent = progress + '%';
        progressBar.style.width = progress + '%';
      }, 300);
    }
  });

  // Try opening the APK file directly for install
  installBtn.addEventListener('click', function(e) {
    // Direct link to APK will prompt download or open install screen in some browsers
    window.location.href = "/assets/ToolsBD.apk";
  });







// 📦 ইংরেজি → বাংলা সংখ্যা কনভার্টার
function banglaDigit(num) {
  const en = '0123456789'.split('');
  const bn = '০১২৩৪৫৬৭৮৯'.split('');
  return num.toString().split('').map(d => en.includes(d) ? bn[en.indexOf(d)] : d).join('');
}

// 🕐 টাইম ফরম্যাটার (বাংলা এএম/পিএম সহ)
function formatTimeToBangla(timeStr) {
  let [h, m] = timeStr.split(':').map(Number);
  const ampm = h >= 12 ? 'পি.এম' : 'এ.এম';
  h = h % 12 || 12;
  return `${banglaDigit(h)}:${banglaDigit(m.toString().padStart(2, '0'))} ${ampm}`;
}

// 🕓 কত সময় বাকি তা বের করা
function getTimeRemaining(time) {
  const now = new Date();
  const [h, m] = time.split(':').map(Number);
  const target = new Date();

  // Bangladesh Timezone (UTC+6)
  target.setUTCHours(h - 6, m, 0, 0);

  if (target < now) target.setDate(target.getDate() + 1);

  let diff = target - now;
  const hours = Math.floor(diff / 1000 / 60 / 60);
  const minutes = Math.floor((diff / 1000 / 60) % 60);

  return `${banglaDigit(hours)} ঘণ্টা ${banglaDigit(minutes)} মিনিট বাকি`;
}

// 📍 লোকেশন বের করা
async function reverseGeocode(lat, lon) {
  try {
    const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`);
    const data = await res.json();
    return { full: data.address.city || data.address.town || data.address.state || "অজানা" };
  } catch {
    return { full: "অজানা" };
  }
}

// 🌙 নামাজের সময় লোড করা (বাংলাদেশ টাইম অনুযায়ী)
async function getPrayerTimes(lat, lon, displayName) {
  const url = `https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}&method=2&school=1&timezonestring=Asia/Dhaka`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    const t = data.data.timings;

    document.getElementById("location").innerHTML = `<i class="fas fa-map-marker-alt"></i> ${displayName}`;

    const prayers = [
      { name: "🕋 ফজর", time: t.Fajr },
      { name: "🕌 যোহর", time: t.Dhuhr },
      { name: "🕒 আসর", time: t.Asr },
      { name: "🌇 মাগরিব", time: t.Maghrib },
      { name: "🌙 এশা", time: t.Isha }
    ];

    document.getElementById("prayer-list").innerHTML = prayers.map(p => `
      <div class="prayer-box">
        <div class="prayer-name">${p.name}</div>
        <div class="prayer-time">${formatTimeToBangla(p.time)}</div>
        <div class="time-remaining">${getTimeRemaining(p.time)}</div>
      </div>
    `).join('');

  } catch (err) {
    document.getElementById("prayer-list").innerHTML = `<p>❌ নামাজের সময় লোড ব্যর্থ</p>`;
  }
}

// 📍 ইউজারের লোকেশন নেওয়া
function getUserLocation() {
  if (!navigator.geolocation) {
    document.getElementById("location").textContent = "⚠️ লোকেশন পাওয়া যায়নি";
    getPrayerTimes(23.8103, 90.4125, "ঢাকা");
    return;
  }

  navigator.geolocation.getCurrentPosition(async pos => {
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;
    const location = await reverseGeocode(lat, lon);
    await getPrayerTimes(lat, lon, location.full);
  }, () => {
    getPrayerTimes(23.8103, 90.4125, "ঢাকা");
  });
}

getUserLocation();










































// Arrow
 const slider = document.getElementById('categorySlider');
    const leftArrow = document.getElementById('arrowLeft');
    const rightArrow = document.getElementById('arrowRight');

    const scrollAmount = 120; // scroll pixels per click

    leftArrow.addEventListener('click', () => {
      slider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    rightArrow.addEventListener('click', () => {
      slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });


    



