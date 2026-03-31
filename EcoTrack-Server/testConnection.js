const { connectDB, getCollection } = require('./config/db');

async function testConnection() {
  try {
    console.log('Testing database connection...');
    
    // Connect to database
    const db = await connectDB();
    console.log('Connect result:', db ? 'Database connected' : 'Database null');
    
    // Test getting tips collection
    const tipsCollection = getCollection('tips');
    console.log('Tips collection type:', typeof tipsCollection);
    
    // Try to get tips
    const tips = await tipsCollection.find({}).limit(5).toArray();
    console.log('Tips found:', tips.length);
    
    // Test getting events collection (should work)
    const eventsCollection = getCollection('events');
    const events = await eventsCollection.find({}).limit(2).toArray();
    console.log('Events found:', events.length);
    
  } catch (error) {
    console.error('Test failed:', error);
  }
}

testConnection();
