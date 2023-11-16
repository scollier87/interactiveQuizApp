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
//Initialize the index of the current question
let currentQuestionIndex = 0;

//Function to display the current question based on it's type
function displayQuestion() {
    //Get the current question from the quizQuestions array
    const currentQuestion = quizQuestions[currentQuestionIndex];

    //Display the question text
    document.querySelector('.questions').textContent = currentQuestion.question;

    //Hide all question type elements and clear any previous answers
    const answersUI = document.querySelector('.answers');
    answersUI.style.display = 'none';
    answersUI.innerHTML = '';
    document.querySelector('.fill-in-the-blank').style.display = 'none';
    document.querySelector('.matching').style.display = 'none';
    document.querySelector('.ordering').style.display = 'none';

    // Check the question type and display the appropriate UI elements
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

//Function to display multiple choice
function displayMultipleChoiceQuestion(question) {
    //Show the answers UI and populate with options
    const answersUI = document.querySelector('.answers');
    answersUI.style.display = 'block';

    //Create a list item for each option and add it to the answers UI
    question.options.forEach(option => {
        const li = document.createElement('li');
        li.textContent = option;
        answersUI.appendChild(li);
    });
}

//Function to display the fill-in-the-blank questions
function displayFillInTheBlankQuestion() {
    //Show the fill-in-the-blank input element
    document.querySelector('.fill-in-the-blank').style.display = 'block';
};

//Function to display matching questions
function displayMatchingQuestion(question) {
    //Prepare the matching area and show it
    const matchingArea = document.querySelector('.matching');
    matchingArea.innerHTML = '';
    matchingArea.style.display = 'block';

    //Create labels and dropdowns for each pair in the question
    Object.keys(question.pairs).forEach((key, index) => {
        const label = document.createElement('label');
        label.textContent = key + ': ';
        matchingArea.appendChild(label);

        const select = document.createElement('select');
        select.id = 'match-' + index;

        //Add options to the dropdown from the pairs
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

//Function to display ordering questions
function displayOrderingQuestion(question) {
    //Prepare the ordering area and show it
    const orderingArea = document.querySelector('.ordering')
    orderingArea.innerHTML = '';
    orderingArea.style.display = 'block';

    //Create a list and populate it with events that need to be ordered
    const list = document.createElement('ul');
    list.id = 'ordering-list';

    question.events.forEach(event => {
        const listItem = document.createElement('li');
        listItem.textContent = event;
        list.appendChild(listItem);
    });

    orderingArea.appendChild(list);

    //Add buttons to move selected list items up and down
    const moveUpButton = document.createElement('button');
    moveUpButton.textContent = 'Move Up';
    moveUpButton.onclick = () => moveItem(-1);
    orderingArea.appendChild(moveUpButton);

    const moveDownButton = document.createElement('button');
    moveDownButton.textContent = 'Move Down';
    moveDownButton.onclick = () => moveItem(1);
    orderingArea.appendChild(moveDownButton);
}

//Function to move an item up or down in the ordering list
function moveItem(direction) {
    const list = document.getElementById('ordering-list');
    const selected = list.querySelector('.selected');

    //If no item is selected, do nothing
    if (!selected) return;

    //Move the selected item up or down
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

//Event listener for selecting items in the ordering list
document.querySelector('.ordering').addEventListener('click', function(event) {
    if (event.target.tagName === "LI") {
        //Remove selection from any previously selected item
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