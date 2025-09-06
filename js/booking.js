document.getElementById("bookingForm").addEventListener("submit", function(e) {
  e.preventDefault();
  showToast("Your room has been booked successfully!", "success");
});
