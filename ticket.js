const STORAGE_KEY = "codingConfAttendee";

let stored = null;
try {
  stored = localStorage.getItem(STORAGE_KEY) ||
           sessionStorage.getItem(STORAGE_KEY);
} catch (err) {
  stored = null;
}

if (!stored) {
  window.location.replace("index.html");
} else {
  const attendee = JSON.parse(stored);

  document.getElementById("ticketName").textContent = attendee.name;
  document.getElementById("ticketFullName").textContent = attendee.name;
  document.getElementById("ticketSerial").textContent = attendee.serial;
  document.getElementById("ticketEmailMsg").textContent =
    "We'll send the event details to " + attendee.email + ".";

  const avatar = document.getElementById("ticketAvatar");
  avatar.src = attendee.avatar;
  avatar.alt = "Profile picture of " + attendee.name;

  const link = document.getElementById("ticketGithub");
  link.textContent = attendee.github;
  link.href = "https://github.com/" + attendee.github.slice(1);
}
