const { MongoClient } = require("mongodb");

const config = require("../config.json");

/**
 * @description         es6 style module to support mongo connection adn crud operations
 * @return {Object}     object containing functions
 */
const mongo = () => {
  const mongoURL = `mongodb+srv://dbAdmin:${config.password}@cluster0.nu1kze1.mongodb.net/?retryWrites=true&w=majority`;
  let db = null;

  /**
   * @description         connects to mongo atlas via url and sets db instace
   */
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

  return {
    connect,
  };
};

module.exports = mongo();
