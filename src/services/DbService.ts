
import { Collection, ObjectID } from "mongodb";
import { Server } from "../Server";


/** 
 * All collection names should accessed trough this enum
*/
export enum DbCollectionNames {

    "Users",
    "Entities",
    "EntityCache",
    "EntityChanges",

}

/** 
 * Every functionality thats use database should use it trough this service
*/
export class DbService<T> {

    private _collection: Collection<T>;

    /**
     * set mongo collection with specified type
     * @param collectionName Collection name in MongoDB
     */
    constructor(collectionName: DbCollectionNames) {


        this._collection = Server.db.collection<T>(DbCollectionNames[collectionName]);



    }


    /** 
     * usage : db config in server startup ../Server.js
     *  creates empty collections from DbCollectionNames
     */
    public static createCollectionsIfNotExists() {

        // getting collections from database
        Server.db.collections(function (err, collections) {

            var currentCollections = collections.map(function (item: Collection) {

                return item.collectionName;

            });


            for (let cName in DbCollectionNames) {

                if (parseInt(cName).toString() != cName) {

                    if (currentCollections.indexOf(cName) == -1) {

                        Server.db.createCollection(cName).then(function (collection) {

                            console.log(`collection ${collection.collectionName} created !`);

                        }).catch(function (err) {

                            console.log(`${cName} collection creation faced error`);

                        });

                    }

                }

            }

        });



    }


    public insertOne(model : T) : Promise<T>{

        return new Promise((resolve, reject) => {
            var objectId: ObjectID = new ObjectID();

            var doc = this._collection.findOneAndUpdate(
                { _id: objectId },
                { $set: model },
                {

                    upsert: true,
                    returnOriginal: false

                }, function (err, result) {

                    if (err)
                        return reject(err);

                    resolve(result.value);

                });

        });

    }


}
