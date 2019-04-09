import * as request from 'supertest';
import { app } from '../app';
import { createConnection } from 'typeorm';
import { redisClient } from '../utils/redis';


let userId: string;

const getJWT = async () => {
    const getToken = await request(app)
        .post('/api/users/login')
        .send({
            email: "dvp137@yahoo.com",
            password: "poopoo"
        })
    let token = getToken.body.token;
    if (!token) {
        token = '';
    }
    return token;
}

beforeAll(async () => {
    await createConnection()

})


describe('signUp without all the credentials', () => {
    test('Should respond with 422', async () => {
        const response = await request(app)
            .post('/api/users/signup')
            .send({ firstName: 'Dom' })
        expect(response.statusCode).toBe(422);
    })
})


describe('Testing WhoIs without authorization', () => {
    test('it should respond with 401 unauthorized', async () => {
        const response = await request(app).get('/api/users')
        expect(response.statusCode).toBe(401);
    })
})


describe('signUp with complete credentials', () => {
    test('Should respond with 201 created', async () => {
        const response = await request(app)
            .post('/api/users/signup')
            .send({
                firstName: 'Dom',
                lastName: 'Phan',
                birthday: '07-14-1993',
                username: 'dvp137',
                email: 'dvp137@yahoo.com',
                password: 'poopoo'
            })
        expect(response.statusCode).toBe(201);
    })
})

describe('signUp with duplicate credentials', () => {
    test('Should respond with 400 already created', async () => {
        const response = await request(app)
            .post('/api/users/signup')
            .send({
                firstName: 'Dom',
                lastName: 'Phan',
                birthday: '07/14/1993',
                username: 'dvp137',
                email: 'dvp137@yahoo.com',
                password: 'poopoo'
            })

        expect(response.statusCode).toBe(400);
    })
})

describe('changing the password with the wrong password', () => {
    test('should respond with 401 unauthorized', async () => {
        let token = await getJWT();
        const response = await request(app)
            .patch('/api/users')
            .set('Authorization', token)
            .send({
                oldPassword: 'wrongoldpassword',
                newPassword: 'newpass'
            })
        expect(response.statusCode).toBe(401);
    })
})

describe('changing the password with the correct password', () => {
    test('should respond with 401 unauthorized', async () => {
        let token = await getJWT();
        const response = await request(app)
            .patch('/api/users')
            .set('Authorization', token)
            .send({
                oldPassword: 'poopoo',
                newPassword: 'poopoo'
            })
        expect(response.statusCode).toBe(202);
    })
})


describe('Deleting user', () => {
    test('Should respond with 204', async () => {
        let token = await getJWT();
        const getResponse = await request(app).get('/api/users')
            .set('Authorization', token)
        userId = getResponse.body.id;
        const response = await request(app).delete(`/api/users/${userId}`)
            .set('Authorization', token)
        expect(response.statusCode).toBe(204);
    })
})

describe('Logging in without an account', () => {
    test('Should respond with 404', async () => {
        let response = await request(app)
            .post('/api/users/login')
            .send({
                email: "dvp137@yahoo.com",
                password: "poopoo"
            })
        expect(response.statusCode).toBe(404);
    })
})

afterAll(() => redisClient.end(true))