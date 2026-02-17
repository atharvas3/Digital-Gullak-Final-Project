document.getElementById("cancel-btn").addEventListener("click", () => {
  document.getElementById("withdraw-input").value = "";
  document.getElementById("withdraw-amount").textContent = "₹ 0.00";

  const bankSelect = document.querySelector("#bank-dropdown select");
  if (bankSelect) {
      bankSelect.selectedIndex = 0;
  }

  const selectedAccount = document.getElementById("selected-account");
  if (selectedAccount) {
      selectedAccount.innerHTML = `<i class="fas fa-check-circle"></i> Primary Bank Account`;
  }

  alert("Form reset successfully.");
});

let availableBalance = 458.78;
const withdrawInput = document.getElementById("withdraw-input");
const withdrawAmountField = document.getElementById("withdraw-amount");

if (withdrawInput) {
  withdrawInput.addEventListener("input", () => {
      const withdrawAmount = parseFloat(withdrawInput.value);
      withdrawAmountField.textContent = !isNaN(withdrawAmount) && withdrawAmount > 0 ? `₹ ${withdrawAmount.toFixed(2)}` : "₹ 0.00";
  });
}

const bankDropdown = document.getElementById("bank-dropdown");
const selectedAccount = document.getElementById("selected-account");
const bankSelect = document.querySelector("#bank-dropdown select");

if (bankSelect) {
  bankSelect.addEventListener("change", () => {
      const selectedBank = bankSelect.value;
      if (selectedAccount) {
          selectedAccount.innerHTML = `<i class="fas fa-check-circle"></i> ${selectedBank}`;
      }
      localStorage.setItem("selectedBank", selectedBank);
  });
}

document.getElementById("add-beneficiary").addEventListener("click", (event) => {
  event.preventDefault();
  if (bankDropdown) {
      bankDropdown.style.display = bankDropdown.style.display === "block" ? "none" : "block";
  }
});

document.getElementById("confirm-btn").addEventListener("click", (event) => {
  event.preventDefault();
  const withdrawAmount = parseFloat(withdrawInput.value);

  if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
      alert("Please enter a valid withdrawal amount.");
      return;
  }

  if (withdrawAmount <= availableBalance) {
      availableBalance -= withdrawAmount;
      document.getElementById("available-balance").textContent = `₹ ${availableBalance.toFixed(2)} AVAILABLE BALANCE`;
      localStorage.setItem("updatedBalance", availableBalance.toFixed(2));
      localStorage.setItem("withdrawnAmount", withdrawAmount.toFixed(2));
      localStorage.setItem("transactionTime", new Date().toLocaleString());

      const loader = document.createElement("div");
      loader.id = "loader";
      loader.style.position = "fixed";
      loader.style.top = "0";
      loader.style.left = "0";
      loader.style.width = "100%";
      loader.style.height = "100%";
      loader.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
      loader.style.display = "flex";
      loader.style.justifyContent = "center";
      loader.style.alignItems = "center";
      loader.style.color = "#fff";
      loader.style.fontSize = "24px";
      loader.style.zIndex = "9999";
      loader.innerHTML = `<div>Processing your request...</div>`;
      document.body.appendChild(loader);

      setTimeout(() => {
          window.location.href = "success.html";
      }, 5000);
  } else {
      alert("Insufficient balance to complete the withdrawal.");
  }
});

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