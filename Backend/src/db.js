import { MongoClient } from "mongodb";

let client;

export const initializeDbConnection = async () => {
  client = await MongoClient.connect("mongodb://localhost:27017", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

export const getDbConnection = (userinfodb) => {
  const db = client.db(userinfodb);
  return db;
};
