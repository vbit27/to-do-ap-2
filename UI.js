import { submitNewProject, allProjects } from './Manager.js'


const addProjectBtn = document.getElementById('add-project')
const submitProjectBtn = document.getElementById('submit-project')
const projectList = document.getElementById('project-list');


// Add Project toggle window

function toggleAddProject() {
    //const submitProjectWindow = 
    document.getElementById('submit-project-window').classList.toggle('visible')
   // submitProjectWindow.;
}


// Submit a new project

const submitProject = (ev) => {  
    const name = document.getElementById('project-name').value;
    const description = document.getElementById('project-description').value;

    if (name && description) {
    submitNewProject(name, description);
    document.forms[0].reset();
    }
    renderProjct()
}


// Render projects inside list

function renderProjct() {
    clearProjects()

    for (let project of allProjects) {
    
    const projectContainer = document.createElement('div')
    const projectTitle = document.createElement('h3')

    projectTitle.innerText = project.name;

    projectContainer.appendChild(projectTitle);
    projectList.appendChild(projectContainer);
    }
}

// Clear Project list 

function clearProjects() {
    projectList.innerHTML = '';
}


submitProjectBtn.addEventListener('click', submitProject)
addProjectBtn.addEventListener('click', toggleAddProject)
