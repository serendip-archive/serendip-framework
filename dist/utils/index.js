"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
__export(require("./Validator"));
/** Sync */
function randomString(length, chars) {
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
exports.randomString = randomString;
/** Sync */
function randomAsciiString(length) {
    return randomString(length, 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789');
}
exports.randomAsciiString = randomAsciiString;
/** Sync */
function randomAccessToken() {
    return randomString(128, 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._~+/');
}
exports.randomAccessToken = randomAccessToken;
function bcryptHash(string) {
    return bcrypt.hashSync(string, 8);
}
exports.bcryptHash = bcryptHash;
function bcryptCompare(string, hash) {
    return bcrypt.compareSync(string, hash);
}
exports.bcryptCompare = bcryptCompare;
