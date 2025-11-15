import { showToast } from "../components/toast.js";

const form = document.getElementById("request-form");

form?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(form);

  try {
    const response = await fetch("../api/requests/add.php", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.error) {
      throw new Error(data.message || "Erro ao salvar chamado");
    }

    showToast("Chamado registrado com sucesso", "success");
    form.reset();
    setTimeout(() => {
      window.location.href = "../requests/index.html";
    }, 800);
  } catch (error) {
    showToast(error.message, "error");
  }
});
