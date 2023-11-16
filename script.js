// JavaScript object to store quiz questions and answers

var quizQuestions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        correctAnswer: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correctAnswer: "Mars"
    },
    {
        question: "The Eiffel Tower is located in which city?",
        options: ["London", "Paris", "New York", "Tokyo"],
        correctAnswer: "Paris"
    },
    {
        question: "JavaScript is a programming Language commonly used for both front-end and back-end web development.",
        options: ["True", "False"],
        correctAnswer: "True"
    },
    {
        question: "The currency of Japan is Yuan",
        options: ["True", "False"],
        correctAnswer: "False"
    },
    {
        type: "fill-in-the-blank",
        question: "Complete the sentence: The capital of the United States of America is ___.",
        correctAnswer: "Washington"
    },
    {
        type: "matching",
        question: "Match the shape with its name",
        pairs: {
            "Circle": "🔵",
            "Square": "🟥",
            "Triangle": "🔺"
        },
        correctOrder: ["Circle", "Square", "Triangle"]
    },
    {
        type: "ordering",
        question: "Order the days of the week starting from Monday",
        events: ["Saturday", "Monday", "Wednesday", "Friday", "Tuesday", "Thursday", "Sunday"],
        correctOrder: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    }
];

//Testing to see if the data is accessible

console.log("Question 1:", quizQuestions[0].question);
console.log("Options for Question 1:", quizQuestions[0].options);
console.log("Correct Answer for Question 1:",quizQuestions[0].correctAnswer);

let currentQuestionIndex = 0;

function displayQuestion() {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    document.querySelector('.questions').textContent = currentQuestion.question;

    const answersUI = document.querySelector('.answers');
    answersUI.style.display = 'none';
    answersUI.innerHTML = '';
    document.querySelector('.fill-in-the-blank').style.display = 'none';
    document.querySelector('.matching').style.display = 'none';
    document.querySelector('.ordering').style.display = 'none';

    // Check the question type and display accordingly
    switch (currentQuestion.type) {
        case 'fill-in-the-blank':
            displayFillInTheBlankQuestion();
            break;
        case 'matching':
            displayMatchingQuestion(currentQuestion);
            break;
        case 'ordering':
            displayOrderingQuestion(currentQuestion);
            break;
        default:
            displayMultipleChoiceQuestion(currentQuestion);
    }
};

function displayMultipleChoiceQuestion(question) {
    const answersUI = document.querySelector('.answers');
    answersUI.style.display = 'block';

    question.options.forEach(option => {
        const li = document.createElement('li');
        li.textContent = option;
        answersUI.appendChild(li);
    });
}

document.getElementById('next-btn').addEventListener('click', function() {
    if (currentQuestionIndex < quizQuestions.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
    }
});

document.getElementById('prev-btn').addEventListener('click', function() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion();
    }
});

displayQuestion();