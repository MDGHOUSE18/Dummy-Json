function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  fetch("https://dummyjson.com/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        document.getElementById("error-message").innerText = data.error;
      } else {
        // Assuming token is returned upon successful login
        const token = data.token;
        localStorage.setItem("token", token); // Store token in localStorage
        window.location.href = "home/home.html"; // Redirect to home page
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function logout() {
  localStorage.removeItem("token"); // Remove token from localStorage
  window.location.href = "../login.html"; // Redirect to login page
}
