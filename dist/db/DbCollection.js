"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DbCollection {
    ensureIndex(fieldOrSpec, options) {
        throw new Error("ensureIndex method not implemented.");
    }
    find(query, skip, limit) {
        throw new Error("find method not implemented.");
    }
    count(query) {
        throw new Error("count method not implemented.");
    }
    updateOne(model, userId) {
        throw new Error("updateOne method not implemented.");
    }
    deleteOne(_id, userId) {
        throw new Error("deleteOne method not implemented.");
    }
    insertOne(model, userId) {
        throw new Error("insertOne method not implemented.");
    }
}
exports.DbCollection = DbCollection;
