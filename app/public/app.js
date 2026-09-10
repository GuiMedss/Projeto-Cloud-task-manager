const taskForm = document.querySelector("#task-form");
const taskList = document.querySelector("#task-list");
const emptyMessage = document.querySelector("#empty-message");
const reloadButton = document.querySelector("#reload-button");
const statusBadge = document.querySelector("#status");

function setStatus(message, isError = false) {
  statusBadge.textContent = message;
  statusBadge.classList.toggle("error", isError);
}

async function requestJson(url, options = {}) {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    ...options
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.message || "Erro na requisicao");
  }

  return response.json();
}

function createTaskItem(task) {
  const item = document.createElement("li");
  item.className = `task-item${task.done ? " done" : ""}`;

  const content = document.createElement("div");
  content.className = "task-content";

  const title = document.createElement("p");
  title.className = "task-title";
  title.textContent = task.title;

  const description = document.createElement("p");
  description.className = "task-description";
  description.textContent = task.description || "Sem descricao";

  const actions = document.createElement("div");
  actions.className = "task-actions";

  const doneButton = document.createElement("button");
  doneButton.type = "button";
  doneButton.className = "secondary-button";
  doneButton.textContent = task.done ? "Reabrir" : "Concluir";
  doneButton.addEventListener("click", () => toggleTask(task));

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.className = "danger-button";
  deleteButton.textContent = "Excluir";
  deleteButton.addEventListener("click", () => deleteTask(task.id));

  content.append(title, description);
  actions.append(doneButton, deleteButton);
  item.append(content, actions);

  return item;
}

async function loadTasks() {
  try {
    setStatus("Carregando...");
    const tasks = await requestJson("/tasks");
    taskList.innerHTML = "";
    tasks.forEach((task) => taskList.appendChild(createTaskItem(task)));
    emptyMessage.classList.toggle("hidden", tasks.length > 0);
    setStatus("Online");
  } catch (error) {
    setStatus("Erro", true);
    alert(error.message);
  }
}

async function createTask(event) {
  event.preventDefault();

  const formData = new FormData(taskForm);
  const title = formData.get("title").trim();
  const description = formData.get("description").trim();

  if (!title) {
    return;
  }

  try {
    await requestJson("/tasks", {
      method: "POST",
      body: JSON.stringify({ title, description })
    });
    taskForm.reset();
    await loadTasks();
  } catch (error) {
    setStatus("Erro", true);
    alert(error.message);
  }
}

async function toggleTask(task) {
  try {
    await requestJson(`/tasks/${task.id}`, {
      method: "PUT",
      body: JSON.stringify({
        title: task.title,
        description: task.description,
        done: !task.done
      })
    });
    await loadTasks();
  } catch (error) {
    setStatus("Erro", true);
    alert(error.message);
  }
}

async function deleteTask(id) {
  try {
    await requestJson(`/tasks/${id}`, {
      method: "DELETE"
    });
    await loadTasks();
  } catch (error) {
    setStatus("Erro", true);
    alert(error.message);
  }
}

taskForm.addEventListener("submit", createTask);
reloadButton.addEventListener("click", loadTasks);
loadTasks();
