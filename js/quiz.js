document.addEventListener('DOMContentLoaded', () => {
    const startQuizBtn = document.getElementById('start-quiz-btn');
    const quizStartScreen = document.getElementById('quiz-start-screen');
    const quizGameArea = document.getElementById('quiz-game-area');
    const quizQuestionContainer = document.getElementById('quiz-question-container');
    const quizScoreDisplay = document.getElementById('quiz-score');
    const quizResultScreen = document.getElementById('quiz-result-screen');
    const restartQuizBtn = document.getElementById('restart-quiz-btn');
    const finalScoreDisplay = document.getElementById('final-score-display');
    const correctAnswersDisplay = document.getElementById('correct-answers-display');
    const totalQuestionsDisplay = document.getElementById('total-questions-display');

    const questions = [
        {
            question: "¿Cómo se llama el tío abuelo de Dipper y Mabel?",
            options: ["Tío Mcgucket", "Tío Stan", "Tío Gideon", "Tío Soos"],
            correctAnswer: 1 // Index of "Tío Stan"
        },
        {
            question: "¿Qué objeto encuentra Dipper en el bosque?",
            options: ["Un mapa con mensajes UV", "Un dado de muchas caras", "Una computadora vieja" , "Un diario numerado"],
            correctAnswer: 3 // Index of "Un diario numerado"
        },
        {
            question: "¿Cuál es el nombre del cerdo mascota de Mabel?",
            options: ["Gordito", "Pato", "Cerdito", "Waffles"],
            correctAnswer: 1 // Index of "Pato"
        },
        {
            question: "¿Quién es el principal antagonista de la serie?",
            options: ["Gideon Gleeful", "El Hombre Lobo", "Bill Cipher", "El Gnomo Rey"],
            correctAnswer: 2 // Index of "Bill Cipher"
        },
        {
            question: "¿El pelo de qué criatura utilizan para protejer la cabaña?",
            options: ["Unicornio","Gnomo" , "Multioso", "Hombretauro"],
            correctAnswer: 0 // Index of "Unicornio"
        },
        {
            question: "¿Qué objeto usan para viajar en el tiempo con Blendin Blandin?",
            options: ["Un reloj de arena", "Una puerta del tiempo", "Un control del tiempo", "Una cinta metrica"],
            correctAnswer: 3 // Index of "Una cinta metrica"
        },
        {
            question: "¿Qué juego de mesa disfrutan jugar Dipper y Ford juntos?",
            options: ["Calabozos y Dragones", "Calabozos, Calabozos y Más Calabozos", "Aventura en el Misterio", "Ogres y Oubliettes"],
            correctAnswer: 1 // Index of "Calabozos, Calabozos y Más Calabozos"
        },
        {
            question: "¿Qué apodo le pone Bill Cipher a Dipper?",
            options: ["Cabeza de Pino", "Arbolito", "Niñito del Diario", "Estrella Fugaz"],
            correctAnswer: 0 // Index of "Cabeza de Pino"
        },
        {
            question: "¿Qué prenda le hacen usar los ancianos fantasma a Dipper para salvar a los amigos de Wendy en la tienda abandonada?",
            options: ["Un sombrero de vaca", "Un disfraz de oveja", "Un pijama de unicornio", "Un disfraz de crema de maní"],
            correctAnswer: 1 // Index of "Un disfraz de oveja"
        },
        {
            question: "¿Cuantos kilos dijo Mabel que pesaba Pato para ganarlo en la feria?",
            options: ["5kg", "6kg", "7kg", "8kg"],
            correctAnswer: 2 // Index of "7kg"
        }
    ];

    let currentQuestionIndex = 0;
    let score = 0;

    function startQuiz() {
        quizStartScreen.style.display = 'none';
        quizGameArea.style.display = 'block';
        currentQuestionIndex = 0;
        score = 0;
        updateScoreDisplay();
        displayQuestion();
    }

    function displayQuestion() {
        if (currentQuestionIndex < questions.length) {
            const questionData = questions[currentQuestionIndex];
            const questionElement = document.createElement('div');
            questionElement.classList.add('quiz-question');
            questionElement.innerHTML = `
                <h3>${questionData.question}</h3>
                <div class="quiz-options">
                    ${questionData.options.map((option, index) => `
                        <button class="quiz-option-button" data-index="${index}">${option}</button>
                    `).join('')}
                </div>
            `;
            
            // Add event listeners to the new buttons
            const optionButtons = questionElement.querySelectorAll('.quiz-option-button');
            optionButtons.forEach(button => {
                button.addEventListener('click', (event) => checkAnswer(event.target));
            });

            // If there's a previous question, fade it out
            const previousQuestion = quizQuestionContainer.querySelector('.quiz-question');
            if (previousQuestion) {
                previousQuestion.classList.add('fade-out');
                // Remove the previous question after its fade-out transition
                setTimeout(() => {
                    previousQuestion.remove();
                    // Append the new question after the old one is removed
                    quizQuestionContainer.appendChild(questionElement);
                }, 400); // Coincide con la duración de la transición en CSS
            } else {
                // If it's the first question, just append it
                quizQuestionContainer.appendChild(questionElement);
            }

        } else {
            showResult();
        }
    }

    function checkAnswer(selectedButton) {
        const selectedIndex = parseInt(selectedButton.dataset.index);
        const questionData = questions[currentQuestionIndex];

        // Disable all buttons after an answer is selected
        const optionButtons = quizQuestionContainer.querySelectorAll('.quiz-option-button');
        optionButtons.forEach(button => {
            button.disabled = true;
            button.style.pointerEvents = 'none'; // Prevent further clicks during transition
        });

        if (selectedIndex === questionData.correctAnswer) {
            score++;
            selectedButton.classList.add('correct');
        } else {
            selectedButton.classList.add('incorrect');
            // Highlight the correct answer
            optionButtons[questionData.correctAnswer].classList.add('correct');
        }
        updateScoreDisplay();

        // Move to the next question after a short delay
        setTimeout(() => {
            currentQuestionIndex++;
            displayQuestion();
        }, 1000); // 1 second delay to see the answer feedback
    }

    function updateScoreDisplay() {
        quizScoreDisplay.textContent = score;
    }

    function showResult() {
        quizGameArea.style.display = 'none';
        quizResultScreen.style.display = 'block';
        finalScoreDisplay.textContent = score;
        correctAnswersDisplay.textContent = score;
        totalQuestionsDisplay.textContent = questions.length;
    }

    function restartQuiz() {
        // Oculta la pantalla de resultados y muestra la de inicio
        quizResultScreen.style.display = 'none';
        quizStartScreen.style.display = 'block';
        // Clear any lingering questions from previous game
        quizQuestionContainer.innerHTML = '';
        // Reset quiz state variables
        currentQuestionIndex = 0;
        score = 0;
        updateScoreDisplay(); // Ensure score display is reset to 0
        // El quizGameArea debería estar oculto por showResult()
        // y se mostrará de nuevo cuando startQuiz() sea llamado.
    }

    // Event Listeners
    startQuizBtn.addEventListener('click', startQuiz);
    restartQuizBtn.addEventListener('click', restartQuiz);
});