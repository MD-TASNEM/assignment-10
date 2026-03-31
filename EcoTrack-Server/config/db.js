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
    // Return a mock collection for development with sample data
    const mockEvents = [
      {
        _id: "69c8f712b6920d482930850b",
        title: "Community Beach Cleanup",
        description:
          "Join us for a morning of cleaning up Sunset Beach. Gloves, bags, and refreshments provided. Let's protect our oceans together!",
        date: new Date("2026-04-15T09:00:00.000Z"),
        location: "Sunset Beach, Main Entrance",
        organizer: "eco@oceanconservation.org",
        maxParticipants: 100,
        currentParticipants: 67,
        imageUrl:
          "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=600",
        isVirtual: false,
        createdAt: new Date("2026-02-01T10:00:00.000Z"),
        updatedAt: new Date("2026-02-20T12:00:00.000Z"),
      },
      {
        _id: "69c8f712b6920d482930850c",
        title: "Urban Gardening Workshop",
        description:
          "Learn how to start your own urban garden! We'll cover container gardening, composting, and sustainable growing practices.",
        date: new Date("2026-04-20T14:00:00.000Z"),
        location: "Community Center, Room 101",
        organizer: "greenthumb@community.org",
        maxParticipants: 30,
        currentParticipants: 18,
        imageUrl:
          "https://images.unsplash.com/photo-1595805983718-0d3d5a4d4d6d?w=600",
        isVirtual: false,
        createdAt: new Date("2026-02-05T09:00:00.000Z"),
        updatedAt: new Date("2026-02-25T11:00:00.000Z"),
      },
      {
        _id: "69c8f712b6920d482930850d",
        title: "Sustainable Living Webinar",
        description:
          "Join our online webinar on sustainable living practices. Learn how to reduce your carbon footprint and live more eco-friendly.",
        date: new Date("2026-04-25T18:00:00.000Z"),
        location: "Online via Zoom",
        organizer: "info@sustainablelife.org",
        maxParticipants: 200,
        currentParticipants: 142,
        imageUrl:
          "https://images.unsplash.com/photo-1559028006-848e64271f8e?w=600",
        isVirtual: true,
        createdAt: new Date("2026-02-10T14:00:00.000Z"),
        updatedAt: new Date("2026-02-28T16:00:00.000Z"),
      },
      {
        _id: "69c8f712b6920d482930850e",
        title: "Tree Planting Initiative",
        description:
          "Help us plant 100 trees in local park! Bring your family and friends for this fun and rewarding community event.",
        date: new Date("2026-05-01T10:00:00.000Z"),
        location: "Riverside Park, Main Entrance",
        organizer: "trees@greenearth.org",
        maxParticipants: 50,
        currentParticipants: 23,
        imageUrl:
          "https://images.unsplash.com/photo-1615461066159-fea0960485d5?w=600",
        isVirtual: false,
        createdAt: new Date("2026-02-15T11:00:00.000Z"),
        updatedAt: new Date("2026-03-01T13:00:00.000Z"),
      },
    ];

    if (collectionName === "events") {
      return {
        find: (query = {}) => {
          // Filter by date if query has date filter
          let filteredEvents = mockEvents;
          if (query.date && query.date.$gte) {
            filteredEvents = mockEvents.filter(
              (event) => new Date(event.date) >= query.date.$gte,
            );
          }
          return {
            toArray: async () => filteredEvents,
            sort: () => ({
              limit: () => ({
                toArray: async () => filteredEvents,
              }),
            }),
            limit: () => ({
              toArray: async () => filteredEvents,
            }),
            project: () => ({
              sort: () => ({
                limit: () => ({
                  toArray: async () => filteredEvents,
                }),
              }),
            }),
          };
        },
        insertOne: async () => ({ insertedId: "mock-id" }),
        insertMany: async () => ({ insertedCount: 0, insertedIds: [] }),
        updateOne: async () => ({ modifiedCount: 1 }),
        deleteOne: async () => ({ deletedCount: 1 }),
        countDocuments: async () => 0,
        createIndex: async () => {},
      };
    }

    // Default mock collection for other collections
    return {
      find: () => ({
        toArray: async () => [],
        sort: () => ({ limit: () => ({ toArray: async () => [] }) }),
        limit: () => ({ toArray: async () => [] }),
        project: () => ({
          sort: () => ({ limit: () => ({ toArray: async () => [] }) }),
        }),
      }),
      insertOne: async () => ({ insertedId: "mock-id" }),
      insertMany: async () => ({ insertedCount: 0, insertedIds: [] }),
      updateOne: async () => ({ modifiedCount: 1 }),
      deleteOne: async () => ({ deletedCount: 1 }),
      countDocuments: async () => 0,
      createIndex: async () => {},
    };
  }

  // If database is connected, return the real collection
  try {
    return getDb().collection(collectionName);
  } catch (error) {
    console.error(`Error getting collection ${collectionName}:`, error.message);
    // Fallback to mock collection
    return {
      find: () => ({
        toArray: async () => [],
        sort: () => ({ limit: () => ({ toArray: async () => [] }) }),
        limit: () => ({ toArray: async () => [] }),
        project: () => ({
          sort: () => ({ limit: () => ({ toArray: async () => [] }) }),
        }),
      }),
      insertOne: async () => ({ insertedId: "mock-id" }),
      insertMany: async () => ({ insertedCount: 0, insertedIds: [] }),
      updateOne: async () => ({ modifiedCount: 1 }),
      deleteOne: async () => ({ deletedCount: 1 }),
      countDocuments: async () => 0,
      createIndex: async () => {},
    };
  }
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
