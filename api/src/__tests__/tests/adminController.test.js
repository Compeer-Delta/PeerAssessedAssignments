import { it, expect, describe } from '@jest/globals';
import { adminController } from '../controllers/adminController';
import { Admin } from '../models/adminModel';
import supertest from 'supertest';
const request = supertest('http://localhost:8080/api');

// create admin before all tests
beforeAll(async () => {
    await adminController.createAdmin({
        password: 'test',
        institution: 'testInst',
        firstname: 'testAdmin',
        surname: 'test',
        email: 'testAdmin@admin.com'
    });
});

// delete admin after all tests
afterAll(async () => {
    await adminController.deleteAdmin({});
});

// run tests on admin controller
describe('Admin Controller', () => {

    // create admin
    it('POST created admin', async () => {
        const res = await request.post('/admin/create').send({
            password: 'test',
        }).set('Accept', 'application/json'); // fix with proper data
    });

    // retreive admin from database
    it('GET specific test admin', async () => {
        const res = await request.get('/admin').query({ email: 'testAdmin"admin.com' });
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('testAdmin');
        expect(res.body).toHaveProperty('test');
        expect(res.body).toHaveProperty('testAdmin@admin.com');
    });


});