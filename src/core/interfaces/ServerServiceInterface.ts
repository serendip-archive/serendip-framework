export interface ServerServiceInterface {

    start(): Promise<void>;
    dependencies?: string[];
    options?: any;
    configure?(options: any): void;

}