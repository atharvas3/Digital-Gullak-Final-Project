import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyD-_1rSlcrrKiLU5CheiBlqbCZnqrLC7ew",
    authDomain: "digital-gullak-login.firebaseapp.com",
    projectId: "digital-gullak-login",
    storageBucket: "digital-gullak-login.firebasestorage.app",
    messagingSenderId: "299435379867",
    appId: "1:299435379867:web:eac4f0b3dcb273cbc78a3e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


    // Sidebar toggle
    const menuBtn = document.querySelector('#menu-btn');
    const closeBtn = document.querySelector('#close-btn');
    const sidebar = document.querySelector('aside');

    menuBtn.addEventListener('click', () => {
        sidebar.style.display = 'block';
    });
    closeBtn.addEventListener('click', () => {
        sidebar.style.display = 'none';
    });

    // Theme toggle
    const themeBtn = document.querySelector('.theme-btn');

    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');

        themeBtn.querySelector('span:first-child').classList.toggle('active');
        themeBtn.querySelector('span:last-child').classList.toggle('active');
    });

    // Handle Authentication State
    onAuthStateChanged(auth, async (user) => {
        const loggedInUserId = localStorage.getItem('loggedInUserId');
        if (loggedInUserId) {
            console.log(user);
            try {
                const docRef = doc(db, "users", loggedInUserId);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    document.getElementById('loggedUserFName').innerText = docSnap.data().firstName;
                    document.getElementById('mainName').innerText = docSnap.data().firstName;
                    document.getElementById('myName').innerText = docSnap.data().firstName;
                    document.getElementById('loggedUserLName').innerText = docSnap.data().lastName;
                    document.getElementById('loggedUserEmail').innerText = docSnap.data().email;
                    document.getElementById('phone').innerText = docSnap.data().phoneNo;
                    document.getElementById('address').innerText = docSnap.data().address;
                    document.getElementById('nation').innerText = docSnap.data().nation;
                    document.getElementById('dob').innerText = docSnap.data().birthDate;
    
                } else {
                    console.log("No document found matching ID");
                }
            } catch (error) {
                console.log("Error getting document:", error);
            }
        } else {
            console.log("User ID not found in local storage");
        }
    });

    // Logout functionality
    const logoutButton = document.getElementById('logout');
    logoutButton.addEventListener('click', async () => {
        localStorage.removeItem('loggedInUserId');
        try {
            await signOut(auth);
            window.location.href = 'index.html';
        } catch (error) {
            console.error('Error signing out:', error);
        }
    });



function preventBack()
{
    window.history.forward();
}
setTimeout(preventBack,-1000);
window.onbeforeunload = function(){
    null;
}  

