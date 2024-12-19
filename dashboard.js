document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.subject-card');

    cards.forEach(card => {
        const viewDetailsBtn = card.querySelector('.view-details-btn');
        viewDetailsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const subject = card.getAttribute('data-subject');
            console.log(`Viewing details for ${subject}`);

            // Redirect to section-content.html with the subject as a URL parameter
            window.location.href = `section-content.html?subject=${subject}`;
        });
    });
});
