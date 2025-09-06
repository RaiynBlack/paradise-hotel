document.getElementById("signupForm").addEventListener("submit", function(e) {
  e.preventDefault();
  showToast("Account created successfully! You can now sign in.", "success");
  setTimeout(() => window.location.href = "signin.html", 1500);
});
