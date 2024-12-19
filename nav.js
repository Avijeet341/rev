document.addEventListener('DOMContentLoaded', () => {
    // Theme toggle functionality
    const themeButton = document.getElementById("themeButton");
    const themeIcon = document.getElementById("themeIcon");

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeIcon.textContent = "☀️";
    }

    // Theme toggle handler
    themeButton.addEventListener("click", () => {
        document.body.classList.toggle("dark-theme");
        if (document.body.classList.contains("dark-theme")) {
            themeIcon.textContent = "☀️";
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.textContent = "🌙";
            localStorage.setItem('theme', 'light');
        }
    });

    // Active menu item handling
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            menuItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });

    // Handle navigation events
    window.onpopstate = (event) => {
        if (event.state && event.state.page) {
            loadContent(event.state.page, null, false);
        }
    };

    // Load initial content
    loadContent('dashboard-content.html', '/nav.html/dashboard', false);
});

// Function to load content and manage URL state
async function loadContent(page, url, pushState = true) {
    const mainContent = document.getElementById('mainContent');
    try {
        const response = await fetch(page);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const content = await response.text();
        mainContent.innerHTML = content;

        // Update browser history
        if (pushState && url) {
            history.pushState({ page }, '', url);
        }
    } catch (error) {
        console.error('Error loading content:', error);
        mainContent.innerHTML = '<p>Error loading content. Please try again.</p>';
    }
}
