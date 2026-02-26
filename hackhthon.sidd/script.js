// Form Submission Handling
const form = document.querySelector("form");

if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        let name = document.querySelector("input[type='text']").value;
        let email = document.querySelector("input[type='email']").value;

        if (name === "" || email === "") {
            alert("⚠️ Please fill all required fields!");
            return;
        }

        alert("🎉 Registration Successful, " + name + "!");
        form.reset();
    });
}

// Button Click Animation
const btn = document.querySelector(".btn");

if (btn) {
    btn.addEventListener("click", () => {
        btn.innerText = "🚀 Loading...";
        setTimeout(() => {
            btn.innerText = "Register Now";
        }, 1500);
    });
}

// Navbar Highlight Active Page
const links = document.querySelectorAll("nav a");

links.forEach(link => {
    if (link.href === window.location.href) {
        link.style.color = "white";
        link.style.borderBottom = "2px solid #38bdf8";
    }
});