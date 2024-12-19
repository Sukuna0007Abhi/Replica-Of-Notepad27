// Get buttons and forms
const btnSignup = document.getElementById('btn-signup');
const btnLogin = document.getElementById('btn-login');
const signupForm = document.getElementById('signup-form');
const loginForm = document.getElementById('login-form');

// Toggle between Sign Up and Log In forms
btnSignup.addEventListener('click', () => {
  btnSignup.classList.add('active');
  btnLogin.classList.remove('active');
  signupForm.classList.add('active');
  loginForm.classList.remove('active');
});

btnLogin.addEventListener('click', () => {
  btnLogin.classList.add('active');
  btnSignup.classList.remove('active');
  loginForm.classList.add('active');
  signupForm.classList.remove('active');
});

// Sign Up functionality
function signUp(event) {
  event.preventDefault(); // Prevent form submission

  const name = document.getElementById('signup-name').value.trim();
  const email = document.getElementById('signup-email').value.trim();
  const password = document.getElementById('signup-password').value.trim();

  // Validate inputs
  if (!name || !email || !password) {
    alert('Please fill in all fields.');
    return;
  }

  if (!validateEmail(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  // Save user data to local storage
  const userExists = localStorage.getItem(email);
  if (userExists) {
    alert('An account with this email already exists. Please log in.');
    btnLogin.click(); // Switch to the Log In form
    return;
  }

  localStorage.setItem(email, JSON.stringify({ name, password }));
  alert('Account created successfully! Please log in.');
  btnLogin.click(); // Switch to the Log In form
}

// Log In functionality
function logIn(event) {
  event.preventDefault(); // Prevent form submission

  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value.trim();

  // Validate inputs
  if (!email || !password) {
    alert('Please fill in all fields.');
    return;
  }

  const userData = localStorage.getItem(email);
  if (!userData) {
    alert('No account found with this email. Please sign up.');
    btnSignup.click(); // Switch to the Sign Up form
    return;
  }

  const { name, password: storedPassword } = JSON.parse(userData);
  if (password !== storedPassword) {
    alert('Incorrect password.');
    return;
  }

  alert(`Welcome back, ${name}!`);
  // Redirect or perform further actions for logged-in users
  window.location.href = 'webpad.html'; // Replace with the actual dashboard URL
}

// Helper function to validate email
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Load the Sign Up form by default
window.onload = () => btnSignup.click();
