document.addEventListener('DOMContentLoaded', () => {
    // Get the subject from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const subjectName = urlParams.get('subject');  // 'mathematics', 'physics', 'chemistry', etc.

    // Update the header text
    const subjectHeader = document.querySelector('.subject-header');
    subjectHeader.textContent = `${subjectName.charAt(0).toUpperCase() + subjectName.slice(1)} Details`;

    // Update the content based on the subject
    const subjectDescription = document.querySelector('.subject-description');

    switch (subjectName) {
        case 'mathematics':
            subjectDescription.textContent = 'Mathematics is the study of numbers, shapes, and patterns. Topics include algebra, calculus, geometry, and statistics.';
            break;
        case 'physics':
            subjectDescription.textContent = 'Physics explores the laws of nature, including motion, force, energy, and waves. Key areas include classical mechanics, thermodynamics, and electromagnetism.';
            break;
        case 'chemistry':
            subjectDescription.textContent = 'Chemistry involves the study of substances and their reactions. Key topics include atomic structure, chemical bonding, organic chemistry, and the periodic table.';
            break;
        default:
            subjectDescription.textContent = 'No additional details available for this subject.';
            break;
    }
});
