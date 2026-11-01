// Validation functions
function validateEmail(email) {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z][A-Za-z0-9-]*(\.[A-Za-z][A-Za-z0-9-]*)*\.[A-Za-z]{2,}$/;
    return emailRegex.test(String(email).trim());
}

function isStrongPassword(password) {
    const passwordRegex = /^(?!.*\s)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
    return passwordRegex.test(password);
}

function validatePhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

function validateRequired(value) {
    return value.trim() !== '';
}

function validateName(value) {
    return /^[A-Za-z]{1,16}$/.test(value.trim());
}

// Contact form validation
function validateContactForm() {
    const name = document.getElementById('contactName');
    const email = document.getElementById('contactEmail');
    const subject = document.getElementById('contactSubject');
    const message = document.getElementById('contactMessage');
    
    let isValid = true;
    
    // Clear previous errors
    document.querySelectorAll('.error-message').forEach(el => el.remove());
    
    if (name && !validateRequired(name.value)) {
        showError(name, 'Name is required');
        isValid = false;
    }
    
    if (email) {
        if (!validateRequired(email.value)) {
            showError(email, 'Email is required');
            isValid = false;
        } else if (!validateEmail(email.value)) {
            showError(email, 'Please enter a valid email');
            isValid = false;
        }
    }
    
    if (subject && !validateRequired(subject.value)) {
        showError(subject, 'Subject is required');
        isValid = false;
    }
    
    if (message && !validateRequired(message.value)) {
        showError(message, 'Message is required');
        isValid = false;
    }
    
    return isValid;
}

// Login form validation
function validateLoginForm() {
    const email = document.getElementById('loginEmail');
    const password = document.getElementById('loginPassword');
    const role = document.getElementById('loginRole');
    const rememberMe = document.getElementById('rememberMe');
    
    let isValid = true;
    document.querySelectorAll('.error-message').forEach(el => el.remove());
    
    if (email) {
        if (!validateRequired(email.value)) {
            showError(email, 'Email is required');
            isValid = false;
        } else if (!validateEmail(email.value)) {
            showError(email, 'Please enter a valid email');
            isValid = false;
        }
    }
    
    if (password) {
        if (!validateRequired(password.value)) {
            showError(password, 'Password is required');
            isValid = false;
        } else if (!isStrongPassword(password.value)) {
            showError(password, 'Password must be at least 8 characters and include uppercase, lowercase, number, and symbol');
            isValid = false;
        }
    }
    
    if (role && !validateRequired(role.value)) {
        showError(role, 'Please select a login role');
        isValid = false;
    }
    
    if (rememberMe && !rememberMe.checked) {
        showError(rememberMe, 'Please check Remember me to continue');
        isValid = false;
    }
    
    return isValid;
}

// Register form validation
function validateRegisterForm() {
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('registerEmail');
    const password = document.getElementById('registerPassword');
    const confirmPassword = document.getElementById('confirmPassword');
    const role = document.getElementById('registerRole');
    const terms = document.getElementById('terms');
    
    let isValid = true;
    document.querySelectorAll('.error-message').forEach(el => el.remove());
    
    if (firstName) {
        const value = firstName.value.trim();
        if (!value) {
            showError(firstName, 'First name is required');
            isValid = false;
        } else if (value.length > 16) {
            showError(firstName, 'First name must be 16 characters or fewer');
            isValid = false;
        } else if (!validateName(value)) {
            showError(firstName, 'First name can contain letters only');
            isValid = false;
        }
    }
    
    if (lastName) {
        const value = lastName.value.trim();
        if (!value) {
            showError(lastName, 'Last name is required');
            isValid = false;
        } else if (value.length > 16) {
            showError(lastName, 'Last name must be 16 characters or fewer');
            isValid = false;
        } else if (!validateName(value)) {
            showError(lastName, 'Last name can contain letters only');
            isValid = false;
        }
    }
    
    if (email) {
        if (!validateRequired(email.value)) {
            showError(email, 'Email is required');
            isValid = false;
        } else if (!validateEmail(email.value)) {
            showError(email, 'Please enter a valid email');
            isValid = false;
        }
    }
    
    if (password) {
        if (!validateRequired(password.value)) {
            showError(password, 'Password is required');
            isValid = false;
        } else if (!isStrongPassword(password.value)) {
            showError(password, 'Password must be at least 8 characters and include uppercase, lowercase, number, and symbol');
            isValid = false;
        }
    }
    
    if (confirmPassword) {
        if (!validateRequired(confirmPassword.value)) {
            showError(confirmPassword, 'Please confirm your password');
            isValid = false;
        } else if (confirmPassword.value !== password.value) {
            showError(confirmPassword, 'Passwords do not match');
            isValid = false;
        }
    }
    
    if (role && !validateRequired(role.value)) {
        showError(role, 'Please select an account type');
        isValid = false;
    }
    
    if (terms && !terms.checked) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = 'You must accept the terms and conditions';
        terms.parentElement.appendChild(errorDiv);
        isValid = false;
    }
    
    return isValid;
}

