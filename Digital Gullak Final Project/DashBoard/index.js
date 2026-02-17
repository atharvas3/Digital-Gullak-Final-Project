import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// ✅ Firebase Configuration (Same as in your save function)
const firebaseConfig = {
    apiKey: "AIzaSyCDy2cwVvh6tqnG-SMZtQGvRiduMyVgoo0",
    authDomain: "main-deposit.firebaseapp.com",
    projectId: "main-deposit",
    storageBucket: "main-deposit.appspot.com",
    messagingSenderId: "218637599339",
    appId: "1:218637599339:web:54b63213eb19cb7936672e"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// ✅ Function to fetch and display data
async function fetchInvestments() {
    console.log("Fetching investments..."); // Debugging log
    const usersRef = ref(database, 'users');

    try {
        const snapshot = await get(usersRef);
        if (snapshot.exists()) {
            let investments = Object.entries(snapshot.val());

            // Sort users by ID in descending order
            investments.sort((a, b) => parseInt(b[0]) - parseInt(a[0]));

            let sortedData = investments.map(item => item[1]);

            console.log("Fetched Data:", sortedData);
            alert(sortedData.fname);
            displayInvestments(sortedData);
        } else {
            console.warn("No investments found.");
            document.getElementById('investment-container').innerHTML = "<p>No investments available.</p>";
        }
    } catch (error) {
        console.error("Error fetching investments:", error);
    }
}

// ✅ Function to display investments in HTML
function displayInvestments(investments) {
    const container = document.getElementById('investment');
    if (!container) return;

    container.innerHTML = ""; // Clear previous data

    investments.forEach((investment) => {
        const investmentHTML = `
            <div class="investment">
                <img src="${investment.profileImg || 'default.jpg'}" alt="Investor" class="progImg">
                <h4 class="invName">${investment.fname} ${investment.lname}</h4>
                <div class="date-time">
                    <p>${investment.date || 'N/A'}</p>
                    <small class="text-muted">${investment.time || 'N/A'}</small>
                </div>
                <div class="bonds">
                    <p>${investment.duration || 'N/A'}</p>
                    <small class="text-muted">Bond</small>
                </div>
                <div class="amount">
                    <h4>$${investment.amount || '0.00'}</h4>
                    <small class="success">+${investment.growthRate || '0.00'}%</small>
                </div>
            </div>
        `;
        container.innerHTML += investmentHTML;
    });

    console.log("Investments displayed successfully.");
}


// ✅ Load investments when the page loads
document.addEventListener("DOMContentLoaded", fetchInvestments);


// Initialize Chart.js
const chartCanvas = document.querySelector('#chart')?.getContext('2d');
if (chartCanvas) {
    new Chart(chartCanvas, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
            datasets: [
                {
                    label: 'Deposit',
                    data: [1796, 1908, 1936, 1895, 1836, 1807, 1765, 1710, 1660, 1632, 1768, 1822, 1928, 1881],
                    borderColor: 'green',
                    borderWidth: 2
                },
                {
                    label: 'Withdrawal',
                    data: [2688, 2922, 3282, 2728, 1940, 2071, 2679, 2554, 3328, 3572, 2294, 2194, 3585, 2677],
                    borderColor: 'blue',
                    borderWidth: 2
                }
            ]
        },
        options: {
            responsive: true
        }
    });
}

// Sidebar Toggle
document.querySelector('#menu-btn')?.addEventListener('click', () => {
    document.querySelector('aside')?.classList.add('show');
});

document.querySelector('#close-btn')?.addEventListener('click', () => {
    document.querySelector('aside')?.classList.remove('show');
});

// Theme Toggle
document.querySelector('.theme-btn')?.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');

    document.querySelector('.theme-btn span:first-child')?.classList.toggle('active');
    document.querySelector('.theme-btn span:last-child')?.classList.toggle('active');
});

// Update profile pictures and names dynamically
const mainPhoto = document.getElementById("mainPhoto")?.src;
const mainName = document.getElementById("mainName")?.innerText;

if (mainPhoto) {
    document.querySelectorAll(".progImg").forEach(img => img.src = mainPhoto);
}
if (mainName) {
    document.querySelectorAll(".invName").forEach(name => name.innerText = mainName);
}
