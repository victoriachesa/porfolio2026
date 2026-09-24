"use strict";

// ========== Idioma ES / EN ==========
const LANG_KEY = "lang";

function readLang() {
  try {
    const stored = localStorage.getItem(LANG_KEY);
    if (stored === "es" || stored === "en") return stored;
  } catch (e) {}
  return "es";
}

function applyLang(lang) {
  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach(function (el) {
    if (!el._es) el._es = el.textContent.replace(/\s+/g, " ").trim();
    var en = I18N[el.getAttribute("data-i18n")];
    el.textContent = lang === "en" && en ? en : el._es;
  });

  document.querySelectorAll("[data-lang-toggle]").forEach(function (btn) {
    const isEs = lang === "es";
    btn.textContent = isEs ? "ES" : "EN";
    btn.setAttribute("aria-label", isEs ? "Cambiar a inglés" : "Switch to Spanish");
  });

  try {
    localStorage.setItem(LANG_KEY, lang);
  } catch (e) {}
}

applyLang(readLang());

document.querySelectorAll("[data-lang-toggle]").forEach(function (btn) {
  btn.addEventListener("click", function () {
    applyLang(document.documentElement.lang === "es" ? "en" : "es");
  });
});

// ========== Open & Close Aside Navigation ==========
const openNav = document.querySelector(".open-nav");
const closeNav = document.querySelector(".close-nav");
const asideOverlay = document.querySelector(".aside-navigation-overlay");
const asideNav = document.querySelector(".aside-navigation");

if (openNav && asideOverlay && asideNav) {
  openNav.addEventListener("click", function (e) {
    e.preventDefault();
    asideOverlay.classList.add("active");
    asideNav.classList.add("active");
  });
}

if (closeNav && asideOverlay && asideNav) {
  closeNav.addEventListener("click", function (e) {
    e.preventDefault();
    asideOverlay.classList.remove("active");
    asideNav.classList.remove("active");
  });
}

// ========== Portfolio Filters - CORREGIDO ========== 
const filterButtons = document.querySelectorAll('.filter-btn');
const projects = document.querySelectorAll('.item');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    
    // Activar botón seleccionado
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    // Filtrar proyectos - ARREGLADO: oculta el <a> padre
    projects.forEach(project => {
      const parentLink = project.closest('a');
      if (!parentLink) return;

      if (filter === 'all' || project.dataset.category === filter) {
        parentLink.style.display = ''; // Mostrar
        // Opcional: añadir animación de entrada
        setTimeout(() => {
          parentLink.style.opacity = '1';
        }, 10);
      } else {
        parentLink.style.display = 'none'; // Ocultar
        parentLink.style.opacity = '0';
      }
    });
  });
});

// Inicializar opacidad para transiciones suaves
projects.forEach(project => {
  const parentLink = project.closest('a');
  if (parentLink) {
    parentLink.style.transition = 'opacity 0.3s ease';
    parentLink.style.opacity = '1';
  }
});

// ========== Smooth Scroll - ARREGLADO ========== 
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    
    // Solo hacer scroll si es un ancla válida
    if (href && href.length > 1 && href !== '#') {
      const target = document.querySelector(href);
      
      if (target) {
        e.preventDefault();
        
        // Scroll suave al elemento
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // Opcional: actualizar URL sin hacer jump
        // history.pushState(null, null, href);
      }
    }
  });
});

const cursor = document.createElement('div');
cursor.classList.add('cursor');
document.body.appendChild(cursor);

document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

