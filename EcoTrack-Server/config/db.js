const { MongoClient, ServerApiVersion } = require("mongodb");

const COLLECTIONS = Object.freeze({
  challenges: "challenges",
  userChallenges: "userchallenges",
  tips: "tips",
  events: "events",
});

let client;
let database;

const createIndexes = async () => {
  const indexDefinitions = [
    {
      collection: COLLECTIONS.userChallenges,
      spec: { userId: 1, challengeId: 1 },
      options: { unique: true },
    },
    {
      collection: COLLECTIONS.events,
      spec: { date: 1 },
    },
    {
      collection: COLLECTIONS.tips,
      spec: { createdAt: -1 },
    },
    {
      collection: COLLECTIONS.tips,
      spec: { upvotes: -1 },
    },
  ];

  for (const definition of indexDefinitions) {
    try {
      await database
        .collection(definition.collection)
        .createIndex(definition.spec, definition.options || {});
    } catch (error) {
      console.warn(
        `Index creation skipped for ${definition.collection}: ${error.message}`,
      );
    }
  }
};

const connectDB = async () => {
  if (database) {
    return database;
  }

  const uri = process.env.MONGO_URI || process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGO_URI or MONGODB_URI is not set");
  }

  client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
    maxPoolSize: 10,
    minPoolSize: 1,
  });

  await client.connect();
  database = client.db();
  await database.command({ ping: 1 });
  await createIndexes();

  console.log(
    `MongoDB Connected: ${database.databaseName || "default database"}`,
  );

  return database;
};

const getDb = () => {
  if (!database) {
    throw new Error("Database connection has not been initialized");
  }

  return database;
};

const getCollection = (collectionName) => getDb().collection(collectionName);

const closeDB = async () => {
  if (!client) {
    return;
  }

  await client.close();
  client = null;
  database = null;
};

module.exports = {
  COLLECTIONS,
  closeDB,
  connectDB,
  getCollection,
  getDb,
};
