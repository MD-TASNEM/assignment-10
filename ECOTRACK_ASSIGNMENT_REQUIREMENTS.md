# 📋 **ECOTRACK ASSIGNMENT REQUIREMENTS**

## 🎯 **PROJECT OVERVIEW**

**EcoTrack** - A community platform where eco-conscious people discover and join sustainability challenges, share practical eco-tips, browse local green events, and track personal environmental impact.

---

## 🏗️ **MAIN REQUIREMENTS**

### **1. Layout Structure**
- **Public Layout**: Marketing pages (Home, Challenges listing)
- **Dashboard Layout**: Protected pages (My Activities, Profile optional)
- **Header/Navigation**: 
  - **Left**: Logo + EcoTrack text
  - **Links**: Home | Challenges | My Activities
  - **Right**: 
    - **Not Logged In**: Login | Register buttons
    - **Logged In**: User profile dropdown (avatar, name) → Profile, My Activities, Logout
  - **Mobile**: Hamburger menu
- **Footer**: © 2025 EcoTrack, quick links, social media icons

### **2. Home Page Requirements**
- **Hero Banner**: Featured challenges carousel with images & CTA
- **Live Statistics**: Community totals (CO₂ saved, plastic reduced) from DB
- **Active Challenges**: Grid showing 4-6 ongoing challenges
- **Recent Tips**: Latest 5 community tips
- **Upcoming Events**: Display 4 upcoming events
- **Static Sections**: Why Go Green?, How It Works

### **3. Authentication (Firebase Auth)**
- **Login Page**: Email/Password + Google Login
- **Register Page**: Name, Email, Photo URL, Password
- **Password Validation**: Uppercase, lowercase, special chars, min 6 chars
- **Behavior**: 
  - Success → Navigate to intended route/Home
  - Error → Toast message (styled, not alert)
  - Loading state on submit
- **No Email Verification or Forget Password** (as per requirements)

### **4. Routes & Access Control**
- **Public Routes**: /, /challenges, /challenges/:id
- **Protected Routes**: /challenges/add, /challenges/join/:id, /my-activities
- **Authentication Routes**: /login, /register, /forgot-password (link only)
- **Behavior**: Protected routes redirect to /login when unauthenticated

### **5. CRUD Operations (MongoDB + Express API)**
- **Collections**: challenges, UserChallenges, tips, events
- **API Endpoints**:
  - GET/POST/PATCH/DELETE /api/challenges
  - POST /api/challenges/join/:id
  - GET/POST/PATCH/DELETE /api/tips
  - GET/POST/PATCH/DELETE /api/events

---

## 📊 **DATABASE SCHEMAS**

### **Challenges Collection**
```javascript
{
  "_id": ObjectId,
  "title": "Plastic-Free July",
  "category": "Waste Reduction",
  "description": "Avoid single-use plastic for one month",
  "duration": 30,
  "target": "Reduce plastic waste",
  "participants": 0,
  "impactMetric": "kg plastic saved",
  "createdBy": "admin@ecotrack.com",
  "startDate": "2024-07-01",
  "endDate": "2024-07-31",
  "imageUrl": "https://example.com/image.jpg"
}
```

### **UserChallenges Collection**
```javascript
{
  "_id": ObjectId,
  "userId": "userId",
  "challengeId": ObjectId,
  "status": "Not Started" | "Ongoing" | "Finished",
  "progress": 0,
  "joinDate": ISODate
}
```

### **Tips Collection**
```javascript
{
  "_id": ObjectId,
  "title": "How to compost at home",
  "content": "Simple steps for home composting...",
  "category": "Waste Management",
  "author": "user@example.com",
  "authorName": "Green User",
  "upvotes": 25,
  "createdAt": "2024-01-20T10:30:00Z"
}
```

### **Events Collection**
```javascript
{
  "_id": ObjectId,
  "title": "Community Clean-up Day",
  "description": "Join neighborhood clean-up event",
  "date": "2024-02-15T09:00:00Z",
  "location": "Central Park",
  "organizer": "user@example.com",
  "maxParticipants": 50,
  "currentParticipants": 35
}
```

---

## 🎨 **UI DESIGN REQUIREMENTS**

### **Design Consistency**
- **Unique Design**: Custom design (not similar to previous projects)
- **Consistent Typography**: Font, size, color across sections
- **Balanced Spacing**: Readable paragraph spacing
- **Uniform Images**: Consistent sizes and spacing
- **Button Consistency**: Same style as home page
- **Navbar Consistency**: Same heading/logo style
- **Grid Layout**: Equal image sizes, proper alignment
- **X Logo**: Use new Twitter logo
- **Responsive**: Mobile, tablet, desktop views

### **Loading & Error UX**
- **Global Spinner**: Initial data fetching
- **Skeleton Loaders**: Card lists (challenges, tips, events)
- **Loading States**: Submit buttons during requests
- **Error Boundaries**: React Error Boundaries for runtime errors
- **Toast Notifications**: Styled success/error messages (no alert)
- **404 Page**: For unknown routes

---

## 🔧 **TECHNICAL REQUIREMENTS**

### **Security**
- **Environment Variables**: Secure on client and server
- **Protected Routes**: Authentication middleware
- **Input Validation**: Forms with inline errors
- **Accessibility**: Semantic HTML, alt tags, focus states

### **Performance**
- **Responsive Design**: All devices
- **Optimized Images**: Proper sizing and loading
- **Efficient Queries**: MongoDB operators, pagination
- **Bundle Optimization**: Modular Firebase SDK

---

## 🚀 **ADVANCED FEATURES (Optional)**

