// const isAuthenticated = (req, res, next) => {
//     console.log("Request Body is", req.json );
//     if (req.header && req.session.user) {
//         return next();
//     }
//     // User is not authenticated
//     res.status(401).json({ message: 'Authentication required.' });
// };
const CustomError = require('./errorHandler')


const bcrypt = require('bcrypt');
const User = require('../models/userModel'); // Adjust the path based on your project structure

async function authHandler(req, res, next) {
    const authHeader = req.headers.authorization;
    console.log("Auth details received are", authHeader);
    if (!authHeader) {
        console.log("Came in authHeader check");
        let err = new CustomError('You are not authenticated!', 401);
        res.setHeader('WWW-Authenticate', 'Basic');
        // err.status = 401;
        // return next(err);
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
            req.user = user;
            next();
        } else {
            console.log("Came in password failure check");
            let err = new CustomError('You are not authenticated!', 401);
            console.log("Created customError instance", err);
            res.setHeader('WWW-Authenticate', 'Basic');
            return next(err);
        }
    } catch (error) {
        console.error('Database query error in catch block:', error);
        let err = new CustomError('Unable to process the request currently', 422);
        // err.status = 400;
        return next(err);
    }
}

module.exports = authHandler;