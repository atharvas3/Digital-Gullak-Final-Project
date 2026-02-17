import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyCDy2cwVvh6tqnG-SMZtQGvRiduMyVgoo0",
    authDomain: "main-deposit.firebaseapp.com",
    projectId: "main-deposit",
    storageBucket: "main-deposit.firebasestorage.app",
    messagingSenderId: "218637599339",
    appId: "1:218637599339:web:54b63213eb19cb7936672e"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

function fetchDataForUpdate() {
    const userRef = ref(database, 'users/latestUpdate');
    onValue(userRef, (snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            document.getElementById("fname").value = data.fname || "";
            document.getElementById("lname").value = data.lname || "";
            document.getElementById("date").value = data.date || "";
            document.getElementById("total_balance").value = data.total_balance || "";
            document.getElementById("amount").value = data.amount || "";
            document.getElementById("duration").value = data.duration || "";
            document.getElementById("transaction_id").value = data.transaction_id || "";
        }
    }, (error) => {
        console.error("Error fetching data:", error);
    });
}

function updateFirebase() {
    const updatedData = {
        fname: document.getElementById("fname").value,
        lname: document.getElementById("lname").value,
        date: document.getElementById("date").value,
        total_balance: document.getElementById("total_balance").value,
        amount: document.getElementById("amount").value,
        duration: document.getElementById("duration").value,
        transaction_id: document.getElementById("transaction_id").value
    };
    set(ref(database, 'users/latestUpdate'), updatedData)
        .then(() => {
            alert("Update successful!");
            window.location.href = "index.html";
        })
        .catch((error) => console.error("Error updating data:", error));
}

function resetForm() {
    document.getElementById('f1').reset();
}

// Make functions accessible globally
window.fetchDataForUpdate = fetchDataForUpdate;
window.updateFirebase = updateFirebase;
window.resetForm = resetForm;