document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('searchButton');
    const closeSearchButton = document.getElementById('closeSearchButton');
    const searchSection = document.getElementById('searchSection');
    const menuButton = document.getElementById('menuButton');
    const closeMenuButton = document.getElementById('closeMenuButton');
    const menuSection = document.getElementById('menuSection');
    const header = document.querySelector('header');
    const homeSection = document.getElementById('homeSection'); // Sélection de la section d'accueil

    // Cacher toutes les overlays sauf la page d'accueil au chargement
    const overlays = document.querySelectorAll('.overlay');
    overlays.forEach(overlay => {
        if (overlay !== homeSection) {
            overlay.style.display = 'none';
        }
    });

    // Fonction pour montrer ou cacher la barre de navigation en fonction du défilement
    let lastScrollTop = 0;
    let didScroll;

    function toggleHeaderVisibility() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop) {
            header.classList.add('hidden-header');
        } else {
            header.classList.remove('hidden-header');
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }

    // Écouteurs d'événements pour les boutons de recherche et de menu
    searchButton.addEventListener('click', () => {
        searchSection.style.display = 'flex';
    });

    closeSearchButton.addEventListener('click', () => {
        // Appliquer l'animation de disparition
        searchSection.style.animation = 'fadeOutAnimation 0.5s forwards';

        // Attendez la fin de l'animation pour masquer la section de recherche
        setTimeout(() => {
            searchSection.style.display = 'none';
            searchSection.style.animation = ''; // Réinitialiser l'animation pour une utilisation future
        }, 500); // Durée de l'animation
    });

    menuButton.addEventListener('click', () => {
        menuSection.style.display = 'flex';
    });

    closeMenuButton.addEventListener('click', () => {
        menuSection.style.display = 'none';
    });

    // Écouteur d'événements pour les éléments de navigation pour afficher les overlays
    const navItems = document.querySelectorAll('header nav ul li a');

    navItems.forEach(item => {
        item.addEventListener('mouseover', () => {
            const sectionId = item.getAttribute('href').substring(1) + 'Section';
            overlays.forEach(overlay => {
                overlay.style.display = overlay.id === sectionId ? 'flex' : 'none';
            });
        });
    });

    overlays.forEach(overlay => {
        overlay.addEventListener('mouseleave', () => {
            overlay.style.display = overlay === homeSection ? 'flex' : 'none';
        });
    });

    // Écouteur d'événements de défilement de la fenêtre pour afficher ou masquer la barre de navigation
    window.addEventListener('scroll', function() {
        didScroll = true;
    });

    setInterval(function() {
        if (didScroll) {
            toggleHeaderVisibility();
            didScroll = false;
        }
    }, 250);

    // Réinitialiser la visibilité de la barre de navigation lors du redimensionnement de la fenêtre
    window.addEventListener('resize', () => {
        header.classList.remove('hidden-header');
        lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    });

    // Animation de disparition de l'overlay de chargement
    const loadingOverlay = document.getElementById('loading-overlay');
    setTimeout(() => {
        loadingOverlay.style.animation = 'fadeOut 1s forwards';
        loadingOverlay.addEventListener('animationend', () => {
            loadingOverlay.style.display = 'none';
            document.body.style.overflow = 'auto'; // Réactiver le défilement
        });
    }, 3000); // 3 secondes au total (2s d'animation + 1s de délai)
});
