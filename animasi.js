document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimation();
    initParallaxEffect();
});

// 1. Reveal Elements on Scroll
function initScrollAnimation() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    const cards = document.querySelectorAll('.card');
    const heroTexts = document.querySelectorAll('.hero-anim');

    cards.forEach(card => observer.observe(card));
    heroTexts.forEach(el => observer.observe(el));
}

// 2. Mouse Parallax Effect pada Blobs (Background bergerak mengikuti mouse)
function initParallaxEffect() {
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        const blob1 = document.querySelector('.blob-1');
        const blob2 = document.querySelector('.blob-2');

        if(blob1 && blob2) {
            blob1.style.transform = `translate(${x * 30}px, ${y * 30}px)`;
            blob2.style.transform = `translate(-${x * 30}px, -${y * 30}px)`;
        }
    });
}