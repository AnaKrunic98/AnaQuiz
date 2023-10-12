let currentQuestionIndex = 0;
let score = 0
let selectedAnswer;
let question = []

const questionElement = document.getElementById("question");
const answerButton = document.getElementsByClassName("answer-buttons")[currentQuestionIndex];
const againButton = document.getElementsByClassName("again")[0];


async function fetchData() { 
  try {
    const endpointURL = "https://opentdb.com/api.php?amount=10&category=11&difficulty=medium&type=multiple";
    const response = await fetch(endpointURL);

    if (response.status !== 200) {
      console.log('An error occurred:', response.status);
    } else {
      const data = await response.json();
      questions = data.results;
      showQuestion()
    }
  } catch (error) {
    console.log(errorMessage);
  }
}

function startQuiz(){
    currentQuestionIndex = 0
    score = 0
    fetchData()
    againButton.style.display = "none";
}

function showQuestion() {
    var currentQuestion = questions[currentQuestionIndex];
//const
    let answers = [];
    let questionNumber = currentQuestionIndex + 1;
    questionElement.innerHTML = ` ${questionNumber}. ${currentQuestion.question} `;
    answers = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer];
    answerButton.innerHTML = ""

    answers.forEach(answer => {
      const button = document.createElement("button");
      button.innerHTML = answer;
      button.classList.add("btn");
      answerButton.appendChild(button);
 
      if (answer === currentQuestion.correct_answer) {
        button.classList.add("true")
      }else{
        button.classList.add("false")
      }
      button.addEventListener('click',setAnswer);
    });
  }
  


  function setAnswer(e) {
    selectedAnswer = e.target;

    if (selectedAnswer.classList.contains("true")){
        selectedAnswer.classList = "btn correct"
        score++
    } else{
        selectedAnswer.classList = "btn incorrect"
        const trueButton = document.querySelector(".true");
        setTimeout(()=>trueButton.classList = "btn correct", 500)
    }

    setTimeout(NextQ, 1000)
  }

  function NextQ() {
    currentQuestionIndex++
    if(currentQuestionIndex < questions.length){
        showQuestion();
    } else{
        showScore()
    }
  }

  function showScore(){
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`
    answerButton.innerHTML = ""
    againButton.style.display="block"
  }
  
  startQuiz()
  againButton.addEventListener('click',startQuiz)
