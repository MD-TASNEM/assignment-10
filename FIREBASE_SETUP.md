# Firebase Setup Guide for EcoTrack

## Current Status
✅ Server is running successfully on port 5000
✅ API endpoints are working correctly
✅ Client-server connection is established
⚠️ Firebase authentication not configured (using mock mode)

## Firebase Error Explained
The error you're seeing:
```
FirebaseError: Firebase: Error (auth/invalid-api-key)
```

This happens because:
1. Firebase credentials are empty in `.env.local`
2. Application is trying to initialize Firebase with invalid config
3. Mock authentication mode will work for development

## Option 1: Set Up Firebase Project (Recommended)

### Step 1: Create Firebase Project
1. Go to https://console.firebase.google.com
2. Click "Add project" 
3. Enter project name: "EcoTrack" or similar
4. Click "Continue" and skip Google Analytics setup

### Step 2: Enable Authentication
1. In your project dashboard, go to "Authentication" 
2. Click "Get started"
3. Go to "Sign-in method" tab
4. Enable "Email/Password" and "Google" providers

### Step 3: Get Firebase Config
1. Go to Project Settings (gear icon)
2. Scroll down to "Your apps" section
3. Click Web app (or create new one)
4. Copy the `firebaseConfig` object

### Step 4: Update .env.local
Update your `EcoTrack-Client/.env.local` with real Firebase values:
```env
# Firebase (Authentication)
VITE_FIREBASE_API_KEY=your_real_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## Option 2: Continue with Mock Mode (Development Only)

If you want to continue without Firebase:
✅ Mock authentication is already working
✅ Users can register and login locally
✅ All features work except real Firebase services

## Current Working Features
- ✅ User registration (mock)
- ✅ User login (mock) 
- ✅ Google sign-in (mock)
- ✅ Password reset (mock)
- ✅ Profile management
- ✅ JWT token generation for API calls

## Next Steps
1. Choose: Set up Firebase OR continue with mock mode
2. If using Firebase: Update .env.local and restart client
3. Test authentication flows
4. Enjoy full EcoTrack functionality!

## Note
The mock authentication system is fully functional and includes:
- User registration and login
- Session management
- Profile updates
- JWT token generation for API access
- All authentication-related features
