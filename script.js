var currentQuestion = 0;
var quizQuestions;

//Loading the questions from an external JSON file
fetch('quiz-questions.json')
    .then(response => response.json())
    .then(data => {
        quizQuestions = shuffleArray(data);
        // Initialize the quiz with the first question
        loadRandomQuestion();
    })
    .catch(error => console.error("Error loading questions:", error));

    function shuffleArray(array) {
        for (var i = array.length - 1; i>0; i--) {
            var j = Math.floor(Math.random()*(i+1));
            [array[i], array[j] = array[j], array[i]];
        }
        return array;
    }

function loadRandomQuestion() {
    
    currentQuestion = Math.floor(Math.random() * quizQuestions.length);

    var questionData = quizQuestions[currentQuestion];
    console.log(questionData.question);
}

function goToNextQuestion() {
    loadRandomQuestion();
}

var nextButton = document.getElementById('next-btn');
nextButton.addEventListener('click', goToNextQuestion);

