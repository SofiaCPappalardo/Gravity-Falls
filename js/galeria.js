document.addEventListener('DOMContentLoaded', () => {
    const lightbox = document.getElementById('lightbox');
    
    // Si no estamos en la página de la galería, no hacemos nada.
    if (!lightbox) {
        return;
    }

    // Seleccionar todos los elementos del DOM una sola vez
    const galeriaItems = document.querySelectorAll('.galeria-item img');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const cerrarBtn = document.getElementById('lightbox-cerrar');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');

    // Variables de estado
    let currentIndex = 0;

    // --- FUNCIONES ---

    const showImage = (index) => {
        const item = galeriaItems[index];
        lightboxImg.src = item.src;
        lightboxCaption.innerHTML = item.alt;
        currentIndex = index;
    };

    const openLightbox = (index) => {
        lightbox.classList.add('activo');
        showImage(index);
    };

    const closeLightbox = () => {
        lightbox.classList.remove('activo');
    };

    const showNextImage = () => {
        const nextIndex = (currentIndex + 1) % galeriaItems.length;
        showImage(nextIndex);
    };

    const showPrevImage = () => {
        const prevIndex = (currentIndex - 1 + galeriaItems.length) % galeriaItems.length;
        showImage(prevIndex);
    };

    // --- ASIGNACIÓN DE EVENTOS ---

    // 1. Abrir lightbox
    galeriaItems.forEach((item, index) => {
        item.addEventListener('click', () => openLightbox(index));
    });

    // 2. Controles del lightbox
    cerrarBtn.addEventListener('click', closeLightbox);
    
    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showNextImage();
    });

    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showPrevImage();
    });

    // 3. Cerrar al hacer clic en el fondo
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // 4. Controles de teclado
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('activo')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') showNextImage();
        if (e.key === 'ArrowLeft') showPrevImage();
    });
});
