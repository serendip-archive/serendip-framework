import * as crypto from 'crypto'
import * as bcrypt from 'bcryptjs'


export * from './Validator'

/** Sync */
export function randomString(length, chars): string {
    if (!chars) {
        throw new Error('Argument \'chars\' is undefined');
    }

    var charsLength = chars.length;
    if (charsLength > 256) {
        throw new Error('Argument \'chars\' should not have more than 256 characters'
            + ', otherwise unpredictability will be broken');
    }

    var randomBytes = crypto.randomBytes(length);
    var result = new Array(length);

    var cursor = 0;
    for (var i = 0; i < length; i++) {
        cursor += randomBytes[i];
        result[i] = chars[cursor % charsLength];
    }

    return result.join('');
}

/** Sync */
export function randomAsciiString(length): string {
    return randomString(length,
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789');
}


/** Sync */
export function randomNumberString(length): string {
    return randomString(length,
        '0123456789');
}

/** Sync */
export function randomAccessToken(): string {
    return randomString(128,
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._~+/');
}

export function bcryptHash(string: string): string {

    return bcrypt.hashSync(string, 8);

}


export function bcryptCompare(string: string, hash: string): boolean {

    return bcrypt.compareSync(string, hash);

}


