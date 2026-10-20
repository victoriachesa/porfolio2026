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

// Fichas cerradas: data-lock en el enlace de la home y en el body de la ficha.
// Para dejar Sede abierta, quita data-lock de index.html y de single-project-SEDE.html.
var PIN_KEY = "project-pin";
var PIN_VALUE = "seeproject2026";

function pinIsOpen() {
  try {
    return sessionStorage.getItem(PIN_KEY) === "ok";
  } catch (e) {
    return false;
  }
}

function safeProjectFile(href) {
  var file = String(href || "").split("/").pop().split("?")[0].split("#")[0];
  return /^single-project-[A-Za-z0-9-]+\.html$/.test(file) ? file : "";
}

function closePinGate() {
  var gate = document.querySelector(".pin-gate");
  if (gate) gate.remove();
  document.body.classList.remove("pin-open");
  if (location.search.indexOf("pin=") !== -1) {
    history.replaceState(null, "", location.pathname);
  }
}

function openPinGate(href) {
  var file = safeProjectFile(href);
  if (!file) return;
  if (pinIsOpen()) {
    location.href = file;
    return;
  }

  closePinGate();
  document.body.classList.add("pin-open");

  var gate = document.createElement("div");
  gate.className = "pin-gate";
  gate.setAttribute("role", "dialog");
  gate.setAttribute("aria-modal", "true");
  gate.setAttribute("aria-labelledby", "pin-title");
  gate.innerHTML =
    '<form class="pin-card">' +
      '<p class="pin-title" id="pin-title" data-i18n="pin.title">Este proyecto está protegido</p>' +
      '<p class="pin-text" data-i18n="pin.text">Escribe el PIN para verlo</p>' +
      '<input class="pin-input" type="text" name="pin" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="PIN">' +
      '<p class="pin-error" data-i18n="pin.error" hidden>PIN incorrecto</p>' +
      '<div class="pin-actions">' +
        '<button class="pin-submit" type="submit" data-i18n="pin.submit">Entrar</button>' +
        '<button class="pin-back" type="button" data-i18n="pin.back">Volver</button>' +
      '</div>' +
    '</form>';
  document.body.appendChild(gate);
  applyLang(readLang());

  var form = gate.querySelector("form");
  var input = gate.querySelector(".pin-input");
  var error = gate.querySelector(".pin-error");

  gate.querySelector(".pin-back").addEventListener("click", closePinGate);

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (input.value.trim() === PIN_VALUE) {
      try {
        sessionStorage.setItem(PIN_KEY, "ok");
      } catch (err) {}
      location.href = file;
    } else {
      form.classList.add("is-error");
      error.hidden = false;
      input.setAttribute("aria-invalid", "true");
      input.focus();
      input.select();
    }
  });

  input.addEventListener("input", function () {
    form.classList.remove("is-error");
    error.hidden = true;
    input.removeAttribute("aria-invalid");
  });

  input.focus();
}

if (document.body.hasAttribute("data-lock")) {
  if (pinIsOpen()) document.body.removeAttribute("data-lock");
} else {
  document.querySelectorAll("a[data-lock]").forEach(function (link) {
    link.addEventListener("click", function (event) {
      if (pinIsOpen()) return;
      event.preventDefault();
      openPinGate(link.getAttribute("href"));
    });
  });

  var pending = "";
  try {
    pending = new URLSearchParams(location.search).get("pin") || "";
  } catch (e) {}
  if (pending) openPinGate(pending);
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

if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
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
}

