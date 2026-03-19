document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const taskSection = document.getElementById("taskSection");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");

    let tasks = JSON.parse(localStorage.getItem("handDrawnTasks")) || [];

    function renderTasks() {
        taskList.innerHTML = "";
        
        tasks.forEach((task, index) => {
            const li = document.createElement("li");
            li.classList.add("list-row");
            if (task.completed) li.classList.add("completed");

            const label = document.createElement("div");
            label.classList.add("task-content");
            label.addEventListener("click", () => toggleComplete(index));

            const circle = document.createElement("div");
            circle.classList.add("checkbox-custom");

            const badge = document.createElement("span");
            if (task.section && task.section !== "None") {
                badge.classList.add("section-badge");
                badge.textContent = task.section;
            }

            const span = document.createElement("span");
            span.classList.add("task-text");
            span.textContent = task.text;

            label.appendChild(circle);
            if (task.section && task.section !== "None") {
                label.appendChild(badge);
            }
            label.appendChild(span);

            const deleteBtn = document.createElement("button");
            deleteBtn.classList.add("delete-btn");
            deleteBtn.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
            `;
            deleteBtn.addEventListener("click", (e) => {
                e.stopPropagation(); 
                deleteTask(index);
            });

            li.appendChild(label);
            li.appendChild(deleteBtn);
            taskList.appendChild(li);
        });
    }

    function addTask() {
        const text = taskInput.value.trim();
        const section = taskSection.value; 

        if (text !== "") {
            tasks.push({ text: text, section: section, completed: false }); 
            saveAndRender();
            taskInput.value = ""; 
        }
    }

    function toggleComplete(index) {
        tasks[index].completed = !tasks[index].completed;
        saveAndRender();
    }

    function deleteTask(index) {
        tasks.splice(index, 1);
        saveAndRender();
    }

    function saveAndRender() {
        localStorage.setItem("handDrawnTasks", JSON.stringify(tasks));
        renderTasks();
    }

    addTaskBtn.addEventListener("click", addTask);
    taskInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") addTask();
    });

    renderTasks();
});
