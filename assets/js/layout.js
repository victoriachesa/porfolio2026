(function () {
  var parts = {
    header:
      '<header class="main-header">' +
        '<div class="container">' +
          '<a href="index.html">' +
            '<img src="assets/img/pixel rosa.png" class="logo" alt="Victoria Chesa">' +
          '</a>' +
          '<button type="button" class="lang-toggle" data-lang-toggle aria-label="Cambiar a inglés">ES</button>' +
        '</div>' +
      '</header>',
    footer:
      '<footer class="footer-default">' +
        '<div class="container">' +
          '<p class="copyright">©2026 Made with love:)</p>' +
          '<ul class="follow-us-links">' +
            '<li><a href="https://www.linkedin.com/in/victoria-chesa/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>' +
            '<li><a href="mailto:victoriachesa@gmail.com" target="_blank" rel="noopener noreferrer">Email</a></li>' +
            '<li><a href="https://www.behance.net/victoriachesa" target="_blank" rel="noopener noreferrer">Behance</a></li>' +
          '</ul>' +
        '</div>' +
      '</footer>'
  };

  var script = document.currentScript;
  var html = parts[script.getAttribute('data-part')];
  if (!html) return;
  script.insertAdjacentHTML('afterend', html);
  script.remove();
})();
