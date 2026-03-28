# EcoTrack Server

Backend API for EcoTrack - Sustainable Living Community Platform.

## Features

- **MongoDB with Mongoose** - Robust data modeling and validation
- **Advanced Filtering** - Support for category, date range, and participant range filtering using MongoDB operators ($in, $gte, $lte)
- **User Challenge Tracking** - Track user participation and progress in challenges
- **Dynamic Content** - Tips and events collections for dynamic homepage content
- **Protected Routes** - JWT-based authentication for secure endpoints
- **Community Statistics** - Aggregated community impact metrics
- **Error Handling** - Comprehensive error handling with proper status codes

## API Endpoints

### Challenges
- `GET /api/challenges` - Get all challenges with filtering
- `GET /api/challenges/:id` - Get single challenge
- `POST /api/challenges` - Create challenge (protected)
- `POST /api/challenges/join/:id` - Join challenge (protected)
- `PUT /api/challenges/:id` - Update challenge (owner only)
- `DELETE /api/challenges/:id` - Delete challenge (owner only)

### User Challenges
- `GET /api/user-challenges` - Get user's challenges (protected)
- `GET /api/user-challenges/stats` - Get user stats (protected)
- `PATCH /api/user-challenges/:challengeId/progress` - Update progress (protected)

### Tips
- `GET /api/tips` - Get all tips
- `GET /api/tips/recent` - Get recent tips for homepage
- `POST /api/tips` - Create tip (protected)
- `PATCH /api/tips/:id/upvote` - Upvote tip (protected)

### Events
- `GET /api/events` - Get all events
- `GET /api/events/upcoming` - Get upcoming events for homepage
- `GET /api/events/:id` - Get single event
- `POST /api/events` - Create event (protected)
- `POST /api/events/:id/join` - Join event (protected)

### Statistics
- `GET /api/stats/community` - Get community impact stats
- `GET /api/stats/leaderboard` - Get top contributors

## Filtering Examples
