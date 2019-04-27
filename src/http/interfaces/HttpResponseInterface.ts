/**
 *  @module Http
 */

 import * as http from "http";

/**
 * HttpRequest
 */
export interface HttpResponseInterface extends http.ServerResponse {
  send(data): void;
  json(data): void;
  sendFile(path: string): void;
}
