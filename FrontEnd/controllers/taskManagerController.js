import { getTasks, addTask, toggleTask, deleteTask, updateTaskDetails } from '../services/taskManagerServices.js';
import { renderTaskList } from '../views/taskManagerList.js';

export function initTaskController(container) {
  const form = container.querySelector('#task-form');
  const descriptionInput = form.querySelector('#task-description');

  const render = () => {
    const tasks = getTasks();
    renderTaskList(container, tasks, handleToggle, handleDelete, handleAddDetails);
  };

  const handleToggle = (index) => {
    toggleTask(index);
    render();
  };

  const handleDelete = (index) => {
    deleteTask(index);
    render();
  };

  const handleAddDetails = (index, details, dueDate) => {
    updateTaskDetails(index, details, dueDate);
    render();
  };

  form.onsubmit = (e) => {
    e.preventDefault();
    if (descriptionInput.value.trim() === '') {
      descriptionInput.classList.add('border-red-500');
      return;
    }
    descriptionInput.classList.remove('border-red-500');
    addTask(descriptionInput.value.trim());
    descriptionInput.value = '';
    render();
  };

  render();
}
