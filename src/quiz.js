class Quiz {
     constructor(id, name, category, questions){
        this.id = id
        this.name = name
        this.category = category
        this.questions =questions
        Quiz.all.push(this)
     }

     render() {
        const quizContainer = document.getElementById("quiz-container");
        const quizName = document.createElement("h3")
        quizName.innerText = this.name
    
    
        const playBtn = document.createElement("button")
        playBtn.className = "play"
        playBtn.innerText = "Play Quiz"
        playBtn.setAttribute("data-quiz-id", this.id)
    
        quizContainer.appendChild(quizName)
        quizContainer.appendChild(quizQuestions)
        quizContainer.appendChild(playBtn)
    }

    static findById(id) {
        return this.all.find(quiz => quiz.id === id)
    }

    static findByCategory(category) {
        return this.all.filter(quiz => quiz.category === category)
    }
    
}

Quiz.all = []