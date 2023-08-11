const questions= [
    {
        questions: "which is the largest animal in the world?",
        answers: [
            {Text: "shark", correct: false},
            {Text: "blue whale", correct: true},
            {Text: "elephant", correct: false},
            {Text: "giraffe", correct: false},
        ]
    },
    {
        questions: "which is the largest continent in the world?",
        answers: [
            {Text: "australia", correct: false},
            {Text: "asia", correct: true},
            {Text: "africa", correct: false},
            {Text: "arctic", correct: false},
        ]  
    },
    {
        questions: "which is the smallest continent in the world?",
        answers: [
            {Text: "europe", correct: false},
            {Text: "australia", correct: true},
            {Text: "africa", correct: false},
            {Text: "arctic", correct: false},
        ]  
    },
    {
        questions: "which is the largest desert in the world?",
        answers: [
            {Text: "kalahari", correct: false},
            {Text: "sahara", correct: true},
            {Text: "african desert", correct: false},
            {Text: "arctic", correct: false},
        ]     
    },
    {
        questions: "which is the largest wall in the world?",
        answers: [
            {Text: "kalahari", correct: false},
            {Text: "great wall of china", correct: true},
            {Text: "african wall", correct: false},
            {Text: "arctic diwar", correct: false},
        ]       
    }
];

const questionselement =document.getElementById("question");
const answerbuttons =document.getElementById("answer-buttons");
const nextbutton =document.getElementById("next-btn");

let currentquestionindex = 0;
let score = 0;

function startquiz(){
    currentquestionindex = 0;
    score = 0;
    nextbutton.innerHTML = "next";
    showquestion();
}

function showquestion(){
    resetstate();
    let currentquestion = questions[currentquestionindex];
    let questionno = currentquestionindex + 1;
    questionselement.innerHTML = questionno + ". " + currentquestion.questions;

    currentquestion.answers.forEach(answers => {
        const buttons = document.createElement("button");
        buttons.innerHTML = answers.Text;
        buttons.classList.add("btn");
        answerbuttons.appendChild(buttons);
        if(answers.correct){
           buttons.dataset.correct = answers.correct; 
        }
        buttons.addEventListener("click" , slectanswer);
    });
}

function resetstate(){
   nextbutton.style.display ="none";
   while(answerbuttons.firstChild){
    answerbuttons.removeChild(answerbuttons.firstChild);
   }
}
function slectanswer(e){
    const slectedbtn =e.target;
    const iscorrect =slectedbtn.dataset.correct ==="true";
    if(iscorrect){
        slectedbtn.classList.add("correct");
        score++;
    }else{
        slectedbtn.classList.add("incorrect");
    }
    Array.from(answerbuttons.children).forEach(buttons =>{
        if(buttons.dataset.correct === "true"){
            buttons.classList.add("correct");
        }
        buttons.disabled = true;
    });
    nextbutton.style.display = "block";
}

function showscore(){
    resetstate();
    questionselement.innerHTML = 'you scored ${score} out of ${questions.length}';
    nextbutton.innerHTML = "Play Again";
    nextbutton.style.display = "block";
}


function handlnextbutton(){
    currentquestionindex++;
    if(currentquestionindex < questions.length){
        showquestion();
    }else{
        showscore();
    }
}


nextbutton.addEventListener("click" , ()=>{
    if(currentquestionindex < questions.length){
        handlnextbutton();
    }else{
        startquiz();
    }
});

startquiz();