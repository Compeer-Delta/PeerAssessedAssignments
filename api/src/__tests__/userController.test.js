import { it, describe, expect } from '@jest/globals';
import { userController } from '../controllers/userController';
import { User } from '../models/userModel';
import supertest from 'supertest';
const request = supertest('http://localhost:8080/api');

// create user before all tests
beforeAll(async () => {
});

// delete user after all tests
afterAll(async () => {
});

// run tests on user controller
describe('User Controller', () => {
    it('GET specific test user', async () => {
        const res = await request.get('/user').query({ email: 'testUser@user.com' });
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('testUser');
        expect(res.body).toHaveProperty('test');
    });
});