// Espera a que el DOM esté completamente cargado para ejecutar el script
document.addEventListener('DOMContentLoaded', () => {

    const body = document.body;
    const darkModeToggle = document.getElementById('darkModeToggle');
    const toggleIcon = darkModeToggle.querySelector('i');

    // === Lógica de Smooth Scroll ===
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navbarToggler = document.querySelector('.navbar-toggler');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const href = link.getAttribute('href');
            // Maneja el link '#' que apunta al inicio
            const targetId = (href === '#') ? 'home' : href.substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const navbarHeight = navbar.offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                
                // Calcula la posición final restando la altura del navbar
                const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Cierra el menú hamburguesa si está abierto (en móviles)
                if (navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
            }
        });
    });

    // === Lógica del Dark Mode ===
    
    // Función para aplicar el tema (dark o light)
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            body.classList.add('dark');
            toggleIcon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark');
            toggleIcon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'light');
        }
    };

    // Detecta la preferencia del sistema
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Obtiene la preferencia guardada por el usuario (si existe)
    const userSavedTheme = localStorage.getItem('theme');

    // Carga inicial del tema:
    // 1. Si el usuario ya eligió, usa esa.
    // 2. Si no, usa la preferencia del sistema.
    if (userSavedTheme) {
        applyTheme(userSavedTheme);
    } else {
        applyTheme(systemPrefersDark.matches ? 'dark' : 'light');
    }

    // Listener para el botón de toggle
    darkModeToggle.addEventListener('click', () => {
        const currentTheme = body.classList.contains('dark') ? 'light' : 'dark';
        applyTheme(currentTheme);
    });
    
    // Listener por si el usuario cambia la preferencia del sistema (solo si no ha elegido manualmente)
    systemPrefersDark.addEventListener('change', (e) => {
        // Solo actualiza si el usuario no ha hecho una elección manual
        if (!localStorage.getItem('theme')) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });

    // === Lógica del Formulario de Contacto ===
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Previene el envío real del formulario
        
        // Simulación de envío
        alert('¡Mensaje enviado! 📤');
        
        // Limpia el formulario
        contactForm.reset();
    });

});