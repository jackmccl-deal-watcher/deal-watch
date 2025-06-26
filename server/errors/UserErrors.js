class UserCreateError extends Error {
    constructor(message) {
        super(message)
        this.name = 'UserCreateError'
        this.statusCode = 400
    }
}

class UserLoginError extends Error {
    constructor(message) {
        super(message)
        this.name = 'UserLoginError'
        this.statusCode = 401
    }
}

module.exports = { UserCreateError, UserLoginError }