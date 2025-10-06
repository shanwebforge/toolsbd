// বাংলা সংখ্যা ও মাস
const banglaNumbers = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
const banglaMonths = ["জানুয়ারি","ফেব্রুয়ারি","মার্চ","এপ্রিল","মে","জুন","জুলাই","আগস্ট","সেপ্টেম্বর","অক্টোবর","নভেম্বর","ডিসেম্বর"];
const banglaWeekdays = ["রবিবার","সোমবার","মঙ্গলবার","বুধবার","বৃহস্পতিবার","শুক্রবার","শনিবার"];

// ইংরেজি/আরবি → বাংলা সংখ্যা কনভার্ট
function convertToBanglaNumber(str) {
  const en = "0123456789";
  const ar = "٠١٢٣٤٥٦٧٨٩";
  return str.toString().split('').map(char => {
    if (en.includes(char)) return banglaNumbers[parseInt(char)];
    if (ar.includes(char)) return banglaNumbers[ar.indexOf(char)];
    return char;
  }).join('');
}

// আজকের তারিখ
const today = new Date();

// বাংলা তারিখ
const bdDay = convertToBanglaNumber(today.getDate());
const bdMonth = banglaMonths[today.getMonth()];
const bdYear = convertToBanglaNumber(today.getFullYear());
const bdWeekday = banglaWeekdays[today.getDay()];
document.getElementById("bangla-date").innerText = `${bdWeekday}, ${bdDay} ${bdMonth}, ${bdYear}`;

// ইংরেজি তারিখ
const englishDate = today.toLocaleDateString("en-GB", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric"
});
document.getElementById("english-date").innerText = englishDate;

// ইসলামিক তারিখ
const islamicFormatter = new Intl.DateTimeFormat("ar-SA-u-ca-islamic", {
  day: "numeric",
  month: "long",
  year: "numeric"
});
const parts = islamicFormatter.formatToParts(today);

// আরবি মাস বাংলায়
const arabicToBanglaMonth = {
  "محرم": "মুহাররম",
  "صفر": "সফর",
  "ربيع الأول": "রবিউল আউয়াল",
  "ربيع الآخر": "রবিউস সানি",
  "جمادى الأولى": "জুমাদাল উলা",
  "جمادى الآخرة": "জুমাদাল সানি",
  "رجب": "রজব",
  "شعبان": "শাবান",
  "رمضان": "রমজান",
  "شوال": "শাওয়াল",
  "ذو القعدة": "জ্বিলকদ",
  "ذو الحجة": "জ্বিলহজ্জ"
};

let islDay = "", islMonth = "", islYear = "";
parts.forEach(part => {
  if (part.type === "day") islDay = convertToBanglaNumber(part.value);
  if (part.type === "month") islMonth = arabicToBanglaMonth[part.value] || part.value;
  if (part.type === "year") islYear = convertToBanglaNumber(part.value);
});

document.getElementById("arabic-date").innerText = `${islDay} ${islMonth} ${islYear}`;
