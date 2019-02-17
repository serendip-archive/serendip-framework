import { DbCollectionInterface } from "./interfaces/DbCollectionInterface";
import { DbProviderInterface } from "./DbService";

export abstract class DbCollection<T> implements DbCollectionInterface<T> {
  ensureIndex(fieldOrSpec: any, options: any): Promise<void> {
    throw new Error("ensureIndex method not implemented.");
  }
  find(query: any, skip?: any, limit?: any): Promise<T[]> {
    throw new Error("find method not implemented.");
  }
  count(query: any): Promise<Number> {
    throw new Error("count method not implemented.");
  }
  updateOne(model: T, userId?: string): Promise<T> {
    throw new Error("updateOne method not implemented.");
  }

  deleteOne(_id: any, userId?: any): Promise<T> {
    throw new Error("deleteOne method not implemented.");
  }
  insertOne(model: any, userId?: string): Promise<T> {
    throw new Error("insertOne method not implemented.");
  }
}
