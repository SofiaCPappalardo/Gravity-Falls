document.addEventListener('DOMContentLoaded', () => {
    const startQuizBtn = document.getElementById('start-quiz-btn');
    const quizStartScreen = document.getElementById('quiz-start-screen');
    const quizGameArea = document.getElementById('quiz-game-area');
    const quizQuestionContainer = document.getElementById('quiz-question-container');
    const quizScoreDisplay = document.getElementById('quiz-score');
    const quizResultScreen = document.getElementById('quiz-result-screen');
    const finalScoreSpan = document.getElementById('final-score');
    const totalQuestionsSpan = document.getElementById('total-questions');
    const restartQuizBtn = document.getElementById('restart-quiz-btn');

    const questions = [
        {
            question: "¿Cómo se llama el tío abuelo de Dipper y Mabel?",
            options: ["Tío Mcgucket", "Tío Stan", "Tío Gideon", "Tío Soos"],
            correctAnswer: 1 // Index of "Tío Stan"
        },
        {
            question: "¿Qué objeto encuentra Dipper en el bosque?",
            options: ["Un mapa antiguo", "Un diario numerado", "Una brújula mágica", "Un amuleto brillante"],
            correctAnswer: 1 // Index of "Un diario numerado"
        },
        {
            question: "¿Cuál es el nombre del cerdo mascota de Mabel?",
            options: ["Gordito", "Pato", "Chanchito", "Rosita"],
            correctAnswer: 1 // Index of "Pato"
        },
        {
            question: "¿Quién es el principal antagonista de la serie?",
            options: ["Gideon Gleeful", "El Hombre Lobo", "Bill Cipher", "El Gnomo Rey"],
            correctAnswer: 2 // Index of "Bill Cipher"
        },
        {
            question: "¿Cuántos dedos tiene el autor de los diarios en cada mano?",
            options: ["Cinco", "Seis", "Cuatro", "Siete"],
            correctAnswer: 1 // Index of "Seis"
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
                previousQuestion.addEventListener('transitionend', () => {
                    previousQuestion.remove();
                    // Append the new question after the old one is removed
                    quizQuestionContainer.appendChild(questionElement);
                }, { once: true });
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
        finalScoreSpan.textContent = score;
        totalQuestionsSpan.textContent = questions.length;
    }

    function restartQuiz() {
        quizResultScreen.style.display = 'none';
        quizStartScreen.style.display = 'block';
        // Clear any lingering questions from previous game
        quizQuestionContainer.innerHTML = '';
        startQuiz(); // Re-start the quiz
    }

    // Event Listeners
    startQuizBtn.addEventListener('click', startQuiz);
    restartQuizBtn.addEventListener('click', restartQuiz);
});