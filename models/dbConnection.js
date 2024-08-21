// dbConnection.js
const { MongoClient, ServerApiVersion } = require('mongodb');

const createConnection = async (uri, dbName) => {
  // Create a MongoClient with a MongoClientOptions object to set the Stable API version
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  try {
    // Connect the client to the server
    await client.connect();
    console.log(`Connected to the ${dbName} database`);

    // Return the database instance
    return client.db(dbName);
  } catch (err) {
    console.error(`Error connecting to the ${dbName} database:`, err);
    throw err;
  }
};

module.exports = createConnection;
