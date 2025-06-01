document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-register');
    const fullNameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const togglePasswordBtn = document.getElementById('toggle-password');
    const iconEye = document.getElementById('icon-eye');
    const iconEyeSlash = document.getElementById('icon-eye-slash');

    // Data contoh untuk auto-fill
    const sampleData = {
        fullName: 'Aqila Noraihana',
        email: 'aqilanor@student.ub.ac.id',
        password: 'anjai12345678'
    };

    /** AUTO-FILL FUNCTIONALITY **/
    // Auto-fill saat click pada input (jika input kosong)
    fullNameInput.addEventListener('click', () => {
        if (fullNameInput.value.trim() === '') {
            fullNameInput.value = sampleData.fullName;
            // Tambahkan efek visual
            fullNameInput.style.backgroundColor = '#e8f5e8';
            setTimeout(() => {
                fullNameInput.style.backgroundColor = '';
            }, 1000);
        }
    });

    emailInput.addEventListener('click', () => {
        if (emailInput.value.trim() === '') {
            emailInput.value = sampleData.email;
            // Tambahkan efek visual
            emailInput.style.backgroundColor = '#e8f5e8';
            setTimeout(() => {
                emailInput.style.backgroundColor = '';
            }, 1000);
        }
    });

    passwordInput.addEventListener('click', () => {
        if (passwordInput.value.trim() === '') {
            passwordInput.value = sampleData.password;
            // Tambahkan efek visual
            passwordInput.style.backgroundColor = '#e8f5e8';
            setTimeout(() => {
                passwordInput.style.backgroundColor = '';
            }, 1000);
        }
    });

    // Optional: Auto-fill semua field dengan double-click pada form
    form.addEventListener('dblclick', (e) => {
        if (e.target === form || e.target.classList.contains('form-card')) {
            fullNameInput.value = sampleData.fullName;
            emailInput.value = sampleData.email;
            passwordInput.value = sampleData.password;
            
            // Efek visual untuk semua input
            [fullNameInput, emailInput, passwordInput].forEach(input => {
                input.style.backgroundColor = '#e8f5e8';
                setTimeout(() => {
                    input.style.backgroundColor = '';
                }, 1000);
            });
        }
    });

    // Optional: Keyboard shortcut untuk auto-fill (Ctrl + Shift + F)
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.shiftKey && e.key === 'F') {
            e.preventDefault();
            fullNameInput.value = sampleData.fullName;
            emailInput.value = sampleData.email;
            passwordInput.value = sampleData.password;
            
            // Fokus ke input pertama
            fullNameInput.focus();
            
            // Efek visual
            [fullNameInput, emailInput, passwordInput].forEach(input => {
                input.style.backgroundColor = '#e8f5e8';
                setTimeout(() => {
                    input.style.backgroundColor = '';
                }, 1000);
            });
        }
    });

    /** 1) SHOW / HIDE PASSWORD dengan SVG icons **/
    if (togglePasswordBtn) {
        togglePasswordBtn.addEventListener('click', () => {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            // Toggle icon visibility
            if (type === 'password') {
                // Password is hidden, show eye icon
                iconEye.style.display = 'block';
                iconEyeSlash.style.display = 'none';
            } else {
                // Password is visible, show eye-slash icon
                iconEye.style.display = 'none';
                iconEyeSlash.style.display = 'block';
            }
        });
    }

    /** 2) VALIDASI SEDERHANA SAAT SUBMIT **/
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let valid = true;

        // Reset error states
        [fullNameInput, emailInput, passwordInput].forEach((input) => {
            input.classList.remove('input-error');
        });

        // Validate each field
        [fullNameInput, emailInput, passwordInput].forEach((input) => {
            if (input.value.trim() === '') {
                valid = false;
                input.classList.add('input-error');
            }
        });

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value.trim() !== '' && !emailRegex.test(emailInput.value.trim())) {
            valid = false;
            emailInput.classList.add('input-error');
        }

        // Password validation (minimum 6 characters)
        if (passwordInput.value.trim() !== '' && passwordInput.value.trim().length < 6) {
            valid = false;
            passwordInput.classList.add('input-error');
        }

        if (!valid) {
            // Tambahkan animasi shake pada form-card
            const card = document.querySelector('.form-card');
            card.classList.add('shake');
            setTimeout(() => card.classList.remove('shake'), 500);
            return;
        }

        // Jika valid, kirim data (simulasi)
        console.log('Mengirim data registrasi:', {
            fullName: fullNameInput.value.trim(),
            email: emailInput.value.trim(),
            password: passwordInput.value.trim(),
        });

        // Contoh respons: alihkan ke halaman login
        window.location.href = 'registration_data.html';
    });

    /** 3) MICROINTERACTION: Fokus input menambah class 'focused' **/
    [fullNameInput, emailInput, passwordInput].forEach((input) => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('focused');
        });

        // Remove error state when user starts typing
        input.addEventListener('input', () => {
            input.classList.remove('input-error');
        });
    });
});