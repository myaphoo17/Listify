const inputButton = document.querySelector(".input");
const addButton = document.querySelector(".addButton");
const taskList = document.querySelector(".taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function local() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTask() {
  taskList.innerHTML = '';

  tasks.forEach((task, index) => {
    const item = document.createElement('li');
    item.className = "task";

    item.innerHTML = `
      <input type="checkbox" class="checkbox" ${task.completed ? 'checked="checked"' : ''}>
      <span class="text"> ${task.text}</span>

      <button class="editButton" > ✏️</button>

      
      <button class="deleteButton">🗑️</button>
    `;

    // EDIT - DELETE

    const editButton = item.querySelector(".editButton");
    const deleteButton = item.querySelector(".deleteButton");

    editButton.addEventListener('click', () => {
      const taskText = item.querySelector(".text");

      taskText.style.display = "none";
      const taskInput = document.createElement('input');
      taskInput.type = "text";
      taskInput.value = task.text;
      item.insertBefore(taskInput, taskText);
      taskInput.focus();

      taskInput.addEventListener("blur", () => {
        task.text = taskInput.value;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTask();
      });
    });

    deleteButton.addEventListener('click', () => {
      tasks.splice(index, 1);
      local();
      renderTask();
    });

    const checkbox = item.querySelector(".checkbox");
    checkbox.addEventListener("change", () => {
      task.completed = checkbox.checked;
      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderTask();
    });

    taskList.appendChild(item);
  });
}

addButton.addEventListener('click', () => {
  const taskText = inputButton.value.trim();
  if (taskText) {
    tasks.push({ text: taskText, completed: false });
    local();
    renderTask();
    inputButton.value = "";
  }
});

renderTask();
