import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getFirestore, collection, query, orderBy, onSnapshot } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

let app, db;
let currentIndex = 0;
let cardPerView = 3;
let totalSlides = 0;
let updates = [];
let isDragging = false;
let startX = 0;
let startScrollLeft = 0;
let autoSlideInterval;
let sliderElement;

export function initUpdatesSlider() {
  sliderElement = document.getElementById("updatesSlider");
  const sliderContainer = document.querySelector(".slider-container");
  
  if (!sliderElement || !sliderContainer) {
    console.error("Slider elements not found!");
    return;
  }

  // Show loading state
  sliderElement.innerHTML = '<div class="slider-loading">Loading updates...</div>';

  // Initialize Firebase
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
    console.log("Firebase already initialized or error:", error);
    try {
      app = initializeApp();
      db = getFirestore(app);
    } catch (e) {
      console.error("Failed to initialize Firebase:", e);
      sliderElement.innerHTML = '<div class="no-updates">Failed to load updates</div>';
      return;
    }
  }

  const updatesRef = collection(db, "updates");
  const q = query(updatesRef, orderBy("timestamp", "desc"));

  onSnapshot(q, 
    (snapshot) => {
      updates = [];
      snapshot.forEach(doc => {
        updates.push({ 
          id: doc.id, 
          ...doc.data() 
        });
      });
      totalSlides = updates.length;

      if (updates.length === 0) {
        sliderElement.innerHTML = '<div class="no-updates">No updates available at the moment</div>';
        hideArrows();
        return;
      }

      calculateCardsPerView();
      renderSlides(updates, sliderElement);
      createArrowButtons(sliderContainer);
      updateArrowButtons();
      setupAutoSlide();
      
      // FIXED: Force initial update
      setTimeout(updateSlider, 100);
    },
    (error) => {
      console.error("Error loading updates:", error);
      sliderElement.innerHTML = '<div class="no-updates">Error loading updates</div>';
    }
  );

  // FIXED: Better resize handler with debounce
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      calculateCardsPerView();
      if (updates.length > 0) {
        renderSlides(updates, sliderElement);
        updateArrowButtons();
        updateSlider(); // Force update on resize
      }
    }, 250);
  });
}

// Calculate cards per view based on screen width - FIXED: More accurate calculation
function calculateCardsPerView() {
  const width = window.innerWidth;
  if (width <= 480) {
    cardPerView = 1;
  } else if (width <= 768) {
    cardPerView = 2;
  } else {
    cardPerView = 3;
  }
}

// Render slides - FIXED: Better card rendering
function renderSlides(updates, slider) {
  if (!slider) return;
  
  slider.innerHTML = "";
  
  updates.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "update-card";
    card.setAttribute('data-index', index);
    
    // Format date properly
    let dateString = '';
    if (item.timestamp && item.timestamp.toDate) {
      try {
        const date = item.timestamp.toDate();
        dateString = `<small>${date.toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric' 
        })}</small>`;
      } catch (e) {
        console.warn('Error formatting date:', e);
      }
    }
    
    card.innerHTML = `
      <h3>${escapeHtml(item.title || 'No Title')}</h3>
      <p>${escapeHtml(item.content || 'No content available')}</p>
      ${dateString}
    `;
    slider.appendChild(card);
  });

  currentIndex = 0;
  addDragEvents(slider);
}

// Get slide width percentage - FIXED: More reliable calculation
function getSlideWidth() {
  return 100 / cardPerView;
}

// Update slider position - FIXED: Better bounds checking
function updateSlider() {
  const slider = document.getElementById("updatesSlider");
  if (!slider || totalSlides === 0) return;
  
  const slideWidth = getSlideWidth();
  const maxIndex = Math.max(totalSlides - cardPerView, 0);
  
  // Ensure currentIndex is within bounds
  currentIndex = Math.max(0, Math.min(currentIndex, maxIndex));
  
  // Calculate transform value
  const transformValue = -(currentIndex * slideWidth);
  slider.style.transform = `translateX(${transformValue}%)`;
  slider.style.transition = 'transform 0.3s ease';
  
  updateArrowButtons();
}

// Create arrow buttons - FIXED: Better event handling
function createArrowButtons(container) {
  const existingArrows = container.querySelectorAll('.slider-arrow');
  existingArrows.forEach(a => a.remove());

  const leftArrow = document.createElement('button');
  leftArrow.className = 'slider-arrow slider-arrow-left';
  leftArrow.innerHTML = '‹';
  leftArrow.setAttribute('aria-label', 'Previous updates');
  leftArrow.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (currentIndex > 0) {
      currentIndex--;
      updateSlider();
      resetAutoSlide();
    }
  });

  const rightArrow = document.createElement('button');
  rightArrow.className = 'slider-arrow slider-arrow-right';
  rightArrow.innerHTML = '›';
  rightArrow.setAttribute('aria-label', 'Next updates');
  rightArrow.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const maxIndex = Math.max(totalSlides - cardPerView, 0);
    if (currentIndex < maxIndex) {
      currentIndex++;
      updateSlider();
      resetAutoSlide();
    }
  });

  container.appendChild(leftArrow);
  container.appendChild(rightArrow);
}

