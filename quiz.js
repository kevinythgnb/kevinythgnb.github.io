const start = document.getElementById("start"), 
      quiz = document.getElementById("quiz"), 
      disclaimer = document.getElementById("disclaimer"), 
      questionCount = document.getElementById("questionCount"), 
      correctCount = document.getElementById("correctCount"), 
      qImg = document.getElementById("qImg"), 
      anonImg = document.getElementById("anonImg"), 
      fullImg = document.getElementById("fullImg"), 
      question = document.getElementById("quiz-question"), 
      choiceA = document.getElementById("A"), 
      choiceB = document.getElementById("B"), 
      choiceC = document.getElementById("C"), 
      choiceD = document.getElementById("D"), 
      next = document.getElementById("next"), 
      progress = document.getElementById("progress"), 
      scoreModal = document.getElementById("scoreModal");

let questions = [{
    qImgSrc:"assets/quiz/seniors/claire1.jpeg", fullImgSrc:"assets/quiz/seniors/claire1full.jpeg",
        choiceA:"Claire Xu", choiceB:"Anna Chung", choiceC:"Sarah Kim", choiceD:"Audrey Lee",
        correct:"A"}, {
    qImgSrc:"assets/quiz/seniors/claire2.jpeg", fullImgSrc:"assets/quiz/seniors/claire2full.jpeg",
        choiceA:"Camille Wong", choiceB:"Sara Koh", choiceC:"Claire Xu", choiceD:"Adrienne Li",
        correct:"C"}, {
    qImgSrc:"assets/quiz/seniors/kevin1.jpeg", fullImgSrc:"assets/quiz/seniors/kevin1full.jpeg",
        choiceA:"Derek Liang", choiceB:"Kevin Chang", choiceC:"Brian Seo", choiceD:"Ethan Yu",
        correct:"B"}, {
    qImgSrc:"assets/quiz/seniors/kevin2.jpg", fullImgSrc:"assets/quiz/seniors/kevin2full.jpg",
        choiceA:"Kevin Chang", choiceB:"Kihan Sung", choiceC:"Sarah Kim", choiceD:"Sara Koh",
        correct:"A"}, {
    qImgSrc:"assets/quiz/seniors/anna1.jpg", fullImgSrc:"assets/quiz/seniors/anna1full.jpg",
        choiceA:"Anna Chung", choiceB:"Sarah Kim", choiceC:"Camille Wong", choiceD:"Audrey Lee",
        correct:"A"}, {
    qImgSrc:"assets/quiz/seniors/anna2.jpg", fullImgSrc:"assets/quiz/seniors/anna2full.jpg",
        choiceA:"Anna Chung", choiceB:"Claire Xu", choiceC:"Sarah Kim", choiceD:"Adrienne Li",
        correct:"A"}, {
    qImgSrc:"assets/quiz/seniors/adrienne1.jpg", fullImgSrc:"assets/quiz/seniors/adrienne1full.jpg",
        choiceA:"Audrey Lee", choiceB:"Adrienne Li", choiceC:"Sara Koh", choiceD:"Camille Wong",
        correct:"B"}, {
    qImgSrc:"assets/quiz/seniors/adrienne2.jpeg", fullImgSrc:"assets/quiz/seniors/adrienne2full.jpeg",
        choiceA:"Adrienne Li", choiceB:"Aaron Long", choiceC:"Kihan Sung", choiceD:"Claire Xu",
        correct:"A"}, {
    qImgSrc:"assets/quiz/seniors/sara1.jpeg", fullImgSrc:"assets/quiz/seniors/sara1full.jpeg",
        choiceA:"Camille Wong", choiceB:"Sara Koh", choiceC:"Adrienne Li", choiceD:"Sarah Kim",
        correct:"B"}, {
    qImgSrc:"assets/quiz/seniors/sara2.jpg", fullImgSrc:"assets/quiz/seniors/sara2full.jpg",
        choiceA:"Sara Koh", choiceB:"Claire Xu", choiceC:"Anna Chung", choiceD:"Audrey Lee",
        correct:"A"}, {
    qImgSrc:"assets/quiz/juniors/sarah1.jpg", fullImgSrc:"assets/quiz/juniors/sarah1full.jpg",
        choiceA:"Adrienne Li", choiceB:"Claire Xu", choiceC:"Camille Wong", choiceD:"Sarah Kim",
        correct:"D"}, {
    qImgSrc:"assets/quiz/juniors/sarah2.jpeg", fullImgSrc:"assets/quiz/juniors/sarah2full.jpeg",
        choiceA:"Sara Koh", choiceB:"Claire Xu", choiceC:"Sarah Kim", choiceD:"Audrey Lee",
        correct:"C"}, {
    qImgSrc:"assets/quiz/juniors/kihan1.jpg", fullImgSrc:"assets/quiz/juniors/kihan1full.jpg",
        choiceA:"Aaron Long", choiceB:"Phillip Seo", choiceC:"Kihan Sung", choiceD:"Brian Seo",
        correct:"C"}, {
    qImgSrc:"assets/quiz/juniors/kihan2.jpg", fullImgSrc:"assets/quiz/juniors/kihan2full.jpg",
        choiceA:"Kihan Sung", choiceB:"Ethan Yu", choiceC:"Aaron Long", choiceD:"Kevin Chang",
        correct:"A"}, {
    qImgSrc:"assets/quiz/sophomores/brandon1.jpg", fullImgSrc:"assets/quiz/sophomores/brandon1full.jpg",
        choiceA:"Audrey Lee", choiceB:"Brandon Song", choiceC:"Claire Xu", choiceD:"Brian Seo",
        correct:"B"}, {
    qImgSrc:"assets/quiz/sophomores/brandon2.jpg", fullImgSrc:"assets/quiz/sophomores/brandon2full.jpg",
        choiceA:"Derek Liang", choiceB:"Kevin Chang", choiceC:"Kihan Sung", choiceD:"Brandon Song",
        correct:"D"}, {
    qImgSrc:"assets/quiz/sophomores/brian1.jpg", fullImgSrc:"assets/quiz/sophomores/brian1full.jpg",
        choiceA:"Brian Seo", choiceB:"Anna Chung", choiceC:"Camille Wong", choiceD:"Derek Liang",
        correct:"A"}, {
    qImgSrc:"assets/quiz/sophomores/brian2.jpg", fullImgSrc:"assets/quiz/sophomores/brian2full.jpg",
        choiceA:"Phillip Seo", choiceB:"Brian Seo", choiceC:"Ethan Yu", choiceD:"Kihan Sung",
        correct:"B"}, {
    qImgSrc:"assets/quiz/sophomores/derek1.jpg", fullImgSrc:"assets/quiz/sophomores/derek1full.jpg",
        choiceA:"Derek Liang", choiceB:"Brian Seo", choiceC:"Claire Xu", choiceD:"Sarah Kim",
        correct:"A"}, {
    qImgSrc:"assets/quiz/sophomores/derek2.jpg", fullImgSrc:"assets/quiz/sophomores/derek2full.jpg",
        choiceA:"Sara Koh", choiceB:"Derek Liang", choiceC:"Ethan Yu", choiceD:"Audrey Lee",
        correct:"B"}, {
    qImgSrc:"assets/quiz/sophomores/audrey1.jpg", fullImgSrc:"assets/quiz/sophomores/audrey1full.jpg",
        choiceA:"Audrey Lee", choiceB:"Camille Wong", choiceC:"Sarah Kim", choiceD:"Adrienne Li",
        correct:"A"}, {
    qImgSrc:"assets/quiz/sophomores/audrey2.jpg", fullImgSrc:"assets/quiz/sophomores/audrey2full.jpg",
        choiceA:"Claire Xu", choiceB:"Audrey Lee", choiceC:"Anna Chung", choiceD:"Sara Koh",
        correct:"B"}, {
    qImgSrc:"assets/quiz/freshmen/phillip1.jpg", fullImgSrc:"assets/quiz/freshmen/phillip1full.jpg",
        choiceA:"Kihan Sung", choiceB:"Brandon Song", choiceC:"Ethan Yu", choiceD:"Phillip Seo",
        correct:"D"}, {
    qImgSrc:"assets/quiz/freshmen/phillip2.jpg", fullImgSrc:"assets/quiz/freshmen/phillip2full.jpg",
        choiceA:"Anna Chung", choiceB:"Phillip Seo", choiceC:"Kevin Chang", choiceD:"Adrienne Li",
        correct:"B"}, {
    qImgSrc:"assets/quiz/freshmen/camille1.jpg", fullImgSrc:"assets/quiz/freshmen/camille1full.jpg",
        choiceA:"Audrey Lee", choiceB:"Sarah Kim", choiceC:"Claire Xu", choiceD:"Camille Wong",
        correct:"D"}, {
    qImgSrc:"assets/quiz/freshmen/camille2.jpg", fullImgSrc:"assets/quiz/freshmen/camille2full.jpg",
        choiceA:"Sara Koh", choiceB:"Camille Wong", choiceC:"Audrey Lee", choiceD:"Adrienne Li",
        correct:"B"}, {
    qImgSrc:"assets/quiz/freshmen/aaron1.jpg", fullImgSrc:"assets/quiz/freshmen/aaron1full.jpg",
        choiceA:"Ethan Yu", choiceB:"Aaron Long", choiceC:"Kihan Sung", choiceD:"Brian Seo",
        correct:"B"}, {
    qImgSrc:"assets/quiz/freshmen/aaron2.jpg", fullImgSrc:"assets/quiz/freshmen/aaron2full.jpg",
        choiceA:"Brandon Song", choiceB:"Kevin Chang", choiceC:"Aaron Long", choiceD:"Brian Seo",
        correct:"C"}, {
    qImgSrc:"assets/quiz/freshmen/ethan1.jpg", fullImgSrc:"assets/quiz/freshmen/ethan1full.jpg",
        choiceA:"Ethan Yu", choiceB:"Derek Liang", choiceC:"Brandon Song", choiceD:"Kevin Chang",
        correct:"A"}, {
    qImgSrc:"assets/quiz/freshmen/ethan2.jpg", fullImgSrc:"assets/quiz/freshmen/ethan2full.jpg",
        choiceA:"Audrey Lee", choiceB:"Adrienne Li", choiceC:"Derek Liang", choiceD:"Ethan Yu",
        correct:"D"}
]

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

