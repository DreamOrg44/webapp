// const isAuthenticated = (req, res, next) => {
//     console.log("Request Body is", req.json );
//     if (req.header && req.session.user) {
//         return next();
//     }
//     // User is not authenticated
//     res.status(401).json({ message: 'Authentication required.' });
// };

const bcrypt = require('bcrypt');
const User  = require('../models/userModel'); // Adjust the path based on your project structure

async function authHandler(req, res, next) {
    const authHeader = req.headers.authorization;
    console.log("Auth details", authHeader);
    if (!authHeader) {
        let err = new Error('You are not authenticated!');
        res.setHeader('WWW-Authenticate', 'Basic');
        err.status = 401;
        return next(err);
    }

    const auth = Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
    console.log("Auth details after split is", authHeader);
    const email = auth[0];
    const password = auth[1];
    console.log("username and pw is ", email, password);

    //auth details are encryted, first decrypt the password and the has it again using bcrypt and then compare it with the one in db

    // Auth details {
    //     authorization: 'Basic dXNlckBleGFtcGxlMS5jb206c2VjdXJlcGFzc3dvcmQ=',
    //     'content-type': 'text/plain',
    //     'user-agent': 'PostmanRuntime/7.29.2',
    //     accept: '*/*',
    //     'postman-token': '963d71c0-6ebe-4948-9258-d1dc8bbf7dff',
    //     host: 'localhost:3000',
    //     'accept-encoding': 'gzip, deflate, br',
    //     connection: 'keep-alive',
    //     'content-length': '111'
    //   }


    try {
        const user = await User.findOne({ where: { email } });

        if (user && await bcrypt.compare(password, user.password)) {
            req.user = user; // Attach user information to the request for later use
            next();
        } else {
            let err = new Error('You are not authenticated!');
            res.setHeader('WWW-Authenticate', 'Basic');
            err.status = 401;
            return next(err);
        }
    } catch (error) {
        console.error('Database query error:', error);
        let err = new Error('Internal Server Error');
        err.status = 500;
        return next(err);
    }
}

module.exports = authHandler;