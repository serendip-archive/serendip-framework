


export class Validator {

    constructor() {

    }


    static isLength(input: string, min: number, max: number): boolean {

        return input.length >= min && input.length <= max;

    }

    static isEmail(input: string): boolean {

        return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])+/
            .test(input.toLowerCase().trim());

    }


    static isAlphanumeric(input: string): boolean {

        return /^[a-zA-Z0-9]{1,}$/
            .test(input.toLowerCase().trim());

    }


    static isNumeric(input: string): boolean {

        return /^[0-9]{1,}$/
            .test(input);

    }


}