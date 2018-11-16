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
        throw new Error("Argument 'chars' is undefined");
    }
    var charsLength = chars.length;
    if (charsLength > 256) {
        throw new Error("Argument 'chars' should not have more than 256 characters" +
            ", otherwise unpredictability will be broken");
    }
    var randomBytes = crypto.randomBytes(length);
    var result = new Array(length);
    var cursor = 0;
    for (var i = 0; i < length; i++) {
        cursor += randomBytes[i];
        result[i] = chars[cursor % charsLength];
    }
    return result.join("");
}
exports.randomString = randomString;
/** Sync */
function randomAsciiString(length) {
    return randomString(length, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789");
}
exports.randomAsciiString = randomAsciiString;
/** Sync */
function randomNumberString(length) {
    return randomString(length, "0123456789");
}
exports.randomNumberString = randomNumberString;
/** Sync */
function randomAccessToken() {
    return randomString(128, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._~+/");
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
function toposort(edges) {
    return _toposort(_uniqueNodes(edges), edges);
}
exports.toposort = toposort;
function _toposort(nodes, edges) {
    var cursor = nodes.length, sorted = new Array(cursor), visited = {}, i = cursor;
    while (i--) {
        if (!visited[i])
            visit(nodes[i], i, []);
    }
    return sorted;
    function visit(node, i, predecessors) {
        if (predecessors.indexOf(node) >= 0) {
            var nodeRep;
            try {
                nodeRep = ", node was:" + JSON.stringify(node);
            }
            catch (e) {
                nodeRep = "";
            }
            throw new Error("Cyclic dependency" + nodeRep);
        }
        if (!~nodes.indexOf(node)) {
            throw new Error("Found unknown node. Make sure to provided all involved nodes. Unknown node: " +
                JSON.stringify(node));
        }
        if (visited[i])
            return;
        visited[i] = true;
        // outgoing edges
        var outgoing = edges.filter(function (edge) {
            return edge[0] === node;
        });
        if ((i = outgoing.length)) {
            var preds = predecessors.concat(node);
            do {
                var child = outgoing[--i][1];
                visit(child, nodes.indexOf(child), preds);
            } while (i);
        }
        sorted[--cursor] = node;
    }
}
function _uniqueNodes(arr) {
    var res = [];
    for (var i = 0, len = arr.length; i < len; i++) {
        var edge = arr[i];
        if (res.indexOf(edge[0]) < 0)
            res.push(edge[0]);
        if (res.indexOf(edge[1]) < 0)
            res.push(edge[1]);
    }
    return res;
}
