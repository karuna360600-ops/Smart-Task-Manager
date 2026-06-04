let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
    let text = document.getElementById("taskInput").value.trim();
    let priority = document.getElementById("priority").value;
    let dueDate = document.getElementById("dueDate").value;

    if (!text) return;

    let task = {
        id: Date.now(),
        text,
        priority,
        dueDate,
        completed: false
    };

    tasks.push(task);

    document.getElementById("taskInput").value = "";
    document.getElementById("dueDate").value = "";

    saveTasks();
    renderTasks();
}

function renderTasks(list = tasks) {
    let ul = document.getElementById("taskList");
    ul.innerHTML = "";

    list.forEach(task => {
        let li = document.createElement("li");

        li.classList.add(task.priority);

        li.innerHTML = `
            <div onclick="toggleTask(${task.id})">
                <b class="${task.completed ? 'completed' : ''}">
                    ${task.text}
                </b>
                <small>📅 ${task.dueDate || "No date"}</small>
            </div>

            <button onclick="deleteTask(${task.id})">❌</button>
        `;

        ul.appendChild(li);
    });

    updateDashboard();
}

function toggleTask(id) {
    tasks = tasks.map(t => {
        if (t.id === id) {
            t.completed = !t.completed;
        }
        return t;
    });

    saveTasks();
    renderTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);

    saveTasks();
    renderTasks();
}

function filterTasks(type) {
    if (type === "all") renderTasks(tasks);
    if (type === "active") renderTasks(tasks.filter(t => !t.completed));
    if (type === "completed") renderTasks(tasks.filter(t => t.completed));
}

function updateDashboard() {
    document.getElementById("totalCount").innerText = tasks.length;
    document.getElementById("activeCount").innerText = tasks.filter(t => !t.completed).length;
    document.getElementById("doneCount").innerText = tasks.filter(t => t.completed).length;
}

// DARK MODE
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");

    localStorage.setItem(
        "theme",
        document.body.classList.contains("dark-mode") ? "dark" : "light"
    );
}

window.onload = function () {
    let theme = localStorage.getItem("theme");
    if (theme === "dark") document.body.classList.add("dark-mode");

    renderTasks();
};