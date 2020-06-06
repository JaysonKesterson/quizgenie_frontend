class Quiz {
     constructor(id, quizAttributes){
        this.id = id
        this.name = quizAttributes.name
        this.category = quizAttributes.category
        this.questions = quizAttributes.questions
        Quiz.all.push(this)
     }

     render() {
        const quizContainer = document.getElementById("quiz-container");
        const quizName = document.createElement("h3")
        quizName.innerText = this.name
    
        const quizQuestions = document.createElement("p")
        quizQuestions.setAttribute('style', 'white-space:pre;')
        this.questions.forEach(question => {
            quizQuestions.textContent += question.content + "\r\n"
        })
    
        const playBtn = document.createElement("button")
        playBtn.className = "play"
        playBtn.innerText = "Play Quiz"
        playBtn.setAttribute("data-quiz-id", this.id)
        // playBtn.addEventListener("click", function() {
        //     playQuiz()
        // })
    
        quizContainer.appendChild(quizName)
        quizContainer.appendChild(quizQuestions)
        quizContainer.appendChild(playBtn)
    }

    static findById(id) {
        return this.all.find(quiz => quiz.id === id)
    }
    
}

Quiz.all = []