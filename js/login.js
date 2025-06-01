document.addEventListener('DOMContentLoaded', () => {
const form = document.getElementById('form-login');
const idNameInput = document.getElementById('idName');
const passwordInput = document.getElementById('password');
const passwordToggle = document.querySelector('.password-toggle');

// Sample data untuk testing (sama dengan registration data)
const validCredentials = {
idName: 'Aqila Noraihana',
password: 'password123'
};

/** PASSWORD TOGGLE FUNCTIONALITY **/
passwordToggle.addEventListener('click', () => {
const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
passwordInput.setAttribute('type', type);

// Update icon
const icon = passwordToggle.querySelector('svg');
if (type === 'text') {
// Show "hide" icon
icon.innerHTML = `
<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
<line x1="1" y1="1" x2="23" y2="23"></line>
`;
} else {
// Show "show" icon
icon.innerHTML = `
<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
<circle cx="12" cy="12" r="3"></circle>
`;
}
});

/** AUTO-FILL FUNCTIONALITY (untuk testing) **/
idNameInput.addEventListener('click', () => {
if (idNameInput.value.trim() === '') {
idNameInput.value = validCredentials.idName;
idNameInput.style.backgroundColor = '#e8f5e8';
setTimeout(() => {
idNameInput.style.backgroundColor = '';
}, 1000);
}
});

passwordInput.addEventListener('click', () => {
if (passwordInput.value.trim() === '') {
passwordInput.value = validCredentials.password;
passwordInput.style.backgroundColor = '#e8f5e8';
setTimeout(() => {
passwordInput.style.backgroundColor = '';
}, 1000);
}
});

// Double-click untuk auto-fill semua field
form.addEventListener('dblclick', (e) => {
if (e.target === form || e.target.classList.contains('form-card')) {
idNameInput.value = validCredentials.idName;
passwordInput.value = validCredentials.password;
[idNameInput, passwordInput].forEach(input => {
input.style.backgroundColor = '#e8f5e8';
setTimeout(() => {
input.style.backgroundColor = '';
}, 1000);
});
}
});

// Keyboard shortcut Ctrl+Shift+L untuk auto-fill
document.addEventListener('keydown', (e) => {
if (e.ctrlKey && e.shiftKey && e.key === 'L') {
e.preventDefault();
idNameInput.value = validCredentials.idName;
passwordInput.value = validCredentials.password;
idNameInput.focus();
[idNameInput, passwordInput].forEach(input => {
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
[idNameInput, passwordInput].forEach((input) => {
input.classList.remove('input-error');
});

// Cek kosong
[idNameInput, passwordInput].forEach((input) => {
if (input.value.trim() === '') {
valid = false;
input.classList.add('input-error');
}
});

// Validasi kredensial
if (valid) {
const enteredIdName = idNameInput.value.trim();
const enteredPassword = passwordInput.value.trim();

if (enteredIdName !== validCredentials.idName || enteredPassword !== validCredentials.password) {
valid = false;
[idNameInput, passwordInput].forEach((input) => {
input.classList.add('input-error');
});
// Show error message (bisa ditambahkan div untuk error message)
console.log('Invalid credentials');
}
}

if (!valid) {
const card = document.querySelector('.form-card');
card.classList.add('shake');
setTimeout(() => card.classList.remove('shake'), 500);
return;
}

// Jika valid, simulasikan login
console.log('Login berhasil:', {
idName: idNameInput.value.trim(),
timestamp: new Date().toISOString()
});

// Tampilkan loading state
const submitBtn = document.querySelector('.btn-submit');
submitBtn.textContent = 'Logging in...';
submitBtn.disabled = true;

// Simulasi proses login
setTimeout(() => {
// Success state
const card = document.querySelector('.form-card');
card.classList.add('login-success');
submitBtn.textContent = '✓ Login Successful!';
submitBtn.style.backgroundColor = 'var(--color-success-normal)';

// Redirect otomatis ke dashboard.html setelah 2 detik
setTimeout(() => {
window.location.href = 'dashboard.html';
}, 2000);
}, 1500);
});

/** MICROINTERACTION: Fokus input menambah class 'focused' **/
[idNameInput, passwordInput].forEach((input) => {
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

/** FORGOT PASSWORD FUNCTIONALITY **/
document.querySelector('.forgot-password').addEventListener('click', (e) => {
e.preventDefault();
alert('Forgot Password functionality will be implemented soon!');
// Redirect ke halaman forgot password
// window.location.href = 'forgot-password.html';
});

/** WELCOME ANIMATION ON PAGE LOAD **/
const card = document.querySelector('.form-card');
const leftSection = document.querySelector('.login-left');

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