shuffleArray(questions)

const lastQuestion = questions.length - 1;
let currentQuestion = 0,
    score = 0,
    answerStatus = 0;

function renderQuestion() {
    let q = questions[currentQuestion];
    qImg.innerHTML = "<img src=" + q.qImgSrc + ">";
    anonImg.innerHTML = "<img src=assets/quiz/anonImg.png>";
    fullImg.innerHTML = "<img src=" + q.fullImgSrc + ">";
    questionCount.innerHTML = "Question: " + (currentQuestion + 1) + "/" + questions.length;
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;
    next.removeEventListener("click", resetForNext);
    next.removeEventListener("click", renderQuestion);
}

function renderProgress() {
    for (let indexQuestion = 0; indexQuestion <= lastQuestion; indexQuestion++) {
        progress.innerHTML += "<div class='prog' id=q" + indexQuestion + "></div>";
    }
}

function startQuiz() {
    intro.style.display = "none";
    start.style.display = "none";
    disclaimer.style.display = "none";
    question.style.display = "block";
    renderQuestion();
    fullImg.style.display = "none";
    quiz.style.display = "block";
    correctCount.innerHTML = "Correct: " + score + "/" + questions.length;
    nextOff();
    renderProgress();
}

start.addEventListener("click", startQuiz);

