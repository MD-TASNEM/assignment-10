const { connectDB, getCollection } = require("./config/db");

async function addSampleEvents() {
  try {
    // Connect using the same method as server.js
    await connectDB();
    console.log("Connected to database");

    const eventsCollection = getCollection("events");

    // Check if events already exist
    const existingEvents = await eventsCollection.find({}).toArray();
    console.log(`Current events count: ${existingEvents.length}`);

    if (existingEvents.length > 0) {
      console.log("Events already exist in database:");
      existingEvents.forEach((event, index) => {
        console.log(`${index + 1}. ${event.title} - ${event.date}`);
      });
      return;
    }

    // Sample events data
    const sampleEvents = [
      {
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
        title: "Tree Planting Initiative",
        description:
          "Help us plant 100 trees in the local park! Bring your family and friends for this fun and rewarding community event.",
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

    // Insert sample events
    const result = await eventsCollection.insertMany(sampleEvents);
    console.log(`Successfully inserted ${result.insertedCount} events`);

    // Verify insertion
    const allEvents = await eventsCollection.find({}).toArray();
    console.log("All events in database:");
    allEvents.forEach((event, index) => {
      console.log(`${index + 1}. ${event.title} - ${event.date.toISOString()}`);
    });
  } catch (error) {
    console.error("Error adding sample events:", error);
  }
}

addSampleEvents()
  .then(() => {
    console.log("Script completed");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Script failed:", error);
    process.exit(1);
  });
