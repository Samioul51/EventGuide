# EventGuide

## Project Description
EventGuide is a web application that allows users to create, manage, and view events. Users can sign up using email/password or Google login. Logged-in users can add, edit, and delete their own events.

## Setup & Installation

1. **Clone the repository**
```bash
git clone https://github.com/Samioul51/EventGuide.git
cd EventGuide
```

2. **Install Dependencies**

```bash
npm install
```

3. **Set Environment Variables**
Create a .env file in the root with:
```env
# NextAuth Secret
NEXTAUTH_SECRET=<your-nextauth-secret>

# Google OAuth
GOOGLE_CLIENT_ID=<your-google-client-id>
GOOGLE_CLIENT_SECRET=<your-google-client-secret>

# Firebase (public for client)
NEXT_PUBLIC_FIREBASE_API_KEY=<your-firebase-api-key>
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=<your-firebase-auth-domain>
NEXT_PUBLIC_FIREBASE_PROJECT_ID=<your-firebase-project-id>
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=<your-firebase-storage-bucket>
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=<your-firebase-messaging-sender-id>
NEXT_PUBLIC_FIREBASE_APP_ID=<your-firebase-app-id>
```

4. **Run the development server**
```bash
npm run dev
```

5. Open http://localhost:3000 in your browser.

