// Select elements
const todoInput = document.getElementById('todo-input');
const addTodoButton = document.getElementById('add-todo');
const todoList = document.getElementById('todo-list');

// Load tasks from Local Storage on page load
document.addEventListener('DOMContentLoaded', loadTodos);

// Add task
addTodoButton.addEventListener('click', () => {
  const task = todoInput.value.trim();
  if (task) {
    addTask(task);
    saveTask(task);
    todoInput.value = '';
  }
});

// Add task to the UI
function addTask(task) {
  const li = document.createElement('li');
  li.className = 'list-group-item d-flex justify-content-between align-items-center';
  li.textContent = task;

  const deleteButton = document.createElement('button');
  deleteButton.className = 'btn btn-sm btn-danger';
  deleteButton.textContent = 'Delete';
  deleteButton.onclick = () => removeTask(li, task);

  li.appendChild(deleteButton);
  todoList.appendChild(li);
}

// Remove task with animation
function removeTask(taskElement, task) {
  taskElement.classList.add('fade-out');
  setTimeout(() => {
    taskElement.remove();
    deleteTask(task);
  }, 500);
}

// Save task to Local Storage
function saveTask(task) {
  const tasks = JSON.parse(localStorage.getItem('todos')) || [];
  tasks.push(task);
  localStorage.setItem('todos', JSON.stringify(tasks));
}

// Delete task from Local Storage
function deleteTask(task) {
  const tasks = JSON.parse(localStorage.getItem('todos')) || [];
  const updatedTasks = tasks.filter((t) => t !== task);
  localStorage.setItem('todos', JSON.stringify(updatedTasks));
}

// Load tasks from Local Storage
function loadTodos() {
  const tasks = JSON.parse(localStorage.getItem('todos')) || [];
  tasks.forEach(addTask);
}
