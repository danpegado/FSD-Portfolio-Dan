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

contactForm.addEventListener('submit', async function(event) {
    event.preventDefault(); // Always stop default form reload

    const btn = contactForm.querySelector('button');
    const originalText = btn.innerText;
    btn.disabled = true;
    btn.innerText = 'Sending...';

    const name = document.getElementById('from_name').value.trim();
    const email = document.getElementById('email_id').value.trim();
    const message = document.getElementById('message').value.trim();

    const mongoPayload = { name, email, message };
    const emailJsPayload = {
        from_name: name,
        email_id: email,
        message: message
    };

    console.log('[CONTACT] Submit intercepted.');
    console.log('[CONTACT] Mongo payload:', mongoPayload);

    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(mongoPayload)
        });

        let responseBody = null;
        try {
            responseBody = await response.json();
        } catch (parseError) {
            console.warn('[CONTACT] Backend response was not valid JSON.', parseError);
        }

        console.log('[CONTACT] Backend status:', response.status, response.statusText);
        console.log('[CONTACT] Backend response body:', responseBody);

        if (!response.ok) {
            throw new Error(`Backend request failed with status ${response.status}`);
        }

        console.log('[CONTACT] MongoDB save succeeded. Triggering EmailJS...');

        const serviceID = 'service_7nnspgf';
        const templateID = 'template_ez4yo47';
        const emailJsResult = await emailjs.send(serviceID, templateID, emailJsPayload);
        console.log('[CONTACT] EmailJS success:', emailJsResult);

        btn.innerText = 'Message Sent! ✔';
        alert('Message Sent Successfully! 🚀');
        contactForm.reset();
    } catch (error) {
        console.error('[CONTACT] Submit flow failed:', error);
        btn.innerText = 'Failed ❌';
        alert('Failed to send message. Check console logs for details.');
    } finally {
        btn.disabled = false;
        setTimeout(() => { btn.innerText = originalText; }, 3000);
    }
});