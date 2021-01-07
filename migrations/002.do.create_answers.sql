CREATE TABLE "answers" (
  "id" SERIAL PRIMARY KEY,
  "answer" TEXT NOT NULL,
  "count" INTEGER DEFAULT 0
);