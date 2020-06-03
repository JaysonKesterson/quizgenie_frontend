const endPoint = "http://localhost:3000/api/v1/quizzes"

document.addEventListener('DOMContentLoaded', () => {
    getQuizzes()

    const createQuizForm = document.querySelector("#quiz-form-container")

    createQuizForm.addEventListener("submit", (e) => createFormHandler(e))

})

function createFormHandler(e) {
    e.preventDefault()
    const nameInput = document.querySelector("#input-name").value
    const categoryInput = document.querySelector("#categories").value
    postFetch(nameInput, categoryInput)
}

function postFetch(name, category) {
    fetch(endPoint, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body:JSON.stringify({
            name: name,
            category: category
        })
    })
    .then(response => response.json())
    .then(quiz => {
        console.log(quiz)
    })
    }


function playQuiz() {

}

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
}