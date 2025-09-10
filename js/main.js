document.addEventListener('DOMContentLoaded', () => {
    const hamburguesaBtn = document.getElementById('menu-hamburguesa-btn');
    const menuNav = document.getElementById('menu-principal');

    if (hamburguesaBtn && menuNav) {
        hamburguesaBtn.addEventListener('click', () => {
            const isExpanded = hamburguesaBtn.getAttribute('aria-expanded') === 'true';
            hamburguesaBtn.setAttribute('aria-expanded', !isExpanded);
            menuNav.classList.toggle('activo');
            
            const icono = hamburguesaBtn.querySelector('i');
            if (menuNav.classList.contains('activo')) {
                icono.classList.remove('fa-bars');
                icono.classList.add('fa-times');
                hamburguesaBtn.setAttribute('aria-label', 'Cerrar menú');
            } else {
                icono.classList.remove('fa-times');
                icono.classList.add('fa-bars');
                hamburguesaBtn.setAttribute('aria-label', 'Abrir menú');
            }
        });
    }
});