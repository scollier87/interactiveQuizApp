// JavaScript object to store quiz questions and answers

var quizQuestions = [
    {
        question: "What is the capital of France?",
        options: [
            {text:"Berlin", choice: false}, 
            {text:"Madrid", choice: false}, 
            {text:"Paris", choice: true}, 
            {text:"Rome", choice: false},
        ]
        
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: [
            {text:"Venus", choice: false}, 
            {text:"Mars", choice: true}, 
            {text:"Jupiter", choice: false}, 
            {text:"Saturn", choice: false},
        ]
    },
    {
        question: "The Eiffel Tower is located in which city?",
        options: [
            {text:"London", choice: false},  
            {text:"Paris", choice: true},  
            {text:"New York",  choice: false},  
            {text:"Tokyo", choice: false}, 
        ]
    },
    {
        question: "JavaScript is a programming Language commonly used for both front-end and back-end web development.",
        options: [
            {text:"True", choice: true},  
            {text:"False", choice: false}, 
        ]
       
    },
    {
        question: "The currency of Japan is Yuan",
        options: [
            {text:"True", choice: false},  
            {text:"False", choice: true}, 
        ]
      
    },
];

const questionDiv = document.querySelector('.questions')
const answers = document.querySelector('#answers');
const nextBtn = document.querySelector('#next-btn');

//Testing to see if the data is accessible

console.log("Question 1:", quizQuestions[0].question);
console.log("Options for Question 1:", quizQuestions[0].options);
console.log("Correct Answer for Question 1:",quizQuestions[0].correctAnswer);

let startingIndex = 0;
let truePoints = 0;
let falsePoints = 0;

function beginQuiz(){
    startingIndex = 0;
    truePoints = 0;
    falsePoints = 0;
    nextBtn.innerHTML = "Next";
    viewQuestion();
}

function viewQuestion(){
    reset()
    let currentQuestion = quizQuestions[startingIndex];
    let questionNo = startingIndex + 1;
    questionDiv.innerHTML = questionNo + ". " + currentQuestion.question

    currentQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.innerHTML = option.text;
        button.classList.add('btn');
        answers.appendChild(button)
        if(option.choice){
            button.dataset.choice = option.choice
        }
        button.addEventListener('click', selectOption)
    })

}

function reset(){
    nextBtn.computedStyleMap.display = "none";
    while(answers.firstChild){
        answers.removeChild(answers.firstChild);
    }
}

function selectOption(e){
    const selectbtn = e.target;
    const isCorrect = selectbtn.dataset.choice === 'true';
    if(isCorrect){
        selectbtn .classList.add("right");
        truePoints++; 
    }else{
        selectbtn .classList.add("wrong");
        falsePoints++;
    }
    Array.from(answers.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add('right')
        }
        button.disabled = true;
    })
    nextBtn.style.display = 'block'
    
}

function handlenextBtn(){
    startingIndex++
    if(startingIndex < quizQuestions.length){
        viewQuestion();

    }        else {

            if(truePoints + falsePoints ===5 && (truePoints > falsePoints)){
            questionDiv.textContent = "Pass!";} else {
                questionDiv.textContent = "Failure :(";
            };


            document.getElementById('answers').style.visibility = ("hidden");

            nextBtn.innerHTML = "Reset";

        }
}

nextBtn.addEventListener("click", ()=>{
    if(startingIndex < quizQuestions.length){
        handlenextBtn();
    }else{
        truePoints = 0;
        falsePoints = 0;
        document.getElementById('answers').style.visibility = ("visible");
        beginQuiz();
    }
})
beginQuiz();