/* OPEN YOUTUBE CHANNEL */
function goToYouTube() {
    window.open("https://youtube.com/@nooracademia", "_blank");
}

/* SUBSCRIBE BUTTON */
function subscribeChannel() {
    window.open("https://youtube.com/@nooracademia?sub_confirmation=1", "_blank");
}

// Wait for the DOM to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', () => {

    /* --- MOBILE NAVIGATION --- */
    const menuBtn = document.getElementById('menu-btn');
    const mainNav = document.querySelector('nav');

    if (menuBtn && mainNav) {
        menuBtn.addEventListener('click', () => {
            const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
            mainNav.classList.toggle('nav-active');
            menuBtn.setAttribute('aria-expanded', String(!isExpanded));
        });
    }

    /* --- SMOOTH SCROLL & CLOSE MOBILE NAV --- */
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Close mobile nav on link click
            if (mainNav && mainNav.classList.contains('nav-active')) {
                mainNav.classList.remove('nav-active');
                if (menuBtn) {
                    menuBtn.setAttribute('aria-expanded', 'false');
                }
            }

            const targetId = this.getAttribute('href');
            if (targetId && targetId.startsWith("#")) {
                e.preventDefault();
                const target = document.querySelector(targetId);
                if (target) {
                    target.scrollIntoView({
                        behavior: "smooth"
                    });
                }
            }
        });
    });

    /* --- SCROLL-IN ANIMATION USING INTERSECTION OBSERVER --- */
    const animatedElements = document.querySelectorAll(".feature, .course, .stat");

    // Add initial class to elements that will be animated
    animatedElements.forEach(el => {
        el.classList.add('reveal-on-scroll');
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Stop observing the element once it's visible for performance
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    animatedElements.forEach(el => {
        observer.observe(el);
    });

});
