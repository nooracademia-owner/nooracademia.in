/* OPEN YOUTUBE CHANNEL */

function goToYouTube() {
window.open("https://youtube.com/@nooracademia", "_blank");
}

/* SUBSCRIBE BUTTON */

function subscribeChannel() {
window.open("https://youtube.com/@nooracademia?sub_confirmation=1", "_blank");
}

/* SMOOTH SCROLL FOR NAVIGATION */

document.querySelectorAll('nav a').forEach(anchor => {

```
anchor.addEventListener('click', function (e) {

    const targetId = this.getAttribute('href');

    if (targetId.startsWith("#")) {

        e.preventDefault();

        const target = document.querySelector(targetId);

        if (target) {
            target.scrollIntoView({
                behavior: "smooth"
            });
        }

    }

});
```

});

/* SIMPLE SCROLL ANIMATION */

const elements = document.querySelectorAll(".feature, .course, .stat");

function revealOnScroll() {

```
const windowHeight = window.innerHeight;

elements.forEach(el => {

    const elementTop = el.getBoundingClientRect().top;

    if (elementTop < windowHeight - 100) {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
    }

});
```

}

window.addEventListener("scroll", revealOnScroll);

/* INITIAL STYLE FOR ANIMATION */

elements.forEach(el => {

```
el.style.opacity = "0";
el.style.transform = "translateY(40px)";
el.style.transition = "all 0.6s ease";
```

});
