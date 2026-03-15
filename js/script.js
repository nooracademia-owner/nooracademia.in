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

    const loadHTML = (url, elementId) => {
        const placeholder = document.getElementById(elementId);
        if (!placeholder) {
            // Don't throw an error, just return a resolved promise if placeholder doesn't exist
            return Promise.resolve();
        }

        return fetch(url)
            .then(response => {
                if (!response.ok) throw new Error(`Could not load ${url}: ${response.status} ${response.statusText}`);
                return response.text();
            })
            .then(data => {
                // Replace the placeholder with the fetched HTML
                placeholder.outerHTML = data;
            });
    };

    const loadTemplates = async () => {
        try {
            // Wait for all templates to be loaded
            await Promise.all([
                loadHTML('assets/templates/header.html', 'header-placeholder'),
                loadHTML('assets/templates/footer.html', 'footer-placeholder')
            ]);
        } catch (error) {
            console.error("Error loading templates:", error);
        } finally {
            // Now that templates are loaded (or failed), run the rest of the scripts
            initializePageScripts();
        }
    };

    const initializePageScripts = () => {
        // All page-specific scripts that depend on the DOM being ready (and templates loaded) go here.

    /* --- STATS COUNT-UP ANIMATION --- */
    const animateCountUp = (el) => {
        const target = parseInt(el.dataset.target, 10);
        if (isNaN(target)) return;

        const duration = 1500; // Animation duration in ms
        let startTimestamp = null;

        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            el.innerText = Math.floor(progress * target);

            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                el.innerText = target;
                // Add '+' for specific stats after animation completes
                if (target === 100 || target === 50) {
                    el.innerText += '+';
                }
            }
        };
        window.requestAnimationFrame(step);
    };

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

            const href = this.getAttribute('href');
            const [path, hash] = href.split('#');

            // Check if it's a same-page anchor link
            const currentPage = window.location.pathname.split('/').pop() || 'index.html';
            const linkPath = path || 'index.html';

            if (hash && (linkPath === currentPage)) {
                e.preventDefault();
                const target = document.querySelector('#' + hash);
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

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');

                // If the element is a stat, trigger the count-up animation
                if (entry.target.classList.contains('stat')) {
                    const numberEl = entry.target.querySelector('.stat-number');
                    // Check if it has a target and hasn't been animated yet
                    if (numberEl && numberEl.dataset.target && !numberEl.dataset.animated) {
                        animateCountUp(numberEl);
                        numberEl.dataset.animated = "true"; // Prevent re-animating
                    }
                }

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

    /* --- BACK TO TOP BUTTON --- */
    const backToTopBtn = document.getElementById('back-to-top-btn');

    if (backToTopBtn) {
        // Show or hide the button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.scrollY > 200) {
                backToTopBtn.style.display = "block";
            } else {
                backToTopBtn.style.display = "none";
            }
        });

        // Scroll to top when the button is clicked
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    };

    // Start loading templates
    loadTemplates();
});
