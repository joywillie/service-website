const API = "https://your-render-url.onrender.com/api";

// SIGNUP
async function signup() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  await fetch(API + "/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password })
  });

  alert("Account created");
}

// LOGIN
async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch(API + "/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  localStorage.setItem("user", JSON.stringify(data));
  alert("Login successful");
  window.location.href = "dashboard.html";
}

// LOAD SERVICES
async function loadServices() {
  const res = await fetch(API + "/services");
  const data = await res.json();

  document.getElementById("services").innerHTML =
    data.map(s => `
      <div>
        <h3>${s.name}</h3>
        <p>${s.description}</p>
      </div>
    `).join("");
}

if (document.getElementById("services")) {
  loadServices();
}
