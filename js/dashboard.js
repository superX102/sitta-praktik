const userTokenKey = "authToken";
const userNameKey = "user";

document.addEventListener("DOMContentLoaded", cekLogin);

function cekLogin() {
  const token = localStorage.getItem(userTokenKey);
  const username = localStorage.getItem(userNameKey);

  if (token && username) {

    const userDisplay = document.getElementById("loggedInUser");
    if (userDisplay) {
      userDisplay.textContent = username;
    }

    updateGreeting(username);
  } else {
    alert("Anda belum login. Silakan masuk kembali.");

    window.location.href = "index.html";
  }

  const logoutButton = document.getElementById("logoutButton");
  if (logoutButton) {
    logoutButton.addEventListener("click", logoutUser);
  }
}

function updateGreeting(username) {
  const date = new Date();
  const hour = date.getHours();
  let greetingText;

  if (hour >= 4 && hour < 12) {
    greetingText = "Selamat Pagi";
  } else if (hour >= 12 && hour < 15) {
    greetingText = "Selamat Siang";
  } else if (hour >= 15 && hour < 18) {
    greetingText = "Selamat Sore";
  } else {
    greetingText = "Selamat Malam";
  }

  document.getElementById(
    "greeting"
  ).textContent = `${greetingText}, ${username}!`;
}

function logoutUser() {
  localStorage.removeItem(userTokenKey);
  localStorage.removeItem(userNameKey);
  alert("Anda telah logout.");
  window.location.href = "index.html";
}
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.querySelector(".nav-links");
  const navOverlay = document.getElementById("nav-overlay");
  const dropdowns = document.querySelectorAll(".dropdown");
  const body = document.body;

  const toggleMenu = () => {
    const isActive = navLinks.classList.toggle("active");
    hamburger.classList.toggle("active", isActive);
    navOverlay.classList.toggle("active", isActive);

    if (!isActive) {
      dropdowns.forEach((dropdown) => dropdown.classList.remove("active"));
    }
  };

  hamburger.addEventListener("click", toggleMenu);
  navOverlay.addEventListener("click", toggleMenu);

  dropdowns.forEach((dropdown) => {
    const dropbtn = dropdown.querySelector(".dropbtn");
    dropbtn.addEventListener("click", (e) => {
      if (navLinks.classList.contains("active") || window.innerWidth <= 768) {
        e.preventDefault();

        const isThisDropdownActive = dropdown.classList.contains("active");

        dropdowns.forEach((otherDropdown) => {
          if (otherDropdown !== dropdown) {
            otherDropdown.classList.remove("active");
          }
        });
        dropdown.classList.toggle("active", !isThisDropdownActive);
      }
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
      navOverlay.classList.remove("active");
    }
    dropdowns.forEach((dropdown) => {
      dropdown.classList.remove("active");
    });
  });
});