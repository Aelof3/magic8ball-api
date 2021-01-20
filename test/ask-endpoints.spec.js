const jwt = require('jsonwebtoken')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe('Ask Endpoints', function () {
  let db

  const testUsers = helpers.makeUsersArray()
  const testUser = testUsers[0]

  const testAnswers = helpers.makeAnswersArray()

  before('make knex instance', () => {
    db = helpers.makeKnexInstance()
    app.set('db', db)
  })

  after('disconnect from db', () => db.destroy())

  before('cleanup', () => helpers.cleanTables(db))

  afterEach('cleanup', () => helpers.cleanTables(db))

  /**
   * @description Get 10 most recent questions
   **/
  describe(`GET /api/ask`, () => {
    beforeEach('insert users', () =>
      helpers.seedUsers(
        db,
        testUsers,
      )
    )

    it(`responds 200 and array of questions`, () => {
      
        return supertest(app)
            .get('/api/ask')
            .set('Authorization', helpers.makeAuthHeader(testUser))
            .expect(200)
    })
  })

  /**
   * @description Get answers to populate 8 ball
   **/
  describe(`GET /api/ask/answers`, () => {
    beforeEach('insert users', () =>
      helpers.seedUsers(
        db,
        testUsers,
      )
    )

    it(`responds 200 and array of answers`, () => {
      
        return supertest(app)
            .get('/api/ask/answers')
            .set('Authorization', helpers.makeAuthHeader(testUser))
            .expect(200,{answers:[]})
    })
  })

  /**
   * @description Get questions for user
   **/
  describe(`GET /api/ask/user/:user_id`, () => {
    beforeEach('insert users', () =>
      helpers.seedUsers(
        db,
        testUsers,
      )
    )

    it(`responds 200 and list of questions from user with user_id`, () => {
      
        return supertest(app)
            .get('/api/ask/user/1')
            .set('Authorization', helpers.makeAuthHeader(testUser))
            .expect(200,{questions:[]})
    })
  })

  /**
   * @description Get questions for user
   **/
  describe(`POST /api/ask/user/:user_id`, () => {
    beforeEach('insert users', () =>
      helpers.seedUsers(
        db,
        testUsers,
      )
    )
    beforeEach('insert answers', () =>
      helpers.seedAnswers(
        db,
        testAnswers,
      )
    )

    it(`responds 200 and gets answer_id for question`, () => {
        const question = {
            question:"test question?"
        };

        return supertest(app)
            .post('/api/ask/user/1')
            .send(question)
            .set('Authorization', helpers.makeAuthHeader(testUser))
            .expect(200)
            .then(r=>console.log(r))
    })
  })
})
