const endPoint = "http://localhost:3000/api/v1/quizzes"

document.addEventListener('DOMContentLoaded', () => {
    getQuizzes()
})

function getQuizzes() {
    fetch(endPoint)
    .then(response => response.json())
    .then(quizzes => {
        quizzes.data.forEach(quiz => {
            createQuiz(quiz)
        })
    })

function createQuiz(quiz) {
    const quizContainer = document.getElementById("quiz-container");
    const quizName = document.createElement("h3")
    quizName.innerText = quiz.attributes.name

    const quizQuestions = document.createElement("p")
    quizQuestions.setAttribute('style', 'white-space:pre;')
    quiz.attributes.questions.forEach(question => {
        quizQuestions.textContent += question.content + "\r\n"
    })

    const playBtn = document.createElement("button")
    playBtn.className = "play"
    playBtn.innerText = "Play Quiz"
    playBtn.setAttribute("data-quiz-id", quiz.id)
    // playBtn.addEventListener("click", function() {
    //     playQuiz()
    // })

    quizContainer.appendChild(quizName)
    quizContainer.appendChild(quizQuestions)
    quizContainer.appendChild(playBtn)
}

    function playQuiz() {

    }



}