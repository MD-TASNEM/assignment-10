const axios = require('axios');

async function testTipsAPI() {
  try {
    console.log('Testing tips API...');
    
    // Test without limit
    const response1 = await axios.get('http://localhost:5000/tips');
    console.log(`Without limit - Status: ${response1.status}, Data length: ${response1.data?.length || 0}`);
    
    // Test with limit 100
    const response2 = await axios.get('http://localhost:5000/tips?limit=100');
    console.log(`With limit=100 - Status: ${response2.status}, Data length: ${response2.data?.length || 0}`);
    
    // Show first few tips from response
    if (response2.data && response2.data.length > 0) {
      console.log('\nFirst 3 tips from API:');
      response2.data.slice(0, 3).forEach((tip, index) => {
        console.log(`${index + 1}. ${tip.title || 'No title'} - ${tip.category || 'No category'}`);
      });
    }
    
  } catch (error) {
    console.error('API Test Error:', error.message);
  }
}

testTipsAPI();
