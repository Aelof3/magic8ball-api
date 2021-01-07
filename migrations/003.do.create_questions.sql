CREATE TABLE "questions" (
  "id" SERIAL PRIMARY KEY,
  "user_ask_id" INTEGER REFERENCES "user"(id),
  "question" TEXT NOT NULL,
  "answer_id" INTEGER REFERENCES "answers"(id)
    ON DELETE CASCADE NOT NULL
);