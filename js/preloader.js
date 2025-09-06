window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    
    // Keep loader visible for 5 seconds
    setTimeout(() => {
      loader.classList.add("hidden");
    }, 5000); // 5000ms = 5 seconds
  });