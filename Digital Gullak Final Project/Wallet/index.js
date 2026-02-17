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


document.addEventListener("DOMContentLoaded", function () {
    const text = "My Wallet"; // Text to display
    const walletHeading = document.getElementById("walletHeading");
    let index = 0;

    function typeWriter() {
        if (index < text.length) {
            walletHeading.innerHTML += text.charAt(index); // Add one character at a time
            index++;
            setTimeout(typeWriter, 150); // Typing speed (in milliseconds)
        } else {
            // Permanently hide the cursor after typing
            walletHeading.classList.add("no-cursor");

            // Optionally restart the animation after a delay
            setTimeout(() => {
                walletHeading.innerHTML = ""; // Clear the text
                walletHeading.classList.remove("no-cursor"); // Reset for next typing
                index = 0; // Reset index
                typeWriter(); // Restart typing
            }, 1000); // Delay before restarting (1 second)
        }
    }

    typeWriter(); // Start the typewriter effect
});

// Get the source of the main photo
let img = document.getElementById("mainPhoto").src;

// Get the inner text of the main name
let name = document.getElementById("mainName").innerText;

// Get all elements with the class "progImg" and set their src property
let progImgs = document.getElementsByClassName("progImg");
for (let i = 0; i < progImgs.length; i++) {
    progImgs[i].src = img; // Update the src property for each element
}

// Get all elements with the class "invName" and set their innerText property
let invNames = document.getElementsByClassName("invName");
for (let i = 0; i < invNames.length; i++) {
    invNames[i].innerText = name; // Update the innerText for each element
}

function redirect(name){
    if(name=="deposit")
    {
        window.location.href="deposit1.html";
    }
    else
    {
        window.location.href="withdraw.html";
    }
}