document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const formContainer = document.getElementById('email-form-container');
    const successMessageContainer = document.getElementById('success-message');
    const countdownSpan = document.getElementById('countdown');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent the actual form submission

            // Here you would typically send the form data to a server.
            // For this example, we'll just simulate a successful submission.
            // const formData = new FormData(contactForm);
            // const data = Object.fromEntries(formData.entries());
            // console.log('Form data:', data);

            // Hide the form and show the success message
            formContainer.style.display = 'none';
            successMessageContainer.style.display = 'block';

            // Start the countdown
            let seconds = 10;
            countdownSpan.textContent = seconds;

            const countdownInterval = setInterval(() => {
                seconds--;
                countdownSpan.textContent = seconds;

                if (seconds <= 0) {
                    clearInterval(countdownInterval);
                    // Redirect to the main page
                    window.location.href = 'index.html';
                }
            }, 1000);
        });
    }
});