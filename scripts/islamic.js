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