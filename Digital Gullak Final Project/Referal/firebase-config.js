// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, set, get, update } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// Firebase config
const firebaseConfig = {
    authDomain: "refferal-a46c6.firebaseapp.com",
    databaseURL: "https://refferal-a46c6-default-rtdb.firebaseio.com/",
    projectId: "refferal-a46c6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, ref, set, get, update };