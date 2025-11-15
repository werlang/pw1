import { showToast } from "../components/toast.js";

const statusMap = {
  open: { label: "Aberto", badge: "badge-open" },
  scheduled: { label: "Agendado", badge: "badge-scheduled" },
  done: { label: "Finalizado", badge: "badge-done" },
};

const priorityMap = {
  high: "Alta",
  normal: "Normal",
  low: "Baixa",
};

const tbody = document.querySelector("#requests-table tbody");
const summaryContainer = document.getElementById("summary");
const searchInput = document.getElementById("search");
const statusSelect = document.getElementById("status-filter");
const prioritySelect = document.getElementById("priority-filter");
const mineCheckbox = document.getElementById("mine-filter");
const filterBtn = document.getElementById("filter-btn");

async function loadRequests() {
  const params = new URLSearchParams();
  if (searchInput.value.trim()) params.append("search", searchInput.value.trim());
  if (statusSelect.value) params.append("status", statusSelect.value);
  if (prioritySelect.value) params.append("priority", prioritySelect.value);
  if (mineCheckbox.checked) params.append("mine", "1");

  try {
    const search = params.toString();
    const url = search ? `../api/requests/list.php?${search}` : "../api/requests/list.php";
    const response = await fetch(url);
    const payload = await response.json();

    if (!response.ok || payload.error) {
      throw new Error(payload.message || "Erro ao carregar chamados");
    }

    renderSummary(payload.data?.summary || {});
    renderTable(payload.data?.requests || []);
  } catch (error) {
    showToast(error.message, "error");
  }
}

function renderSummary(summary) {
  const blocks = ["open", "scheduled", "done"].map((key) => {
    const value = summary[key] ?? 0;
    return `<div class="card" style="padding: 18px;">
        <p style="margin:0;color:#7a8a99;font-size:0.8rem;">${statusMap[key].label}</p>
        <h2 style="margin:4px 0 0;">${value}</h2>
      </div>`;
  });
  summaryContainer.innerHTML = blocks.join("");
}

function renderTable(requests) {
  if (!requests.length) {
    tbody.innerHTML = `<tr><td colspan="6">Nenhum chamado encontrado para os filtros atuais.</td></tr>`;
    return;
  }

  tbody.innerHTML = requests
    .map((request) => {
      const statusInfo = statusMap[request.status] || { label: request.status, badge: "" };
      return `<tr>
        <td>
          <strong>${request.greenhouse_name}</strong><br />
          <small>${request.issue_type}</small>
        </td>
        <td>${request.zone_code}</td>
        <td>${priorityMap[request.priority] || request.priority}</td>
        <td><span class="badge ${statusInfo.badge}">${statusInfo.label}</span></td>
        <td>${request.owner_name}</td>
        <td>
          <a href="../update-request/index.html?id=${request.id}">Atualizar</a>
        </td>
      </tr>`;
    })
    .join("");
}

filterBtn?.addEventListener("click", loadRequests);
searchInput?.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    loadRequests();
  }
});

const logoutBtn = document.getElementById("logout");
logoutBtn?.addEventListener("click", async () => {
  await fetch("../api/auth/logout.php");
  window.location.href = "../login/index.html";
});

loadRequests();
