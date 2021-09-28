import { Db, MongoClient } from "mongodb";
import chalk from "chalk";

class Database {
  db?: Db;
  async init(): Promise<Db | undefined> {
    console.log("==========DATABASE==========");
    try {
      const MONGODB = String(process.env.DATABASE);
      const client = await MongoClient.connect(MONGODB);

      this.db = client.db();
      console.log(`STATUS: ${chalk.greenBright("ONLINE")}`);
      console.log(`DATABASE: ${chalk.greenBright(this.db?.databaseName)}`);
      return this.db;
    } catch (e) {
      console.log(`STATUS: ${chalk.redBright("OFFLINE")}`);
      console.log(`DATABASE: ${chalk.redBright(this.db?.databaseName)}`);
      return undefined;
    }
  }
}

export default Database;
