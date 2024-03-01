import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDcaBpwPbE9G8zsiKveSJbJqUYsGw0Ev9I",
    authDomain: "community-impact-hub.firebaseapp.com",
    projectId: "community-impact-hub",
    storageBucket: "community-impact-hub.appspot.com",
    messagingSenderId: "676327563740",
    appId: "1:676327563740:web:802181c250e89c806bef19"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get the auth object from the initialized app
export const auth = getAuth(app);
export default app;
