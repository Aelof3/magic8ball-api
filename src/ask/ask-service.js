const AskService = {
  getUsersQuestions(db, user_id) {
    return db
      .from("questions")
      .join("answers", "questions.answer_id", "=", "answers.id")
      .join("user","user.id", "=", "questions.user_ask_id")
      .select(
        "questions.user_ask_id",
        "questions.question",
        "answers.answer"
      )
      .orderBy('questions.id','desc')
      .where("user.id","=",`${user_id}`)
      .limit(10)
  },

  getRecentQuestions(db) {
    return db
      .from("questions")
      .join("answers", "questions.answer_id", "=", "answers.id")
      .join("user","questions.user_ask_id","=","user.id")
      .select(
        "questions.user_ask_id",
        "questions.question",
        "answers.answer",
        "user.username"
      )
      .orderBy('questions.id','desc')
      .limit(10)
  },

  getAnswers(db) {
    return db
      .from("answers")
      .select("*")
  },

  checkQuestion(db, user_ask_id, question) {
    return db
      .select("*")
      .from("questions")
      .where({
        user_ask_id,
        question
      })
  },

  askQuestion(db, user_ask_id, question, answer_id) {
    return db("questions")
      .returning(answer_id)
      .whereRaw("where not `user_ask_id` = ? and not `question` = ?", [user_ask_id, question])
      .insert({user_ask_id,question,answer_id})
      
  },

};

module.exports = AskService;
