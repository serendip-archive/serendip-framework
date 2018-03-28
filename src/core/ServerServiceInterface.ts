export interface ServerServiceInterface {

    start(): Promise<void>;
    dependencies?: string[];
}