### **1. Advanced Filtering**
- **Category Filter**: $in operator
- **Date Range**: $gte and $lte on startDate/endDate
- **Participants Range**: $gte/$lte operators
- **Example Query**:
```javascript
db.challenges.find({
  category: { $in: ["Waste Reduction", "Energy Saving"] },
  startDate: { $gte: new Date("2024-01-01") },
  participants: { $gte: 10, $lte: 1000 }
})
```

### **2. Participant Progress Tracking**
- **UserChallenges Collection**: Track user progress
- **Progress Visualization**: Progress percentage, last updated
- **Endpoint**: Update progress, display in UI

### **3. Community Features**
- **Leaderboard**: Top contributors by challenge impact
- **Achievements/Badges**: Milestone rewards (10 challenges joined)
- **Social Sharing**: Twitter/Facebook share buttons

### **4. Firebase Admin SDK (Server-Side)**
- **JWT Verification**: Verify user tokens on protected routes
- **Service Account**: Admin SDK initialization
- **User Authorization**: Match JWT with document owner

---

## 📝 **SUBMISSION REQUIREMENTS**

### **What to Submit**
- **Client Repository**: GitHub repository link
- **Server Repository**: GitHub repository link
- **Live Website**: Deployment URLs
- **Minimum Commits**: 15 client, 8 server

### **Documentation**
- **README.md**: Website name, live URL, 5+ feature bullet points
- **No Lorem Ipsum**: No default placeholder text
- **No Default Alerts**: Custom error/success messages

### **Deployment**
- **Client Hosting**: Netlify, Surge, Firebase Hosting
- **Server Hosting**: Vercel
- **Domain Authorization**: Add domain to Firebase if using Netlify/Surge
- **Error-Free Reloading**: No errors on route reloads
- **Login Redirect**: Logged in users not redirected to login

---

## 🎯 **IMPLEMENTATION PRIORITY**

### **Phase 1: Core Structure**
1. **Layout System**: Public and protected layouts
2. **Navigation**: Header with auth states
3. **Home Page**: Hero, stats, challenges, tips, events
4. **Authentication**: Login/register pages with Firebase

### **Phase 2: Database Integration**
1. **MongoDB Collections**: challenges, tips, events, userChallenges
2. **Express APIs**: Full CRUD operations
3. **Data Display**: Dynamic content from database

### **Phase 3: Advanced Features**
1. **Filtering System**: Advanced MongoDB queries
2. **Progress Tracking**: User challenge participation
3. **Community Features**: Leaderboard, achievements

### **Phase 4: Polish & Deployment**
1. **UI Consistency**: Design system implementation
2. **Error Handling**: Boundaries, toast notifications
3. **Performance**: Optimization, responsive design
4. **Deployment**: Production hosting setup

---

## 🌟 **SUCCESS CRITERIA**

### **Functional Requirements**
- [ ] All routes working correctly
- [ ] Authentication system complete
- [ ] CRUD operations functional
- [ ] Database integration working
- [ ] Responsive design implemented

### **Technical Requirements**
- [ ] Firebase authentication working
- [ ] MongoDB collections structured
- [ ] Express APIs complete
- [ ] Error handling implemented
- [ ] Loading states implemented

### **Design Requirements**
- [ ] Unique, consistent design
- [ ] Responsive layout
- [ ] Accessibility features
- [ ] Loading skeletons
- [ ] Toast notifications

---

## 🚀 **DEPLOYMENT CHECKLIST**

### **Client-Side**
- [ ] Netlify/Surge/Firebase Hosting
- [ ] Custom domain configured
- [ ] Error-free route reloading
- [ ] Optimized bundle size

### **Server-Side**
- [ ] Vercel deployment
- [ ] Environment variables secured
- [ ] Protected routes implemented
- [ ] Firebase Admin SDK configured

---

## 📞 **RESOURCES PROVIDED**

### **Design Resources**
- **UIverse.io**: UI components and inspiration
- **DevMeets**: Development resources
- **Bootcamp UX Design**: Free images and resources
- **ThemeForest**: Premium design templates

### **Technical Resources**
- **Firebase Documentation**: Authentication, Firestore, Storage
- **MongoDB Documentation**: Query operators, aggregation
- **Express.js Documentation**: API development
- **React Documentation**: Components, hooks, routing

---

## 🎉 **PROJECT SCOPE**

**This is a comprehensive full-stack application requiring:**

- ✅ **Complete Frontend**: React, routing, authentication
- ✅ **Complete Backend**: Express, MongoDB, Firebase Admin
- ✅ **Database Design**: 4+ collections with relationships
- ✅ **Advanced Features**: Filtering, progress tracking, community
- ✅ **Professional Design**: Unique, responsive, accessible
- ✅ **Production Deployment**: Real hosting, domain, security

**Estimated Development Time**: 2-3 weeks for full implementation

---

## 🎯 **NEXT STEPS**

### **Immediate Actions**:
1. **Set up project structure**: Layouts, components, pages
2. **Implement authentication**: Firebase integration
3. **Create database schemas**: MongoDB collections
4. **Build core APIs**: Express CRUD operations
5. **Develop UI components**: Reusable, consistent design

### **Development Strategy**:
1. **Start with core features**: Authentication, basic CRUD
2. **Add advanced features**: Filtering, progress tracking
3. **Polish UI/UX**: Loading states, error handling
4. **Deploy and test**: Production environment

---

## 📋 **ASSIGNMENT BREAKDOWN**

**This is a comprehensive full-stack assignment requiring:**

- **Frontend**: React application with routing, authentication, UI components
- **Backend**: Express API with MongoDB integration
- **Database**: Multiple collections with relationships and advanced queries
- **Authentication**: Firebase integration with JWT tokens
- **Design**: Custom, responsive, accessible interface
- **Features**: Advanced filtering, progress tracking, community features
- **Deployment**: Production hosting with security and optimization

**This represents a complete, production-ready web application!** 🚀
