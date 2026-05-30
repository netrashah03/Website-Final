// dynamic-theme.js
// Toggles .dark-mode class on <body> and persists preference

(function () {
  const STORAGE_KEY = 'netra-theme';
  const btn = document.getElementById('theme-toggle');
  const body = document.body;

  // Load saved preference
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === 'dark') {
    body.classList.add('dark-mode');
    updateIcon(true);
  }

  if (btn) {
    btn.addEventListener('click', () => {
      const isDark = body.classList.toggle('dark-mode');
      localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light');
      updateIcon(isDark);
    });
  }

  function updateIcon(isDark) {
    if (!btn) return;
    btn.innerHTML = isDark
      ? '<span>☀️</span><span style="font-size:0.75rem;font-family:Inter,sans-serif;font-weight:600">Light</span>'
      : '<span>🌙</span><span style="font-size:0.75rem;font-family:Inter,sans-serif;font-weight:600">Dark</span>';
  }

  // Set active nav link
  document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
      const href = link.getAttribute('href');
      if (href === path || (path === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
  });
})();
