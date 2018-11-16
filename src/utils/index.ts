import * as crypto from "crypto";
import * as bcrypt from "bcryptjs";

export * from "./Validator";

/** Sync */
export function randomString(length, chars): string {
  if (!chars) {
    throw new Error("Argument 'chars' is undefined");
  }

  var charsLength = chars.length;
  if (charsLength > 256) {
    throw new Error(
      "Argument 'chars' should not have more than 256 characters" +
        ", otherwise unpredictability will be broken"
    );
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

/** Sync */
export function randomAsciiString(length): string {
  return randomString(
    length,
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  );
}

/** Sync */
export function randomNumberString(length): string {
  return randomString(length, "0123456789");
}

/** Sync */
export function randomAccessToken(): string {
  return randomString(
    128,
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._~+/"
  );
}

export function bcryptHash(string: string): string {
  return bcrypt.hashSync(string, 8);
}

export function bcryptCompare(string: string, hash: string): boolean {
  return bcrypt.compareSync(string, hash);
}

export function toposort(edges) {
  return _toposort(_uniqueNodes(edges), edges);
}
function _toposort(nodes, edges) {
  var cursor = nodes.length,
    sorted = new Array(cursor),
    visited = {},
    i = cursor;

  while (i--) {
    if (!visited[i]) visit(nodes[i], i, []);
  }

  return sorted;

  function visit(node, i, predecessors) {
    if (predecessors.indexOf(node) >= 0) {
      var nodeRep;
      try {
        nodeRep = ", node was:" + JSON.stringify(node);
      } catch (e) {
        nodeRep = "";
      }
      throw new Error("Cyclic dependency" + nodeRep);
    }

    if (!~nodes.indexOf(node)) {
      throw new Error(
        "Found unknown node. Make sure to provided all involved nodes. Unknown node: " +
          JSON.stringify(node)
      );
    }

    if (visited[i]) return;
    visited[i] = true;

    // outgoing edges
    var outgoing = edges.filter(function(edge) {
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
    if (res.indexOf(edge[0]) < 0) res.push(edge[0]);
    if (res.indexOf(edge[1]) < 0) res.push(edge[1]);
  }
  return res;
}
