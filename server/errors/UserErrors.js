class UserCreateError extends Error {
    constructor(message) {
        super(message)
        this.name = 'CreateUserError'
        this.statusCode = 400
    }
}

class UserLoginError extends Error {
    constructor(message) {
        super(message)
        this.name = 'LoginUserError'
        this.statusCode = 401
    }
}

module.exports = { UserCreateError, UserLoginError }