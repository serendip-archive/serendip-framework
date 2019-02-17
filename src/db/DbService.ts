import {
  MongoClient,
  Db,
  ObjectID,
  Collection,
  IndexOptions,
  MongoClientOptions
} from "mongodb";
import { ServerServiceInterface, Server } from "../core";
import { EntityChangeModel } from ".";
import * as _ from "underscore";
import { DbCollectionInterface } from "./interfaces/DbCollectionInterface";
import { any } from "async";
import { MongodbProviderOptions, MongodbProvider } from "./providers/Mongodb";
import chalk from "chalk";

export interface DbProviderInterface {
  /**
   * return db collection as interface
   */
  collection<T>(
    collectionName: string,
    trackChanges?: boolean
  ): Promise<DbCollectionInterface<T>>;

  changes: DbCollectionInterface<EntityChangeModel>;
  /**
   * options for this provider
   */
  initiate(options?): Promise<void>;
}

export interface DbProviderOptionsInterface {
  [key: string]: any;
}
export interface DbServiceOptions {
  /**
   * name of default provider. will be used in case of executing collection without provider argument set
   */
  defaultProvider?: string;

  providers: {
    providerName: string;
    providerObject?: DbProviderInterface;
    options: DbProviderOptionsInterface;
  }[];
}

/**
 * Every functionality thats use database should use it trough this service
 */
export class DbService implements ServerServiceInterface {
  static dependencies = [];

  static options: DbServiceOptions = {
    defaultProvider: "Mongodb",
    providers: [
      {
        providerName: "Mongodb",
        providerObject: new MongodbProvider(),
        options: {
          mongoDb: "serendip_framework",
          mongoUrl: "mongodb://localhost:27017"
        }
      }
    ]
  };

  static configure(options: DbServiceOptions) {
    DbService.options = _.extend(DbService.options, options);
  }

  private providers: { [key: string]: DbProviderInterface } = {};
  async start() {
    for (const provider of DbService.options.providers) {
      console.log(
        chalk.gray(
          `DbService > trying to connect to DbProvider named: ${
            provider.providerName
          }`
        )
      );
      await provider.providerObject.initiate(provider.options);
      this.providers[provider.providerName] = provider.providerObject;

      console.log(
        chalk.green(
          `DbService > connected to DbProvider name: ${provider.providerName}`
        )
      );
    }
  }

  collection<T>(collectionName: string, track?: boolean, provider?: string) {
    return this.providers[
      provider || DbService.options.defaultProvider
    ].collection<T>(collectionName, track);
  }
  constructor() {}
}
