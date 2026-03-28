// MongoDB Atlas Example for EcoTrack - Sustainable Living Community
// This example demonstrates basic CRUD operations with MongoDB Atlas

// Load environment variables from .env file (optional but recommended)
// If no .env file exists, we'll use a config file fallback
try {
  require('dotenv').config();
} catch (error) {
  console.log('📝 dotenv not installed, using config file fallback');
}

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

// ============================================
// CONFIGURATION - Read connection string
// ============================================

// Method 1: From environment variable (MONGODB_URI)
// Method 2: From config file (create config.js with module.exports = { uri: "your-uri" })
// Method 3: Hardcoded (NOT RECOMMENDED for production)

let MONGODB_URI;

// Try to get from environment variable first (most secure)
if (process.env.MONGODB_URI) {
  MONGODB_URI = process.env.MONGODB_URI;
  console.log('✅ Using MONGODB_URI from environment variables');
}
// Fallback to config file (useful for local development)
else {
  try {
    const config = require('./config');
    MONGODB_URI = config.uri;
    console.log('✅ Using MONGODB_URI from config.js file');
  } catch (error) {
    console.error('❌ Error: No connection string found!');
    console.error('Please either:');
    console.error('1. Set MONGODB_URI environment variable');
    console.error('2. Create a config.js file with: module.exports = { uri: "your-mongodb-uri" }');
    console.error('3. Or replace the uri variable below with your connection string');
    process.exit(1);
  }
}

// Database and collection names
const DB_NAME = 'ecotrack_db';
const COLLECTION_NAME = 'sustainability_challenges';

// ============================================
// SAMPLE DATA - 10 realistic documents for EcoTrack
// ============================================

