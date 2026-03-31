const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://EcoTrack-1:ER2KlnVSjsdlgond@cluster0.iwft1b3.mongodb.net/ecotrack?retryWrites=true&w=majority";

async function fixEventDates() {
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB Atlas');
    
    const database = client.db('ecotrack');
    const eventsCollection = database.collection('events');
    
    // Find and fix events with string dates
    const stringDateEvents = await eventsCollection.find({
      date: { $type: "string" }
    }).toArray();
    
    console.log(`Found ${stringDateEvents.length} events with string dates`);
    
    for (const event of stringDateEvents) {
      console.log(`Fixing event: ${event.title}`);
      console.log(`Old date: ${event.date} (${typeof event.date})`);
      
      // Convert string date to Date object
      const newDate = new Date(event.date);
      console.log(`New date: ${newDate} (${typeof newDate})`);
      
      await eventsCollection.updateOne(
        { _id: event._id },
        { $set: { date: newDate } }
      );
    }
    
    // Verify the fix
    const allEvents = await eventsCollection.find({}).toArray();
    console.log(`\nAll events after fix:`);
    allEvents.forEach((event, index) => {
      console.log(`${index + 1}. ${event.title} - ${event.date} (${typeof event.date})`);
    });
    
    // Test filter
    const filteredEvents = await eventsCollection.find({ 
      date: { $gte: new Date() } 
    }).toArray();
    
    console.log(`\nFiltered events after fix: ${filteredEvents.length}`);
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
  }
}

fixEventDates();
