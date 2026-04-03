/* ============================================
   ELDESIGN - Main JavaScript
   Circuit background, scroll effects, animations
   ============================================ */

// ---- Circuit Board Canvas Background ----
class CircuitBackground {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.nodes = [];
        this.connections = [];
        this.particles = [];
        this.mouse = { x: -1000, y: -1000 };
        this.resize();
        this.init();
        this.animate();

        window.addEventListener('resize', () => this.resize());
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    init() {
        const nodeCount = Math.floor((this.canvas.width * this.canvas.height) / 25000);
        this.nodes = [];
        for (let i = 0; i < nodeCount; i++) {
            this.nodes.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                radius: Math.random() * 2 + 1,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                pulse: Math.random() * Math.PI * 2,
                pulseSpeed: Math.random() * 0.02 + 0.01
            });
        }

        // Create connections between nearby nodes
        this.connections = [];
        for (let i = 0; i < this.nodes.length; i++) {
            for (let j = i + 1; j < this.nodes.length; j++) {
                const dx = this.nodes[i].x - this.nodes[j].x;
                const dy = this.nodes[i].y - this.nodes[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 200) {
                    this.connections.push({ from: i, to: j, dist });
                }
            }
        }

        // Create traveling particles
        this.particles = [];
        for (let i = 0; i < 8; i++) {
            if (this.connections.length > 0) {
                const conn = this.connections[Math.floor(Math.random() * this.connections.length)];
                this.particles.push({
                    connection: conn,
                    progress: Math.random(),
                    speed: Math.random() * 0.005 + 0.002
                });
            }
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Update nodes
        this.nodes.forEach(node => {
            node.x += node.vx;
            node.y += node.vy;
            node.pulse += node.pulseSpeed;

            if (node.x < 0 || node.x > this.canvas.width) node.vx *= -1;
            if (node.y < 0 || node.y > this.canvas.height) node.vy *= -1;

            // Mouse interaction
            const dx = this.mouse.x - node.x;
            const dy = this.mouse.y - node.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 150) {
                const force = (150 - dist) / 150 * 0.02;
                node.vx -= dx * force * 0.01;
                node.vy -= dy * force * 0.01;
            }
        });

        // Draw connections
        this.connections.forEach(conn => {
            const from = this.nodes[conn.from];
            const to = this.nodes[conn.to];
            const dx = from.x - to.x;
            const dy = from.y - to.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 200) {
                const alpha = (1 - dist / 200) * 0.15;
                this.ctx.beginPath();
                this.ctx.strokeStyle = `rgba(0, 212, 255, ${alpha})`;
                this.ctx.lineWidth = 0.5;

                // Draw right-angle circuit-style lines
                const midX = from.x + (to.x - from.x) * 0.5;
                this.ctx.moveTo(from.x, from.y);
                this.ctx.lineTo(midX, from.y);
                this.ctx.lineTo(midX, to.y);
                this.ctx.lineTo(to.x, to.y);
                this.ctx.stroke();
            }
        });

        // Draw nodes
        this.nodes.forEach(node => {
            const glow = (Math.sin(node.pulse) + 1) * 0.5;
            const alpha = 0.3 + glow * 0.4;

            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(0, 212, 255, ${alpha})`;
            this.ctx.fill();

            // Glow effect
            if (glow > 0.7) {
                this.ctx.beginPath();
                this.ctx.arc(node.x, node.y, node.radius * 3, 0, Math.PI * 2);
                this.ctx.fillStyle = `rgba(0, 212, 255, ${(glow - 0.7) * 0.15})`;
                this.ctx.fill();
            }
        });

        // Draw traveling particles
        this.particles.forEach(particle => {
            const conn = particle.connection;
            const from = this.nodes[conn.from];
            const to = this.nodes[conn.to];
            const midX = from.x + (to.x - from.x) * 0.5;

            let px, py;
            const p = particle.progress;

            if (p < 0.33) {
                const t = p / 0.33;
                px = from.x + (midX - from.x) * t;
                py = from.y;
            } else if (p < 0.66) {
                const t = (p - 0.33) / 0.33;
                px = midX;
                py = from.y + (to.y - from.y) * t;
            } else {
                const t = (p - 0.66) / 0.34;
                px = midX + (to.x - midX) * t;
                py = to.y;
            }

            this.ctx.beginPath();
            this.ctx.arc(px, py, 2, 0, Math.PI * 2);
            this.ctx.fillStyle = 'rgba(0, 255, 136, 0.8)';
            this.ctx.fill();

            this.ctx.beginPath();
            this.ctx.arc(px, py, 6, 0, Math.PI * 2);
            this.ctx.fillStyle = 'rgba(0, 255, 136, 0.15)';
            this.ctx.fill();

            particle.progress += particle.speed;
            if (particle.progress > 1) {
                particle.progress = 0;
                const newConn = this.connections[Math.floor(Math.random() * this.connections.length)];
                if (newConn) particle.connection = newConn;
            }
        });

        requestAnimationFrame(() => this.animate());
    }
}

// ---- Navigation ----
function initNavigation() {
    const nav = document.getElementById('nav');
    const toggle = document.getElementById('nav-toggle');
    const menu = document.getElementById('nav-menu');

    // Scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        if (scrollY > 50) {
            nav.classList.add('nav--scrolled');
        } else {
            nav.classList.remove('nav--scrolled');
        }
        lastScroll = scrollY;
    });

    // Mobile toggle
    toggle.addEventListener('click', () => {
        menu.classList.toggle('nav__menu--open');
        toggle.classList.toggle('nav__toggle--active');
    });

    // Close menu on link click
    document.querySelectorAll('.nav__link').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('nav__menu--open');
            toggle.classList.remove('nav__toggle--active');
        });
    });
}

// ---- Scroll Reveal ----
function initScrollReveal() {
    const reveals = document.querySelectorAll(
        '.service-card, .consultant__card, .sector-card, .about__vision-card, .about__profile-card, .contact__form, .section__header, .consultant__left, .development__content, .development__visual, .contact__info'
    );

    reveals.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal--visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    reveals.forEach(el => observer.observe(el));
}

// ---- Counter Animation ----
function initCounters() {
    const counters = document.querySelectorAll('.hero__stat-number');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.count);
                animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    });

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(el, target) {
    let current = 0;
    const increment = target / 40;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        el.textContent = Math.floor(current);
    }, 40);
}

// ---- Active Nav Link Highlight ----
function initActiveNavLinks() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 200;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.style.color = '';
            const href = link.getAttribute('href');
            if (href && href.includes(current) && current !== '') {
                link.style.color = 'var(--accent)';
            }
        });
    });
}

// ---- Contact Form (visual feedback only) ----
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('.btn');
        const originalText = btn.querySelector('.btn__text').textContent;

        btn.querySelector('.btn__text').textContent = 'Sendt!';
        btn.style.background = '#00ff88';
        btn.style.boxShadow = '0 0 30px rgba(0, 255, 136, 0.3)';

        setTimeout(() => {
            btn.querySelector('.btn__text').textContent = originalText;
            btn.style.background = '';
            btn.style.boxShadow = '';
            form.reset();
        }, 2500);
    });
}

// ---- Smooth scroll for anchor links ----
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// ---- Parallax on hero grid ----
function initParallax() {
    const grid = document.querySelector('.hero__grid-overlay');
    if (!grid) return;

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        grid.style.transform = `translateY(${scrollY * 0.3}px)`;
    });
}

// ---- Initialize Everything ----
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('circuit-bg');
    if (canvas) new CircuitBackground(canvas);

    initNavigation();
    initScrollReveal();
    initCounters();
    initActiveNavLinks();
    initContactForm();
    initSmoothScroll();
    initParallax();
});
