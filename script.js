document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('main-header');
    
    // Add scroll effect to navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle (simple implementation)
    const mobileToggle = document.getElementById('mobile-toggle');
    const nav = document.querySelector('.main-nav');
    
    mobileToggle.addEventListener('click', () => {
        // Just as an example: toggle display property. 
        // In a real scenario, you'd add a class and slide it in with CSS.
        nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
        nav.style.flexDirection = 'column';
        nav.style.position = 'absolute';
        nav.style.top = '100%';
        nav.style.left = '0';
        nav.style.width = '100%';
        nav.style.background = '#fff';
        nav.style.padding = '2rem';
        nav.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
    });

    // Reset styles on resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 900) {
            nav.style.display = 'flex';
            nav.style.flexDirection = 'row';
            nav.style.position = 'static';
            nav.style.width = 'auto';
            nav.style.padding = '0';
            nav.style.boxShadow = 'none';
        } else {
            nav.style.display = 'none';
        }
    });

    // Modal Logic
    const modal = document.getElementById('demo-modal');
    const demoButtons = document.querySelectorAll('a[href="#book-demo"]');
    const closeModal = document.querySelector('.close-modal');

    if (modal && closeModal) {
        demoButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                modal.classList.add('active');
            });
        });

        closeModal.addEventListener('click', () => {
            modal.classList.remove('active');
        });

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }
});
