export class ServerError {

    constructor(code: number, message: string, errorId?: string, more_info?: string) {

        this.code = code;
        this.message = message;
        
        if (errorId)
            this.errorId = errorId;

        if (more_info)
            this.more_info = more_info;
    }


    public code: number;
    public message: string;
    public errorId: string ;
    public more_info: string;



}