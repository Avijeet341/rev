document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.subject-card');

    cards.forEach(card => {
        const viewDetailsBtn = card.querySelector('.view-details-btn');
        viewDetailsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const subject = card.getAttribute('data-subject');
            console.log(`Viewing details for ${subject}`);
            // Add your view details functionality here
        });

        // Add hover animations
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) rotateX(5deg)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) rotateX(0)';
        });
    });
});