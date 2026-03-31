# 🔧 **FIREBASE API KEY ERROR - FIX GUIDE**

## ❌ **Current Error**

```
Firebase: Error (auth/invalid-api-key)
FirebaseError: Firebase: Error (auth/invalid-api-key)
```

**Root Cause**: The Firebase API key you provided is invalid or not working properly.

---

## 🔍 **TROUBLESHOOTING STEPS**

### **1. Verify Firebase API Key**

#### **Check Your API Key**:
1. **Go to Firebase Console**: https://console.firebase.google.com/
2. **Select Your Project**: ecotrack-1837c
3. **Go to Project Settings**: Click gear icon → Project settings
4. **Service Accounts**: Scroll down to "Your apps" section
5. **Web App**: Click on your web app (should show as Web App 1)
6. **Config Section**: Look for "Config" or "SDK configuration"
7. **API Key**: Copy the `apiKey` value

#### **Expected API Key Format**:
```
AIzaSyxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### **2. Check Firebase Project Settings**

#### **Verify Project Configuration**:
1. **Authentication**: Ensure Authentication is enabled
2. **Email/Password**: Make sure email/password auth is enabled
3. **Google Sign-In**: Ensure Google provider is enabled
4. **Authorized Domains**: Add `localhost:5173` to authorized domains

#### **Authorized Domains Setup**:
```
Development: localhost:5173
Production: yourdomain.com
```

### **3. Regenerate API Key if Needed**

#### **Create New API Key**:
1. **Firebase Console**: Project Settings → Service Accounts
2. **Generate New Key**: Click "Create service account"
3. **Download JSON**: Get the service account key file
4. **Update .env**: Replace the API key with the new one

---

## 🛠 **IMMEDIATE FIXES**

### **Option 1: Get Correct API Key**
1. **Copy Valid API Key** from Firebase Console
2. **Update .env.local**: Replace the current API key
3. **Restart Server**: `npm run dev`

### **Option 2: Check Project Setup**
1. **Authentication Enabled**: Verify in Firebase Console
2. **Web App Configured**: Ensure web app is properly set up
3. **API Key Active**: Ensure API key is not restricted

---

## 📝 **ENVIRONMENT FILE CHECK**

### **Current .env.local Should Look Like**:
```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
VITE_FIREBASE_AUTH_DOMAIN=ecotrack-1837c.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=ecotrack-1837c
VITE_FIREBASE_STORAGE_BUCKET=ecotrack-1837c.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=417652671860
VITE_FIREBASE_APP_ID=1:417652671860:web:76e5f41758ca67bdf09821
```

### **Common Issues**:
- ❌ **Wrong API Key**: Copy-paste error or old key
- ❌ **Missing Spaces**: Environment variables need proper formatting
- ❌ **Special Characters**: Invalid characters in API key
- ❌ **Project Mismatch**: API key from different project

---

## 🎯 **VERIFICATION STEPS**

### **After Fixing API Key**:
1. **Update .env.local** with correct API key
2. **Restart Development Server**: `npm run dev`
3. **Check Console**: Should see "✅ Firebase initialized successfully"
4. **Test Authentication**: Try login/register

### **Expected Success Message**:
```
✅ Firebase initialized successfully
```

---

## 🔧 **ADVANCED TROUBLESHOOTING**

### **If API Key Still Invalid**:
1. **Create New Firebase Project**: Start fresh if needed
2. **Enable Authentication**: Email/Password + Google providers
3. **Add Web App**: Register localhost:5173 as authorized domain
4. **Generate New API Key**: Create fresh service account key

### **Firebase Project Checklist**:
- [ ] Authentication enabled
- [ ] Email/Password provider active
- [ ] Google Sign-In provider active
- [ ] Web app registered
- [ ] localhost:5173 authorized
- [ ] API key generated and active

---

## 🚀 **QUICK FIX ATTEMPTS**

### **Try These API Key Formats**:
```env
# Option 1: Standard Web API Key
VITE_FIREBASE_API_KEY=AIzaSyCxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Option 2: Restricted API Key (if you have restrictions)
VITE_FIREBASE_API_KEY=AIzaSyDxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

## 📞 **FIREBASE CONSOLE LINKS**

### **Direct Links**:
- **Firebase Console**: https://console.firebase.google.com/
- **Project Settings**: https://console.firebase.google.com/project/ecotrack-1837c/settings/general
- **Authentication**: https://console.firebase.google.com/project/ecotrack-1837c/authentication
- **Service Accounts**: https://console.firebase.google.com/project/ecotrack-1837c/settings/serviceaccounts/adminsdk

---

## 🎉 **EXPECTED OUTCOME**

### **After Fixing API Key**:
- ✅ **Firebase Initializes**: No more API key errors
- ✅ **Authentication Works**: Real Firebase login/register
- ✅ **User Management**: Real Firebase user system
- ✅ **Production Ready**: Enterprise-grade authentication

---

## 🔧 **IMMEDIATE ACTION PLAN**

### **1. Go to Firebase Console**
```
https://console.firebase.google.com/
```

### **2. Get Correct API Key**
```
Project Settings → Your Apps → Web App → Config → apiKey
```

### **3. Update Environment**
```
Replace the API key in .env.local file
```

### **4. Restart and Test**
```
npm run dev
# Then test authentication
```

---

## 🌟 **COMMON API KEY ISSUES**

### **Invalid API Key Causes**:
1. **Copy-Paste Error**: Missing characters or extra spaces
2. **Old/Expired Key**: API key was revoked or expired
3. **Wrong Project**: API key from different Firebase project
4. **Restricted Key**: API key has IP or referrer restrictions

### **Solution Strategy**:
- **Verify Source**: Always copy directly from Firebase Console
- **Check Project**: Ensure you're in the correct Firebase project
- **Regenerate**: Create new key if current one is compromised
- **Test Immediately**: Verify after updating environment

---

## 🚀 **NEXT STEPS**

### **Priority 1: Fix API Key**
1. **Get Correct Key** from Firebase Console
2. **Update .env.local** file
3. **Restart Development Server**
4. **Verify Firebase Initialization**

### **Priority 2: Test Authentication**
1. **Test Login Flow**: Real Firebase authentication
2. **Test Registration**: User creation works
3. **Test Profile Management**: User updates work
4. **Verify Console Success**: "✅ Firebase initialized successfully"

---

## 🎯 **SUCCESS CRITERIA**

**You'll know the API key is fixed when:**

- ✅ **Console Shows**: "✅ Firebase initialized successfully"
- ✅ **No API Key Errors**: No more invalid-api-key messages
- ✅ **Authentication Works**: Real Firebase login/register
- ✅ **User System**: Real Firebase user management
- ✅ **Production Ready**: Enterprise-grade authentication

---

## 🔧 **GET HELP NEEDED?**

### **Firebase Documentation**:
- **API Keys**: https://firebase.google.com/docs/projects/api-keys
- **Authentication**: https://firebase.google.com/docs/auth/web/start
- **Web Setup**: https://firebase.google.com/docs/web/setup

### **Common Issues**:
- **Invalid API Key**: Most common setup issue
- **Project Not Found**: Wrong project ID or project deleted
- **Authentication Disabled**: Need to enable in Firebase Console

**The API key error is the most common Firebase setup issue - easily fixable by getting the correct key from Firebase Console!** 🔧
