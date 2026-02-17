document.addEventListener("DOMContentLoaded", () => {
  const updatedBalance = localStorage.getItem("updatedBalance");
  const withdrawnAmount = localStorage.getItem("withdrawnAmount");
  const transactionTime = localStorage.getItem("transactionTime");
  const selectedBank = localStorage.getItem("selectedBank");

  if (updatedBalance) {
      document.getElementById("available-balance").textContent = `Available Balance: ₹ ${updatedBalance}`;
  }
  if (withdrawnAmount) {
      document.getElementById("withdraw-amount").textContent = `Withdrawn Amount: ₹ ${withdrawnAmount}`;
  }
  if (transactionTime) {
      document.getElementById("transaction-time").textContent = `Transaction Time: ${transactionTime}`;
  }
  if (selectedBank) {
      document.getElementById("bank-name").textContent = `Bank Name: ${selectedBank}`;
  } else {
      console.error("No bank name found in localStorage.");
  }

  const downloadButton = document.querySelector("button.download");
  if (downloadButton) {
      downloadButton.addEventListener("click", generatePDF);
  }
});
function generatePDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Add border
  doc.setDrawColor(0, 0, 0);
  doc.setLineWidth(1);
  doc.rect(10, 10, 190, 277);

  // Title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.setTextColor(0, 0, 128);
  doc.text("Gullak Withdrawal Report", 105, 20, { align: "center" });
  doc.setLineWidth(0.5);
  doc.line(20, 25, 190, 25);

  // Account Details
  doc.setFontSize(18);
  doc.setTextColor(0, 51, 102);
  doc.text("Account Details", 20, 40);
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.text(`Bank Name: ${document.getElementById("bank-name").textContent.split(":")[1].trim()}`, 20, 50);
  doc.text(`Transaction Status: ${document.getElementById("transaction-status").textContent.split(":")[1].trim()}`, 20, 60);

  // Transaction Details
  doc.setFontSize(18);
  doc.setTextColor(0, 51, 102);
  doc.text("Transaction Details", 20, 80);
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  
  // Fix for Withdrawn Amount
  const withdrawnText = document.getElementById("withdraw-amount").textContent;
  const withdrawnAmount = withdrawnText.replace(/[^0-9.]/g, ""); // Remove non-numeric characters
  doc.text(`Withdrawn Amount: ₹${withdrawnAmount}`, 20, 90);

  doc.text(`Available Balance: ₹${document.getElementById("available-balance").textContent.split(":")[1].trim()}`, 20, 100);
  doc.text(`Transaction Time: ${document.getElementById("transaction-time").textContent.split(":")[1].trim()}`, 20, 110);

  // Footer
  doc.setFontSize(16);
  doc.setTextColor(255, 0, 0);
  doc.text("Thank you for using Digital Gullak !", 108, 130, { align: "center" });

  doc.save("Gullak_Withdrawal_Report.pdf");
}


const menuBtn = document.querySelector('#menu-btn');
const closeBtn = document.querySelector('#close-btn');
const sidebar = document.querySelector('aside');

menuBtn.addEventListener('click', () => {
  sidebar.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
  sidebar.style.display = 'none';
});

const themeBtn = document.querySelector('.theme-btn');

themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
  themeBtn.querySelector('span:first-child').classList.toggle('active');
  themeBtn.querySelector('span:last-child').classList.toggle('active');
});

document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll("aside .sidebar a");

  navLinks.forEach(link => {
      link.addEventListener("click", () => {
          navLinks.forEach(item => item.classList.remove("active"));
          link.classList.add("active");
      });
  });
});
