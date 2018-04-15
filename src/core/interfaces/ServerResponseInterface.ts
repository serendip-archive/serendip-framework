import * as http from 'http'

/**
 * ServerRequest 
 */
export interface ServerResponseInterface extends http.ServerResponse {

    send(data): void;
    json(data): void;
    sendFile(path: string): void;
}