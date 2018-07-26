export class ServerError extends Error {

    constructor(code: number, message: string, id?: string) {

        super(message);

        this.code = code;
        this.description = message;
        this.stacktrace = this.stack;
        if (id)
            this.id = id;

    }


    public code: number;
    public description: string;
    public stacktrace: string;
    public id: string;
    public more_info: string;



}