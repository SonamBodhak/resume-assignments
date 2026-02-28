class ResumeBuilder extends HTMLElement {

    static get observedAttributes() {
        return ["data", "config"];
    }

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    attributeChangedCallback() {
        this.render();
    }

    render() {

        if (!this.getAttribute("data")) return;

        const data = JSON.parse(this.getAttribute("data"));
        const config = JSON.parse(this.getAttribute("config") || "{}");

        this.shadowRoot.innerHTML = "";

        // Bootstrap link inside shadow
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css";
        this.shadowRoot.appendChild(link);

        // Resume Container
        const resume = document.createElement("section");
        resume.className = config.resumeClass || "d-flex flex-column p-4 bg-white";
        resume.style.width = "210mm";
        resume.style.height = "297mm";
        resume.style.fontSize = "11pt";

        // HEADER
        const header = document.createElement("div");
        header.className = config.headerClass || "d-flex align-items-center mb-3";
        header.style.height = "40mm";

        const img = document.createElement("img");
        img.src = data.profilePicture;
        img.style.height = "35mm";
        img.style.width = "35mm";
        img.style.objectFit = "cover";
        img.className = "rounded-circle me-3";

        const info = document.createElement("div");
        info.className = "d-flex flex-column";

        const name = document.createElement("h2");
        name.textContent = data.name;
        name.style.fontSize = "18pt";

        const line = document.createElement("p");
        line.textContent = data.profileLine;
        line.style.fontSize = "12pt";

        const contact = document.createElement("p");
        contact.textContent = `${data.email} | ${data.mobile}`;
        contact.style.fontSize = "10pt";

        info.append(name, line, contact);
        header.append(img, info);

        resume.appendChild(header);

        // DESCRIPTION
        const descTitle = document.createElement("h5");
        descTitle.textContent = "Profile";
        descTitle.className = config.sectionTitleClass || "fw-bold mt-3";

        const desc = document.createElement("p");
        desc.textContent = data.description;

        resume.append(descTitle, desc);

        // SKILLS
        const skillTitle = document.createElement("h5");
        skillTitle.textContent = "Skills";
        skillTitle.className = config.sectionTitleClass;

        const skillDiv = document.createElement("div");
        skillDiv.className = "d-flex flex-wrap gap-2";

        data.skills.forEach(skill => {
            const span = document.createElement("span");
            span.textContent = skill;
            span.className = "badge bg-secondary";
            skillDiv.appendChild(span);
        });

        resume.append(skillTitle, skillDiv);

        // EDUCATION
        const eduTitle = document.createElement("h5");
        eduTitle.textContent = "Education";
        eduTitle.className = config.sectionTitleClass;

        resume.appendChild(eduTitle);

        data.education.forEach(edu => {
            const div = document.createElement("div");
            div.className = "mb-2";

            div.innerHTML = `
                <strong>${edu.course.degree} - ${edu.course.name}</strong><br>
                ${edu.university.name}<br>
                ${edu.startDate} - ${edu.endDate}
            `;
            resume.appendChild(div);
        });

        // PROJECTS
        const projTitle = document.createElement("h5");
        projTitle.textContent = "Projects";
        projTitle.className = config.sectionTitleClass;

        resume.appendChild(projTitle);

        data.projects.forEach(project => {
            const div = document.createElement("div");
            div.className = "mb-2";

            const title = document.createElement("strong");
            title.textContent = project.title;

            const details = document.createElement("p");
            details.textContent = project.detailsOfProject;

            div.append(title, details);
            resume.appendChild(div);
        });

        // SOCIAL LINKS
        const socialTitle = document.createElement("h5");
        socialTitle.textContent = "Social Links";
        socialTitle.className = config.sectionTitleClass;

        const socialDiv = document.createElement("div");
        socialDiv.className = "d-flex gap-3";

        data.socialLinks.forEach(linkData => {
            const a = document.createElement("a");
            a.href = linkData.profileUrl;
            a.textContent = linkData.socialSite;
            a.target = "_blank";
            socialDiv.appendChild(a);
        });

        resume.append(socialTitle, socialDiv);

        this.shadowRoot.appendChild(resume);
    }
}

customElements.define("resume-builder", ResumeBuilder);