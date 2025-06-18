let tasks = JSON.parse(localStorage.getItem('jarvis_tasks_v1')) || [];

function saveTasks() {
  localStorage.setItem('jarvis_tasks_v1', JSON.stringify(tasks));
}

export function getTasks() {
  return [...tasks]; // retorna uma cópia para evitar mutações diretas
}

export function addTask(description) {
  const task = { 
    description, 
    details: '', 
    dueDate: null, 
    completed: false 
  };
  tasks.push(task);
  saveTasks();
  return task;
}

export function updateTaskDetails(index, details, dueDate) {
  tasks[index].details = details || '';
  tasks[index].dueDate = dueDate || null;
  saveTasks();
}

export function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
}

export function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
}
