document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".stars-overlay");

  const colors = ["rgba(238, 238, 9, 1)", "rgba(238, 48, 48, 1)", "#ffa500", "#52aaf1ff", "#f729e5ff", "#0ff", "#0f0"]; 
  const totalStars = 10; // ⭐ সংখ্যা এখান থেকে নিয়ন্ত্রণ করবে

  for (let i = 0; i < totalStars; i++) {
    const star = document.createElement("div");
    star.classList.add("star");

    // random size
    const size = Math.random() * 8 + 4; 
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;

    // random start position (পুরো স্ক্রিনে ছড়িয়ে থাকবে)
    star.style.top = `${Math.random() * 100}%`;
    star.style.left = `${Math.random() * 100}%`;

    // random color
    star.style.color = colors[Math.floor(Math.random() * colors.length)];

    // random motion direction (চারদিক থেকে)
    const dx = (Math.random() - 0.5) * 1000; // -500px থেকে +500px
    const dy = (Math.random() - 0.5) * 1000; // -500px থেকে +500px
    star.style.setProperty("--dx", dx + "px");
    star.style.setProperty("--dy", dy + "px");

    // random speed
    const duration = Math.random() * 20 + 10; 
    star.style.animationDuration = `${duration}s`;

    container.appendChild(star);
  }
});
