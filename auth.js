// Usuários válidos (em um app real, viria do backend ou banco de dados)
const users = [
    { username: "admin", password: "1234", role: "admin" },
    { username: "editor", password: "4321", role: "editor" },
    { username: "viewer", password: "0000", role: "viewer" },
  ];
  
  function login(username, password) {
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userRole", user.role);
      localStorage.setItem("userName", user.username);
      return true;
    }
    return false;
  }
  
  function logout() {
    localStorage.clear();
    window.location.href = "login.html";
  }
  
  function isAuthenticated() {
    return localStorage.getItem("isAuthenticated") === "true";
  }
  
  function getUserRole() {
    return localStorage.getItem("userRole");
  }
  
  function getUserName() {
    return localStorage.getItem("userName");
  }
  
  function requireRole(role, redirect = "login.html") {
    if (!isAuthenticated() || getUserRole() !== role) {
      alert("Acesso negado.");
      window.location.href = redirect;
    }
  }
  