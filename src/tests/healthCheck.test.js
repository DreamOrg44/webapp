const request = require('supertest');
const app = require('../app');

const username = 'test1234@example.com';
const password = 'password123';
const { pubMessage } = require('../utils/pubSub');



describe('Health Check API', () => {
    beforeEach(async () => await new Promise((resolve) => setTimeout(resolve, 2000)))
    test('should return HTTP 200 for a legitimate GET request and should never fail', async () => {
        const res = await request(app).get('/healthz');
        expect(res.status).toBe(200);
        expect(res.headers['cache-control']).toBe('no-store, no-cache, must-revalidate');
        // if(response.status==200){
        //     console.log("I am inside the firstTestPassed block")
        //         firstTestPassed = true;
        // }

    });

    test('should return HTTP 405 Method Not Allowed for any illegitimate request', async () => {
        const res = await request(app).put('/healthz');
        expect(res.status).toBe(405);
        expect(res.headers['cache-control']).toBe('no-store, no-cache, must-revalidate');
    });

    test('should return HTTP 400 Bad Request, to a request with query params', async () => {
        const res = await request(app).get('/healthz?abc=12');
        expect(res.status).toBe(400);
        expect(res.headers['cache-control']).toBe('no-store, no-cache, must-revalidate');
    });


    test('should return HTTP 415 Unsupported Media with an invalid Content-Type header', async () => {
        const res = await request(app).get('/healthz').set('Content-Type', 'text/plain');
        expect(res.status).toBe(415);
        expect(res.headers['cache-control']).toBe('no-store, no-cache, must-revalidate');
    });

    // if (!firstTestPassed) {
    // test('should return HTTP 503 when the DB is unreachable, passes only when test Case 1 failed', async () => {
    //     // console.log("Database up and running as, testcase failed and first test case for DB connection is suucessful");
    //     const res = await request(app).get('/healthz');
    //     expect(res.status).toBe(503);
    //     expect(res.headers['cache-control']).toBe('no-store, no-cache, must-revalidate');
    // });
    // }
    // else{
    //     console.log("Skipping this test case as first test case ran successfully");
    // }

    test('should have an empty response body for health check endpoint', async () => {
        const response = await request(app).get('/healthz');
        expect(response.status).toBe(200);
        expect(response.headers['cache-control']).toBe('no-store, no-cache, must-revalidate');
        expect(response.body).toEqual({});
    });
    test('should return HTTP 400 for health check with non-empty JSON request body', async () => {
        const requestBody = {
            abc: '12',
            xyz: '34',
        };
        const response = await request(app)
            .get('/healthz')
            .set('Content-Type', 'application/json')
            .send(requestBody);
        expect(response.status).toBe(400);
        expect(response.headers['cache-control']).toBe('no-store, no-cache, must-revalidate');
    });
    test('Create an Account', async () => {
        const response = await request(app).post('/v1/user').send({
            email: 'test1234@example.com',
            password: 'password123',
            firstName: 'John',
            lastName: 'Doe',
        });
        // expect(pubMessage).not.toHaveBeenCalled();
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
    });

    // Test Case 2: Get User Details
    test('Get User Details', async () => {
        const response = await request(app).get('/v1/user/self')
            .set('Authorization', `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('email', 'test1234@example.com');
    });

    // test('Update User Account', async () => {
    //     const response = await request(app).put('/v1/user/self')
    //     .set('Authorization', `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`)
    //     .send({
    //         firstName: 'UpdatedJohn',
    //     });
    //     expect(response.status).toBe(204);
    // });


    test('Update User Account', async () => {
        // Make a PUT request to update the user account
        const updateResponse = await request(app)
            .put('/v1/user/self')
            .set('Authorization', `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`)
            .send({
                firstName: 'UpdatedJohn',
            });

        // Check if the PUT request was successful (Status Code 204)
        expect(updateResponse.status).toBe(204);

        // Make a GET request to retrieve the updated user information
        const getResponse = await request(app)
            .get('/v1/user/self')
            .set('Authorization', `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`);

        // Check if the GET request was successful (Status Code 200)
        expect(getResponse.status).toBe(200);

        // Check if the property is updated in the response body
        expect(getResponse.body).toHaveProperty('firstName', 'UpdatedJohn');
    });

});
