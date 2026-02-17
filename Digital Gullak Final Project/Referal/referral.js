import { db, ref, set, get, update } from "./firebase-config.js";

// Generate a unique referral code
function generateReferralCode() {
    return Math.random().toString(36).substr(2, 8).toUpperCase();
}

// Save referral code and track referred users
function saveReferral() {
    const username = prompt("Enter your name:").trim();
    if (!username) return alert("Username is required!");

    const referralCode = generateReferralCode();
    const userRef = ref(db, "referrals/" + referralCode);

    set(userRef, {
        username: username,
        referralCode: referralCode,
        referredUsers: [], // List of users who use this code
    }).then(() => {
        document.getElementById("referralCode").textContent = referralCode;
        document.getElementById("copyReferral").style.display = "inline-block";

        document.getElementById("copyReferral").onclick = () => {
            navigator.clipboard.writeText(referralCode);
            alert("Referral code copied!");
        };
    }).catch(error => {
        console.error("Error saving referral:", error);
    });
}

// Apply a referral code and track users
function applyReferral() {
    const username = prompt("Enter your name:").trim();
    if (!username) return alert("Username is required!");

    const referralCode = document.getElementById("inputReferral").value.trim();
    if (!referralCode) return alert("Please enter a referral code!");

    const refPath = ref(db, "referrals/" + referralCode);

    get(refPath).then(snapshot => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            const updatedReferredUsers = data.referredUsers || [];
            updatedReferredUsers.push(username); // Add new user to referral list

            update(refPath, { referredUsers: updatedReferredUsers }).then(() => {
                alert("Referral applied successfully!");

                // Display who referred you
                document.getElementById("referredBy").textContent = `Referred by: ${data.username}`;
            });
        } else {
            alert("Invalid referral code.");
        }
    });
}

// Show referred users list
function showReferredUsers() {
    const referralCode = document.getElementById("inputReferral").value.trim();
    if (!referralCode) return alert("Enter your referral code first!");

    const refPath = ref(db, "referrals/" + referralCode);

    get(refPath).then(snapshot => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            const usersList = data.referredUsers || [];
            
            let listHTML = usersList.length > 0 
                ? usersList.map(user => `<li>${user}</li>`).join("")
                : "<li>No users referred yet.</li>";

            document.getElementById("referredUsersList").innerHTML = listHTML;
        } else {
            alert("Invalid referral code.");
        }
    });
}

// Attach event listeners
document.getElementById("generateReferral").addEventListener("click", saveReferral);
document.getElementById("applyReferral").addEventListener("click", applyReferral);
document.getElementById("showReferredUsers").addEventListener("click", showReferredUsers);







//Navbar theme change

// show or hide sidebar //

const menuBtn = document.querySelector('#menu-btn');
const closeBtn = document.querySelector('#close-btn');
const sidebar = document.querySelector('aside');

menuBtn.addEventListener('click', () => {
    sidebar.style.display = 'block';
})
closeBtn.addEventListener('click', () => {
    sidebar.style.display = 'none';
})

// change theme //
const themeBtn = document.querySelector('.theme-btn');

themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');

    themeBtn.querySelector('span:first-child').classList.toggle('active');
    themeBtn.querySelector('span:last-child').classList.toggle('active');
})

