process.env.TZ = "UCT";
process.env.NODE_ENV = "test";
process.env.JWT_SECRET = "test-jwt-secret";
process.env.JWT_EXPIRY = "3m";
process.env.SSL = true;

require("dotenv").config();

process.env.TEST_DB_URL =
  process.env.TEST_DB_URL ||
  "postgresql://postgres@localhost/magic8ball-test";

const { expect } = require("chai");
const supertest = require("supertest");

global.expect = expect;
global.supertest = supertest;
