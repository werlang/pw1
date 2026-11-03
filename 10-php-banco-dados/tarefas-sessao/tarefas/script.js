import { showToast } from "../componentes/toast.js";

const userName = document.querySelector("#user-name");
const taskList = document.querySelector("#task-list");
const empty = document.querySelector("#empty");
const form = document.querySelector("#form-task");

async function loadLoggedUser() {
    const data = await fetch("/api/user/get_logged.php").then((res) => res.json());

    // Sem sessão, a página de tarefas não deve continuar aberta.
    if (data.error) {
        location.href = "/login/";
        return;
    }

    userName.textContent = data.user.name;
}

async function loadTasks() {
    const data = await fetch("/api/task/index.php").then((res) => res.json());

    if (data.error) {
        if (data.logged === false) {
            location.href = "/login/";
            return;
        }

        showToast(data.message, "error");
        return;
    }

    renderTasks(data.tasks);
}

function renderTasks(tasks) {
    taskList.innerHTML = "";

    if (tasks.length === 0) {
        empty.hidden = false;
        return;
    }

    empty.hidden = true;

    tasks.forEach((task) => {
        const li = document.createElement("li");
        li.textContent = task.description;
        taskList.append(li);
    });
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const data = await fetch("/api/task/index.php", {
        method: "POST",
        body: new FormData(form),
    }).then((res) => res.json());

    if (data.error) {
        showToast(data.message, "error");
        return;
    }

    showToast(data.message, "success");
    form.reset();
    loadTasks();
});

document.querySelector("#logout").addEventListener("click", async () => {
    await fetch("/api/user/logout.php", { method: "POST" });
    location.href = "/login/";
});

loadLoggedUser();
loadTasks();
