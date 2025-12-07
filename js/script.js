document.addEventListener('click', function(e) {
    createShape(e.clientX, e.clientY);
});

function createShape(x, y) {
    const shape = document.createElement('div');
    shape.className = 'shape star';
    

    const size = Math.random() * 30 + 20;
    shape.style.width = `${size}px`;
    shape.style.height = `${size}px`;
    
    
    const colors = ['#ff9ecd', '#f8e5e5', '#e6b3b3', '#ffb6c1', '#ffc0cb'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    shape.style.backgroundColor = randomColor;
    

    shape.style.left = `${x - size/2}px`;
    shape.style.top = `${y - size/2}px`;
    

    const rotation = Math.random() * 360;
    shape.style.transform = `rotate(${rotation}deg)`;
    

    document.body.appendChild(shape);
    

    shape.addEventListener('animationend', function() {
        shape.remove();
    });
}


document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        setTimeout(() => {
            section.style.transition = 'all 0.5s ease';
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, index * 200);
    });

    const carousel = document.querySelector('.carousel-container');
    if (!carousel) return;
    
    const images = carousel.querySelectorAll('.profile-image');
    if (images.length === 0) return;
    
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    const dotsContainer = document.querySelector('.carousel-dots');
    
    if (!prevButton || !nextButton || !dotsContainer) return;
    
    let currentIndex = 0;
    

    images.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    const dots = dotsContainer.querySelectorAll('.dot');
    
    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    function goToSlide(index) {
        currentIndex = index;
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
        updateDots();
    }
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % images.length;
        goToSlide(currentIndex);
    }
    
    function prevSlide() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        goToSlide(currentIndex);
    }

    
    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);

    
    let autoplayInterval = setInterval(nextSlide, 5000);

    
    carousel.addEventListener('mouseenter', () => {
        clearInterval(autoplayInterval);
    });

    
    carousel.addEventListener('mouseleave', () => {
        autoplayInterval = setInterval(nextSlide, 5000);
    });
}); 