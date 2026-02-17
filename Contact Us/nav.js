// Sidebar Toggle
const menuBtn = document.querySelector("#menu-btn");
const closeBtn = document.querySelector("#close-btn");
const sidebar = document.querySelector("aside");

menuBtn.addEventListener("click", () => {
  sidebar.style.display = "block";
});
closeBtn.addEventListener("click", () => {
  sidebar.style.display = "none";
});

// Theme Toggle
const themeBtn = document.querySelector(".theme-btn");
themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
  themeBtn.querySelector("span:first-child").classList.toggle("active");
  themeBtn.querySelector("span:last-child").classList.toggle("active");
});

// Team Member Data
const teamMembers = [
  {
    name: "Tushar",
    image: "img_tushar.png",
    role: "Backend Developer",
    description: "Backend Developer: Designs APIs, manages databases, and optimizes server performance ⚡🔧, ensuring seamless data flow and system reliability 🔄💾.",
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/tushar",
      github: "https://github.com/tushar",
      twitter: "https://twitter.com/tushar",
      instagram: "https://www.instagram.com/tushar",
    },
  },
  {
    name: "Atharva",
    image: "img_atharva.png",
    role: "Frontend Developer",
    description: "Frontend Developer: Crafts interactive and visually appealing user interfaces 🎨💻, ensuring a smooth and responsive user experience across devices 🖥️📱.",
    socialLinks: {
      linkedin: "https://in.linkedin.com/in/atharva-bhalerao-9607ba312",
      github: "https://github.com/aman",
      twitter: "https://twitter.com/aman",
      instagram: "https://www.instagram.com/_atharvabhalerao_/",
    },
  },
  {
    name: "Sarthak",
    image: "img_sarthak.png",
    role: "UI/UX Designer",
    description: "UI/UX Designer: Creates intuitive and visually engaging designs 🎨🖌️, enhancing user experience through research, wireframes, and prototypes 🧩📐.",
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/ritika",
      github: "https://github.com/ritika",
      twitter: "https://twitter.com/ritika",
      instagram: "https://www.instagram.com/ritika",
    },
  },
  {
    name: "Akib",
    image: "img_akib.png",
    role: "Backend Developer",
    description: "Backend Developer: Builds and maintains the server, database, and application logic ⚙️💻, ensuring everything runs smoothly behind the scenes 🚀🔗.",
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/ritika",
      github: "https://github.com/ritika",
      twitter: "https://twitter.com/ritika",
      instagram: "https://www.instagram.com/ritika",
    },
  },
];

// DOM Elements for Team Section
const profileImage = document.querySelector(".about-img img");
const nameElement = document.querySelector(".about-content h1 span");
const roleElement = document.querySelector(".typing-text span");
const descriptionElement = document.querySelector(".about-content p");
const socialLinks = document.querySelectorAll(".social-icons a");

let currentIndex = 0;

// Function to update team member info
function updateTeamMember() {
  const member = teamMembers[currentIndex];
  profileImage.src = member.image;
  nameElement.textContent = member.name;
  roleElement.textContent = member.role;
  descriptionElement.textContent = member.description;

  socialLinks[0].href = member.socialLinks.linkedin;
  socialLinks[1].href = member.socialLinks.github;
  socialLinks[2].href = member.socialLinks.twitter;
  socialLinks[3].href = member.socialLinks.instagram;

  currentIndex = (currentIndex + 1) % teamMembers.length;
}

// Auto-change every 2 seconds (for demo purposes; adjust as needed)
setInterval(updateTeamMember, 2000);

// Initial load
updateTeamMember();







// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-storage.js";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9ahADS6hdPMraXbzG0jm0uMPVbm8igv8",
  authDomain: "complaint-9e71f.firebaseapp.com",
  databaseURL: "https://complaint-9e71f-default-rtdb.firebaseio.com",
  projectId: "complaint-9e71f",
  storageBucket: "complaint-9e71f.appspot.com",
  messagingSenderId: "572180065730",
  appId: "1:572180065730:web:b0deb782ecbbeefcdffa5b",
  measurementId: "G-7FXJRSG0BV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const storage = getStorage(app);

// DOM Loaded Event
document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ DOM Loaded - JavaScript is Running");

  const complaintSubmit = document.getElementById("complaintSubmit");
  if (!complaintSubmit) {
    console.error("❌ Button with ID 'complaintSubmit' not found.");
    return;
  }

  complaintSubmit.addEventListener("click", async function () {
    console.log("📌 Submit Button Clicked!");

    const category = document.getElementById("complaint-category").value;
    const description = document.getElementById("complaint-description").value;
    const incidentDate = document.getElementById("incident-date").value;
    const followUp = document.getElementById("personal-followup").checked;
    const fileInput = document.getElementById("proof-file");

    if (!category || !description || !incidentDate) {
      alert("⚠️ Please fill in all required fields!");
      return;
    }

    let fileURL = null;
    if (fileInput.files.length > 0) {
      try {
        const file = fileInput.files[0];
        console.log("📂 Uploading File:", file.name);
        const fileRef = storageRef(storage, `complaint_files/${file.name}`);
        await uploadBytes(fileRef, file);
        fileURL = await getDownloadURL(fileRef);
        console.log("✅ File Uploaded Successfully:", fileURL);
      } catch (error) {
        console.error("❌ File Upload Error:", error);
        alert("⚠️ Error uploading file. Please try again.");
        return;
      }
    }

    try {
      const complaintRef = ref(db, "complaints");
      const newComplaintRef = push(complaintRef);
      await set(newComplaintRef, { category, description, incidentDate, followUp, fileURL });

      console.log("✅ Data Stored Successfully in Firebase!");
      alert("✅ Complaint submitted successfully!");

      // Reset form
      document.getElementById("complaint-category").value = "";
      document.getElementById("complaint-description").value = "";
      document.getElementById("incident-date").value = "";
      document.getElementById("proof-file").value = "";
      document.getElementById("personal-followup").checked = false;
    } catch (error) {
      console.error("❌ Database Error:", error);
      alert("⚠️ Error submitting complaint. Please try again.");
    }
  });

  // File selection feedback
  const proofFileInput = document.getElementById("proof-file");
  if (proofFileInput) {
    proofFileInput.addEventListener("change", function () {
      if (this.files.length > 0) {
        alert("📂 Selected file: " + this.files[0].name);
      }
    });
  }
});

