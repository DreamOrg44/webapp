const request = require('supertest');
const app = require('../app');

// let firstTestPassed = false;

describe('Health Check API', () => {
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
    test('should return HTTP 503 when the DB is unreachable, passes only when test Case 1 failed', async () => {
        // console.log("Database up and running as, testcase failed and first test case for DB connection is suucessful");
        const res = await request(app).get('/healthz');
        expect(res.status).toBe(503);
        expect(res.headers['cache-control']).toBe('no-store, no-cache, must-revalidate');
    });
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
});
