// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCDy2cwVvh6tqnG-SMZtQGvRiduMyVgoo0",
    authDomain: "main-deposit.firebaseapp.com",
    projectId: "main-deposit",
    storageBucket: "main-deposit.firebasestorage.app",
    messagingSenderId: "218637599339",
    appId: "1:218637599339:web:54b63213eb19cb7936672e"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database(app);
console.log("Firebase initialized:", app);

// Show or hide sidebar
const menuBtn = document.querySelector('#menu-btn');
const closeBtn = document.querySelector('#close-btn');
const sidebar = document.querySelector('aside');

menuBtn.addEventListener('click', () => {
    sidebar.style.display = 'block';
});
closeBtn.addEventListener('click', () => {
    sidebar.style.display = 'none';
});

// Change theme
const themeBtn = document.querySelector('.theme-btn');

themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    themeBtn.querySelector('span:first-child').classList.toggle('active');
    themeBtn.querySelector('span:last-child').classList.toggle('active');
});

// Highlight active sidebar link and fetch data
document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll("aside .sidebar a");

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navLinks.forEach(item => item.classList.remove("active"));
            link.classList.add("active");
        });
    });

    // Fetch and display payment details from Firebase
    const transactionRef = firebase.database().ref('users/latestUpdate');
    transactionRef.once('value')
        .then(snapshot => {
            const data = snapshot.val();
            console.log("Fetched data:", data);
            if (data) {
                // Populate fields with Firebase data
                document.getElementById('amount').textContent = data.amount || 'N/A';
                document.getElementById('transaction-id').textContent = data.transaction_id || 'N/A';
                document.getElementById('duration').textContent = data.duration || 'N/A';
                document.getElementById('date').textContent = data.date || 'N/A';
                document.getElementById('card-holder').textContent = `${data.fname || ''} ${data.lname || ''}`.trim() || 'N/A';
            } else {
                console.log("No data found at users/latestUpdate");
                setDefaultValues();
            }
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            setDefaultValues();
        });
});

// Set default values if data fetch fails or is missing
function setDefaultValues() {
    document.getElementById('card-holder').textContent = 'N/A';
    document.getElementById('amount').textContent = 'N/A';
    document.getElementById('transaction-id').textContent = 'N/A';
    document.getElementById('duration').textContent = 'N/A';
    document.getElementById('date').textContent = 'N/A';
}