document.addEventListener('DOMContentLoaded', () => {
    const columns = document.querySelectorAll('.column');
    const modal = document.getElementById('taskModal');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const addTaskButton = document.getElementById('addTaskButton');
    const closeBtn = document.querySelector('.close');
    const questionModal = document.getElementById('questionModal');
    const questionText = document.getElementById('questionText');
    const choices = document.getElementById('choices');
    const scoreDisplay = document.getElementById('scoreDisplay');
    let score = 0;


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
      askQuestion(); // Stel een vraag bij elke gesleepte taak
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

    function askQuestion() {
      const questions = [
        {
          question: "Wat is het doel van een firewall in een computernetwerk?",
          choices: [
            "Data opslaan",
            "Toegang tot een netwerk beheren",
            "E-mails verzenden",
            "Webpagina's maken"
          ],
          correctAnswer: 1
        },
        {
          question: "Wat is de betekenis van 'HTML'?",
          choices: [
            "Hypertext Markup Language",
            "Hyperlinking Text Management Language",
            "Hyper Tool Multi Language",
            "Home Tool Markup Language"
          ],
          correctAnswer: 0
        },
        {
          question: "Wat is de rol van een 'Compiler' in programmeren?",
          choices: [
            "Het uitvoeren van code",
            "Het vertalen van code naar machinecode",
            "Het debuggen van code",
            "Het opslaan van code"
          ],
          correctAnswer: 1
        },
        {
          question: "Wat is het doel van een 'Cookie' in webontwikkeling?",
          choices: [
            "Om de website op te eten",
            "Om data op te slaan op de server",
            "Om data op te slaan op de client",
            "Om data te verwijderen"
          ],
          correctAnswer: 2
        },
        {
          question: "Wat is de betekenis van 'LAN' in computernetwerken?",
          choices: [
            "Local Area Network",
            "Long Antenna Node",
            "Large Access Network",
            "Low-latency Adapter Node"
          ],
          correctAnswer: 0
        },
        {
          question: "Wat doet een 'Cache' in een computersysteem?",
          choices: [
            "Data opslaan voor toekomstig gebruik",
            "Data permanent verwijderen",
            "Het monitoren van het systeem",
            "Het veranderen van wachtwoorden"
          ],
          correctAnswer: 0
        },
        {
          question: "Wat is een 'Boolean' in de informatica?",
          choices: [
            "Een type variabele dat enkel nullen bevat",
            "Een algoritme voor rekenkunde",
            "Een type variabele dat true of false kan bevatten",
            "Een programmeertaal voor games"
          ],
          correctAnswer: 2
        },
        {
          question: "Wat is de functie van een 'Router' in een netwerk?",
          choices: [
            "Verbinding maken met externe apparaten",
            "Data opslaan op een lokale schijf",
            "Het doorsturen van data tussen netwerken",
            "Het omzetten van data naar geluid"
          ],
          correctAnswer: 2
        },
        {
          question: "Wat is een 'Algoritme'?",
          choices: [
            "Een kookrecept",
            "Een speciale code voor computerbeveiliging",
            "Een stappenplan voor probleemoplossing",
            "Een type programmeertaal"
          ],
          correctAnswer: 2
        },
        {
          question: "Wat betekent 'GUI' in de informatica?",
          choices: [
            "Graphical User Interface",
            "General Utility Interface",
            "Global Unification Interface",
            "Graphical Utility Interaction"
          ],
          correctAnswer: 0
        }
      ];
      
  
      const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
  
      questionText.textContent = randomQuestion.question;
      choices.innerHTML = "";
  
      randomQuestion.choices.forEach((choice, index) => {
        const button = document.createElement('button');
        button.textContent = choice;
        button.classList.add('choiceBtn');
        button.addEventListener('click', () => {
          if (index === randomQuestion.correctAnswer) {
            score += 10;
            scoreDisplay.textContent = `Je score: ${score}`;
            showNotification("Correct antwoord! +10 punten", "success");
          } else {
            showNotification("Fout antwoord", "error");
          }
          questionModal.style.display = 'none';
        });
        choices.appendChild(button);
      });
  
      questionModal.style.display = 'block';
    }

    function showNotification(message, type) {
      const notification = document.createElement("div");
      notification.className = `notification ${type}`;
      notification.textContent = message;
  
      document.body.appendChild(notification);
  
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 3000);
    }
    
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

  
  
  
  
  
  
  
  
  
  
  
  
  
  
