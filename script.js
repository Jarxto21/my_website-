const projects = [
    {
        id: "autonomous-turret",
        number: "01",
        title: "Autonomous Turret",
        shortDescription: "A mechatronic system combining sensing, control logic, and mechanical actuation.",
        summary: "A project exploring autonomous targeting and motion control through the integration of hardware, software, and mechanical design.",
        tags: ["C++", "Arduino", "CAD", "Control Systems"],
        overview: "Describe the engineering problem, what you were trying to achieve, and why the design was chosen.",
        process: [
            "Define system requirements and constraints.",
            "Develop the mechanical layout and electronics architecture.",
            "Implement sensing, control, and actuation logic.",
            "Prototype, test, measure, and iterate."
        ],
        outcome: "Add your measured results here, such as accuracy, response time, reliability, or other performance metrics.",
        future: "Add the next improvements you would make with more time, testing, or resources."
    },
    {
        id: "robotic-arm",
        number: "02",
        title: "Robotic Arm",
        shortDescription: "A small robotic manipulator designed around precision movement and repeatability.",
        summary: "A robotic arm project focused on kinematics, motor control, structural design, and repeatable positioning.",
        tags: ["Python", "Motors", "Kinematics", "3D Printing"],
        overview: "Explain the task the arm needed to perform and the engineering requirements that shaped the design.",
        process: [
            "Develop the arm geometry and joint layout.",
            "Select actuators and supporting components.",
            "Model the motion and implement control software.",
            "Test repeatability and refine the mechanical system."
        ],
        outcome: "Add the achieved range of motion, payload, repeatability, or other test data here.",
        future: "Describe future changes such as improved gearing, stronger links, better sensing, or closed-loop control."
    },
    {
        id: "renewable-energy-system",
        number: "03",
        title: "Renewable Energy System",
        shortDescription: "A prototype system investigating energy generation, storage, and efficient power use.",
        summary: "A project demonstrating how electrical, mechanical, and environmental constraints interact in a renewable energy system.",
        tags: ["Electronics", "Energy", "Data Logging", "Design"],
        overview: "Introduce the energy problem, the system architecture, and the design constraints.",
        process: [
            "Identify the energy demand and available generation source.",
            "Design the electrical system and storage strategy.",
            "Build a prototype and collect operating data.",
            "Use the data to optimise system performance."
        ],
        outcome: "Add measured power output, efficiency, operating time, or another relevant project metric.",
        future: "Add ideas for scaling the design, improving efficiency, or automating control."
    }
];

const projectGrid = document.getElementById("project-grid");
const modal = document.getElementById("project-modal");
const modalContent = document.getElementById("modal-content");
const year = document.getElementById("year");

year.textContent = new Date().getFullYear();

function createProjectCard(project) {
    const card = document.createElement("article");
    card.className = "project-card";

    card.innerHTML = `
        <span class="project-index">${project.number}</span>
        <h3>${project.title}</h3>
        <p>${project.shortDescription}</p>
        <div class="tag-row">
            ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}
        </div>
        <a class="project-link" href="#project/${project.id}" data-project-id="${project.id}">
            View project →
        </a>
    `;

    card.addEventListener("click", (event) => {
        if (event.target.matches("a")) {
            return;
        }

        openProject(project.id);
    });

    return card;
}

function renderProjects() {
    projectGrid.innerHTML = "";
    projects.forEach(project => {
        projectGrid.appendChild(createProjectCard(project));
    });
}

function openProject(id) {
    const project = projects.find(item => item.id === id);

    if (!project) {
        return;
    }

    modalContent.innerHTML = `
        <div class="modal-header">
            <p class="eyebrow">PROJECT ${project.number}</p>
            <h3 id="modal-title">${project.title}</h3>
            <p class="modal-summary">${project.summary}</p>
        </div>

        <div class="modal-section">
            <h4>Overview</h4>
            <p>${project.overview}</p>
        </div>

        <div class="modal-section">
            <h4>Engineering Process</h4>
            <ul class="detail-list">
                ${project.process.map(step => `<li>${step}</li>`).join("")}
            </ul>
        </div>

        <div class="modal-section">
            <h4>Technologies</h4>
            <div class="tag-row">
                ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}
            </div>
        </div>

        <div class="modal-section">
            <h4>Outcome</h4>
            <p>${project.outcome}</p>
        </div>

        <div class="modal-section">
            <h4>Future Improvements</h4>
            <p>${project.future}</p>
        </div>
    `;

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");

    if (window.location.hash !== `#project/${id}`) {
        history.pushState(null, "", `#project/${id}`);
    }
}

function closeProject(updateHash = true) {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");

    if (updateHash && window.location.hash.startsWith("#project/")) {
        history.pushState(null, "", "#projects");
    }
}

function handleRoute() {
    const hash = window.location.hash;

    if (hash.startsWith("#project/")) {
        openProject(hash.replace("#project/", ""));
        return;
    }

    if (modal.classList.contains("is-open")) {
        closeProject(false);
    }
}

document.addEventListener("click", (event) => {
    if (event.target.closest("[data-close-modal]")) {
        closeProject();
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("is-open")) {
        closeProject();
    }
});

window.addEventListener("hashchange", handleRoute);

renderProjects();
handleRoute();
