import { submitNewProject } from './Manager.js'



const addProjectBtn = document.getElementById('add-project')
const submitProjectBtn = document.getElementById('submit-project')


// Add Project toggle window

function toggleAddProject() {
    const submitProjectWindow = document.getElementById('submit-project-window')
    submitProjectWindow.classList.toggle('visible');
}


// Submit a new Project

const submitProject = (ev) => {  
    const name = document.getElementById('project-name').value;
    const description = document.getElementById('project-description').value;

    if (name && description) {
    submitNewProject(name, description);
    document.forms[0].reset();
    }
}



submitProjectBtn.addEventListener('click', submitProject)
addProjectBtn.addEventListener('click', toggleAddProject)
