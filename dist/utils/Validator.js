"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Validator {
    constructor() {
    }
    static isLength(input, min, max) {
        return input.length >= min && input.length <= max;
    }
    static isEmail(input) {
        return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])+/
            .test(input.toLowerCase().trim());
    }
    static isAlphanumeric(input) {
        return /^[a-zA-Z0-9]{1,}$/
            .test(input.toLowerCase().trim());
    }
    static isNumeric(input) {
        return /^[0-9]{1,}$/
            .test(input);
    }
}
exports.Validator = Validator;
