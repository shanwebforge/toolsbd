import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getFirestore, collection, query, orderBy, onSnapshot } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

let app, db;
let currentIndex = 0;
let cardPerView = 3;
let isDragging = false, startX = 0, startScrollLeft = 0;
let totalSlides = 0;
let updates = [];

export function initUpdatesSlider() {
  const slider = document.getElementById("updatesSlider");
  const sliderContainer = document.querySelector(".slider-container");
  
  if (!slider || !sliderContainer) {
    console.error("Slider elements not found!");
    return;
  }

  // Calculate cards per view based on screen size
  calculateCardsPerView();
  window.addEventListener('resize', calculateCardsPerView);

  // Create arrow buttons immediately
  createArrowButtons(sliderContainer);

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
    console.log("Firebase already initialized");
    app = initializeApp();
    db = getFirestore(app);
  }

  const updatesRef = collection(db, "updates");
  const q = query(updatesRef, orderBy("timestamp", "desc"));

  onSnapshot(q, snapshot => {
    updates = [];
    snapshot.forEach(doc => updates.push({ id: doc.id, ...doc.data() }));
    totalSlides = updates.length;
    
    if (updates.length === 0) {
      slider.innerHTML = '<div class="no-updates">No updates available</div>';
      hideArrows();
      return;
    }
    
    renderSlides(updates, slider);
    updateArrowButtons();
  });

  function calculateCardsPerView() {
    const width = window.innerWidth;
    if (width <= 480) {
      cardPerView = 1;
    } else if (width <= 768) {
      cardPerView = 1;
    } else {
      cardPerView = 3;
    }
    
    if (updates.length > 0) {
      renderSlides(updates, slider);
      updateArrowButtons();
    }
  }

  function createArrowButtons(container) {
    const existingArrows = container.querySelectorAll('.slider-arrow');
    existingArrows.forEach(arrow => arrow.remove());
    
    // Left Arrow
    const leftArrow = document.createElement('button');
    leftArrow.className = 'slider-arrow slider-arrow-left';
    leftArrow.innerHTML = '‹';
    leftArrow.style.display = 'none';
    leftArrow.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (currentIndex > 0) {
        currentIndex--;
        updateSlider();
        updateArrowButtons();
      }
    });
    
    // Right Arrow
    const rightArrow = document.createElement('button');
    rightArrow.className = 'slider-arrow slider-arrow-right';
    rightArrow.innerHTML = '›';
    rightArrow.style.display = 'none';
    rightArrow.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      const maxIndex = Math.max(totalSlides - cardPerView, 0);
      if (currentIndex < maxIndex) {
        currentIndex++;
        updateSlider();
        updateArrowButtons();
      }
    });
    
    container.appendChild(leftArrow);
    container.appendChild(rightArrow);
    
    // Initial arrow update
    setTimeout(updateArrowButtons, 100);
  }

  function updateArrowButtons() {
    const leftArrow = document.querySelector('.slider-arrow-left');
    const rightArrow = document.querySelector('.slider-arrow-right');
    
    if (!leftArrow || !rightArrow) return;
    
    const maxIndex = Math.max(totalSlides - cardPerView, 0);
    
    console.log('Updating arrows:', { currentIndex, maxIndex, totalSlides, cardPerView });
    
    if (totalSlides > cardPerView) {
      leftArrow.style.display = currentIndex > 0 ? 'flex' : 'none';
      rightArrow.style.display = currentIndex < maxIndex ? 'flex' : 'none';
    } else {
      leftArrow.style.display = 'none';
      rightArrow.style.display = 'none';
    }
  }

  function hideArrows() {
    const leftArrow = document.querySelector('.slider-arrow-left');
    const rightArrow = document.querySelector('.slider-arrow-right');
    
    if (leftArrow) leftArrow.style.display = 'none';
    if (rightArrow) rightArrow.style.display = 'none';
  }
}

function renderSlides(updates, slider) {
  slider.innerHTML = "";

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

  addDragEvents(slider);
  currentIndex = 0;
  updateSlider();
}

function addDragEvents(slider) {
  const dragStart = (e) => {
    isDragging = true;
    startX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
    startScrollLeft = currentIndex * getSlideWidth();
    slider.style.cursor = 'grabbing';
    slider.style.transition = 'none';
    e.preventDefault();
  }

  const dragging = (e) => {
    if (!isDragging) return;
    
    const currentX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
    const diff = (currentX - startX) / slider.offsetWidth * 100;
    const newScroll = startScrollLeft - diff;
    
    const maxScroll = (totalSlides - cardPerView) * getSlideWidth();
    const boundedScroll = Math.max(0, Math.min(newScroll, maxScroll));
    
    slider.style.transform = `translateX(-${boundedScroll}%)`;
    e.preventDefault();
  }

  const dragStop = () => {
    if (!isDragging) return;
    isDragging = false;
    slider.style.cursor = 'grab';
    slider.style.transition = 'transform 0.3s ease';
    
    const draggedPercentage = parseFloat(slider.style.transform.replace('translateX(-', '').replace('%)', '')) || 0;
    currentIndex = Math.round(draggedPercentage / getSlideWidth());
    
    const maxIndex = Math.max(totalSlides - cardPerView, 0);
    currentIndex = Math.max(0, Math.min(currentIndex, maxIndex));
    
    updateSlider();
    updateArrowButtons();
  }

  slider.addEventListener('mousedown', dragStart);
  slider.addEventListener('touchstart', dragStart, { passive: false });
  slider.addEventListener('mousemove', dragging);
  slider.addEventListener('touchmove', dragging, { passive: false });
  slider.addEventListener('mouseup', dragStop);
  slider.addEventListener('touchend', dragStop);
  slider.addEventListener('mouseleave', dragStop);

  slider.style.cursor = 'grab';
}

function getSlideWidth() {
  return 100 / cardPerView;
}

function updateSlider() {
  const slider = document.getElementById("updatesSlider");
  if (!slider) return;
  
  const slideWidth = getSlideWidth();
  const translateX = currentIndex * slideWidth;
  
  slider.style.transform = `translateX(-${translateX}%)`;
  slider.style.transition = 'transform 0.3s ease';
  
  // Force arrow buttons update
  setTimeout(updateArrowButtons, 50);
}

// Global function for arrow buttons
function updateArrowButtons() {
  const leftArrow = document.querySelector('.slider-arrow-left');
  const rightArrow = document.querySelector('.slider-arrow-right');
  
  if (!leftArrow || !rightArrow) return;
  
  const maxIndex = Math.max(totalSlides - cardPerView, 0);
  
  if (totalSlides > cardPerView) {
    leftArrow.style.display = currentIndex > 0 ? 'flex' : 'none';
    rightArrow.style.display = currentIndex < maxIndex ? 'flex' : 'none';
  } else {
    leftArrow.style.display = 'none';
    rightArrow.style.display = 'none';
  }
}