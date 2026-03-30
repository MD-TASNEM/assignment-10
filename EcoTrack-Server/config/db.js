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

  const uri =
    process.env.MONGO_URI ||
    process.env.MONGODB_URI ||
    "mongodb://localhost:27017/ecotrack";

  if (!uri) {
    throw new Error("MONGO_URI or MONGODB_URI is not set");
  }

  console.log(`Attempting to connect to MongoDB: ${uri}`);

  client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
    maxPoolSize: 10,
    minPoolSize: 1,
    connectTimeoutMS: 30000,
    socketTimeoutMS: 45000,
  });

  try {
    await client.connect();
    // database = client.db();
    database = client.db("ecotrack");
    await database.command({ ping: 1 });
    await createIndexes();

    console.log(
      `MongoDB Connected: ${database.databaseName || "default database"}`,
    );

    return database;
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    console.log(
      "Continuing without database connection - some features may not work",
    );

    // For development, continue without database
    database = null;
    return null;
  }
};

const getDb = () => {
  if (!database) {
    throw new Error("Database connection has not been initialized");
  }

  return database;
};

const getCollection = (collectionName) => {
  if (!database) {
    // Return a mock collection for development
    return {
      find: () => ({
        toArray: async () => [],
        sort: () => ({ limit: () => ({ toArray: async () => [] }) }),
        limit: () => ({ toArray: async () => [] }),
      }),
      insertOne: async () => ({ insertedId: "mock-id" }),
      updateOne: async () => ({ modifiedCount: 1 }),
      deleteOne: async () => ({ deletedCount: 1 }),
      createIndex: async () => {},
    };
  }
  return getDb().collection(collectionName);
};

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
