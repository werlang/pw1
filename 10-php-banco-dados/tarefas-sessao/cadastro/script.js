import { showToast } from "../componentes/toast.js";

const form = document.querySelector("form");
const message = document.querySelector("#message");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    message.hidden = true;

    const fd = new FormData(form);

    // A confirmação é só do formulário: o servidor não precisa receber esse campo.
    if (fd.get("password") !== fd.get("confirm")) {
        message.textContent = "A senha e a confirmação precisam ser iguais";
        message.hidden = false;
        return;
    }

    const data = await fetch("/api/user/index.php", {
        method: "POST",
        body: fd,
    }).then((res) => res.json());

    if (data.error) {
        message.textContent = data.message;
        message.hidden = false;
        return;
    }

    showToast(data.message, "success");

    setTimeout(() => {
        location.href = "/login/";
    }, 1200);
});
