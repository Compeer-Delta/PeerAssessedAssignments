import { it, expect, describe } from '@jest/globals';
import { notificationController } from '../controllers/notificationController';
import { Notification } from '../models/notificationModel';
import supertest from 'supertest';
const request = supertest('http://localhost:8080/api');

const userId = 'test'; // replace with test user id
const messageId = 'test'; // replace with test message id

// create test notification
beforeAll(async () => {
    // create test notification
    await notificationController.createNotif({
        userId: userId,
        notifTitle: 'Test Title',
        notifContent: 'Test Content',
        urgency: true
    });
});

// delete test notification
afterAll(async () => {
    // delete test notification
    await notificationController.deleteNotif({
        userId, messageId
    });
});

// test notification controller
describe('notificationController', () => {

    // create notification test data
    it('POST notification test data', async () => {
        const notif = await notificationController.createNotif({
            userId: userId,
            notifTitle: 'Test Title',
            notifContent: 'Test Content',
            urgency: true
        }); // replace with appropriate query
        expect(notif).toBeInstanceOf(Notification);
    });

    it('GET notification test data', async () => {
        const notif = await notificationController.getNotif({
            userId: userId,
            messageId: messageId
        }); // replace with appropriate query
        expect(notif).toBeInstanceOf(Notification); // replace with being exactly equal to test data
    });
});