// Update arrow visibility and state - FIXED: Better state management
function updateArrowButtons() {
  const leftArrow = document.querySelector('.slider-arrow-left');
  const rightArrow = document.querySelector('.slider-arrow-right');
  
  if (!leftArrow || !rightArrow) return;

  const maxIndex = Math.max(totalSlides - cardPerView, 0);
  const isDesktop = window.innerWidth > 768;

  if (isDesktop) {
    // On desktop, always show arrows but change state
    leftArrow.style.display = 'flex';
    rightArrow.style.display = 'flex';
    
    if (currentIndex <= 0) {
      leftArrow.classList.add('disabled');
    } else {
      leftArrow.classList.remove('disabled');
    }
    
    if (currentIndex >= maxIndex) {
      rightArrow.classList.add('disabled');
    } else {
      rightArrow.classList.remove('disabled');
    }
  } else {
    // On mobile, show/hide based on position
    leftArrow.style.display = currentIndex > 0 ? 'flex' : 'none';
    rightArrow.style.display = currentIndex < maxIndex ? 'flex' : 'none';
    leftArrow.classList.remove('disabled');
    rightArrow.classList.remove('disabled');
  }
}

// Hide arrows
function hideArrows() {
  const leftArrow = document.querySelector('.slider-arrow-left');
  const rightArrow = document.querySelector('.slider-arrow-right');
  if (leftArrow) leftArrow.style.display = 'none';
  if (rightArrow) rightArrow.style.display = 'none';
}

// Drag functionality - FIXED: Improved drag handling
function addDragEvents(slider) {
  let isDragging = false;
  let startX = 0;
  let startTranslateX = 0;

  const dragStart = (e) => {
    isDragging = true;
    startX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
    
    // Get current transform value
    const transform = slider.style.transform;
    startTranslateX = transform ? parseFloat(transform.match(/translateX\(([^%]*)%\)/)?.[1] || 0) : 0;
    
    slider.style.cursor = 'grabbing';
    slider.style.transition = 'none';
    e.preventDefault();
  };

  const dragging = (e) => {
    if (!isDragging) return;
    
    const currentX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
    const diffX = currentX - startX;
    
    // Calculate new translateX based on drag distance
    const dragSensitivity = 0.8;
    const newTranslateX = startTranslateX - (diffX / slider.offsetWidth) * 100 * dragSensitivity;
    
    // Apply limits
    const maxTranslateX = Math.max(0, totalSlides - cardPerView) * getSlideWidth();
    const boundedTranslateX = Math.max(-maxTranslateX, Math.min(0, newTranslateX));
    
    slider.style.transform = `translateX(${boundedTranslateX}%)`;
  };

  const dragStop = () => {
    if (!isDragging) return;
    
    isDragging = false;
    slider.style.cursor = 'grab';
    slider.style.transition = 'transform 0.3s ease';
    
    // Snap to nearest card
    const transformMatch = slider.style.transform.match(/translateX\(([^%]*)%\)/);
    const currentTranslateX = transformMatch ? parseFloat(transformMatch[1]) : 0;
    const slideWidth = getSlideWidth();
    
    // Calculate which card to snap to
    const draggedSlides = Math.round(Math.abs(currentTranslateX) / slideWidth);
    const maxIndex = Math.max(totalSlides - cardPerView, 0);
    
    currentIndex = Math.max(0, Math.min(draggedSlides, maxIndex));
    updateSlider();
    resetAutoSlide();
  };

  // Add event listeners
  slider.addEventListener('mousedown', dragStart);
  slider.addEventListener('touchstart', dragStart, { passive: false });
  
  document.addEventListener('mousemove', dragging);
  document.addEventListener('touchmove', dragging, { passive: false });
  
  document.addEventListener('mouseup', dragStop);
  document.addEventListener('touchend', dragStop);
  document.addEventListener('mouseleave', dragStop);
  
  slider.style.cursor = 'grab';
}

// Auto slide functionality
function setupAutoSlide() {
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval);
  }
  
  // Only auto-slide if there are more slides than visible
  if (totalSlides > cardPerView) {
    autoSlideInterval = setInterval(() => {
      const maxIndex = Math.max(totalSlides - cardPerView, 0);
      
      if (currentIndex >= maxIndex) {
        currentIndex = 0; // Loop back to start
      } else {
        currentIndex++;
      }
      
      updateSlider();
    }, 5000); // Change slide every 5 seconds
  }
}

function resetAutoSlide() {
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval);
    setupAutoSlide();
  }
}

// Utility function to escape HTML
function escapeHtml(unsafe) {
  if (typeof unsafe !== 'string') return unsafe;
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Public methods for external control - FIXED: Added proper validation
export function nextSlide() {
  if (!sliderElement || updates.length === 0) return;
  
  const maxIndex = Math.max(totalSlides - cardPerView, 0);
  if (currentIndex < maxIndex) {
    currentIndex++;
    updateSlider();
    resetAutoSlide();
  }
}

export function prevSlide() {
  if (!sliderElement || updates.length === 0) return;
  
  if (currentIndex > 0) {
    currentIndex--;
    updateSlider();
    resetAutoSlide();
  }
}

export function goToSlide(index) {
  if (!sliderElement || updates.length === 0) return;
  
  const maxIndex = Math.max(totalSlides - cardPerView, 0);
  currentIndex = Math.max(0, Math.min(index, maxIndex));
  updateSlider();
  resetAutoSlide();
}

// Cleanup function
export function destroyUpdatesSlider() {
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval);
  }
  
  const slider = document.getElementById("updatesSlider");
  if (slider) {
    slider.innerHTML = '';
    slider.style.transform = '';
  }
  
  const arrows = document.querySelectorAll('.slider-arrow');
  arrows.forEach(arrow => arrow.remove());
  
  // Remove event listeners
  const events = ['mousedown', 'touchstart', 'mousemove', 'touchmove', 'mouseup', 'touchend', 'mouseleave'];
  events.forEach(event => {
    document.removeEventListener(event, () => {});
  });
}