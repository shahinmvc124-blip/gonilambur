// Nilambur Website JS

document.addEventListener('DOMContentLoaded', () => {
    initSlider('shop-track');
    initSlider('place-track');
    initSlider('stay-track');
    initSlider('restaurants-track');
    initSlider('fuel-track');
    initTheme();
    initScrollTop();
    initNavToggle();
});

function initNavToggle() {
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;

    if (!menuToggle || !navMenu) return;

    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        navMenu.classList.toggle('active');

        // Toggle icon
        const icon = menuToggle.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.replace('fa-bars', 'fa-times');
            body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
        } else {
            icon.classList.replace('fa-times', 'fa-bars');
            body.style.overflow = '';
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            menuToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
            body.style.overflow = '';
        }
    });

    // Close menu when clicking a link
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
            body.style.overflow = '';
        });
    });
}

function initScrollTop() {
    const scrollTopBtn = document.querySelector('.scroll-to-top-btn');
    if (!scrollTopBtn) return;

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 400) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

function initTheme() {
    const toggleBtns = document.querySelectorAll('#theme-toggle, #theme-toggle-mobile');
    if (toggleBtns.length === 0) return;

    // Check for saved theme
    if (localStorage.getItem('theme') === 'dark') {
        document.documentElement.classList.add('dark-mode');
    }

    toggleBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (btn.id === 'theme-toggle-mobile') e.preventDefault();
            document.documentElement.classList.toggle('dark-mode');

            // Save preference
            if (document.documentElement.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });
    });
}

function initSlider(trackId) {
    const track = document.getElementById(trackId);
    if (!track) return;

    // To create a seamless loop, we clone original cards
    const originalCards = Array.from(track.children);
    originalCards.forEach(card => {
        let clone = card.cloneNode(true);
        track.appendChild(clone);
    });

    let currentPos = 0;
    const totalCards = originalCards.length;
    let sliderInterval = null;
    let loopTimeout = null;

    function move() {
        currentPos++;
        const gap = parseInt(window.getComputedStyle(track).gap) || 0;
        const cardWidth = track.firstElementChild.offsetWidth + gap;

        track.style.transition = 'transform 0.6s ease-in-out';
        track.style.transform = `translateX(-${currentPos * cardWidth}px)`;

        if (currentPos >= totalCards) {
            // Store timeout ID to clear it on hover
            loopTimeout = setTimeout(() => {
                track.style.transition = 'none';
                currentPos = 0;
                track.style.transform = `translateX(0)`;
            }, 600);
        }
    }

    function startAutoPlay() {
        if (!sliderInterval) {
            sliderInterval = setInterval(move, 3000);
        }
    }

    function stopAutoPlay() {
        clearInterval(sliderInterval);
        sliderInterval = null;
        if (loopTimeout) {
            clearTimeout(loopTimeout);
            loopTimeout = null;
        }
    }

    startAutoPlay();

    // Pause on hover
    const parent = track.parentElement;
    parent.addEventListener('mouseenter', stopAutoPlay);
    parent.addEventListener('mouseleave', startAutoPlay);
}

// Add smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            return;
        }

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Handle Active Navigation Links (Moved out of the above loop)
document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-menu a, .category-nav a').forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});
