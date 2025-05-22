// DEIXEI AS INFORMAÇÕES DE LOGIN AQUI, SEI QUE NÃO É SEGURO MAS EU NÂO FIZ A INTEGRAÇÃO COM UM BANCO DE DADOS EXTERNO.
const users = [
  { username: "admin", password: "1234", role: "admin" }
];
// teste de commit
// Função de login
function login(username, password) {
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
    window.location.href = "henzo.html";
  } else {
    const errorElement = document.getElementById("loginError");
    if (errorElement) {
      errorElement.textContent = "Usuário ou senha inválidos.";
      errorElement.style.display = "block";
    }
  }
}

// Função de logout
function logout() {
  localStorage.removeItem("user");
  window.location.href = "login.html";
}

// Pega o usuário logado
function getUser() {
  return JSON.parse(localStorage.getItem("user"));
}

// Valida o papel (role) do usuário
function requireRole(role) {
  const user = getUser();
  if (!user || user.role !== role) {
    window.location.href = "login.html";
  }
}

// Retorna o nome do usuário
function getUserName() {
  const user = getUser();
  return user ? user.username : "";
}

// Evento de DOM carregado
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", e => {
      e.preventDefault();
      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value.trim();
      login(username, password);
    });
  }
});
