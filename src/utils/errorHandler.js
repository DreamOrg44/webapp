// function CustomError(message, statusCode) {
//     const error = new Error(message);
//     error.statusCode = statusCode;
//     return error;
//   }
  
//   module.exports = CustomError;
  

//class level implementation as the function wasn't working. Have to check this later
class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name; // Set the name property for clarity in stack traces
  }
}

module.exports = CustomError;
