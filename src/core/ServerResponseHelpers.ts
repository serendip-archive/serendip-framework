import * as http from 'http'

/**
 * ServerRequest 
 */
export interface ServerResponse extends http.ServerResponse {


    send(data): void;
    json(data): void;



}



export function ServerResponseHelpers(res: http.ServerResponse | any) {


    res.send = (data) => {

        res.write(data);
        res.end();

    };

    res.json = (data) => {
        
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(data));

    };

    return res;

}