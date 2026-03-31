const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://EcoTrack-1:ER2KlnVSjsdlgond@cluster0.iwft1b3.mongodb.net/ecotrack?retryWrites=true&w=majority";

async function debugTipCategories() {
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB Atlas');
    
    const database = client.db('ecotrack');
    const tipsCollection = database.collection('tips');
    
    // Get all tips and their categories
    const allTips = await tipsCollection.find({}).sort({ createdAt: -1 }).limit(100).toArray();
    console.log(`Total tips: ${allTips.length}`);
    
    // Get unique categories
    const categories = [...new Set(allTips.map(tip => tip.category).filter(Boolean))];
    console.log('\nUnique categories found:');
    categories.forEach((category, index) => {
      console.log(`${index + 1}. ${category}`);
    });
    
    // Show tips without categories
    const tipsWithoutCategory = allTips.filter(tip => !tip.category);
    console.log(`\nTips without category: ${tipsWithoutCategory.length}`);
    
    // Show first 5 tips with their categories
    console.log('\nFirst 5 tips with categories:');
    allTips.slice(0, 5).forEach((tip, index) => {
      console.log(`${index + 1}. ${tip.title || 'No title'}`);
      console.log(`   Category: "${tip.category || 'No category'}"`);
      console.log(`   Content: ${tip.content ? tip.content.substring(0, 100) + '...' : 'No content'}`);
      console.log('');
    });
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
  }
}

debugTipCategories();
