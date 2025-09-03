// Save and get users from localStorage
function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}
function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

// Sign up
const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", e => {
    e.preventDefault();
    let users = getUsers();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    if (users.find(u => u.username === username)) {
      alert("User already exists!");
      return;
    }
    users.push({ username, password });
    saveUsers(users);
    alert("Signup successful! Please sign in.");
    window.location.href = "signin.html";
  });
}

// Sign in
const signinForm = document.getElementById("signinForm");
if (signinForm) {
  signinForm.addEventListener("submit", e => {
    e.preventDefault();
    let users = getUsers();
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      localStorage.setItem("loggedInUser", username);
      alert("Welcome, " + username);
      window.location.href = "index.html";
    } else {
      alert("Invalid credentials!");
    }
  });
}

// Sign out
const signoutBtn = document.getElementById("signoutBtn");
if (signoutBtn) {
  if (localStorage.getItem("loggedInUser")) {
    signoutBtn.style.display = "inline";
    document.getElementById("authLink").style.display = "none";
  }
  signoutBtn.addEventListener("click", () => {
    localStorage.removeItem("loggedInUser");
    window.location.href = "index.html";
  });
}

// Bookings
function getBookings() {
  return JSON.parse(localStorage.getItem("bookings")) || [];
}
function saveBookings(bookings) {
  localStorage.setItem("bookings", JSON.stringify(bookings));
}

const bookingForm = document.getElementById("bookingForm");
if (bookingForm) {
  bookingForm.addEventListener("submit", e => {
    e.preventDefault();
    if (!localStorage.getItem("loggedInUser")) {
      alert("Please sign in first.");
      return;
    }
    const booking = {
      user: localStorage.getItem("loggedInUser"),
      checkin: document.getElementById("checkin").value,
      checkout: document.getElementById("checkout").value,
      roomType: document.getElementById("roomType").value,
      guests: document.getElementById("guests").value
    };
    let bookings = getBookings();
    bookings.push(booking);
    saveBookings(bookings);
    alert("Booking successful!");
  });
}

// Admin dashboard
const bookingsList = document.getElementById("bookingsList");
if (bookingsList) {
  let bookings = getBookings();
  bookingsList.innerHTML = bookings.map(b =>
    `<p><strong>${b.user}</strong> booked a ${b.roomType} room (${b.guests} guests) from ${b.checkin} to ${b.checkout}</p>`
  ).join("");
}

// Change room preview image dynamically
const roomType = document.getElementById("roomType");
const roomPreview = document.getElementById("roomPreview");
if (roomType && roomPreview) {
  roomType.addEventListener("change", () => {
    if (roomType.value === "Single") roomPreview.src = "images/single-room.jpg";
    if (roomType.value === "Double") roomPreview.src = "images/double-room.jpg";
    if (roomType.value === "Suite") roomPreview.src = "images/suite.jpg";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const selectButtons = document.querySelectorAll(".select-room");
  const roomTypeField = document.getElementById("roomType");

  selectButtons.forEach(button => {
    button.addEventListener("click", () => {
      // Get the room type from data attribute
      const selectedRoom = button.getAttribute("data-room");

      // Fill the reservation form with the selected room
      roomTypeField.value = selectedRoom;

      // Smooth scroll to the reservation form
      document.getElementById("reservation").scrollIntoView({
        behavior: "smooth"
      });
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const selectButtons = document.querySelectorAll(".select-room");
  const roomInput = document.getElementById("room");
  const pricePerNight = document.getElementById("pricePerNight");
  const totalDisplay = document.getElementById("total");
  const nightsDisplay = document.getElementById("nights");
  const roomPreviewImg = document.getElementById("selectedRoomImage");
  const roomPreviewLabel = document.getElementById("selectedRoomLabel");

  const checkinInput = document.getElementById("checkin");
  const checkoutInput = document.getElementById("checkout");

  let selectedPrice = 0;

  // Handle room selection
  selectButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".room-card");
      const roomName = card.getAttribute("data-room");
      selectedPrice = parseInt(card.getAttribute("data-price"), 10);
      const roomImg = card.getAttribute("data-img");

      // Update reservation form
      roomInput.value = roomName;
      pricePerNight.textContent = `$${selectedPrice}`;
      roomPreviewImg.src = roomImg;
      roomPreviewLabel.textContent = roomName;

      calculateTotal();
      document.getElementById("bookingForm").scrollIntoView({ behavior: "smooth" });
    });
  });

  // Calculate nights & total price
  function calculateTotal() {
    const checkin = new Date(checkinInput.value);
    const checkout = new Date(checkoutInput.value);

    if (checkin && checkout && checkout > checkin && selectedPrice > 0) {
      const diffTime = checkout - checkin;
      const nights = diffTime / (1000 * 60 * 60 * 24);
      nightsDisplay.textContent = nights;
      totalDisplay.textContent = `$${nights * selectedPrice}`;
    } else {
      nightsDisplay.textContent = 0;
      totalDisplay.textContent = "$0";
    }
  }

  checkinInput.addEventListener("change", calculateTotal);
  checkoutInput.addEventListener("change", calculateTotal);

  // Handle form submission
  document.getElementById("bookingForm").addEventListener("submit", e => {
    e.preventDefault();
    alert(`Booking confirmed for ${roomInput.value}!\nTotal: ${totalDisplay.textContent}`);
  });
});

