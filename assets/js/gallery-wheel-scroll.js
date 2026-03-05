/**
 * SCROLL HORIZONTAL CON RUEDA DEL MOUSE
 * Convierte el scroll vertical en horizontal cuando estás sobre la galería
 */

document.addEventListener('DOMContentLoaded', () => {
  const gallery = document.querySelector('.gallery-scroll');
  
  if (!gallery) return;
  
  // Convertir scroll vertical a horizontal
  gallery.addEventListener('wheel', (e) => {
    // Prevenir scroll vertical de la página
    e.preventDefault();
    
    // Convertir deltaY (vertical) a scroll horizontal
    gallery.scrollLeft += e.deltaY;
    
    // También funciona con scroll horizontal del trackpad
    if (e.deltaX !== 0) {
      gallery.scrollLeft += e.deltaY * 1.5; // 50% más rápido
    }
  }, { passive: false }); // passive: false permite preventDefault
  
  // Ocultar indicador después del primer scroll
  const indicator = document.querySelector('.scroll-indicator');
  let hasScrolled = false;
  
  gallery.addEventListener('scroll', () => {
    if (!hasScrolled && indicator) {
      indicator.style.opacity = '0';
      indicator.style.transition = 'opacity 0.3s';
      setTimeout(() => {
        indicator.style.display = 'none';
      }, 300);
      hasScrolled = true;
    }
  });
  
  // OPCIONAL: Smooth scroll con teclado
  gallery.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      gallery.scrollBy({ left: 400, behavior: 'smooth' });
    }
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      gallery.scrollBy({ left: -400, behavior: 'smooth' });
    }
  });
  
  // Hacer focusable para teclado
  gallery.setAttribute('tabindex', '0');
});