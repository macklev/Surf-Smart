const startBtn = document.querySelector(".start_btn button");
const infoBox = document.querySelector(".info_box");
const exitBtn = infoBox.querySelector(".buttons .quit");
const continueBtn = infoBox.querySelector(".buttons .restart");
const quizBox = document.querySelector(".quiz_box");
const resultBox = document.querySelector(".result_box");
const optionList = document.querySelector(".option_list");
const timeLine = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");
let timeValue = 15;
let queCount = 0;
let queNumb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;
const restartQuizBtn = resultBox.querySelector(".buttons .restart");
const quitQuizBtn = resultBox.querySelector(".buttons .quit");
const nextBtn = document.querySelector("footer .next_btn");
const bottomQuesCounter = document.querySelector("footer .total_que");
// Show info box when start button is clicked
startBtn.onclick = () => {
  infoBox.classList.add("activeInfo");
}
// Hide info box when exit button is clicked
exitBtn.onclick = () => {
  infoBox.classList.remove("activeInfo");
}
// Start quiz when continue button is clicked
continueBtn.onclick = () => {
  infoBox.classList.remove("activeInfo");
  quizBox.classList.add("activeQuiz");
  initializeQuiz();
}
// Restart quiz when restart button is clicked
restartQuizBtn.onclick = () => {
  resultBox.classList.remove("activeResult");
  quizBox.classList.add("activeQuiz");
  resetQuiz();
  initializeQuiz();
}
// Reload page when quit button is clicked
quitQuizBtn.onclick = () => {
  window.location.reload();
}
// Show next question when next button is clicked
nextBtn.onclick = () => {
  if (queCount < questions.length - 1) {
    queCount++;
    queNumb++;
    updateQuiz();
  } else {
    clearInterval(counter);
    clearInterval(counterLine);
    showResult();
  }
}
// Initialize the quiz with the first question and timers
function initializeQuiz() {
  showQuestions(queCount);
  queCounter(queNumb);
  startTimer(timeValue);
  startTimerLine(widthValue);
}
// Reset quiz variables
function resetQuiz() {
  timeValue = 15;
  queCount = 0;
  queNumb = 1;
  userScore = 0;
  widthValue = 0;
}
// Update the quiz with the next question and reset timers
function updateQuiz() {
  showQuestions(queCount);
  queCounter(queNumb);
  clearInterval(counter);
  clearInterval(counterLine);
  startTimer(timeValue);
  startTimerLine(widthValue);
  if (timeText) {
    timeText.textContent = "Time Left";
  }
  nextBtn.classList.remove("show");
}
// Show questions and options
function showQuestions(index) {
  const queText = document.querySelector(".que_text");
  let queTag = `<span>${questions[index].numb}. ${questions[index].question}</span>`;
  let optionTag = '<ul>' + questions[index].options.map((option, idx) => `<li><input type="radio" name="answer" id="option_${idx}" value="${option}"><label for="option_${idx}">${option}</label></li>`).join('') + '</ul>';
  queText.innerHTML = queTag;
  optionList.innerHTML = optionTag;
  optionList.querySelectorAll('input[type="radio"]').forEach(radio => {
    radio.onclick = () => optionSelected(radio);
  });
}
// Handle option selection
function optionSelected(radio) {
  clearInterval(counter);
  clearInterval(counterLine);
  let userAns = radio.value;
  let correctAns = questions[queCount].answer;
  const liElement = radio.parentElement;
  if (userAns === correctAns) {
    userScore++;
    liElement.classList.add("correct");
    liElement.insertAdjacentHTML("beforeend", tickIconTag);
  } else {
    liElement.classList.add("incorrect");
    liElement.insertAdjacentHTML("beforeend", crossIconTag);
    highlightCorrectAnswer(correctAns);
  }
  disableOptions();
  nextBtn.classList.add("show");
}
// Highlight the correct answer
function highlightCorrectAnswer(correctAns) {
  const radios = optionList.querySelectorAll('input[type="radio"]');
  for (let i = 0; i < radios.length; i++) {
    if (radios[i].value === correctAns) {
      const liElement = radios[i].parentElement;
      liElement.classList.add("correct");
      liElement.insertAdjacentHTML("beforeend", tickIconTag);
    }
  }
}
// Disable all options
function disableOptions() {
  const radios = optionList.querySelectorAll('input[type="radio"]');
  for (let i = 0; i < radios.length; i++) {
    radios[i].disabled = true;
  }
}
// Show result box
function showResult() {
  infoBox.classList.remove("activeInfo");
  quizBox.classList.remove("activeQuiz");
  resultBox.classList.add("activeResult");
  const scoreText = resultBox.querySelector(".score_text");
  let scoreTag = '';
  if (userScore > 3) {
    scoreTag = `<span>and congrats! , You got <p>${userScore}</p> out of <p>${questions.length}</p></span>`;
  } else if (userScore > 1) {
    scoreTag = `<span>and nice , You got <p>${userScore}</p> out of <p>${questions.length}</p></span>`;
  } else {
    scoreTag = `<span>and sorry , You got only <p>${userScore}</p> out of <p>${questions.length}</p></span>`;
  }
  scoreText.innerHTML = scoreTag;
}
// Start the timer for the quiz
function startTimer(time) {
  counter = setInterval(() => {
    if (timeCount) {
      timeCount.textContent = time > 9 ? time : `0${time}`;
    }
    time--;
    if (time < 0) {
      clearInterval(counter);
      if (timeText) {
        timeText.textContent = "Time Off";
      }
      highlightCorrectAnswer(questions[queCount].answer);
      disableOptions();
      nextBtn.classList.add("show");
    }
  }, 1000);
}
function startTimerLine(time) {
  const totalTime = 550; // Total time for the timer in milliseconds
  counterLine = setInterval(() => {
    time += 1;
    let progressPercentage = (time / totalTime) * 100;
    if (timeLine) {
      timeLine.style.width = `${progressPercentage}%`;
    }
    if (time >= totalTime) {
      clearInterval(counterLine);
    }
  }, 29);
}
// Update the question counter
function queCounter(index) {
  let totalQueCounTag = `<span><p>${index}</p> of <p>${questions.length}</p> Questions</span>`;
  bottomQuesCounter.innerHTML = totalQueCounTag;
}
// Tick and cross icons
const tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
const crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';