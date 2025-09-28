import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getFirestore, collection, query, orderBy, onSnapshot } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

let app, db;
let currentIndex = 0;
let cardPerView = 5;
let isDragging = false, startX = 0, startScrollLeft = 0;
let totalSlides = 0;

export function initUpdatesSlider() {
  const slider = document.getElementById("updatesSlider");
  const dotsContainer = document.getElementById("dotsContainer");
  
  if (!slider || !dotsContainer) {
    console.error("Slider elements not found!");
    return;
  }

  // Responsive card per view
  updateCardPerView();
  window.addEventListener('resize', updateCardPerView);

  try {
    const firebaseConfig = {
      apiKey: "AIzaSyC4qAilm3cAJ8FTnv8R66YhG1rEITgKsoM",
      authDomain: "toolsbd24.firebaseapp.com",
      projectId: "toolsbd24",
      storageBucket: "toolsbd24.appspot.com",
      messagingSenderId: "661782480607",
      appId: "1:661782480607:web:9e517726a1e282e15f4b6a",
      measurementId: "G-JLKLZDLSWJ"
    };

    app = initializeApp(firebaseConfig, "updatesSliderApp");
    db = getFirestore(app);
  } catch (error) {
    app = initializeApp();
    db = getFirestore(app);
  }

  const updatesRef = collection(db, "updates");
  const q = query(updatesRef, orderBy("timestamp", "desc"));

  onSnapshot(q, snapshot => {
    const updates = [];
    snapshot.forEach(doc => updates.push({ id: doc.id, ...doc.data() }));
    totalSlides = updates.length;
    
    if (updates.length === 0) {
      slider.innerHTML = '<div class="no-updates">No updates available</div>';
      dotsContainer.innerHTML = '';
      return;
    }
    
    renderSlides(updates, slider, dotsContainer);
  });

  function updateCardPerView() {
    const width = window.innerWidth;
    if (width < 480) cardPerView = 1;
    else if (width < 768) cardPerView = 2;
    else if (width < 1024) cardPerView = 3;
    else if (width < 1200) cardPerView = 4;
    else cardPerView = 5;
    
    // Re-render if slider already has content
    if (slider.children.length > 0) {
      updateSlider(slider);
      createDots(dotsContainer);
    }
  }
}

function renderSlides(updates, slider, dotsContainer) {
  slider.innerHTML = "";
  dotsContainer.innerHTML = "";

  updates.forEach((item, idx) => {
    const card = document.createElement("div");
    card.className = "update-card";
    card.innerHTML = `
      <h3>${item.title || 'No Title'}</h3>
      <p>${item.content || 'No content available'}</p>
      ${item.timestamp ? `<small>${new Date(item.timestamp.toDate()).toLocaleDateString()}</small>` : ''}
    `;
    slider.appendChild(card);
  });

  // Create exactly 5 dots (as requested)
  createDots(dotsContainer);

  // Add drag events
  addDragEvents(slider);

  currentIndex = 0;
  updateSlider(slider);
}

function createDots(dotsContainer) {
  dotsContainer.innerHTML = "";
  
  // Always create exactly 5 dots
  const totalDots = 5;
  
  for (let i = 0; i < totalDots; i++) {
    const dot = document.createElement("span");
    dot.className = "dot";
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => { 
      // Calculate actual slide index based on dot click
      const maxIndex = Math.max(totalSlides - cardPerView, 0);
      const slideIndex = Math.floor((i / totalDots) * (maxIndex + 1));
      currentIndex = Math.min(slideIndex, maxIndex);
      
      updateSlider(document.getElementById("updatesSlider")); 
    });
    dotsContainer.appendChild(dot);
  }
}

function addDragEvents(slider) {
  const dragStart = (e) => {
    isDragging = true;
    startX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
    startScrollLeft = currentIndex * (100 / cardPerView);
    slider.style.cursor = 'grabbing';
    slider.style.transition = 'none';
    
    // Prevent default to avoid text selection and page scroll
    e.preventDefault();
  }

  const dragging = (e) => {
    if (!isDragging) return;
    
    const currentX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
    const diff = (currentX - startX) / slider.offsetWidth * 100;
    const newScroll = startScrollLeft - diff;
    
    // Limit scrolling boundaries
    const maxScroll = (totalSlides - cardPerView) * (100 / cardPerView);
    const boundedScroll = Math.max(0, Math.min(newScroll, maxScroll));
    
    slider.style.transform = `translateX(-${boundedScroll}%)`;
    
    // Prevent default to avoid page scroll
    e.preventDefault();
  }

  const dragStop = (e) => {
    if (!isDragging) return;
    isDragging = false;
    slider.style.cursor = 'grab';
    slider.style.transition = 'transform 0.3s ease';
    
    // Snap to nearest card
    const draggedPercentage = parseFloat(slider.style.transform.replace('translateX(-', '').replace('%)', '')) || 0;
    currentIndex = Math.round(draggedPercentage / (100 / cardPerView));
    
    // Boundary check
    const maxIndex = Math.max(totalSlides - cardPerView, 0);
    currentIndex = Math.max(0, Math.min(currentIndex, maxIndex));
    
    updateSlider(slider);
  }

  // Remove existing events
  slider.removeEventListener('mousedown', dragStart);
  slider.removeEventListener('touchstart', dragStart);
  slider.removeEventListener('mousemove', dragging);
  slider.removeEventListener('touchmove', dragging);
  slider.removeEventListener('mouseup', dragStop);
  slider.removeEventListener('touchend', dragStop);
  slider.removeEventListener('mouseleave', dragStop);

  // Add new events with proper options
  slider.addEventListener('mousedown', dragStart);
  slider.addEventListener('touchstart', dragStart, { passive: false });
  slider.addEventListener('mousemove', dragging);
  slider.addEventListener('touchmove', dragging, { passive: false });
  slider.addEventListener('mouseup', dragStop);
  slider.addEventListener('touchend', dragStop, { passive: true });
  slider.addEventListener('mouseleave', dragStop);
}

function updateSlider(slider) {
  if (!slider) return;
  
  const slideWidth = 100 / cardPerView;
  const translateX = currentIndex * slideWidth;
  
  // Mobile e perfect centering
  if (window.innerWidth <= 480 && cardPerView === 1) {
    const cardWidth = 280; // Match CSS mobile card width
    const containerWidth = slider.parentElement.offsetWidth;
    const totalMoveableSlides = Math.max(totalSlides - 1, 0);
    
    if (totalMoveableSlides > 0) {
      const maxTranslate = totalMoveableSlides * cardWidth;
      const newTranslate = Math.min(currentIndex * cardWidth, maxTranslate);
      const offset = (containerWidth - cardWidth) / 2;
      slider.style.transform = `translateX(calc(-${newTranslate}px + ${offset}px))`;
    } else {
      const offset = (containerWidth - cardWidth) / 2;
      slider.style.transform = `translateX(${offset}px)`;
    }
  } else {
    slider.style.transform = `translateX(-${translateX}%)`;
  }

  // Update dots - always show 5 dots with active state based on position
  const dots = document.querySelectorAll(".dot");
  const maxIndex = Math.max(totalSlides - cardPerView, 0);
  
  if (maxIndex > 0) {
    const activeDotIndex = Math.floor((currentIndex / maxIndex) * 4); // Map to 0-4 for 5 dots
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === Math.min(activeDotIndex, 4));
    });
  } else {
    // Only one slide, show first dot as active
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === 0);
    });
  }
}