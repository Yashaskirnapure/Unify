class CustomError extends Error{
    statusCode;

    constructor(message, statusCode){
        super(message);
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

module.exports = { CustomError }