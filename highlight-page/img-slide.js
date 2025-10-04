const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const dotsContainer = document.querySelector('.dots');

let currentIndex = 0;
let startX = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let isDragging = false;
let animationID;

// Create dots dynamically
slides.forEach((_, index) => {
  const dot = document.createElement('span');
  dot.classList.add('dot');
  if(index === 0) dot.classList.add('active');
  dotsContainer.appendChild(dot);
});

// Update active dot
function updateDots() {
  document.querySelectorAll('.dot').forEach((dot,i)=>{
    dot.classList.toggle('active', i===currentIndex);
  });
}

// Slide to index
function setSlide(index) {
  currentIndex = Math.min(Math.max(index,0), slides.length-1);
  currentTranslate = -currentIndex * slider.clientWidth;
  prevTranslate = currentTranslate;
  slider.style.transform = `translateX(${currentTranslate}px)`;
  updateDots();
}

// Drag functions
slider.addEventListener('pointerdown', dragStart);
slider.addEventListener('pointerup', dragEnd);
slider.addEventListener('pointerleave', dragEnd);
slider.addEventListener('pointermove', dragMove);

function dragStart(e){
  startX = e.clientX;
  isDragging = true;
  slider.style.transition = 'none';
}

function dragMove(e){
  if(!isDragging) return;
  const currentX = e.clientX;
  const diff = currentX - startX;
  slider.style.transform = `translateX(${prevTranslate + diff}px)`;
}

function dragEnd(e){
  if(!isDragging) return;
  isDragging = false;
  slider.style.transition = 'transform 0.5s ease';
  const movedBy = e.clientX - startX;
  if(movedBy < -50 && currentIndex < slides.length -1) currentIndex++;
  if(movedBy > 50 && currentIndex > 0) currentIndex--;
  setSlide(currentIndex);
}

// Make responsive
window.addEventListener('resize', ()=> setSlide(currentIndex));
