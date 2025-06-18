import { initTaskController } from './controllers/taskManagerController.js';

document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;

  const container = document.createElement('div');
  container.className = 'max-w-md mx-auto mt-10 bg-white p-6 rounded shadow';
  body.appendChild(container);

  const title = document.createElement('h1');
  title.className = 'text-2xl font-bold mb-4 text-center';
  title.textContent = 'Jarvis Task Manager';
  container.appendChild(title);

  const form = document.createElement('form');
  form.id = 'task-form';
  form.className = 'flex gap-2 mb-4';

  const descriptionLabel = document.createElement('label');
  descriptionLabel.textContent = 'Descrição da tarefa';
  descriptionLabel.htmlFor = 'task-description';
  descriptionLabel.className = 'sr-only'; // acessível para leitores de tela
  form.appendChild(descriptionLabel);

  const descriptionInput = document.createElement('input');
  descriptionInput.id = 'task-description';
  descriptionInput.className = 'flex-1 border p-2 rounded';
  descriptionInput.placeholder = 'Nova tarefa...';
  form.appendChild(descriptionInput);

  const button = document.createElement('button');
  button.className = 'bg-blue-600 text-white px-4 py-2 rounded';
  button.textContent = 'Adicionar';
  form.appendChild(button);

  container.appendChild(form);

  initTaskController(container);
});
