document.addEventListener('DOMContentLoaded', () => {
    const carouselContainer = document.querySelector('.carousel-container');
    const cloneItems = () => {
        const items = document.querySelectorAll('.carousel-item');
        items.forEach(item => {
            const clone = item.cloneNode(true);
            carouselContainer.appendChild(clone);
        });
    };

    cloneItems();
});
