// Show or Hide Sidebar
const menuBtn = document.querySelector("#menu-btn");
const closeBtn = document.querySelector("#close-btn");
const sidebar = document.querySelector("aside");

menuBtn.addEventListener("click", () => {
    sidebar.style.display = "block";
});
closeBtn.addEventListener("click", () => {
    sidebar.style.display = "none";
});

// Change Theme
const themeBtn = document.querySelector(".theme-btn");
themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    themeBtn.querySelector("span:first-child").classList.toggle("active");
    themeBtn.querySelector("span:last-child").classList.toggle("active");
});

// Loan Calculator
const loanAmountInput = document.querySelector(".loan-amount");
const loanTenureInput = document.querySelector(".loan-tenure");
const calculateBtn = document.querySelector(".calculate-btn");

const loanEMIValue = document.querySelector(".loan-emi .value");
const totalInterestValue = document.querySelector(".total-interest .value");
const totalAmountValue = document.querySelector(".total-amount .value");

let myChart;

document.getElementById("rate").disabled = true; // Disabling input since rate is fixed at 2%

const checkValues = () => {
    let regexNumber = /^[0-9]+$/;
    if (!loanAmountInput.value.match(regexNumber)) {
        loanAmountInput.value = "100";
    }
    if (!loanTenureInput.value.match(regexNumber)) {
        loanTenureInput.value = "12";
    }
};

const refreshInputValues = () => {
    let loanAmount = parseFloat(loanAmountInput.value);
    let loanTenure = parseFloat(loanTenureInput.value);
    let interestRate = 2; // Fixed 2% per month
    return { loanAmount, loanTenure, interestRate };
};

const calculateEMI = () => {
    checkValues();
    let { loanAmount, loanTenure, interestRate } = refreshInputValues();

    // Correct Interest Calculation
    let totalInterest = (loanAmount * interestRate * loanTenure) / 100;

    // EMI Calculation (Principal + Total Interest divided by tenure)
    let emi = (loanAmount * totalInterest/loanAmount )/loanTenure;

    // Total amount payable
    let totalAmountPayable = loanAmount + totalInterest;

    return { emi, totalInterest, totalAmountPayable };
};

const displayChart = (totalInterest) => {
    const ctx = document.getElementById("myChart").getContext("2d");
    myChart = new Chart(ctx, {
        type: "pie",
        data: {
            labels: ["Total Interest", "Principal Loan Amount"],
            datasets: [
                {
                    data: [totalInterest, parseFloat(loanAmountInput.value)],
                    backgroundColor: ["#e63946", "#14213d"],
                    borderWidth: 0,
                },
            ],
        },
    });
};

const updateChart = (totalInterest) => {
    myChart.data.datasets[0].data[0] = totalInterest;
    myChart.data.datasets[0].data[1] = parseFloat(loanAmountInput.value);
    myChart.update();
};

const updateData = ({ emi, totalInterest, totalAmountPayable }) => {
    loanEMIValue.innerHTML = `${Math.round(emi)}`;
    totalAmountValue.innerHTML = `${Math.round(totalAmountPayable)}`;
    totalInterestValue.innerHTML = `${Math.round(totalInterest)}`;

    if (myChart) {
        updateChart(totalInterest);
    } else {
        displayChart(totalInterest);
    }
};

const init = () => {
    let result = calculateEMI();
    updateData(result);
};

init();
calculateBtn.addEventListener("click", init);

