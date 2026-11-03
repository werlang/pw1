import { showToast } from "../componentes/toast.js";

const form = document.querySelector("form");
const message = document.querySelector("#message");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    message.hidden = true;

    const data = await fetch("/api/user/login.php", {
        method: "POST",
        body: new FormData(form),
    }).then((res) => res.json());

    if (data.error) {
        message.textContent = data.message;
        message.hidden = false;
        return;
    }

    showToast(data.message, "success");

    // Dá tempo de o aviso aparecer antes de trocar de página.
    setTimeout(() => {
        location.href = "/tarefas/";
    }, 800);
});
