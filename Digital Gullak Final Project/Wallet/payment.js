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

// Smooth navigation transitions (moved to global scope)
function smoothRedirect(url) {
    const container = document.getElementById('main-container');
    const overlay = document.getElementById('full-screen-overlay');
    if (container) {
        container.classList.add('hidden');
        setTimeout(() => {
            window.location.href = url;
        }, 500);
    } else {
        window.location.href = url;
    }
    // Hide overlay after redirect (though it won't be visible post-redirect)
    setTimeout(() => {
        if (overlay) overlay.style.display = 'none';
    }, 500);
}

document.addEventListener('DOMContentLoaded', () => {
    // Payment method event listeners
    function attachPaymentListeners() {
        const walletBtn = document.getElementById('wallet-btn');
        const creditBtn = document.getElementById('credit-btn');
        const paymentForm = document.getElementById('payment-form');
        if (walletBtn) walletBtn.addEventListener('click', () => smoothRedirect('wallet.html'));
        if (creditBtn) creditBtn.addEventListener('click', () => smoothRedirect('deposit1.html'));
        if (paymentForm) paymentForm.addEventListener('submit', event => {
            event.preventDefault();
            smoothRedirect('deposit_success.html');
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

    // Polling function to fetch real-time updates (disabled)
    function pollUpdates(interval) {
        setInterval(async () => {
            try {
                const response = await fetch('/api/updates');
                if (response.ok) {
                    const data = await response.json();
                    updatePaymentData(data);
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
        // pollUpdates(5000); // Disabled to avoid 404 errors
    }

    init();
});

// QR code switching functions
window.setPhonePay = function () {
    document.getElementById("qr-code").src = "phonepay.png";
};

window.setGooglePay = function () {
    document.getElementById("qr-code").src = "googlepay.png";
};

window.setPaytm = function () {
    document.getElementById("qr-code").src = "paytm.png";
};

// Check UTR against Transaction ID and redirect
window.checkUTR = async function () {
    const utr = document.getElementById('utr').value;
    const overlay = document.getElementById('full-screen-overlay');
    const confirmButton = document.querySelector('.myButton');

    if (!utr) {
        alert("Please enter a UTR!");
        return;
    }

    confirmButton.disabled = true;

    try {
        console.log("Fetching from Firebase at: users/latestUpdate");
        const transactionRef = firebase.database().ref('users/latestUpdate');
        const snapshot = await transactionRef.once('value');
        const transactionData = snapshot.val();
        console.log("Transaction data:", transactionData);
        const transactionId = transactionData ? transactionData.transaction_id : null;
        console.log("Fetched transaction_id:", transactionId);

        if (transactionId && utr.trim().toLowerCase() === transactionId.trim().toLowerCase()) {
            console.log("UTR matches transaction_id, showing overlay and redirecting...");
            overlay.style.display = 'flex';
            await new Promise(resolve => setTimeout(resolve, 2000));
            smoothRedirect('dep.html');
        } else {
            alert("UTR does not match the Transaction ID. Please try again.");
            console.log("Entered UTR:", utr, "Stored transaction_id:", transactionId);
            confirmButton.disabled = false;
        }
    } catch (error) {
        console.error("Error checking UTR:", error);
        alert("Error verifying transaction. Please try again.");
        confirmButton.disabled = false;
    }
};

// Original redirect function
window.redirect = function () {
    window.location.href = "dep.html";
};