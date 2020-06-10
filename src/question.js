class Question {
    constructor(id, content, answer){
       this.id = id
       this.content = content
       this.answer = answer
       Question.all.push(this)
    }

   static findById(id) {
       return this.all.find(question => question.id === id)
   }

   static findByQuiz(quiz_id) {
       return this.all.filter(question => question.quiz_id === quiz_id)
   }
   
}

Question.all = []