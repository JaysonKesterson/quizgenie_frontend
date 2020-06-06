const endPoint = "http://localhost:3000/api/v1/quizzes"
const questionEndPoint = "http://localhost:3000/api/v1/questions"

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

function postQuestion(content, answer, quiz) {
    fetch(questionEndPoint, {
        method:"POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            content: content,
            answer: answer,
            quiz_id: quiz
        })
    })
    .then(response => response.json())
    .then(question => {
    console.log(question)
})

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
        const questionContentInput = document.querySelector("#question-content").value
        const questionAnswerInput = document.querySelector("#question-answer").value
        postQuestion(questionContentInput, questionAnswerInput, quiz.id)
    })
}
    



function playQuiz() {

}

function getQuizzes() {
    fetch(endPoint)
    .then(response => response.json())
    .then(quizzes => {
        quizzes.data.forEach(quiz => {
            let newQuiz = new Quiz(quiz.id, quiz.attributes)
            newQuiz.render()
        })
    })
}

function getQuestions() {
    fetch(questionEndPoint)
    .then(response => response.json())
    .then(questions => {
         questions.data.forEach(question => {
            console.log(question)
        })
    })
}

