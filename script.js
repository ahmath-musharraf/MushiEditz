// Particle Animation
const canvas = document.getElementById('particles-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 50;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
            this.opacity = Math.random() * 0.5 + 0.2;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }

        draw() {
            ctx.fillStyle = `rgba(99, 102, 241, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        // Connect nearby particles
        particles.forEach((particle, i) => {
            particles.slice(i + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    ctx.strokeStyle = `rgba(99, 102, 241, ${0.2 * (1 - distance / 150)})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.stroke();
                }
            });
        });

        requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards
document.querySelectorAll('.service-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Observe portfolio items
document.querySelectorAll('.portfolio-item').forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(item);
});

// Form submission handler
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const subject = contactForm.querySelectorAll('input[type="text"]')[1].value;
        const message = contactForm.querySelector('textarea').value;
        
        // Simple validation
        if (name && email && subject && message) {
            // Here you would typically send the data to a server
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        } else {
            alert('Please fill in all fields.');
        }
    });
}

// Counter animation for stats
const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
};

// Animate stats section numbers
const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-target'));
                    if (target) {
                        stat.textContent = '0';
                        animateCounter(stat, target);
                    }
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statsObserver.observe(statsSection);
}

// Observe about stats section
const aboutStatsSection = document.querySelector('.stats');
if (aboutStatsSection) {
    const aboutStatsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-item h3');
                statNumbers.forEach(stat => {
                    const text = stat.textContent;
                    const number = parseInt(text.replace(/\D/g, ''));
                    if (number) {
                        stat.textContent = '0+';
                        animateCounter(stat, number);
                    }
                });
                aboutStatsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    aboutStatsObserver.observe(aboutStatsSection);
}

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-background');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add active state to navigation links based on scroll position
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
});

// Add CSS for active nav link
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--text-primary);
    }
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// Add cursor trail effect
let cursorTrail = [];
const maxTrailLength = 20;

document.addEventListener('mousemove', (e) => {
    cursorTrail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
    
    if (cursorTrail.length > maxTrailLength) {
        cursorTrail.shift();
    }
    
    // Remove old trail points
    cursorTrail = cursorTrail.filter(point => Date.now() - point.time < 500);
});

// Add parallax effect to floating shapes
window.addEventListener('mousemove', (e) => {
    const shapes = document.querySelectorAll('.shape');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 20;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
        shape.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// Add magnetic effect to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        btn.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
    });
});

// Add tilt effect to service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(-10px) scale(1.02)';
        setTimeout(() => {
            card.style.transform = '';
        }, 300);
    });
});

// Add text reveal animation on scroll
const textRevealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.section-title, .section-subtitle').forEach(el => {
    textRevealObserver.observe(el);
});

// Add glow effect to portfolio items on hover
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.filter = 'brightness(1.1)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.filter = 'brightness(1)';
    });
});

// Animate case study cards on scroll
document.querySelectorAll('.case-study-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Animate testimonial cards on scroll with staggered delays
const testimonialObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 100);
            testimonialObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.testimonial-card').forEach((card) => {
    testimonialObserver.observe(card);
});

// Animate why-us cards on scroll
document.querySelectorAll('.why-us-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});


// Animate owner message section
const ownerSection = document.querySelector('.owner-message');
if (ownerSection) {
    const ownerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const ownerPhoto = entry.target.querySelector('.owner-photo');
                const ownerText = entry.target.querySelector('.owner-text');
                
                if (ownerPhoto) {
                    ownerPhoto.style.opacity = '0';
                    ownerPhoto.style.transform = 'translateX(-50px) scale(0.9)';
                    setTimeout(() => {
                        ownerPhoto.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                        ownerPhoto.style.opacity = '1';
                        ownerPhoto.style.transform = 'translateX(0) scale(1)';
                    }, 100);
                }
                
                if (ownerText) {
                    ownerText.style.opacity = '0';
                    ownerText.style.transform = 'translateX(50px)';
                    setTimeout(() => {
                        ownerText.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.2s';
                        ownerText.style.opacity = '1';
                        ownerText.style.transform = 'translateX(0)';
                    }, 200);
                }
                
                ownerObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    ownerObserver.observe(ownerSection);
}

