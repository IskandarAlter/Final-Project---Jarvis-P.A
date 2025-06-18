export function renderTaskList(container, tasks, onToggle, onDelete, onAddDetails) {
  let ul = container.querySelector('ul');
  if (!ul) {
    ul = document.createElement('ul');
    ul.className = 'space-y-2';
    container.appendChild(ul);
  } else {
    ul.innerHTML = '';
  }

  if (tasks.length === 0) {
    const emptyMsg = document.createElement('p');
    emptyMsg.className = 'text-gray-500 text-center';
    emptyMsg.textContent = 'Nenhuma tarefa adicionada.';
    ul.appendChild(emptyMsg);
    return;
  }

  // Ordenar por status e data de conclusão
  tasks = tasks.sort((a, b) => {
    if (a.completed !== b.completed) return a.completed ? 1 : -1;
    return new Date(a.dueDate || 0) - new Date(b.dueDate || 0);
  });

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = 'p-2 border rounded';

    const taskContainer = document.createElement('div');
    taskContainer.className = 'flex justify-between items-start';
    if (task.completed) {
      taskContainer.classList.add('line-through', 'text-gray-400');
    }

    const leftSection = document.createElement('div');
    leftSection.className = 'flex flex-col';

    const descriptionSpan = document.createElement('span');
    descriptionSpan.textContent = task.description;
    descriptionSpan.className = 'text-lg font-semibold';

    const toggleDetailsBtn = document.createElement('button');
    toggleDetailsBtn.textContent = (task.details || task.dueDate) ? 'Mostrar Detalhes' : 'Adicionar Detalhes';
    toggleDetailsBtn.className = 'text-blue-600 text-sm mt-1';

    const detailsContainer = document.createElement('div');
    detailsContainer.className = 'hidden mt-2 text-sm text-gray-600';

    if (task.details) {
      const detailsText = document.createElement('p');
      detailsText.textContent = `Detalhes: ${task.details}`;
      detailsContainer.appendChild(detailsText);
    }

    if (task.dueDate) {
      const dueDateText = document.createElement('p');
      dueDateText.textContent = `Data de Conclusão: ${new Date(task.dueDate).toLocaleDateString('pt-PT')}`;
      detailsContainer.appendChild(dueDateText);
    }

    const detailsForm = document.createElement('form');
    detailsForm.className = 'hidden flex flex-col gap-2 mt-2';

    const detailsLabel = document.createElement('label');
    detailsLabel.className = 'flex flex-col';
    detailsLabel.textContent = 'Descrição';

    const detailsInput = document.createElement('textarea');
    detailsInput.className = 'border p-2 rounded mt-1';
    detailsInput.placeholder = 'Descrição detalhada...';
    detailsInput.rows = 2;

    detailsLabel.appendChild(detailsInput);

    const dueDateLabel = document.createElement('label');
    dueDateLabel.className = 'flex flex-col';
    dueDateLabel.textContent = 'Data de Conclusão';
    const dueDateInput = document.createElement('input');
    dueDateInput.type = 'date';
    dueDateInput.className = 'border p-2 rounded';
    dueDateInput.value = task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '';
    dueDateLabel.appendChild(dueDateInput);

    detailsForm.appendChild(detailsLabel);
    detailsForm.appendChild(dueDateLabel);

    // Container para botões
    const buttonsContainer = document.createElement('div');
    buttonsContainer.className = 'flex gap-2';

    const saveButton = document.createElement('button');
    saveButton.textContent = 'Guardar';
    saveButton.className = 'flex-1 bg-blue-600 text-white px-2 py-1 rounded';

    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancelar';
    cancelButton.type = 'button';
    cancelButton.className = 'flex-1 bg-gray-300 text-black px-2 py-1 rounded';

    cancelButton.onclick = () => {
  detailsForm.classList.add('hidden');
  actions.classList.remove('hidden');

  if (task.details || task.dueDate) {
    detailsContainer.classList.remove('hidden');
    toggleDetailsBtn.textContent = 'Mostrar Detalhes';
    toggleDetailsBtn.classList.remove('hidden');
  } else {
    detailsContainer.classList.add('hidden');
    toggleDetailsBtn.textContent = 'Adicionar Detalhes';
    toggleDetailsBtn.classList.remove('hidden');
  }
};


    buttonsContainer.appendChild(saveButton);
    buttonsContainer.appendChild(cancelButton);
    detailsForm.appendChild(buttonsContainer);

    detailsForm.onsubmit = (e) => {
      e.preventDefault();
      onAddDetails(index, detailsInput.value.trim(), dueDateInput.value || null);
      detailsForm.classList.add('hidden');
      toggleDetailsBtn.textContent = 'Mostrar Detalhes';
    };

toggleDetailsBtn.onclick = () => {
const isFormHidden = detailsForm.classList.contains('hidden');

  if (isFormHidden) {
    detailsForm.classList.remove('hidden');
    detailsContainer.classList.add('hidden');
    actions.classList.add('hidden');
    toggleDetailsBtn.classList.add('hidden'); // 🔴 ESCONDE o botão
  } else {
    detailsForm.classList.add('hidden');
    actions.classList.remove('hidden');
    toggleDetailsBtn.classList.remove('hidden'); // 🟢 MOSTRA de novo

    if (task.details || task.dueDate) {
      detailsContainer.classList.remove('hidden');
    }
  }
};


    leftSection.appendChild(descriptionSpan);
    leftSection.appendChild(toggleDetailsBtn);
    leftSection.appendChild(detailsContainer);
    leftSection.appendChild(detailsForm);

    const actions = document.createElement('div');
    actions.className = 'flex items-center space-x-2';

    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'text-green-600';
    toggleBtn.setAttribute('aria-label', 'Marcar como concluída');
    toggleBtn.textContent = task.completed ? 'Desfazer' : 'Concluir';
    toggleBtn.onclick = () => onToggle(index);

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'text-red-600';
    deleteBtn.setAttribute('aria-label', 'Excluir tarefa');
    deleteBtn.textContent = 'Apagar';
    deleteBtn.onclick = () => onDelete(index);

    actions.appendChild(toggleBtn);
    actions.appendChild(deleteBtn);

    taskContainer.appendChild(leftSection);
    taskContainer.appendChild(actions);

    li.appendChild(taskContainer);
    ul.appendChild(li);
  });
}
