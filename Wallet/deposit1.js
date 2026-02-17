import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

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

// Save function to store data including total balance and redirect to payment.html
window.save = function () {
    var fname = document.getElementById('fname').value;
    var lname = document.getElementById('lname').value;
    var date = document.getElementById('date').value;
    var duration = document.getElementById('duration').value;
    var amount = document.getElementById('amount').value;
    var totalBalance = document.getElementById('avl-balance').textContent;

    // Validate that all required fields are filled
    if (!fname || !lname || !date || !duration || !amount) {
        alert("All fields are required!");
        return;
    }

    // Save data to Firebase
    set(ref(database, 'users/latestUpdate'), {
        fname: fname,
        lname: lname,
        date: date,
        duration: duration,
        amount: amount,
        total_balance: totalBalance
    }).then(() => {
        alert('Data Saved Successfully');
        // Redirect to payment.html after successful save
        window.location.href = 'payment.html';
    }).catch((error) => {
        console.error("Error: ", error);
        alert('Error saving data');
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Smooth navigation transitions
    function smoothRedirect(url) {
        const container = document.getElementById('main-container');
        if (container) {
            container.classList.add('hidden'); // Apply fade-out effect
            setTimeout(() => {
                window.location.href = url; // Redirect after fade-out
            }, 500); // Delay matches the CSS transition duration
        } else {
            window.location.href = url;
        }
    }

    // Payment method event listeners
    function attachPaymentListeners() {
        const walletBtn = document.getElementById('wallet-btn');
        const creditBtn = document.getElementById('credit-btn');
        const paymentForm = document.getElementById('payment-form');

        if (walletBtn) walletBtn.addEventListener('click', () => smoothRedirect('wallet.html'));
        if (creditBtn) creditBtn.addEventListener('click', () => smoothRedirect('deposit1.html'));
        if (paymentForm) paymentForm.addEventListener('submit', event => {
            event.preventDefault();
            smoothRedirect('payment.html');
        });
    }

    // Show or hide sidebar
    function setupSidebar() {
        const menuBtn = document.getElementById('menu-btn');
        const closeBtn = document.getElementById('close-btn');
        const sidebar = document.querySelector('aside');

        if (menuBtn && closeBtn && sidebar) {
            menuBtn.addEventListener('click', () => sidebar.style.display = 'block');
            closeBtn.addEventListener('click', () => sidebar.style.display = 'none');
        }
    }

    // Change theme handler
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

    // Highlight active sidebar link
    function setupSidebarLinks() {
        const navLinks = document.querySelectorAll('aside .sidebar a');
        navLinks.forEach(link => link.addEventListener('click', () => {
            navLinks.forEach(item => item.classList.remove('active'));
            link.classList.add('active');
        }));
    }

    // Polling function to fetch real-time updates
    function pollUpdates(interval) {
        setInterval(async () => {
            try {
                const response = await fetch('/api/updates'); // Replace with your API URL
                if (response.ok) {
                    const data = await response.json();
                    updatePaymentData(data); // Handle update logic here
                }
            } catch (error) {
                console.error('Error fetching updates:', error);
            }
        }, interval);
    }

    // Update UI dynamically with fetched data
    function updatePaymentData(data) {
        const totalPrice = document.querySelector('.total-price');
        if (data && data.totalPrice && totalPrice) {
            totalPrice.textContent = `$${data.totalPrice.toFixed(2)}`;
        }
    }

    // Initialize all functions
    function init() {
        attachPaymentListeners();
        setupSidebar();
        setupThemeToggle();
        setupSidebarLinks();
        pollUpdates(5000); // Poll every 5 seconds
    }

    init();
});