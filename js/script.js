document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login");
  const cadastroForm = document.querySelector(".input-area");
  const message = document.getElementById("mensagem");
  const messageCadastro = document.getElementById("mensagemCadastro");
  const logoutButton = document.getElementById("logout");

  const usersKey = "users";
  let users = JSON.parse(localStorage.getItem(usersKey)) || [{ email: "portocarcare@front.com", password: "1577" }];

  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      console.log("Tentativa de login com:", email, password); // Debug

      const user = users.find((user) => user.email === email && user.password === password);
      if (user) {
        console.log("Login bem-sucedido para o usuário:", user); // Debug
        sessionStorage.setItem("usuario", JSON.stringify(user));
        message.textContent = "Login bem-sucedido!";
        message.className = "sucesso";
        setTimeout(() => {
          console.log("Redirecionando para index.html"); // Debug
          window.location.href = "../index.html"; // Caminho ajustado para redirecionar para a raiz
        }, 2000);
      } else {
        console.log("Login falhou: email ou senha inválidos."); // Debug
        message.textContent = "Email ou senha inválidos.";
        message.className = "erro";
        setTimeout(() => {
          message.textContent = "";
        }, 5000);
      }
    });
  }

  if (cadastroForm) {
    cadastroForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const name = document.getElementById("name").value;
      const email = document.getElementById("cadastroEmail").value;
      const telefone = document.getElementById("telefone").value;
      const password = document.getElementById("cadastroSenha").value;

      console.log("Tentativa de cadastro com:", name, email, telefone); // Debug

      const userExists = users.some((user) => user.email === email);
      if (userExists) {
        console.log("Falha no cadastro: Email já cadastrado."); // Debug
        messageCadastro.textContent = "Email já cadastrado.";
        messageCadastro.className = "erro";
        setTimeout(() => {
          messageCadastro.textContent = "";
        }, 5000);
      } else {
        const newUser = { name: name, email: email, telefone: telefone, password: password };
        users.push(newUser);
        localStorage.setItem(usersKey, JSON.stringify(users));
        console.log("Cadastro bem-sucedido:", newUser); // Debug
        messageCadastro.textContent = "Cadastro bem-sucedido!";
        messageCadastro.className = "sucesso";
        setTimeout(() => {
          window.location.href = "./login.html"; // Use caminho relativo correto
        }, 2000);
      }
    });
  }

  if (logoutButton) {
    logoutButton.addEventListener("click", function () {
      sessionStorage.removeItem("usuario");
      console.log("Usuário deslogado."); // Debug
      window.location.href = "./login-cadastro/login.html"; // Use caminho relativo correto
    });

    const user = JSON.parse(sessionStorage.getItem("usuario"));
    if (!user) {
      console.log("Nenhum usuário logado. Redirecionando para login."); // Debug
      window.location.href = "./login-cadastro/login.html"; // Use caminho relativo correto
    } else {
      const welcomeMessage = document.getElementById("mensagem");
      const userData = document.getElementById("dados");

      console.log("Usuário logado:", user); // Debug

      if (welcomeMessage) {
        welcomeMessage.textContent = `Bem-vindo, ${user.email}!`;
      }
      if (userData) {
        userData.textContent = JSON.stringify(user);
      }
    }
  }
});
