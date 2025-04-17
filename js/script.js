// Wait for DOM to fully load before running
document.addEventListener("DOMContentLoaded", function () {
    // ========== Contact Form Validation ==========
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form elements
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');

            resetErrors([name, email, subject, message]);

            let isValid = true;

            if (name.value.trim() === '') {
                showError(name, 'Please enter your name');
                isValid = false;
            }

            if (email.value.trim() === '') {
                showError(email, 'Please enter your email');
                isValid = false;
            } else if (!isValidEmail(email.value)) {
                showError(email, 'Please enter a valid email');
                isValid = false;
            }

            if (subject.value === '') {
                showError(subject, 'Please select a subject');
                isValid = false;
            }

            if (message.value.trim() === '') {
                showError(message, 'Please enter your message');
                isValid = false;
            }

            if (isValid) {
                showSuccessMessage('contactForm', 'Thank you for your message! We will get back to you shortly.');
            }
        });
    }

    // ========== Booking Form Validation ==========
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form elements
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const phone = document.getElementById('phone');
            const bookingType = document.getElementById('booking-type');
            const date = document.getElementById('date');
            const time = document.getElementById('time');
            const players = document.getElementById('players');

            resetErrors([name, email, phone, bookingType, date, time, players]);

            let isValid = true;

            if (name.value.trim() === '') {
                showError(name, 'Please enter your name');
                isValid = false;
            }

            if (email.value.trim() === '') {
                showError(email, 'Please enter your email');
                isValid = false;
            } else if (!isValidEmail(email.value)) {
                showError(email, 'Please enter a valid email');
                isValid = false;
            }

            if (phone.value.trim() !== '' && !isValidPhone(phone.value)) {
                showError(phone, 'Please enter a valid phone number');
                isValid = false;
            }

            if (bookingType.value === '') {
                showError(bookingType, 'Please select a booking type');
                isValid = false;
            }

            if (date.value === '') {
                showError(date, 'Please select a date');
                isValid = false;
            } else if (new Date(date.value) < new Date()) {
                showError(date, 'Please select a future date');
                isValid = false;
            }

            if (time.value === '') {
                showError(time, 'Please select a time');
                isValid = false;
            }

            if (players.value === '' || players.value < 2) {
                showError(players, 'Minimum 2 players required');
                isValid = false;
            }

            if (isValid) {
                showSuccessMessage('bookingForm', 'Thank you for your booking request! We will contact you shortly to confirm your reservation.');
            }
        });
    }

    // ========== Navbar Toggle ==========
    const toggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("navbar-links");

    if (toggle && navLinks) {
        toggle.addEventListener("click", function () {
            navLinks.classList.toggle("active");
        });
    }
});

// ========== Helper Functions ==========
function showError(input, message) {
    const formGroup = input.parentElement;
    const error = formGroup.querySelector('.error-message') || document.createElement('div');
    error.className = 'error-message';
    error.textContent = message;
    formGroup.appendChild(error);
    input.classList.add('error');
}

function resetErrors(inputs) {
    inputs.forEach(input => {
        input.classList.remove('error');
        const error = input.parentElement.querySelector('.error-message');
        if (error) {
            error.remove();
        }
    });
}

function showSuccessMessage(formId, message) {
    const form = document.getElementById(formId);
    const existingAlert = form.querySelector('.alert');
    if (existingAlert) existingAlert.remove();

    const alert = document.createElement('div');
    alert.className = 'alert success';
    alert.textContent = message;
    form.insertBefore(alert, form.firstChild);

    setTimeout(() => {
        form.reset();
        alert.remove();
    }, 5000);
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
    return /^[\d\s\-()+]{10,}$/.test(phone);
}
