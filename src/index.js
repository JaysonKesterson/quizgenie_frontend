const endPoint = "http://localhost:3000/api/v1/quizzes"
const questionEndPoint = "http://localhost:3000/api/v1/questions"

document.addEventListener('DOMContentLoaded', () => {
    createQuizObjs()

    const createQuizForm = document.querySelector("#quiz-form-container")

    createQuizForm.addEventListener("submit", (e) => createFormHandler(e))

})

function createQuizObjs() {
    fetch(endPoint)
    .then(response => response.json())
    .then(quizzes => {
        quizzes.data.forEach(quiz => {
            let newQuiz = new Quiz(quiz.id, quiz.attributes)
        })
        quizGenieHome()
        playQuiz()
    })
}

function quizGenieHome() {
    
    const sportsQuizzesData = Quiz.findByCategory("sports")
    const randomKnowQuizzesData = Quiz.findByCategory("random-knowledge")
    const musicQuizzesData = Quiz.findByCategory("music")


    const quizContainer = document.getElementById("quiz-container");
    const quizCategoryContainer = document.getElementById("quiz-category-list-container");
    const title = document.createElement("h1")
    title.className = "title"
    title.innerText = "Welcome to QuizGenie!"

    const sportsList = document.createElement("ul")
    const sportsTitle = document.createElement("h2")
    sportsTitle.textContent = "Sports Quizzes"
    
    
    sportsQuizzesData.forEach(quiz => {
        const sportsQuizzes = document.createElement("li")
        const playBtn = document.createElement("button")
        playBtn.className = "play"
        playBtn.innerText = "Play"
        playBtn.setAttribute("data-quiz-id", quiz.id)
        sportsQuizzes.textContent += quiz.name + "  "
        sportsQuizzes.appendChild(playBtn)
        sportsList.appendChild(sportsQuizzes)
    })

    const randomKnowList = document.createElement("ul")
    const randomKnowTitle = document.createElement("h2")
    randomKnowTitle.textContent = "Random Knowledge Quizzes"
    
    
    randomKnowQuizzesData.forEach(quiz => {
        const randomKnowQuizzes = document.createElement("li")
        const playBtn = document.createElement("button")
        playBtn.className = "play"
        playBtn.innerText = "Play"
        playBtn.setAttribute("data-quiz-id", quiz.id)
        randomKnowQuizzes.textContent += quiz.name + "  "
        randomKnowQuizzes.appendChild(playBtn)
        randomKnowList.appendChild(randomKnowQuizzes)
    })

    const musicList = document.createElement("ul")
    const musicTitle = document.createElement("h2")
    musicTitle.textContent = "Music Quizzes"
    
    
    musicQuizzesData.forEach(quiz => {
        const musicQuizzes = document.createElement("li")
        const playBtn = document.createElement("button")
        playBtn.className = "play"
        playBtn.innerText = "Play"
        playBtn.setAttribute("data-quiz-id", quiz.id)
        musicQuizzes.textContent += quiz.name + "  "
        musicQuizzes.appendChild(playBtn)
        musicList.appendChild(musicQuizzes)
    })

    quizContainer.appendChild(title)
    quizContainer.appendChild(quizCategoryContainer)
    quizCategoryContainer.appendChild(sportsTitle)
    quizCategoryContainer.appendChild(sportsList)
    quizCategoryContainer.appendChild(randomKnowTitle)
    quizCategoryContainer.appendChild(randomKnowList)
    quizCategoryContainer.appendChild(musicTitle)
    quizCategoryContainer.appendChild(musicList)
    

}

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
    const quizButtons = document.querySelectorAll(".play")
    quizButtons.forEach(button => {
        button.addEventListener("click", (e) => liveQuiz(e))
    })
}

function liveQuiz(event) {
    
    const quizContainer = document.getElementById("quiz-container")
    const quizFormContainer = document.getElementById("quiz-form-container")
    const liveQuizContainer = document.getElementById("live-quiz")
    const currentQuiz = Quiz.findById(event.target.dataset.quizId)
    quizContainer.style.display = "none"
    quizFormContainer.style.display = "none"
    
    const quizTitle = document.createElement("h1")
    quizTitle.textContent = "Playing " + currentQuiz.name

    const playQuizForm = document.createElement("form")
    playQuizForm.className = "play-quiz"
    const quizQuestionList = document.createElement("ol")

        currentQuiz.questions.forEach(question => {
            const quizAnswerBox = document.createElement("input")
            quizAnswerBox.className = "answer-box"
            quizAnswerBox.type = "text"
            quizAnswerBox.setAttribute("value", "")
            quizAnswerBox.setAttribute("data-question-id", question.id)
            quizQuestion = document.createElement("li")
            quizQuestion.textContent += question.content
            quizQuestion.appendChild(quizAnswerBox)
            quizQuestionList.appendChild(quizQuestion)
        })

        const submitBtn = document.createElement("input")
        submitBtn.type = "submit"
        submitBtn.value = "Submit"
        submitBtn.setAttribute("data-quiz-id", currentQuiz.id)

        const backBtn = document.createElement("button")
        backBtn.className = "back"
        backBtn.innerText = "Back to Home"

        backBtn.addEventListener("click", (event) => goHome(event))

    playQuizForm.appendChild(quizQuestionList)  
    playQuizForm.appendChild(submitBtn)  
    liveQuizContainer.appendChild(quizTitle)
    liveQuizContainer.appendChild(playQuizForm)
    liveQuizContainer.appendChild(backBtn)

    playQuizForm.addEventListener("submit", (event) => {quizResults(event)})
}

function quizResults(event) {
    event.preventDefault();
    const playQuizForm = document.querySelector(".play-quiz")
    const quizAnswerBox = document.querySelectorAll(".answer-box")
    quizAnswerBox.forEach(box => {
        const inputValues = []
        inputValues.push(box.value)
    })
}

function goHome(event) {
    const quizContainer = document.getElementById("quiz-container")
    const quizFormContainer = document.getElementById("quiz-form-container")
    const liveQuizContainer = document.getElementById("live-quiz")
    quizContainer.style.removeProperty('display');
    quizFormContainer.style.removeProperty('display');
    liveQuizContainer.style.display = "none"
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

