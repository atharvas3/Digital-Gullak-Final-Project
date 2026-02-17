import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js"; 
import { getDatabase, ref, set, get, update } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js"; 

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
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Save function to store data and redirect
window.save = function () {
    const fname = document.getElementById('fname')?.value.trim();
    const lname = document.getElementById('lname')?.value.trim();
    const date = document.getElementById('date')?.value;
    const duration = document.getElementById('duration')?.value;
    const amount = document.getElementById('amount')?.value;
    const totalBalance = document.getElementById('avl-balance')?.textContent.trim();

    // Validate if all fields are filled
    if (!fname || !lname || !date || !duration || !amount) {
        alert("All fields are required!");
        return;
    }

    const counterRef = ref(database, 'counter/userId');

    // Retrieve current counter and store new user data
    get(counterRef).then((snapshot) => {
        let userId = 1;

        if (snapshot.exists()) {
            const counterData = snapshot.val();
            if (typeof counterData === "object" && "userId" in counterData) {
                userId = counterData.userId + 1; // Increment userId properly
            }
        }

        const userRef = ref(database, `users/${userId}`); // Create unique path for each user
        const userData = {
            fname,
            lname,
            date,
            duration,
            amount,
            total_balance: totalBalance
        };

        // Save user data under the generated userId
        set(userRef, userData).then(() => {
            // Update counter correctly (increment userId)
            update(ref(database, 'counter/userId'), { userId }).then(() => {
                alert('Data Saved Successfully');
                window.location.href = 'payment.html'; // Redirect after success
            }).catch(error => {
                console.error("Error updating counter:", error);
                alert('Error updating counter.');
            });
        }).catch(error => {
            console.error("Error saving user data:", error);
            alert('Error saving data.');
        });
    }).catch(error => {
        console.error("Error fetching userId counter:", error);
        alert('Error fetching counter.');
    });
};

// DOMContentLoaded handler for page initialization
document.addEventListener('DOMContentLoaded', () => {

    function smoothRedirect(url) {
        const container = document.getElementById('main-container');
        if (container) {
            container.classList.add('hidden');
            setTimeout(() => window.location.href = url, 500);
        } else {
            window.location.href = url;
        }
    }

    function attachPaymentListeners() {
        document.getElementById('wallet-btn')?.addEventListener('click', () => smoothRedirect('wallet.html'));
        document.getElementById('credit-btn')?.addEventListener('click', () => smoothRedirect('deposit1.html'));

        const paymentForm = document.getElementById('payment-form');
        if (paymentForm) {
            paymentForm.addEventListener('submit', e => {
                e.preventDefault();
                smoothRedirect('payment.html');
            });
        }
    }

    function setupSidebar() {
        const menuBtn = document.getElementById('menu-btn');
        const closeBtn = document.getElementById('close-btn');
        const sidebar = document.querySelector('aside');

        if (menuBtn && sidebar) {
            menuBtn.addEventListener('click', () => sidebar.style.display = 'block');
        }
        if (closeBtn && sidebar) {
            closeBtn.addEventListener('click', () => sidebar.style.display = 'none');
        }
    }

    function setupThemeToggle() {
        const themeBtn = document.querySelector('.theme-btn');
        if (themeBtn) {
            themeBtn.addEventListener('click', () => {
                document.body.classList.toggle('dark-theme');
                themeBtn.querySelector('span:first-child')?.classList.toggle('active');
                themeBtn.querySelector('span:last-child')?.classList.toggle('active');
            });
        }
    }

    function setupSidebarLinks() {
        const navLinks = document.querySelectorAll('aside .sidebar a');
        navLinks.forEach(link => link.addEventListener('click', () => {
            navLinks.forEach(item => item.classList.remove('active'));
            link.classList.add('active');
        }));
    }

    function pollUpdates(interval) {
        setInterval(async () => {
            try {
                const response = await fetch('/api/updates');
                if (response.ok) {
                    const data = await response.json();
                    updatePaymentData(data);
                }
            } catch (error) {
                console.error('Polling error:', error);
            }
        }, interval);
    }

    function updatePaymentData(data) {
        const totalPrice = document.querySelector('.total-price');
        if (data?.totalPrice && totalPrice) {
            totalPrice.textContent = `$${data.totalPrice.toFixed(2)}`;
        }
    }

    function init() {
        attachPaymentListeners();
        setupSidebar();
        setupThemeToggle();
        setupSidebarLinks();
        pollUpdates(5000);
    }

    init();
});
