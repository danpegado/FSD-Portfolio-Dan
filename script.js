/* ---------------- MATRIX RAIN EFFECT ---------------- */
const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const characters = 'DANPEGADO0101010CODEHTMLCSSJAVASCRIPTPYTHONREACT';
const alphabet = characters.split('');

const fontSize = 16;
const columns = canvas.width / fontSize;
const rainDrops = [];

for (let x = 0; x < columns; x++) {
    rainDrops[x] = 1;
}

const draw = () => {
    ctx.fillStyle = 'rgba(5, 5, 5, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00f3ff'; 
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet[Math.floor(Math.random() * alphabet.length)];
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            rainDrops[i] = 0;
        }
        rainDrops[i]++;
    }
};

setInterval(draw, 30);

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

/* ---------------- TYPING EFFECT ---------------- */
const textElement = document.querySelector(".typewriter");
const texts = ["Computer Engineer", "Web Developer", "Creative Problem Solver"];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        textElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        textElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(type, 2000); 
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        setTimeout(type, 500); 
    } else {
        setTimeout(type, isDeleting ? 100 : 150); 
    }
}

document.addEventListener("DOMContentLoaded", type);

/* ---------------- SCROLL REVEAL ---------------- */
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } 
    });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

/* ---------------- MOBILE MENU ---------------- */
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

/* ---------------- EMAILJS INTEGRATION ---------------- */
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent page reload

    // Get button to change text
    const btn = contactForm.querySelector('button');
    const originalText = btn.innerText;
    btn.innerText = 'Sending...';

    // Prepare parameters matching your EmailJS template variables
    // Ensure your EmailJS template uses {{from_name}}, {{from_email}}, and {{message}}
    const params = {
        from_name: document.getElementById('from_name').value,
        email_id: document.getElementById('email_id').value,
        message: document.getElementById('message').value
    };

    const serviceID = 'service_7nnspgf';
    const templateID = 'template_ez4yo47';

    emailjs.send(serviceID, templateID, params)
        .then(function() {
            btn.innerText = 'Message Sent! ✔';
            alert('Message Sent Successfully! 🚀');
            contactForm.reset();
            setTimeout(() => { btn.innerText = originalText; }, 3000);
        }, function(error) {
            btn.innerText = 'Failed ❌';
            alert('Failed to send message. Please try again.');
            console.log('FAILED...', error);
            setTimeout(() => { btn.innerText = originalText; }, 3000);
        });
});