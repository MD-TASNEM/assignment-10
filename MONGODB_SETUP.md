# MongoDB Atlas Setup Guide for EcoTrack

## Current Status
✅ Server is running successfully on port 5000
✅ API endpoints are working (returning empty arrays)
✅ Client-server connection is established
❌ MongoDB Atlas connection failing with "bad auth" error

## To Fix MongoDB Atlas Connection

### Option 1: Check Network Access
1. Go to your MongoDB Atlas dashboard: https://cloud.mongodb.com/v2/69c1b66c070ac5fd66bb2142/access/security
2. Under "Network Access", click "Add IP Address"
3. Choose "Allow Access from Anywhere" (0.0.0.0/0) for development
4. Click "Confirm"

### Option 2: Verify Database User Permissions
1. Go to Database Access: https://cloud.mongodb.com/v2/69c1b66c070ac5fd66bb2142/access/database
2. Check that user "EcoTrack-1" has:
   - Read/Write access to the "ecotrack" database
   - Or has "Atlas admin" role

### Option 3: Verify Database Name
1. Go to Clusters: https://cloud.mongodb.com/v2/69c1b66c070ac5fd66bb2142/cluster/69c3a3caea9022be61af6c62
2. Note your database name (should be "ecotrack")

### Option 4: Test Connection String
Try this updated connection string in your .env.development:
```
MONGO_URI=mongodb+srv://EcoTrack-1:Bvr2ctA6VIDsTvUG@69c1b66c070ac5fd66bb2142.mongodb.net/69c3a3caea9022be61af6c62?retryWrites=true&w=majority
```

## Current Working Setup
- ✅ Server runs without database (graceful fallback)
- ✅ API returns empty arrays (expected for new database)
- ✅ Client connects to server successfully
- ✅ All endpoints functional

## Next Steps
1. Fix MongoDB Atlas connection using options above
2. Restart server: `cd EcoTrack-Server && npm run dev`
3. Seed database: `node seedDatabase.js`
4. Verify data appears in client application

## Alternative: Use Local MongoDB
If Atlas continues to fail, you can use local MongoDB:
1. Install MongoDB locally
2. Update .env.development: `MONGO_URI=mongodb://localhost:27017/ecotrack`
3. Start MongoDB service
4. Restart server
