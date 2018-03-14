export interface ServiceInterface {

    start(): Promise<void>;
    dependencies?: string[];
}