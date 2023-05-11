const { MongoClient } = require("mongodb");

const config = require("../config.json");

const mongo = () => {
  const mongoURL = `mongodb+srv://${config.username}:${config.password}@cluster0.nu1kze1.mongodb.net/${config.db_name}?retryWrites=true&w=majority`;
  let db = null;

  async function connect() {
    try {
      const client = new MongoClient(mongoURL);
      await client.connect();

      db = client.db();

      console.log("Connected to Mongo DB");
    } catch (error) {
      console.log(error);
    }
  }

  async function save(collectionName, data) {
    try {
      const collection = db.collection(collectionName);
      await collection.insertOne(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function find(collectionName, searchTerm) {
    try {
      const collection = db.collection(collectionName);

      if (searchTerm) {
        return await collection.find({ searchTerm }).next();
      } else {
        return await collection.find({}).toArray();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function update(collectionName, id, data) {
    try {
      const collection = db.collection(collectionName);
      await collection.updateOne({ id }, { $set: data });
    } catch (error) {
      console.log(error);
    }
  }

  return {
    connect,
    save,
    find,
    update,
  };
};

module.exports = mongo();
