document.addEventListener('DOMContentLoaded', () => {
    const columns = document.querySelectorAll('.column');
    const modal = document.getElementById('taskModal');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const addTaskButton = document.getElementById('addTaskButton');
    const closeBtn = document.querySelector('.close');
  
    columns.forEach(column => {
      column.addEventListener('dragover', dragOver);
      column.addEventListener('dragenter', dragEnter);
      column.addEventListener('dragleave', dragLeave);
      column.addEventListener('drop', drop);
    });
  
    addTaskBtn.addEventListener('click', addTask);
    closeBtn.addEventListener('click', closeModal);
    addTaskButton.addEventListener('click', openModal);
    addTaskButton.addEventListener('contextmenu', function (event) {
      event.preventDefault();
      openModal();
    });
  
    function dragOver(e) {
      e.preventDefault();
    }
  
    function dragEnter() {
      this.classList.add('dragover');
    }
  
    function dragLeave() {
      this.classList.remove('dragover');
    }
  
    function drop() {
      const dragging = document.querySelector('.dragging');
      this.appendChild(dragging);
      this.classList.remove('dragover');
      setTaskColor(dragging, this.id);
    }
  
    function addTask(e) {
      e.preventDefault();
      const taskNameInput = document.getElementById('taskName');
      const taskName = taskNameInput.value.trim();
  
      if (taskName !== '') {
        const newTask = createTask(taskName);
        const backlogColumn = document.getElementById('backlog');
        backlogColumn.appendChild(newTask);
  
        taskNameInput.value = '';
        closeModal();
      }
    }
  
    function createTask(taskName) {
      const newTask = document.createElement('div');
      newTask.classList.add('task');
      newTask.draggable = true;
      newTask.textContent = taskName;
  
      // Set de achtergrondkleur van de taak op de kleur van de lijst
      setTaskColor(newTask, 'backlog');
  
      return newTask;
    }
  
    function setTaskColor(task, columnId) {
      const column = document.getElementById(columnId);
      const columnColor = window.getComputedStyle(column).borderColor;
      task.style.backgroundColor = columnColor;
    }
  
    function openModal() {
      modal.style.display = 'block';
    }
  
    function closeModal() {
      modal.style.display = 'none';
    }
  
    document.addEventListener('dragstart', function (event) {
      const isTask = event.target.classList.contains('task');
      if (isTask) {
        event.target.classList.add('dragging');
      }
    });
  
    document.addEventListener('dragend', function (event) {
      const isTask = event.target.classList.contains('task');
      if (isTask) {
        event.target.classList.remove('dragging');
      }
    });
    function login() {
      var username = document.getElementById("username").value;
      var password = document.getElementById("password").value;

      // Bijvoorbeeld, controleer tegen gebruikersnaam en wachtwoord
  
      if (username === "jouw_gebruikersnaam" && password === "jouw_wachtwoord") {
        showAlert("Inloggen gelukt!", "success");
        // Voer hier de acties uit na succesvol inloggen
      } else {
        showAlert("Ongeldige gebruikersnaam of wachtwoord", "error");
      }
    }
  
    function showAlert(message, type) {
      const alertBox = document.createElement("div");
      alertBox.className = `alert ${type}`;
      alertBox.textContent = message;
  
      document.body.appendChild(alertBox);
  
      // Verwijder de melding na enkele seconden
      setTimeout(() => {
        document.body.removeChild(alertBox);
      }, 3000); // Melding verdwijnt na 3 seconden (3000 milliseconden)
    }
  });

  
  
  
  
  
  
  
  
  
  
  
  
  
  
