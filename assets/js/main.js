document.addEventListener('DOMContentLoaded', () => {
  // Update footer year dynamically
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Highlight current nav item
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a').forEach((link) => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });

  // Rotate hero tagline (adds a bit of dynamism)
  const taglines = [
    'Learn, Grow, Achieve with Zimmy',
    'Code smarter, not harder.',
    'Build the future, one lesson at a time.',
    'Your journey starts with a single click.',
  ];

  const heroTagline = document.querySelector('.hero p');
  if (heroTagline) {
    const randomIndex = Math.floor(Math.random() * taglines.length);
    heroTagline.textContent = taglines[randomIndex];
  }
});
