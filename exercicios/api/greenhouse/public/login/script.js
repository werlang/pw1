import { showToast } from "../components/toast.js";

const form = document.getElementById("login-form");

form?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(form);

  try {
    const response = await fetch("../api/auth/login.php", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.error) {
      throw new Error(data.message || "Não foi possível efetuar o login");
    }

    showToast("Bem-vindo(a) de volta", "success");
    setTimeout(() => {
      window.location.href = "../requests/index.html";
    }, 600);
  } catch (error) {
    showToast(error.message, "error");
  }
});
