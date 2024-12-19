document.addEventListener('DOMContentLoaded', () => {
    // Load the initial content based on the hash
    const initialSection = getSectionFromHash();
    loadContent(initialSection.page, initialSection.label, false);

    // Handle hash changes
    window.addEventListener('hashchange', () => {
        const section = getSectionFromHash();
        loadContent(section.page, section.label, false);
    });
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

// Function to load content dynamically
async function loadContent(page, label, updateHash = true) {
    const mainContent = document.getElementById('mainContent');
    try {
        const cacheBuster = `?_=${new Date().getTime()}`;
        const response = await fetch(`${page}${cacheBuster}`);
        if (!response.ok) {
            throw new Error('Failed to load page');
        }
        const content = await response.text();
        mainContent.innerHTML = content;

        // Update the hash in the URL
        if (updateHash) {
            window.location.hash = label.toLowerCase();
        }
    } catch (error) {
        console.error('Error loading content:', error);
        mainContent.innerHTML = '<p>Error loading content. Please try again.</p>';
    }
}

// Navigate to a new section
function navigate(page, label) {
    // Highlight the active menu item
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => item.classList.remove('active'));
    event.currentTarget.classList.add('active');

    // Load the selected content
    loadContent(page, label);
}
