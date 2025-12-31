export function initUpdatesSlider() {
  const sliders = document.querySelectorAll('.tools-slider-wrapper');
  if (!sliders.length) return;

  sliders.forEach(slider => {
    let isDown = false;
    let startX;
    let scrollLeft;
    let velocity = 0;
    let momentumID;

    const smoothMomentum = () => {
      if (Math.abs(velocity) > 0.5) {
        slider.scrollLeft -= velocity;
        velocity *= 0.95; // friction
        momentumID = requestAnimationFrame(smoothMomentum);
      } else {
        cancelAnimationFrame(momentumID);
      }
    };

    const startDrag = (x) => {
      isDown = true;
      startX = x - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
      velocity = 0;
      cancelAnimationFrame(momentumID);
      slider.style.cursor = 'grabbing';
    };

    const stopDrag = () => {
      isDown = false;
      slider.style.cursor = 'grab';
      momentumID = requestAnimationFrame(smoothMomentum);
    };

    const onMove = (x) => {
      if (!isDown) return;
      const walk = x - startX;
      velocity = walk - (scrollLeft - slider.scrollLeft);
      slider.scrollLeft = scrollLeft - walk;
    };

    // Mouse events
    slider.addEventListener('mousedown', (e) => startDrag(e.pageX));
    slider.addEventListener('mousemove', (e) => onMove(e.pageX));
    slider.addEventListener('mouseup', stopDrag);
    slider.addEventListener('mouseleave', () => isDown && stopDrag());

    // Touch events
    slider.addEventListener('touchstart', (e) => startDrag(e.touches[0].pageX));
    slider.addEventListener('touchmove', (e) => onMove(e.touches[0].pageX));
    slider.addEventListener('touchend', stopDrag);

    // Initial cursor
    slider.style.cursor = 'grab';
  });
}