function showError(input, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    const container = input.type === 'checkbox' && input.closest('label')
        ? input.closest('label').parentElement
        : input.parentElement;
    container.appendChild(errorDiv);
    input.style.borderColor = 'var(--error-color)';
}

// Initialize form validations
document.addEventListener('DOMContentLoaded', () => {
    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (validateContactForm()) {
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
            }
        });
    }
    
    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (validateLoginForm()) {
                const roleSelect = document.getElementById('loginRole');
                const role = roleSelect ? roleSelect.value : 'customer';
                localStorage.setItem('stackly_role', role);
                alert('Login successful! (Demo)');
                window.location.href = role === 'admin' ? 'admin-dashboard.html' : 'customer-dashboard.html';
            } else {
                const email = document.getElementById('loginEmail');
                const password = document.getElementById('loginPassword');
                const role = document.getElementById('loginRole');
                const rememberMe = document.getElementById('rememberMe');
                let message = '';

                if (!email || !email.value.trim()) {
                    message = 'Email is required.';
                } else if (!validateEmail(email.value)) {
                    message = 'Please enter a valid email address.';
                } else if (!password || !password.value) {
                    message = 'Password is required.';
                } else if (!isStrongPassword(password.value)) {
                    message = 'Please use a strong password: at least 8 characters with uppercase, lowercase, number, and symbol.';
                } else if (!role || !role.value) {
                    message = 'Please select a login role.';
                } else if (!rememberMe || !rememberMe.checked) {
                    message = 'Please check the Remember me checkbox to continue.';
                }

                if (message) alert(message);
            }
        });
    }
    
    document.querySelectorAll('#firstName, #lastName').forEach(input => {
        input.addEventListener('input', () => {
            const cleaned = input.value.replace(/[^A-Za-z]/g, '').slice(0, 16);
            if (input.value !== cleaned) input.value = cleaned;
        });
    });
    
    // Register form
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (validateRegisterForm()) {
                const roleSelect = document.getElementById('registerRole');
                if (roleSelect) {
                    localStorage.setItem('stackly_role', roleSelect.value);
                }
                alert('Registration successful! Please login.');
                window.location.href = 'login.html';
            } else {
                const firstName = document.getElementById('firstName');
                const lastName = document.getElementById('lastName');
                const email = document.getElementById('registerEmail');
                const password = document.getElementById('registerPassword');
                const confirmPassword = document.getElementById('confirmPassword');
                const role = document.getElementById('registerRole');
                const terms = document.getElementById('terms');
                let message = '';

                if (!firstName || !firstName.value.trim()) {
                    message = 'First name is required.';
                } else if (!validateName(firstName.value)) {
                    message = 'First name can contain letters only, up to 16 characters.';
                } else if (!lastName || !lastName.value.trim()) {
                    message = 'Last name is required.';
                } else if (!validateName(lastName.value)) {
                    message = 'Last name can contain letters only, up to 16 characters.';
                } else if (email && !validateEmail(email.value)) {
                    message = email.value.trim() ? 'Please enter a valid email address.' : 'Email is required.';
                } else if (!password || !password.value) {
                    message = 'Password is required.';
                } else if (!isStrongPassword(password.value)) {
                    message = 'Please use a strong password: at least 8 characters with uppercase, lowercase, number, and symbol.';
                } else if (!confirmPassword || !confirmPassword.value) {
                    message = 'Please confirm your password.';
                } else if (confirmPassword.value !== password.value) {
                    message = 'Passwords do not match.';
                } else if (!role || !role.value) {
                    message = 'Please select an account type.';
                } else if (!terms || !terms.checked) {
                    message = 'Please accept the Terms & Conditions and Privacy Policy to continue.';
                }

                if (message) alert(message);
            }
        });
    }
    
    // Password visibility toggle
    document.querySelectorAll('.password-toggle').forEach(toggle => {
        toggle.addEventListener('click', () => {
            const input = document.getElementById(toggle.dataset.target);
            if (!input) return;
            
            const isVisible = input.type === 'text';
            input.type = isVisible ? 'password' : 'text';
            toggle.classList.toggle('is-visible', !isVisible);
            toggle.setAttribute('aria-label', isVisible ? 'Show password' : 'Hide password');
        });
    });
    
    // Clear errors on input
    document.querySelectorAll('.form-input, .form-textarea, .form-select').forEach(input => {
        input.addEventListener('input', () => {
            input.style.borderColor = 'var(--border-color)';
            const error = input.parentElement.querySelector('.error-message');
            if (error) error.remove();
        });
    });

    document.querySelectorAll('input[type="checkbox"]').forEach(input => {
        input.addEventListener('change', () => {
            const container = input.closest('label')?.parentElement;
            if (!container) return;
            container.querySelectorAll('.error-message').forEach(error => error.remove());
            input.style.borderColor = '';
        });
    });
});
