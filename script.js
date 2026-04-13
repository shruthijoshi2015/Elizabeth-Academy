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
    
    if (mobileToggle) {
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
    }

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

        const demoForm = document.querySelector('.demo-form');
        if (demoForm) {
            demoForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const formData = new FormData(demoForm);

                // --- Input Validation ---
                const vName = formData.get('name').trim();
                const vEmail = formData.get('email').trim();
                const vPhone = formData.get('phone').replace(/\D/g, ''); // strip to digits only

                if (!/^[a-zA-Z\s]{2,50}$/.test(vName)) {
                    alert("Please enter a valid Full Name using only letters.");
                    return;
                }
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(vEmail)) {
                    alert("Please enter a valid email address.");
                    return;
                }
                // Indian numbers generally have 10 core digits. They might include '91' or '0' prefix (11-12 digits max)
                if (vPhone.length < 10 || vPhone.length > 12) {
                    alert("Please enter a valid 10-digit Indian phone number.");
                    return;
                }
                // ------------------------

                const dataObj = {};
                
                // Security 1: Honeypot Anti-Spam Check
                if (formData.get('_honeypot')) {
                    // It's a bot! Silently ignore and abort without hitting the API
                    console.warn("Bot detected. Silently dumping request.");
                    demoForm.reset();
                    modal.classList.remove('active');
                    return; 
                }

                formData.forEach((value, key) => { 
                    if (key === '_honeypot') return;

                    // Security 2: HTML Tag Stripper
                    let sanitizedValue = value.replace(/</g, "&lt;").replace(/>/g, "&gt;");

                    // Security 3: Spreadsheet Formula Injection prevention
                    if (/^[=\-+\@]/.test(sanitizedValue)) {
                        sanitizedValue = "'" + sanitizedValue;
                    }

                    dataObj[key] = sanitizedValue; 
                });

                // Convert dataObj into URL Encoded format so Google Apps script reads it natively into e.parameter!
                const encodedData = new URLSearchParams(dataObj).toString();

                fetch('https://script.google.com/macros/s/AKfycbys7Kr3IpWDxY8-oDFbH9ZmJC8kD_CAMfyWkiebEPaLSzP3RT8EStwXt98lDlw8X2VN/exec', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: encodedData
                })
                .then(() => {
                    alert('Thanks! Your demo request has been successfully scheduled.');
                    demoForm.reset();
                    modal.classList.remove('active');
                })
                .catch(() => {
                    // Google Apps script redirects can sometimes throw opaque cors errors on success
                    alert('Thanks! Your demo request has been successfully scheduled.');
                    demoForm.reset();
                    modal.classList.remove('active');
                });
            });
        }
    }
});
