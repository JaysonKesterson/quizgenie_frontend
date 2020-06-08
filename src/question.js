class Question {
    constructor(id, questionAttributes){
       this.id = id
       this.content = questionAttributes.content
       this.answer = questionAttributes.answer
       this.quiz_id = questionAttributes.quiz_id
       Question.all.push(this)
    }

   static findById(id) {
       return this.all.find(question => question.id === id)
   }

   static findByQuiz(quiz_id) {
       return this.all.filter(question => question.quiz_id === quiz_id)
   }
   
}

Quiz.all = []