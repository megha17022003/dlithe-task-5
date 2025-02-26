// ** Toggle Dark Mode **
const darkModeBtn = document.getElementById("toggleDarkMode");
const body = document.body;

// Store dark mode preference in localStorage
let isDarkMode = localStorage.getItem("darkMode") === "true";

const toggleDarkMode = () => {
    isDarkMode = !isDarkMode;
    body.classList.toggle("dark-mode", isDarkMode);
    localStorage.setItem("darkMode", isDarkMode);
};

// Apply stored dark mode preference
if (isDarkMode) body.classList.add("dark-mode");

darkModeBtn.addEventListener("click", toggleDarkMode);

// ** Smooth Scrolling for Navigation **
document.querySelectorAll("nav ul li a").forEach(link => {
    link.addEventListener("click", (event) => {
        event.preventDefault();
        let targetId = link.getAttribute("href").substring(1);
        let targetSection = document.getElementById(targetId);
        targetSection.scrollIntoView({ behavior: "smooth" });
    });
});

// ** Dynamic Skills Display **
const skills = [
    "C", "C++", "Java", "Python", "Web Development (MERN Stack)",
    "Cybersecurity & Ethical Hacking", "Machine Learning with Python"
];

const skillsList = document.querySelector("#skills ul");

const displaySkills = () => {
    skillsList.innerHTML = "";
    skills.forEach(skill => {
        let li = document.createElement("li");
        li.textContent = skill;
        skillsList.appendChild(li);
    });
};

displaySkills();

// ** Read More / Read Less Feature **
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".read-more").forEach(button => {
        button.addEventListener("click", function () {
            let content = this.previousElementSibling;
            let fullText = content.dataset.fullText;

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

// ** Toggle Skills Visibility **
const toggleSkillsBtn = document.createElement("button");
toggleSkillsBtn.textContent = "Toggle Skills";
document.querySelector("#skills").appendChild(toggleSkillsBtn);

toggleSkillsBtn.addEventListener("click", () => {
    skillsList.classList.toggle("hidden");
    toggleSkillsBtn.textContent = skillsList.classList.contains("hidden") ? "Show Skills" : "Hide Skills";
});

// ** Console Log Profile Info **
const profile = {
    name: "Megha Shettygarthi",
    title: "AI & Data Science Student | Web Developer | Cybersecurity Enthusiast",
    email: "meghashettygarthi322@gmail.com",
    linkedIn: "https://www.linkedin.com/in/megha-shettygarthi-887369280",
    displayInfo() {
        console.log(`Name: ${this.name}\nTitle: ${this.title}\nEmail: ${this.email}\nLinkedIn: ${this.linkedIn}`);
    }
};

profile.displayInfo();

// ** Dynamic Projects List with Add & Remove Feature **
let projects = JSON.parse(localStorage.getItem("projects")) || [
    { name: "Contact Management System", tech: "Python" },
    { name: "Academic Pro", tech: "Web App" },
    { name: "Online Blood Service System", tech: "Full Stack" }
];

const projectList = document.querySelector("#projects ul");

// ** Display Projects **
const displayProjects = () => {
    projectList.innerHTML = projects.length === 0 ? "<p>No projects added.</p>" : projects.map((project, index) => `
        <li>
            ${project.name} (${project.tech})
            <button class="remove-project" data-index="${index}">❌ Remove</button>
        </li>
    `).join("");

    localStorage.setItem("projects", JSON.stringify(projects));
};

// ** Add Project Functionality **
document.getElementById("addProjectForm").addEventListener("submit", (event) => {
    event.preventDefault();
    
    let projectName = document.getElementById("projectName").value.trim();
    let projectTech = document.getElementById("projectTech").value.trim();

    if (!projectName || !projectTech) {
        alert("Please fill in all fields.");
        return;
    }

    projects.push({ name: projectName, tech: projectTech });
    displayProjects();
    event.target.reset();
});

// ** Remove Project Functionality **
projectList.addEventListener("click", (event) => {
    if (event.target.classList.contains("remove-project")) {
        let index = event.target.dataset.index;
        projects.splice(index, 1);
        displayProjects();
    }
});

// ** Initialize Projects on Page Load **
displayProjects();
