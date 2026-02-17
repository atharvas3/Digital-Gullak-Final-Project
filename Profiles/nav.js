import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

// Firebase configuration
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
const auth = getAuth();
const db = getFirestore();

// Function to handle user authentication and data retrieval
function handleAuthState() {
  onAuthStateChanged(auth, (user) => {
    const loggedInUserId = localStorage.getItem('loggedInUserId');
    if (loggedInUserId) {
      console.log(user);
      fetchUserData(loggedInUserId);
    } else {
      console.log("User Id not Found in Local storage");
    }
  });
}

// Function to fetch user data from Firestore
function fetchUserData(userId) {
  const docRef = doc(db, "users", userId);
  getDoc(docRef)
    .then((docSnap) => {
      if (docSnap.exists()) {
        const userData = docSnap.data();
        displayUserData(userData);
      } else {
        console.log("No document found matching id");
      }
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });
}

// Function to display user data in the UI
function displayUserData(userData) {
  document.getElementById('first-name').value = userData.firstName;
  document.getElementById('profName').innerHTML = userData.firstName;
  document.getElementById('email').value = userData.email;
  document.getElementById('last-name').value = userData.lastName;
  document.getElementById('phone').value = userData.phoneNo;
  document.getElementById('address').value = userData.address;
  document.getElementById('nation').value = userData.nation;
  document.getElementById('dob').value = userData.birthDate;
}

// Function to handle user logout
function handleLogout() {
  const logoutButton = document.getElementById('logout');
  if (logoutButton) {
    logoutButton.addEventListener('click', () => {
      localStorage.removeItem('loggedInUserId');
      signOut(auth)
        .then(() => {
          window.location.href = 'index.html';
        })
        .catch((error) => {
          console.error('Error Signing out:', error);
        });
    });
  }
}

// Function to handle sidebar toggle
function setupSidebarToggle() {
  const menuBtn = document.querySelector('#menu-btn');
  const closeBtn = document.querySelector('#close-btn');
  const sidebar = document.querySelector('aside');
  
  if (menuBtn && sidebar) {
    menuBtn.addEventListener('click', () => {
      sidebar.style.display = 'block';
    });
  }
  
  if (closeBtn && sidebar) {
    closeBtn.addEventListener('click', () => {
      sidebar.style.display = 'none';
    });
  }
}

// Function to handle theme toggling
function setupThemeToggle() {
  const themeBtn = document.querySelector('.theme-btn');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark-theme');
      themeBtn.querySelector('span:first-child').classList.toggle('active');
      themeBtn.querySelector('span:last-child').classList.toggle('active');
    });
  }
}

// Initialize functionalities when the document is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  handleAuthState();
  handleLogout();
  setupSidebarToggle();
  setupThemeToggle();
});

function preventBack()
{
    window.history.forward();
}
setTimeout(preventBack,-1000);
window.onbeforeunload = function(){
    null;
}  
