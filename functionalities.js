console.log("testing js.....");

if (sessionStorage.getItem("isAuthenticated") !== "true") {
  window.location.replace("login.html");
}
