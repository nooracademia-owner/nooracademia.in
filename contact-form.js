const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const btn = this.querySelector('button[type="submit"]');
        const originalContent = btn.innerHTML;
        const formStatus = document.getElementById('form-status');

        btn.innerHTML = 'Sending...';
        btn.disabled = true;
        formStatus.style.display = 'none';

        emailjs.sendForm('service_qrcsv01', 'template_0vjd7fb', this)
            .then(function() {
                formStatus.textContent = 'Message sent successfully! We will get back to you shortly.';
                formStatus.className = 'status-success';
                formStatus.style.display = 'block';
                document.getElementById('contact-form').reset();
            }, function(error) {
                console.log('FAILED...', error);
                formStatus.textContent = 'Failed to send message. Please try again later or contact us directly.';
                formStatus.className = 'status-error';
                formStatus.style.display = 'block';
            })
            .finally(function() {
                btn.innerHTML = originalContent;
                btn.disabled = false;
            });
    });
}