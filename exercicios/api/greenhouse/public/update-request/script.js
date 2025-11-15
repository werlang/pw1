import { showToast } from "../components/toast.js";

const infoBox = document.getElementById("request-info");
const form = document.getElementById("update-form");
const params = new URLSearchParams(window.location.search);
const requestId = params.get("id");

if (!requestId) {
  infoBox.innerHTML = "<p>Chamado não informado.</p>";
  form.style.display = "none";
} else {
  fetchRequest(requestId);
}

async function fetchRequest(id) {
  try {
    const response = await fetch(`../api/requests/list.php?id=${id}&mine=1`);
    const payload = await response.json();

    if (payload.error) {
      throw new Error(payload.message || "Não foi possível carregar o chamado");
    }

    const request = payload.data?.requests?.[0];
    if (!request) {
      throw new Error("Chamado não encontrado para o seu usuário");
    }

    infoBox.innerHTML = `
      <h2>${request.greenhouse_name}</h2>
      <p><strong>Zona:</strong> ${request.zone_code}</p>
      <p><strong>Tipo:</strong> ${request.issue_type}</p>
      <p><strong>Status atual:</strong> ${request.status}</p>
    `;
    form.dataset.id = request.id;
  } catch (error) {
    showToast(error.message, "error");
    form.style.display = "none";
  }
}

form?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  formData.append('id', form.dataset.id);

  try {
    const response = await fetch("../api/requests/update.php", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.error) {
      throw new Error(data.message || "Não foi possível atualizar");
    }

    showToast("Chamado atualizado", "success");
    setTimeout(() => {
      window.location.href = "../requests/index.html";
    }, 600);
  } catch (error) {
    showToast(error.message, "error");
  }
});
