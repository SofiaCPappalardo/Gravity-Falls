document.addEventListener('DOMContentLoaded', () => {
    const acordeonItems = document.querySelectorAll('.acordeon-item');

    // Si no hay elementos de acordeón en la página, no hacer nada.
    if (acordeonItems.length === 0) {
        return;
    }

    acordeonItems.forEach(item => {
        const boton = item.querySelector('.acordeon-boton');
        const contenido = item.querySelector('.acordeon-contenido');

        boton.addEventListener('click', () => {
            const isExpanded = boton.getAttribute('aria-expanded') === 'true';

            // Cerrar todos los demás acordeones para que solo uno esté abierto a la vez
            acordeonItems.forEach(otherItem => {
                if (otherItem !== item) {
                    const otherBoton = otherItem.querySelector('.acordeon-boton');
                    const otherContenido = otherItem.querySelector('.acordeon-contenido');
                    otherBoton.classList.remove('activo');
                    otherBoton.setAttribute('aria-expanded', 'false');
                    otherContenido.style.maxHeight = null;
                }
            });

            // Alternar el estado del acordeón clickeado
            boton.classList.toggle('activo');
            contenido.style.maxHeight = isExpanded ? null : contenido.scrollHeight + 'px';
            boton.setAttribute('aria-expanded', String(!isExpanded));
        });
    });
});