document.addEventListener("DOMContentLoaded", function() {
    const carousel = document.querySelector('.carousel-container');
    const cards = document.querySelectorAll('.card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const cardWidth = cards[0].offsetWidth;
    const numCards = cards.length;
    let currentPosition = 0;

    function updatePosition() {
        carousel.style.transform = `translateX(-${currentPosition * cardWidth}px)`;
    }

    prevBtn.addEventListener('click', function() {
        currentPosition = (currentPosition - 1 + numCards) % numCards;
        updatePosition();
    });

    nextBtn.addEventListener('click', function() {
        currentPosition = (currentPosition + 1) % numCards;
        updatePosition();
    });

    // Loop contínuo ao chegar ao último card
    let intervalId = setInterval(() => {
        currentPosition = (currentPosition + 1) % numCards;
        updatePosition();
    }, 5000); // Altere para a velocidade de transição desejada (em milissegundos)
});
