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

function displayFillInTheBlankQuestion() {
    document.querySelector('.fill-in-the-blank').style.display = 'block';
};

function displayMatchingQuestion(question) {
    const matchingArea = document.querySelector('.matching');
    matchingArea.innerHTML = '';
    matchingArea.style.display = 'block';

    Object.keys(question.pairs).forEach((key, index) => {
        const label = document.createElement('label');
        label.textContent = key + ': ';
        matchingArea.appendChild(label);

        const select = document.createElement('select');
        select.id = 'match-' + index;

        Object.values(question.pairs).forEach(value => {
            const option = document.createElement('option');
            option.value = value;
            option.textContent = value;
            select.appendChild(option);
        })

        matchingArea.appendChild(select);
        matchingArea.appendChild(document.createElement('br'));
    })
}

function displayOrderingQuestion(question) {
    const orderingArea = document.querySelector('.ordering')
    orderingArea.innerHTML = '';
    orderingArea.style.display = 'block';

    const list = document.createElement('ul');
    list.id = 'ordering-list';

    question.events.forEach(event => {
        const listItem = document.createElement('li');
        listItem.textContent = event;
        list.appendChild(listItem);
    });

    orderingArea.appendChild(list);

    const moveUpButton = document.createElement('button');
    moveUpButton.textContent = 'Move Up';
    moveUpButton.onclick = () => moveItem(-1);
    orderingArea.appendChild(moveUpButton);

    const moveDownButton = document.createElement('button');
    moveDownButton.textContent = 'Move Down';
    moveDownButton.onclick = () => moveItem(1);
    orderingArea.appendChild(moveDownButton);
}

function moveItem(direction) {
    const list = document.getElementById('ordering-list');
    const selected = list.querySelector('.selected');

    if (!selected) return;

    if (direction === -1) { //Move up
        const previousItem = selected.previousElementSibling;
        if(previousItem) {
            list.insertBefore(selected, previousItem);
        }
    } else if (direction === 1) { //Move down
        const nextItem = selected.nextElementSibling;
        if (nextItem) {
            list.insertBefore(selected, nextItem.nextSibling);
        }
    }
}

document.querySelector('.ordering').addEventListener('click', function(event) {
    if (event.target.tagName === "LI") {
        if (document.querySelector('.selected')) {
            document.querySelector('.selected').classList.remove('selected');
        }
        event.target.classList.add('selected');
    }
});

document.querySelector('.quiz-container').addEventListener('click', function(event) {
    if (event.target.tagName === "LI" && event.target.parentElement.id === 'ordering-list') {
        const currentlySelected = document.querySelector('.ordering .selected');
        if (currentlySelected) {
            currentlySelected.classList.remove('selected');
        }
        event.target.classList.add('selected');
    }
})

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