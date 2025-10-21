document.addEventListener('DOMContentLoaded', () => {

    const body = document.body;
    const darkModeToggle = document.getElementById('darkModeToggle');
    const toggleIcon = darkModeToggle.querySelector('i');
    const navbar = document.querySelector('.navbar');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navbarToggler = document.querySelector('.navbar-toggler');
    
    // ===================================
    // === MEJORA 1: Lógica del Typewriter ===
    // ===================================
    const typewriterText = document.getElementById('typewriter-text');
    const phrases = [
        "Estudiante de Ingeniería de Sistemas Computacionales.",
        "Con visión de convertirse en el mejor PROGRAMADOR de todos. 🚀",
        "Especializado en HTML, CSS, JS y Bootstrap.",
        "Aprendiendo React y desarrollo frontend moderno."
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeWriter() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            // Modo borrado
            typewriterText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Velocidad de borrado más rápida
        } else {
            // Modo escritura
            typewriterText.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100; // Velocidad de tipeo normal
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            // Pausa al terminar de escribir
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Pausa al terminar de borrar, pasa a la siguiente frase
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500; // Pequeña pausa antes de escribir la siguiente
        }

        setTimeout(typeWriter, typingSpeed);
    }
    
    // Iniciar el efecto de tipeo después de la animación del Hero
    setTimeout(typeWriter, 2000); 

    // ===================================
    // === Lógica de Smooth Scroll (sin cambios) ===
    // ===================================
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const href = link.getAttribute('href');
            const targetId = (href === '#') ? 'home' : href.substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const navbarHeight = navbar.offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                
                const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                if (navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
            }
        });
    });

    // ===================================
    // === Lógica del Dark Mode (sin cambios) ===
    // ===================================
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

    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    const userSavedTheme = localStorage.getItem('theme');

    if (userSavedTheme) {
        applyTheme(userSavedTheme);
    } else {
        applyTheme(systemPrefersDark.matches ? 'dark' : 'light');
    }

    darkModeToggle.addEventListener('click', () => {
        const currentTheme = body.classList.contains('dark') ? 'light' : 'dark';
        applyTheme(currentTheme);
    });
    
    systemPrefersDark.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });

    // ===================================
    // === Lógica del Formulario de Contacto (sin cambios) ===
    // ===================================
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simulación de envío con confirmación más amigable
        alert('¡Mensaje enviado con éxito! Me pondré en contacto contigo pronto. 📧');
        
        contactForm.reset();
    });
    
    // =======================================
    // === MEJORA 3: Lógica del Scroll Reveal (IntersectionObserver) ===
    // =======================================
    const revealElements = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Si el elemento entra en el viewport
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Dejar de observar una vez que se activa
            }
        });
    }, {
        // Opciones del observador
        root: null, // El viewport
        rootMargin: '0px',
        threshold: 0.1 // Activar cuando el 10% del elemento sea visible
    });

    revealElements.forEach(element => {
        observer.observe(element);
    });

});