// Alternar tema claro/escuro. A escolha fica salva neste navegador.
(function () {
  var root = document.documentElement;
  var KEY = 'fc-theme';

  function current() {
    var explicit = root.getAttribute('data-theme');
    if (explicit) return explicit;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  function label(btn) {
    var next = current() === 'light' ? 'escuro' : 'claro';
    btn.setAttribute('aria-label', 'Usar tema ' + next);
    btn.setAttribute('title', 'Usar tema ' + next);
  }

  document.addEventListener('DOMContentLoaded', function () {
    var btn = document.querySelector('[data-theme-toggle]');
    if (!btn) return;
    label(btn);
    btn.addEventListener('click', function () {
      var next = current() === 'light' ? 'dark' : 'light';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem(KEY, next); } catch (e) {}
      label(btn);
    });
  });
})();