function answerCorrect() {
    document.getElementById("q" + currentQuestion).style.backgroundColor = "#B4FFB4"; // light green
}

function answerWrong() {
    document.getElementById("q" + currentQuestion).style.backgroundColor = "#FFB4B4"; // light red
}

function nextOn() {
    next.classList.remove("noHover");
    next.style.color = "#000000"; // black
    next.style.backgroundColor = "#FFFFFF"; // white
}

function nextOff() {
    next.classList.add("noHover");
    next.style.color = "#BEBEBE"; // dark gray
    next.style.backgroundColor = "#E6E6E6"; // light gray
}

const allChoices = document.querySelectorAll(".choice");

function resetForNext() {
    nextOff();
    currentQuestion++;
    answerStatus = 0;
    allChoices.forEach((choice) => {
        choice.classList.remove("noHover");
        choice.style.backgroundColor = "#FFFFFF"; // white
    });
    anonImg.style.display = "block";
    fullImg.style.display = "none";
}

function renderScore() {
    nextOff();
    scoreModal.style.display = "block";
    const scorePerCent = Math.round(10000 * score / questions.length) / 100;
    let scoreImg = (scorePerCent >= 80) ? "assets/quiz/scores/score80plus.jpg" :
                   (scorePerCent >= 60) ? "assets/quiz/scores/score60plus.jpg" :
                   (scorePerCent >= 40) ? "assets/quiz/scores/score40plus.jpeg" :
                   (scorePerCent >= 20) ? "assets/quiz/scores/score20plus.jpg" :
                   "assets/quiz/scores/score0plus.jpg";
    let status = (scorePerCent >= 80) ? "You are a certified degenerate." :
                 (scorePerCent >= 60) ? "You likely are a degenerate." :
                 (scorePerCent >= 40) ? "You might be a degenerate." :
                 (scorePerCent >= 20) ? "You probably are not a degenerate." :
                 "&#128128;&#128128;&#128128;";
    scoreModal.innerHTML = "<img src=" + scoreImg + ">";
    scoreModal.innerHTML += "<p>You scored " + scorePerCent + "%.<br>" + status + "</p>";
}

function checkAnswer(answer) {
    allChoices.forEach((choice) => {
        choice.classList.add("noHover");
        choice.style.backgroundColor = "#FFB4B4"; // light red
    });
    document.getElementById(questions[currentQuestion].correct).style.backgroundColor = "#B4FFB4"; // light green
    nextOn();
    if (answer == questions[currentQuestion].correct && answerStatus == 0) {
        score++;
        answerCorrect();
    }
    else if (answerStatus == 0) {
        answerWrong();
    }
    answerStatus = 1;
    correctCount.innerHTML = "Correct: " + score + "/" + questions.length;
    anonImg.style.display = "none";
    fullImg.style.display = "block";
    if (currentQuestion < lastQuestion && answerStatus == 1) {
        next.addEventListener("click", resetForNext);
        next.addEventListener("click", renderQuestion);
    }
    else {
        next.addEventListener("click", renderScore);
    }
}