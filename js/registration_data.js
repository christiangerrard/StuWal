document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-registration-data');
    const idNameInput = document.getElementById('idName');
    const universityInput = document.getElementById('university');
    const phoneNumberInput = document.getElementById('phoneNumber');

    // Data contoh untuk auto-fill
    const sampleData = {
        idName: 'AqilaNoraihana555',
        university: 'Universitas Brawijaya',
        phoneNumber: '+62 812-3456-7890'
    };

    /** AUTO-FILL FUNCTIONALITY **/
    idNameInput.addEventListener('click', () => {
        if (idNameInput.value.trim() === '') {
            idNameInput.value = sampleData.idName;
            idNameInput.style.backgroundColor = '#e8f5e8';
            setTimeout(() => {
                idNameInput.style.backgroundColor = '';
            }, 1000);
        }
    });

    universityInput.addEventListener('click', () => {
        if (universityInput.value.trim() === '') {
            universityInput.value = sampleData.university;
            universityInput.style.backgroundColor = '#e8f5e8';
            setTimeout(() => {
                universityInput.style.backgroundColor = '';
            }, 1000);
        }
    });

    phoneNumberInput.addEventListener('click', () => {
        if (phoneNumberInput.value.trim() === '') {
            phoneNumberInput.value = sampleData.phoneNumber;
            phoneNumberInput.style.backgroundColor = '#e8f5e8';
            setTimeout(() => {
                phoneNumberInput.style.backgroundColor = '';
            }, 1000);
        }
    });

    // Double-click untuk auto-fill semua field
    form.addEventListener('dblclick', (e) => {
        if (e.target === form || e.target.classList.contains('form-card')) {
            idNameInput.value = sampleData.idName;
            universityInput.value = sampleData.university;
            phoneNumberInput.value = sampleData.phoneNumber;
            
            [idNameInput, universityInput, phoneNumberInput].forEach(input => {
                input.style.backgroundColor = '#e8f5e8';
                setTimeout(() => {
                    input.style.backgroundColor = '';
                }, 1000);
            });
        }
    });

    // Keyboard shortcut Ctrl+Shift+D untuk auto-fill
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.shiftKey && e.key === 'D') {
            e.preventDefault();
            idNameInput.value = sampleData.idName;
            universityInput.value = sampleData.university;
            phoneNumberInput.value = sampleData.phoneNumber;
            idNameInput.focus();
            
            [idNameInput, universityInput, phoneNumberInput].forEach(input => {
                input.style.backgroundColor = '#e8f5e8';
                setTimeout(() => {
                    input.style.backgroundColor = '';
                }, 1000);
            });
        }
    });

    /** VALIDASI SAAT SUBMIT **/
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let valid = true;

        // Reset error states
        [idNameInput, universityInput, phoneNumberInput].forEach((input) => {
            input.classList.remove('input-error');
        });

        // Cek kosong
        [idNameInput, universityInput, phoneNumberInput].forEach((input) => {
            if (input.value.trim() === '') {
                valid = false;
                input.classList.add('input-error');
            }
        });

        // Validasi nomor telepon (format dasar)
        const phoneRegex = /^(\+62|62|0)[\s-]?[0-9]{2,3}[\s-]?[0-9]{3,4}[\s-]?[0-9]{3,4}$/;
        if (phoneNumberInput.value.trim() !== '' && !phoneRegex.test(phoneNumberInput.value.trim().replace(/\s/g, ''))) {
            valid = false;
            phoneNumberInput.classList.add('input-error');
        }

        // Validasi nama (minimal 2 kata)
        const nameWords = idNameInput.value.trim().split(' ').filter(word => word.length > 0);
        if (idNameInput.value.trim() !== '' && nameWords.length < 2) {
            valid = false;
            idNameInput.classList.add('input-error');
        }

        if (!valid) {
            const card = document.querySelector('.form-card');
            card.classList.add('shake');
            setTimeout(() => card.classList.remove('shake'), 500);
            return;
        }

        // Jika valid, simulasikan kirim data
        console.log('Mengirim data registrasi detail:', {
            idName: idNameInput.value.trim(),
            university: universityInput.value.trim(),
            phoneNumber: phoneNumberInput.value.trim(),
        });

        // Tampilkan loading state
        const submitBtn = document.querySelector('.btn-submit');
        submitBtn.textContent = 'Processing...';
        submitBtn.disabled = true;

        // Simulasi proses registrasi
        setTimeout(() => {
            // Success state
            const card = document.querySelector('.form-card');
            card.classList.add('form-success');
            
            submitBtn.textContent = '✓ Registration Complete!';
            submitBtn.style.backgroundColor = 'var(--color-success-normal)';
            
            
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        }, 1500);
    });

    /** MICROINTERACTION: Fokus input menambah class 'focused' **/
    [idNameInput, universityInput, phoneNumberInput].forEach((input) => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('focused');
        });

        input.addEventListener('input', () => {
            input.classList.remove('input-error');
        });
    });

    /** FORMAT PHONE NUMBER INPUT **/
    phoneNumberInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.startsWith('62')) {
            value = '+62 ' + value.substring(2);
        } else if (value.startsWith('0')) {
            value = value.substring(1);
            value = '+62 ' + value;
        }
        
        if (value.length > 6) {
            value = value.substring(0, 4) + value.substring(4, 7) + '-' + value.substring(7, 11) + '-' + value.substring(11);
        }
        
        e.target.value = value;
    });

    /** WELCOME ANIMATION ON PAGE LOAD **/
    const card = document.querySelector('.form-card');
    const leftSection = document.querySelector('.registration-left');
    
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    leftSection.style.opacity = '0';
    leftSection.style.transform = 'translateX(-20px)';
    
    setTimeout(() => {
        leftSection.style.transition = 'all 0.6s ease-out';
        leftSection.style.opacity = '1';
        leftSection.style.transform = 'translateX(0)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease-out';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 200);
    }, 100);
});
