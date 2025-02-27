
// JavaScript Variables, Data Types, and Operators Usage
const darkModeBtn = document.getElementById("toggleDarkMode");
let isDarkMode = false;

darkModeBtn.addEventListener("click", function () {
    isDarkMode = !isDarkMode; // Toggle Boolean
    document.body.classList.toggle("dark-mode", isDarkMode);
});

// Smooth Scrolling for Navigation
document.querySelectorAll("nav ul li a").forEach(link => {
    link.addEventListener("click", function (event) {
        event.preventDefault();
        let targetId = this.getAttribute("href").substring(1);
        let targetSection = document.getElementById(targetId);
        window.scrollTo({
            top: targetSection.offsetTop - 50,
            behavior: "smooth"
        });
    });
});

// Read More / Read Less Feature
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".read-more").forEach(button => {
        button.addEventListener("click", function () {
            let content = this.previousElementSibling;
            let fullText = allNews.find(news => news.title === content.previousElementSibling.textContent).content;

            if (this.textContent === "Read More") {
                content.textContent = fullText;
                this.textContent = "Read Less";
            } else {
                content.textContent = fullText.substring(0, 100) + "...";
                this.textContent = "Read More";
            }
        });
    });
});
