// DOM Elements
const navbar = document.getElementById('navbar');
const themeToggle = document.getElementById('theme-toggle');
const mobileToggle = document.getElementById('mobile-toggle');
const navLinks = document.getElementById('nav-links');
const navItems = document.querySelectorAll('.nav-item');
const typewriterElement = document.getElementById('typewriter-text');
const animatedElements = document.querySelectorAll('.hidden-anim, .hidden-anim-left, .hidden-anim-right');

// Scroll Navbar setup
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
mobileToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const icon = mobileToggle.querySelector('i');
    if(navLinks.classList.contains('open')){
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
    } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
    }
});

// Close menu when clicking link
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('open');
        const icon = mobileToggle.querySelector('i');
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
    });
});

// Theme Toggle functionality
const toggleThemeIcon = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const icon = themeToggle.querySelector('i');
    if (currentTheme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
};

// Initialize theme
const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);
toggleThemeIcon();

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
    toggleThemeIcon();
});


// Typewriter Effect
const textsToType = ["Full Stack Developer", "UI/UX Enthusiast", "Problem Solver"];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
    const currentText = textsToType[textIndex];
    
    if (isDeleting) {
        typewriterElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriterElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000; // Pause at end of text
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % textsToType.length;
        typeSpeed = 500; // Pause before typing new text
    }

    setTimeout(typeWriter, typeSpeed);
}

// Start typewriter effect after short delay
setTimeout(typeWriter, 1000);


// Scroll Observer for animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show-anim');
            
            // Trigger progress bar animations if within Skills section
            const progressBars = entry.target.querySelectorAll('.progress-bar-fill');
            progressBars.forEach(bar => {
                bar.style.width = bar.getAttribute('data-width');
            });

            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

animatedElements.forEach(el => {
    sectionObserver.observe(el);
});
