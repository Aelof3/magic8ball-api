const express = require("express");
const AskService = require("./ask-service");
const { requireAuth } = require("../middleware/jwt-auth");
const parser = express.json();

const askRouter = express.Router();

askRouter.use(requireAuth).use(async (req, res, next) => {
  try {
    const questions = await AskService.getUsersQuestions(
      req.app.get("db"),
      req.user.id
    );

    if (!questions)
      return res.status(404).json({
        error: `There is nothing here`,
      });

    req.questions = questions;
    next();
  } catch (error) {
    next(error);
  }
});

askRouter.get("/", async (req, res, next) => {
  try {
    const questions = await AskService.getRecentQuestions(
      req.app.get("db")
    );
    res.json({
      questions
    });
    next();
  } catch (error) {
    next(error);
  }
});

askRouter.get("/user/:user_id", async (req, res, next) => {
  try {
    const questions = await AskService.getUsersQuestions(
      req.app.get("db"),
      req.params.user_id
    );

    res.json({
      questions
    });
    next();
  } catch (error) {
    next(error);
  }
});


askRouter.post("/user/:user_id", parser, async (req, res, next) => {
  const db = req.app.get("db");
  const user_id = req.params.user_id;
  const question = req.body.question;

  if (!question) {
    res.status(400).json({ error: "Missing 'question' in request body" });
  }

  try {

    min = 1;
    max = 20;
    let answer_id = Math.floor(Math.random() * (max - min + 1) + min);

    //check to see if any of the same question by this user exists
    const answerCheck = await AskService.checkQuestion(db, user_id, question);

    //submit question to server and retrieve answer id
    if (answerCheck.length < 1) {
      answer_id = await AskService.askQuestion(db, user_id, question, answer_id);
    } else {
      answer_id = answerCheck[0].answer_id;
    }
    
    res.status(200).json({
      answer_id
    });
    next();
  } catch (error) {
    next(error);
  }
});

askRouter.get("/answers", async (req, res, next) => {
  try {
    const answers = await AskService.getAnswers(
      req.app.get("db")
    );

    res.json({
      answers
    });
    next();
  } catch (error) {
    next(error);
  }
});


module.exports = askRouter;
