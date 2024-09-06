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

          const user = users.find((user) => user.email === email && user.password === password);
          if (user) {
              sessionStorage.setItem("usuario", JSON.stringify(user));
              message.textContent = "Login bem-sucedido!";
              message.className = "sucesso";
              setTimeout(() => {
                  window.location.href = "index.html";
              }, 2000);
          } else {
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

          const userExists = users.some((user) => user.email === email);
          if (userExists) {
              messageCadastro.textContent = "Email já cadastrado.";
              messageCadastro.className = "erro";
              setTimeout(() => {
                  messageCadastro.textContent = "";
              }, 5000);
          } else {
              const newUser = { name: name, email: email, telefone: telefone, password: password };
              users.push(newUser);
              localStorage.setItem(usersKey, JSON.stringify(users));
              messageCadastro.textContent = "Cadastro bem-sucedido!";
              messageCadastro.className = "sucesso";
              setTimeout(() => {
                  window.location.href = "login.html";
              }, 2000);
          }
      });
  }

  if (logoutButton) {
      logoutButton.addEventListener("click", function () {
          sessionStorage.removeItem("usuario");
          window.location.href = "login.html";
      });

      const user = JSON.parse(sessionStorage.getItem("usuario"));
      if (!user) {
          window.location.href = "login.html";
      } else {
          const welcomeMessage = document.getElementById("mensagem");
          const userData = document.getElementById("dados");

          if (welcomeMessage) {
              welcomeMessage.textContent = `Bem-vindo, ${user.email}!`;
          }
          if (userData) {
              userData.textContent = JSON.stringify(user);
          }
      }
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const user = JSON.parse(sessionStorage.getItem("usuario"));
  if (!user) {
      window.location.href = "./login-cadastro/cadastro.html";
  }
});
  