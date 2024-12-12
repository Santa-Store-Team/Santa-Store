// Hämta alla länkar i navbaren
const menuButton = document.querySelector('.menu-button');
const navLinks = document.querySelector('.nav-links');

// Dynamiskt sätta aktiv länk baserat på URL
const links = document.querySelectorAll('.nav-links a');
const currentUrl = window.location.pathname;

links.forEach(link => {
    if (link.getAttribute('href') === currentUrl) {
        link.classList.add('active');
    }
});

// Interaktivitet för dropdown-menyn
menuButton.addEventListener('click', () => {
    const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', !isExpanded);
    navLinks.classList.toggle('active');
});
