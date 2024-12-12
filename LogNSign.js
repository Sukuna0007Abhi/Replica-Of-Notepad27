// Form Elements
const form = document.getElementById("form");
const formTitle = document.getElementById("form-title");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const submitBtn = document.getElementById("submit-btn");
const toggleLink = document.getElementById("toggle-link");
const message = document.getElementById("message");

// State to track the current form (login/signup)
let isLogin = true;

// Toggle between login and signup forms
toggleLink.addEventListener("click", (e) => {
  e.preventDefault();
  isLogin = !isLogin;

  if (isLogin) {
    formTitle.textContent = "Login";
    submitBtn.textContent = "Login";
    toggleLink.textContent = "Sign up";
    message.textContent = "";
  } else {
    formTitle.textContent = "Sign Up";
    submitBtn.textContent = "Sign Up";
    toggleLink.textContent = "Login";
    message.textContent = "";
  }
});

// Handle form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!email || !password) {
    message.textContent = "Please fill in all fields.";
    return;
  }

  if (isLogin) {
    // Login logic
    const storedUser = JSON.parse(localStorage.getItem(email));
    if (storedUser && storedUser.password === password) {
      message.style.color = "green";
      message.textContent = "Login successful!";
    } else {
      message.style.color = "red";
      message.textContent = "Invalid email or password.";
    }
  } else {
    // Sign up logic
    if (localStorage.getItem(email)) {
      message.style.color = "red";
      message.textContent = "User already exists.";
    } else {
      localStorage.setItem(email, JSON.stringify({ email, password }));
      message.style.color = "green";
      message.textContent = "Sign up successful! You can now log in.";
      isLogin = true;
      formTitle.textContent = "Login";
      submitBtn.textContent = "Login";
      toggleLink.textContent = "Sign up";
    }
  }

  // Clear form fields
  emailInput.value = "";
  passwordInput.value = "";
});
