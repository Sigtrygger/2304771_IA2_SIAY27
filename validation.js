const form = document.getElementById("regForm");

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;   // user@domain.com
const GITHUB_PATTERN = /^@[A-Za-z0-9-]{1,39}$/;        // must start with @
const MAX_FILE_SIZE = 500 * 1024;                      // 500KB
const ALLOWED_TYPES = ["image/jpeg", "image/png"];
const STORAGE_KEY = "codingConfAttendee";

function setError(fieldId, message) {
  document.getElementById(fieldId + "-error").textContent = message;
}

function validateForm() {
  let valid = true;

  const name = document.getElementById("fullName").value.trim();
  const email = document.getElementById("email").value.trim();
  const github = document.getElementById("github").value.trim();
  const file = document.getElementById("avatar").files[0];

  if (name === "") {
    setError("fullName", "Please enter your full name.");
    valid = false;
  } else {
    setError("fullName", "");
  }

  if (!EMAIL_PATTERN.test(email)) {
    setError("email", "Enter a valid email like user@domain.com.");
    valid = false;
  } else {
    setError("email", "");
  }

  if (!GITHUB_PATTERN.test(github)) {
    setError("github", "GitHub username must start with @ (e.g. @gmail.com).");
    valid = false;
  } else {
    setError("github", "");
  }

  if (!file) {
    setError("avatar", "Please upload a profile picture.");
    valid = false;
  } else if (!ALLOWED_TYPES.includes(file.type)) {
    setError("avatar", "Only JPEG or PNG images are allowed.");
    valid = false;
  } else if (file.size > MAX_FILE_SIZE) {
    setError("avatar", "Image must be smaller than 500KB.");
    valid = false;
  } else {
    setError("avatar", "");
  }

  return valid;
}

function saveAttendee(attendee) {
  const json = JSON.stringify(attendee);
  try {
    localStorage.setItem(STORAGE_KEY, json);
    return true;
  } catch (err) {
    try {
      sessionStorage.setItem(STORAGE_KEY, json);
      return true;
    } catch (err2) {
      return false;
    }
  }
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  document.getElementById("form-status").textContent = "";

  if (!validateForm()) {
    return;
  }

  const reader = new FileReader();

  reader.addEventListener("load", function () {
    const attendee = {
      name: document.getElementById("fullName").value.trim(),
      email: document.getElementById("email").value.trim(),
      github: document.getElementById("github").value.trim(),
      avatar: reader.result,
      serial: "#" + String(Math.floor(Math.random() * 100000)).padStart(5, "0")
    };

    if (saveAttendee(attendee)) {
      window.location.href = "ticket.html";
    } else {
      document.getElementById("form-status").textContent =
        "Could not save your details. Try opening the site through a local server or a normal browser window.";
    }
  });

  reader.addEventListener("error", function () {
    setError("avatar", "Could not read that image. Please choose another file.");
  });

  reader.readAsDataURL(document.getElementById("avatar").files[0]);
});
