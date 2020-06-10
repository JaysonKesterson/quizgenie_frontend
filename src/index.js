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
        createQuestionObjs()
        quizGenieHome()
        playQuiz()
        createQuestionBtnAdder()
        addQuizIdToQuestions()
    })
}

function createQuestionObjs() {
    fetch(questionEndPoint)
    .then(response => response.json())
    .then(questions => {
        questions.data.forEach(question => {
            let newQuestion = new Question(question.id, question.attributes.content, question.attributes.answer)
        })
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
    const questionContents = e.target.querySelectorAll("#question-content")
    const questionAnswers = e.target.querySelectorAll("#question-answer")
    const questions = []

    questionContents.forEach((content, index) => {
        let newQuestion = new Question(Quiz.all.length, content.value, questionAnswers[index].value)
        questions.push(newQuestion)
    })
    
    postQuiz(nameInput, categoryInput, questions)
}

function createQuestionBtnAdder() {
    const addBtn = document.querySelector("#add-question")

    addBtn.addEventListener("click", (e) => {
        e.preventDefault()
        const questionInputs = document.getElementById("question-inputs")
        const contentInput = document.createElement("input")
        const answerInput = document.createElement("input")
        const linebreak = document.createElement("br");

        contentInput.id = "question-content"
        contentInput.setAttribute("value", "")
        contentInput.setAttribute("placeholder", "Enter Question")

        answerInput.id = "question-answer"
        answerInput.setAttribute("value", "")
        answerInput.setAttribute("placeholder", "Enter Answer")


        questionInputs.appendChild(contentInput)
        questionInputs.appendChild(answerInput)
        questionInputs.appendChild(linebreak)
    })
}


function postQuiz(name, category, questions) {
    fetch(endPoint, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body:JSON.stringify({
            name: name,
            category: category,
            questions: questions
        })
    })
    .then(response => response.json())
    .then(quiz => {
        console.log(quiz)
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
    liveQuizContainer.innerHTML = ""

    const currentQuiz = Quiz.findById(event.target.dataset.quizId)
    liveQuizContainer.style.display = "initial"
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
        submitBtn.setAttribute("id", currentQuiz.id)

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
    const liveQuizContainer = document.getElementById("live-quiz")
    const quizResultsContainer = document.getElementById("quiz-results")
    quizResultsContainer.innerHTML = ""
    quizResultsContainer.style.display = "initial"
    liveQuizContainer.style.display = "none"
    const playQuizForm = document.querySelector(".play-quiz")
    const quizAnswerBox = document.querySelectorAll(".answer-box")
    const quizQuestions = Question.findByQuiz(parseInt(event.target.lastChild.id))
    const quizTaken = Quiz.findById(event.target.lastChild.id)
    const questionsIncorrect = []
    const inputValues = []
    const answerValues = []
    let numberCorrect = 0
    quizAnswerBox.forEach(box => {
        inputValues.push(box.value.toUpperCase())
    })
    quizQuestions.forEach(question =>{
        answerValues.push(question.answer.toUpperCase())
    })
    
    answerValues.forEach((answer, index) => {
        if (answer === inputValues[index]) {
            numberCorrect += 1
        } else {
            questionsIncorrect.push(quizQuestions[index])
        }
    })

    const percentageRight = Math.floor(((numberCorrect / quizQuestions.length)*100))

    const resultTitle = document.createElement("h1")
    resultTitle.textContent = `Results for ${quizTaken.name}`

    const answerResults = document.createElement("h2")
    answerResults.textContent = `You got ${numberCorrect}/${quizQuestions.length} correct for a score of ${percentageRight}%!`

    const wrongQuestionsList = document.createElement("ol")
    const wrongQuestionsTitle = document.createElement("h3")

    wrongQuestionsTitle.textContent = "Here are the questions you missed and their corresponding answers: "
    

    questionsIncorrect.forEach(question => {
        const questionLi = document.createElement("li")
        questionLi.textContent = question.content + "    :    " + `Correct Answer : ${question.answer}`
        wrongQuestionsList.appendChild(questionLi)
    })

    const backBtn = document.createElement("button")
        backBtn.className = "back"
        backBtn.innerText = "Back to Home"

        backBtn.addEventListener("click", (event) => goHome(event))


    quizResultsContainer.appendChild(resultTitle)
    quizResultsContainer.appendChild(answerResults)
    quizResultsContainer.appendChild(wrongQuestionsTitle)
    quizResultsContainer.appendChild(wrongQuestionsList)
    quizResultsContainer.appendChild(backBtn)
}

function goHome(event) {
    const quizContainer = document.getElementById("quiz-container")
    const quizFormContainer = document.getElementById("quiz-form-container")
    const liveQuizContainer = document.getElementById("live-quiz")
    const quizResultsContainer = document.getElementById("quiz-results")
    quizContainer.style.display = "initial";
    quizFormContainer.style.display = "initial";
    liveQuizContainer.style.display = "none"
    quizResultsContainer.style.display = "none"
}

function addQuizIdToQuestions() {
    fetch(questionEndPoint)
    .then(response => response.json())
    .then(questions => {
        questions.data.forEach((question,index) => {
            Question.all[index].quiz_id = question.attributes.quiz_id
        })
    })
}