// These represent sustainability challenges that users can join
const sampleChallenges = [
  {
    title: "Plastic-Free July Challenge",
    category: "Waste Reduction",
    description: "Avoid single-use plastic for one month. Bring your own bags, bottles, and containers.",
    duration: 30,
    target: "Reduce plastic waste by 90%",
    participants: 245,
    impactMetric: "kg plastic saved",
    createdBy: "admin@ecotrack.com",
    startDate: new Date("2024-07-01"),
    endDate: new Date("2024-07-31"),
    imageUrl: "https://images.unsplash.com/photo-1618477388954-7852f32655ec",
    status: "Active",
    createdAt: new Date("2024-06-15T10:30:00Z"),
    updatedAt: new Date("2024-06-15T10:30:00Z")
  },
  {
    title: "30-Day Energy Saving Challenge",
    category: "Energy Conservation",
    description: "Reduce your energy consumption by turning off lights, unplugging devices, and using energy-efficient appliances.",
    duration: 30,
    target: "Reduce energy usage by 20%",
    participants: 187,
    impactMetric: "kWh saved",
    createdBy: "greenwarrior@ecotrack.com",
    startDate: new Date("2024-08-01"),
    endDate: new Date("2024-08-30"),
    imageUrl: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e",
    status: "Upcoming",
    createdAt: new Date("2024-07-10T14:20:00Z"),
    updatedAt: new Date("2024-07-10T14:20:00Z")
  },
  {
    title: "Water Conservation Week",
    category: "Water Conservation",
    description: "Take shorter showers, fix leaks, and collect rainwater for plants.",
    duration: 7,
    target: "Reduce water usage by 15%",
    participants: 423,
    impactMetric: "liters water saved",
    createdBy: "waterhero@ecotrack.com",
    startDate: new Date("2024-03-15"),
    endDate: new Date("2024-03-22"),
    imageUrl: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d",
    status: "Completed",
    createdAt: new Date("2024-02-20T09:15:00Z"),
    updatedAt: new Date("2024-02-20T09:15:00Z")
  },
  {
    title: "Bike to Work Month",
    category: "Sustainable Transport",
    description: "Replace car commutes with biking, walking, or public transportation.",
    duration: 30,
    target: "Reduce carbon emissions from commuting",
    participants: 156,
    impactMetric: "kg CO₂ saved",
    createdBy: "ecorider@ecotrack.com",
    startDate: new Date("2024-09-01"),
    endDate: new Date("2024-09-30"),
    imageUrl: "https://images.unsplash.com/photo-1571068316344-75bc76f77890",
    status: "Upcoming",
    createdAt: new Date("2024-08-01T11:45:00Z"),
    updatedAt: new Date("2024-08-01T11:45:00Z")
  },
  {
    title: "Zero Waste Kitchen Challenge",
    category: "Waste Reduction",
    description: "Learn to compost, meal plan, and reduce food waste in your kitchen.",
    duration: 21,
    target: "Reduce food waste by 50%",
    participants: 312,
    impactMetric: "kg food waste diverted",
    createdBy: "zerowastechef@ecotrack.com",
    startDate: new Date("2024-10-01"),
    endDate: new Date("2024-10-21"),
    imageUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e",
    status: "Upcoming",
    createdAt: new Date("2024-09-05T16:00:00Z"),
    updatedAt: new Date("2024-09-05T16:00:00Z")
  },
  {
    title: "Solar Panel Installation Challenge",
    category: "Energy Conservation",
    description: "Research and install solar panels or join a community solar program.",
    duration: 60,
    target: "Generate renewable energy",
    participants: 89,
    impactMetric: "kWh renewable energy generated",
    createdBy: "solarpioneer@ecotrack.com",
    startDate: new Date("2024-04-01"),
    endDate: new Date("2024-05-30"),
    imageUrl: "https://images.unsplash.com/photo-1509391366360-2e959784a276",
    status: "Completed",
    createdAt: new Date("2024-03-01T13:30:00Z"),
    updatedAt: new Date("2024-03-01T13:30:00Z")
  },
  {
    title: "Plastic-Free Shopping Challenge",
    category: "Waste Reduction",
    description: "Use reusable bags, avoid packaged goods, and shop at bulk stores.",
    duration: 14,
    target: "Eliminate plastic packaging",
    participants: 567,
    impactMetric: "plastic items avoided",
    createdBy: "shopgreen@ecotrack.com",
    startDate: new Date("2024-11-01"),
    endDate: new Date("2024-11-14"),
    imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09",
    status: "Upcoming",
    createdAt: new Date("2024-10-10T10:00:00Z"),
    updatedAt: new Date("2024-10-10T10:00:00Z")
  },
  {
    title: "Tree Planting Initiative",
    category: "Green Living",
    description: "Plant native trees in your community or support reforestation projects.",
    duration: 90,
    target: "Plant 100 trees per participant",
    participants: 734,
    impactMetric: "trees planted",
    createdBy: "forester@ecotrack.com",
    startDate: new Date("2024-01-15"),
    endDate: new Date("2024-04-15"),
    imageUrl: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d",
    status: "Completed",
    createdAt: new Date("2023-12-20T08:00:00Z"),
    updatedAt: new Date("2023-12-20T08:00:00Z")
  },
  {
    title: "Composting Workshop Challenge",
    category: "Waste Reduction",
    description: "Start composting at home and share tips with your community.",
    duration: 30,
    target: "Divert organic waste from landfills",
    participants: 278,
    impactMetric: "kg compost produced",
    createdBy: "compostmaster@ecotrack.com",
    startDate: new Date("2024-05-01"),
    endDate: new Date("2024-05-30"),
    imageUrl: "https://images.unsplash.com/photo-1534787238916-9ba6764efd4f",
    status: "Completed",
    createdAt: new Date("2024-04-05T12:15:00Z"),
    updatedAt: new Date("2024-04-05T12:15:00Z")
  },
  {
    title: "Green Home Retrofit Challenge",
    category: "Energy Conservation",
    description: "Upgrade insulation, install smart thermostats, and switch to LED lighting.",
    duration: 45,
    target: "Improve home energy efficiency",
    participants: 198,
    impactMetric: "energy efficiency score",
    createdBy: "greenbuilder@ecotrack.com",
    startDate: new Date("2024-12-01"),
    endDate: new Date("2025-01-15"),
    imageUrl: "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff",
    status: "Upcoming",
    createdAt: new Date("2024-11-01T14:45:00Z"),
    updatedAt: new Date("2024-11-01T14:45:00Z")
  }
];

// ============================================
// MAIN FUNCTION - Execute the MongoDB operations
// ============================================

