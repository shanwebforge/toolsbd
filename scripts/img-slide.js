document.addEventListener("DOMContentLoaded", function() {
  const slider = document.querySelector('.slider');
  const slides = document.querySelectorAll('.slide');
  const dotsContainer = document.querySelector('.dots');

  let currentIndex = 0;
  let startX = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;
  let isDragging = false;
  let autoSlideInterval = null;

  if(!slider) return;

  // create dots
  slides.forEach((_, index)=>{
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if(index === 0) dot.classList.add('active');
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll('.dot');

  function updateDots() {
    dots.forEach((dot,i)=>{
      dot.classList.toggle('active', i===currentIndex);
    });
  }

  function setSlide(index){
    currentIndex = Math.min(Math.max(index,0), slides.length-1);
    currentTranslate = -currentIndex * slider.clientWidth;
    prevTranslate = currentTranslate;
    slider.style.transform = `translateX(${currentTranslate}px)`;
    updateDots();
  }

  // Drag
  slider.addEventListener('pointerdown', e=>{
    startX = e.clientX;
    isDragging = true;
    slider.style.transition = 'none';
    clearInterval(autoSlideInterval); // pause auto-slide while dragging
  });

  slider.addEventListener('pointermove', e=>{
    if(!isDragging) return;
    const diff = e.clientX - startX;
    slider.style.transform = `translateX(${prevTranslate + diff}px)`;
  });

  slider.addEventListener('pointerup', e=>{
    if(!isDragging) return;
    isDragging = false;
    slider.style.transition = 'transform 0.5s ease';
    const movedBy = e.clientX - startX;
    if(movedBy < -50 && currentIndex < slides.length-1) currentIndex++;
    if(movedBy > 50 && currentIndex > 0) currentIndex--;
    setSlide(currentIndex);
    startAutoSlide(); // resume auto-slide
  });

  slider.addEventListener('pointerleave', e=>{
    if(isDragging) slider.dispatchEvent(new PointerEvent('pointerup', e));
  });

  // Dots click
  dots.forEach((dot,i)=>{
    dot.addEventListener('click', ()=> {
      setSlide(i);
      startAutoSlide(); // reset auto-slide timer
    });
  });

  // Responsive
  window.addEventListener('resize', ()=> setSlide(currentIndex));

  // Auto-slide
  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    setSlide(currentIndex);
  }

  function startAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(nextSlide, 3000); // every 3 sec
  }

  startAutoSlide(); // initial start
});
