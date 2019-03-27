import * as request from 'supertest';
import { app } from '../app';
import { createConnection } from 'typeorm';
import { redisClient } from '../utils/redis';
import { doesNotReject } from 'assert';


let token;

beforeAll(async () => {
    await createConnection()
    // request(app)
    //     .post('/api/users/login')
    //     .send({
    //         email: "dvp137@yahoo.com",
    //         password: "poopoo"
    //     })
    //     .end((err, res) => {
    //         token = res.body.token;
    //         done();
    //     })
})

describe('Testing WhoIs without authorization', () => {
    test('it should respond with 401 unauthorized', async () => {
        const response = await request(app).get('/api/users')
        // .set('Authorization', token)
        expect(response.statusCode).toBe(401);
    })
})

afterAll(() => redisClient.end(true))