const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://EcoTrack-1:ER2KlnVSjsdlgond@cluster0.iwft1b3.mongodb.net/ecotrack?retryWrites=true&w=majority";

async function debugEvents() {
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB Atlas');
    
    const database = client.db('ecotrack');
    const eventsCollection = database.collection('events');
    
    // Get all events without filtering
    const allEvents = await eventsCollection.find({}).toArray();
    console.log(`\nAll events in database (${allEvents.length}):`);
    allEvents.forEach((event, index) => {
      console.log(`${index + 1}. ${event.title}`);
      console.log(`   Date: ${event.date}`);
      console.log(`   Date type: ${typeof event.date}`);
      console.log(`   Is Date: ${event.date instanceof Date}`);
      if (event.date instanceof Date) {
        console.log(`   Formatted: ${event.date.toISOString()}`);
      }
      console.log('');
    });
    
    // Test the same filter as the controller
    const now = new Date();
    console.log(`\nCurrent time: ${now.toISOString()}`);
    
    const filteredEvents = await eventsCollection.find({ 
      date: { $gte: now } 
    }).toArray();
    
    console.log(`\nFiltered events (date >= now): ${filteredEvents.length}`);
    filteredEvents.forEach((event, index) => {
      console.log(`${index + 1}. ${event.title} - ${event.date}`);
    });
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
  }
}

debugEvents();
