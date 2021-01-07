TRUNCATE
  "user",
  "answers",
  "questions";

INSERT INTO "user" ("id", "username", "name", "password")
VALUES
  (
    1,
    'guest',
    'GUEST',
    -- password = "pass"
    '$2a$10$fCWkaGbt7ZErxaxclioLteLUgg4Q3Rp09WW0s/wSLxDKYsaGYUpjG'
  ),
  (
    2,
    'guest2',
    'GUEST2',
    -- password = "pass"
    '$2a$10$fCWkaGbt7ZErxaxclioLteLUgg4Q3Rp09WW0s/wSLxDKYsaGYUpjG'
  );

INSERT INTO "answers" ("id", "answer")
VALUES
  (1, 'As I see it, yes.'),
  (2, 'Ask again later.'),
  (3, 'Better not tell you now.'),
  (4, 'Cannot predict now.'),
  (5, 'Concentrate and ask again.'),
  (6, 'Don’t count on it.'),
  (7, 'It is certain.'),
  (8, 'It is decidedly so.'),
  (9, 'Most likely.'),
  (10, 'My reply is no.'),
  (11, 'My sources say no.'),
  (12, 'Outlook not so good.'),
  (13, 'Outlook good.'),
  (14, 'Reply hazy, try again.'),
  (15, 'Signs point to yes.'),
  (16, 'Very doubtful.'),
  (17, 'Without a doubt.'),
  (18, 'Yes.'),
  (19, 'Yes – definitely.'),
  (20, 'You may rely on it.');

INSERT INTO "questions" ("id", "user_ask_id", "question", "answer_id")
VALUES
  (1, 1, 'Do it be like it do?', 9),
  (2, 1, 'How does quantum physics?', 19),
  (3, 2, 'Is the sky blue?', 2),
  (4, 2, 'Do magnets stick to the fridge?', 8);
  
-- because we explicitly set the id fields
-- update the sequencer for future automatic id setting
SELECT setval('questions_id_seq', (SELECT MAX(id) from "questions"));
SELECT setval('answers_id_seq', (SELECT MAX(id) from "answers"));
SELECT setval('user_id_seq', (SELECT MAX(id) from "user"));


 -- As I see it, yes.
 -- Ask again later.
 -- Better not tell you now.
 -- Cannot predict now.
 -- Concentrate and ask again.
 -- Don’t count on it.
 -- It is certain.
 -- It is decidedly so.
 -- Most likely.
 -- My reply is no.
 -- My sources say no.
 -- Outlook not so good.
 -- Outlook good.
 -- Reply hazy, try again.
 -- Signs point to yes.
 -- Very doubtful.
 -- Without a doubt.
 -- Yes.
 -- Yes – definitely.
 -- You may rely on it.