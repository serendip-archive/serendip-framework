import {
  MongoClient,
  Db,
  ObjectID,
  Collection,
  IndexOptions,
  MongoClientOptions
} from "mongodb";
import { ServerServiceInterface, Server } from "../core";
import { DbCollection, EntityChangeModel } from ".";
import * as _ from "underscore";

export interface DbServiceOptionsInterface {
  mongoUrl?: string;
  mongoDb?: string;
}

/**
 * Every functionality thats use database should use it trough this service
 */
export class DbService implements ServerServiceInterface {
  static dependencies = [];

  public entityChangeCollection: DbCollection<EntityChangeModel>;
  private mongoCollections: string[] = [];
  /**
   * Instance of mongodb database
   */
  private db: Db;

  static options: DbServiceOptionsInterface = {
    mongoUrl: process.env.mongoUrl,
    mongoDb: process.env.mongoDb
  };

  static configure(options: DbServiceOptionsInterface) {
    DbService.options = _.extend(DbService.options, options);
  }

  /**
   * set mongo collection with specified type
   * @param collectionName Collection name in MongoDB
   *
   *  filing Server.db that will use in entire system
   */
  public async connect() {
    // Creating mongoDB client from mongoUrl
    var mongoClient = await MongoClient.connect(
      DbService.options.mongoUrl,
      { useNewUrlParser: true }
    );

    this.db = mongoClient.db(DbService.options.mongoDb);
  }

  async start() {
    try {
      await this.connect();
    } catch (error) {
      throw new Error(
        "\n\nUnable to connect to MongoDb. Error details: \n" + error.message
      );
    }

    var mongoCollectionObjects = await this.db.collections();

    mongoCollectionObjects.map(obj => {
      this.mongoCollections.push(obj.collectionName);
    });

    this.entityChangeCollection = await this.collection<EntityChangeModel>(
      "EntityChanges",
      false
    );
  }

  constructor() {}

  public async collection<T>(
    collectionName: string,
    track?: boolean
  ): Promise<DbCollection<T>> {
    collectionName = collectionName.trim();

    if (this.mongoCollections.indexOf(collectionName) === -1) {
      await this.db.createCollection(collectionName);
      this.mongoCollections.push(collectionName);

      if (Server.opts.logging == "info")
        console.log(`☑ collection ${collectionName} created .`);
    }

    return new DbCollection<T>(this.db.collection<T>(collectionName), track);
  }
}
