import { Db } from "mongodb";

export const assignDocumentID = async (
  database: Db,
  collection: string,
  sort: any = { registerDate: -1 }
) => {
  const lastElement = await database
    .collection(collection)
    .find()
    .limit(1)
    .sort(sort)
    .toArray();

  if (lastElement.length === 0) {
    return 1;
  }
  return lastElement[0].id + 1;
};

export const findOneElement = async (
  database: Db,
  collection: string,
  filter: object
): Promise<any> => {
  return await database.collection(collection).findOne(filter);
};

export const insterOneElement = async (
  database: Db,
  collection: string,
  element: any
): Promise<any> => {
  return await database.collection(collection).insertOne(element);
};

export const instertManyElement = async (
  database: Db,
  collection: string,
  elements: Array<any>
): Promise<any> => {
  return await  database.collection(collection).insertMany(elements);
};

export const findElements = async (
  database: Db,
  collection: string,
  filter: object = {}
) => {
  return await database.collection(collection).find(filter).toArray();
};
