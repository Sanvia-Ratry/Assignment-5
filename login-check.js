const loginBtn = document.getElementById("login-btn");

loginBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const userName = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (userName == "admin" && password == "admin123") {
    sessionStorage.setItem("isAuthenticated", "true");
    window.location.replace("index.html");
  } else {
    alert("Logging Failed, please use valid credentials");
  }
});
