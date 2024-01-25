let loggedIn = false;

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Check hardcoded credentials
    if (username === 'admin' && password === 'admin123') {
        // Login successful
        loggedIn = true;
        showApp();
    } else {
        // Login failed
        alert('Incorrect username or password. Please try again.');
    }
}

function showApp() {
    // Hide login container
    document.getElementById('loginContainer').style.display = 'none';

    // Show app container
    document.getElementById('appContainer').style.display = 'block';
}

document.addEventListener('DOMContentLoaded', async () => {
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

    async function loadQuestions() {
        try {
            const response = await fetch('./questions.json');
            const data = await response.json();
            return data.questions;
        } catch (error) {
            console.error('Fout bij laden van vragen:', error);
        }
    }

    function askQuestion() {
        loadQuestions().then(questions => {
            const randomQuestion = questions[Math.floor(Math.random() * questions.length)];

            questionText.textContent = randomQuestion.question;
            choices.innerHTML = "";

            randomQuestion.options.forEach((choice, index) => {
                const button = document.createElement('button');
                button.textContent = choice;
                button.classList.add('choiceBtn');
                button.addEventListener('click', () => {
                    if (index === parseInt(randomQuestion.answer) - 1) {
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
        });
    }

    function showNotification(message, type) {
        const notification = document.createElement("div");
        notification.className = `notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
});
