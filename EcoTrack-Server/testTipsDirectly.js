const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://EcoTrack-1:ER2KlnVSjsdlgond@cluster0.iwft1b3.mongodb.net/ecotrack?retryWrites=true&w=majority";

async function testTipsDirectly() {
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB Atlas');
    
    const database = client.db('ecotrack');
    const tipsCollection = database.collection('tips');
    
    // Count all tips
    const totalTips = await tipsCollection.countDocuments();
    console.log(`Total tips in database: ${totalTips}`);
    
    // Get all tips with same query as controller
    const allTips = await tipsCollection.find({}).sort({ createdAt: -1 }).limit(100).toArray();
    console.log(`Tips returned by query: ${allTips.length}`);
    
    // Show first few tips
    console.log('\nFirst 3 tips:');
    allTips.slice(0, 3).forEach((tip, index) => {
      console.log(`${index + 1}. ${tip.title || 'No title'} - ${tip.category || 'No category'}`);
    });
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
  }
}

testTipsDirectly();
