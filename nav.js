// nav.js

// DOM Ready Event
document.addEventListener('DOMContentLoaded', () => {
    // Load the initial content based on the hash
    const initialSection = getSectionFromHash();
    loadContent(initialSection.page, initialSection.label, false);

    // Handle hash changes for navigation
    window.addEventListener('hashchange', () => {
        const section = getSectionFromHash();
        loadContent(section.page, section.label, false);
    });

    // Add event listener to theme toggle button
    const themeButton = document.getElementById('themeButton');
    themeButton.addEventListener('click', toggleTheme);

    // Highlight the active menu item on page load
    highlightActiveMenuItem(initialSection.label);

    // Add event listeners for navigation links
    setupNavigationLinks();

    // Event delegation for View Details button click
    document.getElementById('mainContent').addEventListener('click', handleViewDetailsClick);
});

// Get the section based on the current hash
function getSectionFromHash() {
    const hash = window.location.hash.slice(1).toLowerCase(); // Remove the '#' character
    switch (hash) {
        case 'students':
            return { page: 'students-content.html', label: 'Students' };
        case 'attendance':
            return { page: 'attendance-content.html', label: 'Attendance' };
        case 'settings':
            return { page: 'settings-content.html', label: 'Settings' };
        default:
            return { page: 'dashboard-content.html', label: 'Dashboard' };
    }
}

// Function to dynamically load content into the main area
async function loadContent(page, label, updateHash = true) {
    const mainContent = document.getElementById('mainContent');
    mainContent.style.opacity = 0; // Fade out animation

    try {
        const cacheBuster = `?_=${new Date().getTime()}`; // Avoid cache issues
        const response = await fetch(`${page}${cacheBuster}`);
        if (!response.ok) {
            throw new Error('Failed to load page');
        }
        const content = await response.text();

        // Add delay for fade-out, then fade in new content
        setTimeout(() => {
            mainContent.innerHTML = content;
            mainContent.style.opacity = 1; // Fade in animation
        }, 300);

        // Update the URL hash if required
        if (updateHash) {
            window.location.hash = label.toLowerCase();
        }

        // Highlight the active menu item
        highlightActiveMenuItem(label);
    } catch (error) {
        console.error('Error loading content:', error);
        mainContent.innerHTML = '<p>Error loading content. Please try again.</p>';
        mainContent.style.opacity = 1; // Ensure content is visible even on error
    }
}

// Highlight the currently active menu item
function highlightActiveMenuItem(label) {
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach((item) => {
        item.classList.remove('active');
        if (item.textContent.trim() === label) {
            item.classList.add('active');
        }
    });
}

// Setup navigation link click event listeners
function setupNavigationLinks() {
    const dashboardLink = document.getElementById('dashboard-link');
    const studentsLink = document.getElementById('students-link');
    const attendanceLink = document.getElementById('attendance-link');
    const settingsLink = document.getElementById('settings-link');

    dashboardLink.addEventListener('click', () => {
        loadContent('dashboard-content.html', 'Dashboard');
    });

    studentsLink.addEventListener('click', () => {
        loadContent('students-content.html', 'Students');
    });

    attendanceLink.addEventListener('click', () => {
        loadContent('attendance-content.html', 'Attendance');
    });

    settingsLink.addEventListener('click', () => {
        loadContent('settings-content.html', 'Settings');
    });
}

// Handle View Details button click (delegated)
function handleViewDetailsClick(event) {
    // Check if the clicked element is a View Details button
    if (event.target.classList.contains('view-details-btn')) {
        const subjectCard = event.target.closest('.subject-card'); // Find the closest subject card
        const subject = subjectCard.getAttribute('data-subject');
        console.log(`Viewing details for ${subject}`);

        // Redirect to section-content.html with the subject as a URL parameter
        window.location.href = `section-content.html?subject=${subject}`;
    }
}

// Toggle Theme (Light/Dark Mode)
function toggleTheme() {
    const body = document.body;
    body.classList.toggle('dark-theme'); // Toggle dark theme class

    // Change the theme icon
    const themeIcon = document.getElementById('themeIcon');
    themeIcon.textContent = themeIcon.textContent === '🌙' ? '☀️' : '🌙';

    // Save the user's theme preference in localStorage
    const isDarkTheme = body.classList.contains('dark-theme');
    localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
}

// Load user's saved theme preference
function loadSavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        const themeIcon = document.getElementById('themeIcon');
        themeIcon.textContent = '☀️';
    }
}

// Call function to load theme preference on page load
loadSavedTheme();
