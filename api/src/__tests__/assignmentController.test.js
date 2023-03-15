import { it, expect, describe } from '@jest/globals';
import { assignmentController } from '../controllers/assignmentController';
import { Assignment } from '../models/assignmentModel';
import supertest from 'supertest';
const request = supertest('http://localhost:8080/api');

// fill out with testing data

// create assignment before all tests
beforeAll(async () => {
});

// delete assignment after all tests
afterAll(async () => {
});

// run tests on assignment controller
describe('Assignment Controller', () => {
});