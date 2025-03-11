#📌 Activity Tracker
A simple web app to track tasks and productivity using Firebase and React. The app features task management, a Pomodoro timer, and authentication via Firebase.

##🚀 Features
✅ Task Management: Add, update, and track your tasks.
✅ Pomodoro Timer: Manage focus sessions with a built-in Pomodoro timer.
✅ Firebase Authentication: Sign up and log in using email & password.
✅ Firestore Database: Store and retrieve tasks in real time.
React Router Navigation: Handles login and main task management.

##🚀 Planned Features: A statistics page to track productivity trends.
📂 Tech Stack
⚛️ React (Vite)
🔥 Firebase Auth & Firestore
🛠️ React Router (wip)
🎨 Tailwind (not yet)
📦 Installation
1️⃣ Clone the Repository

```
git clone https://github.com/YOUR_GITHUB_USERNAME/activity-tracker.
cd activity-tracker
```

2️⃣ Install Dependencies

```
npm install
```

3️⃣ Setup Firebase Environment Variables
Create a .env file in the root directory and add your Firebase credentials:

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

⚠️ Important: Ensure .env is added to .gitignore to prevent exposing credentials.

4️⃣ Start the Development Server

```
npm run dev
```

Then, open http://localhost:5173/ in your browser.

🖥️ Usage
1️⃣ Sign up/Login with an email and password.
2️⃣ Add Tasks to track work sessions.
3️⃣ Use the Pomodoro Timer to manage focus time.
4️⃣ Mark tasks as complete when finished.
5️⃣ (Future) View Statistics to analyze productivity trends.

📌 TODO
Login Page
Protected Routes
Track and save more statistics
Statistics Page
UI/UX Enhancements
Create and update wiki
