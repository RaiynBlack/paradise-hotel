document.getElementById("signinForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;

  // Simulate login
  if (username === "admin" && password === "1234") {
    showToast("Welcome back, Admin!", "success");
    localStorage.setItem("currentUser", JSON.stringify({ username, role: "admin" }));
    setTimeout(() => window.location.href = "dashboard.html", 1500);
  } else {
    showToast("Invalid username or password.", "error");
  }
});
