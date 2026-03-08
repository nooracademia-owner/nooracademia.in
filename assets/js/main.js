const COURSES = [
  {
    id: 'web-development',
    title: 'Full Stack Web Development',
    description: 'Build responsive websites and dynamic apps using HTML, CSS, JavaScript, and modern frameworks.',
    level: 'Beginner → Intermediate',
    link: 'courses.html#web-development',
  },
  {
    id: 'python-fundamentals',
    title: 'Python Fundamentals',
    description: 'Learn Python programming basics, data structures, and how to build small automation scripts.',
    level: 'Beginner',
    link: 'courses.html#python-fundamentals',
  },
  {
    id: 'career-paths',
    title: 'Career Paths in Tech',
    description: 'Explore the most in-demand tech roles and how to prepare for them with a real-world learning plan.',
    level: 'All Levels',
    link: 'courses.html#career-paths',
  },
];

function renderCourses(container, limit) {
  const items = limit ? COURSES.slice(0, limit) : COURSES;
  container.innerHTML = items
    .map(
      (course) =>
        `<article class="course-card" id="${course.id}">
          <h3>${course.title}</h3>
          <p>${course.description}</p>
          <div class="meta">
            <span>${course.level}</span>
            <a href="${course.link}">View</a>
          </div>
        </article>`
    )
    .join('');
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('Learning is the Spark.');
  console.log('Growth is the Flame.');
  console.log('Success is the Strategy.');
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

  // Populate course listings on pages that include the course grid
  const courseGrid = document.getElementById('courseGrid');
  if (courseGrid) {
    const isHome = currentPage === 'index.html';
    renderCourses(courseGrid, isHome ? 3 : undefined);
  }

  // Mobile Navigation Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      nav.classList.toggle('active');
    });
  }
});