async function runMongoDBExample() {
  console.log('\n🚀 Starting MongoDB Atlas Example');
  console.log('====================================\n');

  let client;

  try {
    // STEP 1: Create MongoDB client with proper settings
    console.log('📡 Step 1: Creating MongoDB client...');
    client = new MongoClient(MONGODB_URI, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
      // Connection pool settings for better performance
      maxPoolSize: 10,
      minPoolSize: 1
    });
    console.log('✅ Client created successfully\n');

    // STEP 2: Connect to MongoDB Atlas
    console.log('🔌 Step 2: Connecting to MongoDB Atlas...');
    await client.connect();
    console.log('✅ Connected to MongoDB Atlas!\n');

    // STEP 3: Get database and collection references
    console.log('📚 Step 3: Accessing database and collection...');
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);
    console.log(`✅ Using database: ${DB_NAME}`);
    console.log(`✅ Using collection: ${COLLECTION_NAME}\n`);

    // STEP 4: Clean up existing data (optional - good for demo)
    console.log('🧹 Step 4: Cleaning up existing data...');
    const deleteResult = await collection.deleteMany({});
    console.log(`✅ Deleted ${deleteResult.deletedCount} existing documents\n`);

    // STEP 5: Insert 10 realistic documents
    console.log('📝 Step 5: Inserting 10 realistic sustainability challenges...');
    const insertResult = await collection.insertMany(sampleChallenges);
    console.log(`✅ Successfully inserted ${insertResult.insertedCount} documents`);
    console.log('   Document IDs:');
    Object.values(insertResult.insertedIds).forEach((id, index) => {
      console.log(`   ${index + 1}. ${id}`);
    });
    console.log('');

    // STEP 6: Read and print the 5 most recent documents (sorted by createdAt)
    console.log('🔍 Step 6: Retrieving 5 most recent challenges (sorted by creation date)...');
    const recentChallenges = await collection
      .find({})
      .sort({ createdAt: -1 })  // -1 = descending order (newest first)
      .limit(5)                  // Only get 5 documents
      .toArray();

    console.log(`\n📊 Found ${recentChallenges.length} most recent challenges:\n`);
    recentChallenges.forEach((challenge, index) => {
      console.log(`--- Challenge ${index + 1} ---`);
      console.log(`ID: ${challenge._id}`);
      console.log(`Title: ${challenge.title}`);
      console.log(`Category: ${challenge.category}`);
      console.log(`Status: ${challenge.status}`);
      console.log(`Participants: ${challenge.participants}`);
      console.log(`Created: ${challenge.createdAt.toISOString()}`);
      console.log('');
    });

    // STEP 7: Read and print one full document by _id
    console.log('🎯 Step 7: Retrieving a single challenge by ID...');
    // Get the ID of the first document we inserted
    const firstChallengeId = Object.values(insertResult.insertedIds)[0];
    console.log(`Looking for challenge with ID: ${firstChallengeId}`);

    const singleChallenge = await collection.findOne({ _id: firstChallengeId });

    if (singleChallenge) {
      console.log('\n✅ Found challenge:');
      console.log('─────────────────────────────────');
      console.log(`ID: ${singleChallenge._id}`);
      console.log(`Title: ${singleChallenge.title}`);
      console.log(`Category: ${singleChallenge.category}`);
      console.log(`Description: ${singleChallenge.description.substring(0, 100)}...`);
      console.log(`Duration: ${singleChallenge.duration} days`);
      console.log(`Participants: ${singleChallenge.participants}`);
      console.log(`Impact Metric: ${singleChallenge.impactMetric}`);
      console.log(`Start Date: ${singleChallenge.startDate.toISOString()}`);
      console.log(`End Date: ${singleChallenge.endDate.toISOString()}`);
      console.log(`Status: ${singleChallenge.status}`);
      console.log(`Created By: ${singleChallenge.createdBy}`);
      console.log(`Created At: ${singleChallenge.createdAt.toISOString()}`);
      console.log(`Last Updated: ${singleChallenge.updatedAt.toISOString()}`);
      console.log('─────────────────────────────────\n');
    } else {
      console.log('❌ Challenge not found\n');
    }

    // STEP 8: Verify connection with a ping
    console.log('🏓 Step 8: Pinging MongoDB Atlas to confirm connection...');
    await client.db("admin").command({ ping: 1 });
    console.log('✅ Ping successful! Connection is healthy\n');

    // Summary
    console.log('📈 Summary Statistics:');
    console.log('─────────────────────');
    const totalDocs = await collection.countDocuments();
    const activeChallenges = await collection.countDocuments({ status: 'Active' });
    const upcomingChallenges = await collection.countDocuments({ status: 'Upcoming' });
    const completedChallenges = await collection.countDocuments({ status: 'Completed' });

    console.log(`Total Challenges: ${totalDocs}`);
    console.log(`Active: ${activeChallenges}`);
    console.log(`Upcoming: ${upcomingChallenges}`);
    console.log(`Completed: ${completedChallenges}`);
    console.log('');

    console.log('✨ MongoDB Example completed successfully! ✨\n');

  } catch (error) {
    // Handle errors gracefully with helpful messages
    console.error('\n❌ Error occurred:');
    console.error('─────────────────');

    if (error.code === 'ENOTFOUND') {
      console.error('Unable to resolve MongoDB Atlas hostname. Check your internet connection.');
    } else if (error.code === 'MONGODB_URI_INVALID') {
      console.error('Invalid MongoDB URI format. Please check your connection string.');
    } else if (error.message.includes('Authentication failed')) {
      console.error('Authentication failed. Check your username and password in the connection string.');
    } else {
      console.error(error.message);
    }

    console.error('\n💡 Troubleshooting tips:');
    console.error('1. Verify your MongoDB Atlas connection string is correct');
    console.error('2. Check that your IP address is whitelisted in MongoDB Atlas');
    console.error('3. Ensure your username and password are correct');
    console.error('4. Confirm the database user has appropriate permissions');
    console.error('');

    throw error; // Re-throw for debugging
  } finally {
    // STEP 9: Always close the connection
    if (client) {
      console.log('🔒 Step 9: Closing MongoDB connection...');
      await client.close();
      console.log('✅ Connection closed successfully\n');
    }
  }
}

// ============================================
// EXECUTE THE EXAMPLE
// ============================================

// Run the main function and handle any uncaught errors
runMongoDBExample().catch((error) => {
  console.error('Unhandled error in main execution:');
  console.error(error);
  process.exit(1);
});