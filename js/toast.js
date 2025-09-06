// Create container if it doesn't exist
function getToastContainer() {
  let container = document.querySelector(".toast-container");
  if (!container) {
    container = document.createElement("div");
    container.className = "toast-container";
    document.body.appendChild(container);
  }
  return container;
}

// Show toast
function showToast(message, type = "info") {
  const container = getToastContainer();
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerHTML = message;

  container.appendChild(toast);

  // Remove after 5s
  setTimeout(() => {
    toast.remove();
  }, 5000);
}
