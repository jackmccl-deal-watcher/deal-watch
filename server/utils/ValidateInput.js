const { APIError } = require('../errors/APIError');
const VARIABLE_TYPES = require('./VariableTypesEnum');

const validateStringInput = (input, input_type) => {
    if (typeof input !== VARIABLE_TYPES.STRING || !(input.trim())) {
        throw new APIError(`Invalid string input: ${input_type}`)
    }
}

const validateNumberInput = (input, input_type) => {
    if (typeof input !== VARIABLE_TYPES.NUMBER || input <= 0) {
        throw new APIError(`Invalid number input: ${input_type}`)
    }
}

module.exports = { validateStringInput, validateNumberInput }