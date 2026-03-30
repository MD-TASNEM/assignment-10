const { COLLECTIONS, getCollection } = require("./config/db");

const sampleChallenges = [
  {
    title: "Weekend Rewilding",
    category: "Green Living",
    description:
      "Spend one weekend restoring a small local area with native plants and pollinator-friendly habitats.",
    duration: 7,
    participants: 350,
    impactMetric: "12 kg CO2 saved",
    difficulty: "Easy",
    status: "Active",
    imageUrl:
      "https://via.placeholder.com/300x200/10B981/FFFFFF?text=Weekend+Rewilding",
    target:
      "Restore native plants and support pollinators in your neighborhood.",
    startDate: new Date("2026-03-01"),
    endDate: new Date("2026-04-30"),
    createdBy: "EcoTrack Community",
    createdAt: new Date(),
  },
  {
    title: "Plastic Free Commute",
    category: "Sustainable Transport",
    description:
      "Replace single-use items on your commute with reusable alternatives for two weeks straight.",
    duration: 14,
    participants: 420,
    impactMetric: "18 kg CO2 saved",
    difficulty: "Medium",
    status: "Active",
    imageUrl:
      "https://via.placeholder.com/300x200/10B981/FFFFFF?text=Plastic+Free+Commute",
    target: "Cut waste during daily travel and build better habits.",
    startDate: new Date("2026-03-10"),
    endDate: new Date("2026-04-12"),
    createdBy: "EcoTrack Community",
    createdAt: new Date(),
  },
  {
    title: "Energy Reset Challenge",
    category: "Energy Conservation",
    description:
      "Track your household energy use, switch to LEDs, and unplug devices you do not need.",
    duration: 21,
    participants: 260,
    impactMetric: "24 kg CO2 saved",
    difficulty: "Hard",
    status: "Upcoming",
    imageUrl:
      "https://via.placeholder.com/300x200/10B981/FFFFFF?text=Energy+Reset",
    target:
      "Reduce electricity waste and learn where your biggest energy savings come from.",
    startDate: new Date("2026-04-05"),
    endDate: new Date("2026-04-26"),
    createdBy: "EcoTrack Community",
    createdAt: new Date(),
  },
];

const sampleTips = [
  {
    title: "Keep a reusable bottle by the door",
    content:
      "Making your bottle visible makes it much more likely you will take it with you every day.",
    category: "Waste Reduction",
    author: "community@ecotrack.local",
    authorName: "Sarah Green",
    authorPhoto: null,
    upvotes: 47,
    createdAt: new Date(),
  },
  {
    title: "Swap one commute per week",
    content:
      "Try public transport, biking, or walking for one trip a week to lower your carbon footprint without a big lifestyle change.",
    category: "Sustainable Transport",
    author: "community@ecotrack.local",
    authorName: "Mike Thompson",
    authorPhoto: null,
    upvotes: 32,
    createdAt: new Date(),
  },
];

const sampleEvents = [
  {
    title: "River Cleanup Day",
    date: new Date("2026-04-10T09:00:00Z"),
    location: "Green River Park",
    description: "Join neighbors for a morning cleanup and litter audit.",
    organizer: "EcoTrack Community",
    imageUrl:
      "https://via.placeholder.com/300x200/10B981/FFFFFF?text=River+Cleanup",
    currentParticipants: 38,
    maxParticipants: 60,
  },
  {
    title: "Solar Home Workshop",
    date: new Date("2026-04-18T14:00:00Z"),
    location: "Community Center",
    description: "Learn the basics of rooftop solar and home energy planning.",
    organizer: "EcoTrack Community",
    imageUrl:
      "https://via.placeholder.com/300x200/10B981/FFFFFF?text=Solar+Workshop",
    currentParticipants: 24,
    maxParticipants: 40,
  },
];

const seedDatabase = async () => {
  try {
    console.log("Seeding database with sample data...");

    const challengesCollection = getCollection(COLLECTIONS.challenges);
    const tipsCollection = getCollection(COLLECTIONS.tips);
    const eventsCollection = getCollection(COLLECTIONS.events);

    // Check if data already exists
    const existingChallenges = await challengesCollection.find().toArray();
    if (existingChallenges.length === 0) {
      await challengesCollection.insertMany(sampleChallenges);
      console.log("✅ Sample challenges seeded");
    }

    const existingTips = await tipsCollection.find().toArray();
    if (existingTips.length === 0) {
      await tipsCollection.insertMany(sampleTips);
      console.log("✅ Sample tips seeded");
    }

    const existingEvents = await eventsCollection.find().toArray();
    if (existingEvents.length === 0) {
      await eventsCollection.insertMany(sampleEvents);
      console.log("✅ Sample events seeded");
    }

    console.log("🌱 Database seeding completed!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  }
};

// Run seed function if called directly
if (require.main === module) {
  const { connectDB } = require("./config/db");
  connectDB()
    .then(() => {
      seedDatabase().then(() => {
        process.exit(0);
      });
    })
    .catch((error) => {
      console.error("Database connection failed:", error);
      process.exit(1);
    });
}

module.exports = { seedDatabase };
