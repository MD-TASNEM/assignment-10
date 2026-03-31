const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://EcoTrack-1:ER2KlnVSjsdlgond@cluster0.iwft1b3.mongodb.net/ecotrack?retryWrites=true&w=majority";

async function debugTips() {
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB Atlas');
    
    const database = client.db('ecotrack');
    const tipsCollection = database.collection('tips');
    
    // Count all tips
    const totalTips = await tipsCollection.countDocuments();
    console.log(`\nTotal tips in database: ${totalTips}`);
    
    // Get first few tips to see structure
    const sampleTips = await tipsCollection.find({}).limit(5).toArray();
    console.log(`\nSample tips (${sampleTips.length}):`);
    sampleTips.forEach((tip, index) => {
      console.log(`${index + 1}. ${tip.title || 'No title'}`);
      console.log(`   Content: ${tip.content ? tip.content.substring(0, 100) + '...' : 'No content'}`);
      console.log(`   Category: ${tip.category || 'No category'}`);
      console.log(`   Created: ${tip.createdAt || 'No date'}`);
      console.log('');
    });
    
    // Test the same filter as the controller
    const allTips = await tipsCollection.find({}).toArray();
    console.log(`All tips found: ${allTips.length}`);
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
  }
}

debugTips();
