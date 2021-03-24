import { submitNewProject, allProjects, activeProject, setActiveProject, deleteProject } from './Manager.js'


const addProjectBtn = document.getElementById('add-project')
const submitProjectBtn = document.getElementById('submit-project')
const projectList = document.getElementById('project-list');



// Add Project toggle window

function toggleAddProject() {
    document.getElementById('submit-project-window').classList.toggle('visible')
}


// Submit a new project

const submitProject = (ev) => {  
    const name = document.getElementById('project-name').value;
    const description = document.getElementById('project-description').value;

    if (name && description) {
    submitNewProject(name, description);
    document.forms[0].reset();
    }

    renderProjct();
}


// Render projects inside container

function renderProjct() {
    clearProjects()

    for (let project of allProjects) {
    const singleProjectContainer = document.createElement('div');
    singleProjectContainer.classList.add('single-project-container');

    const projectTitle = document.createElement('h3')
    projectTitle.innerText = project.name;

    const deleteProjectBtn = document.createElement('button');
    deleteProjectBtn.innerText = 'X';
    deleteProjectBtn.classList.add('delete-project-btn')

    singleProjectContainer.appendChild(projectTitle)
    singleProjectContainer.appendChild(deleteProjectBtn)
    projectList.appendChild(singleProjectContainer);
    }

    getProjectElement();
    getDeleteProjectBtn();

}

// Clear Project list 

function clearProjects() {
    projectList.innerHTML = '';
}


// Set Active Project

let allAddedProjects;
let projectDeleteBtn;



function getProjectElement(){
    allAddedProjects = document.querySelectorAll('#project-list div')
    projectDeleteBtn = document.querySelectorAll('.delete-project-btn');

    setEventListenerProjects()
    setEventDelete()
};


function getIndexActiveProject() {
    let index = Array.from(allAddedProjects).indexOf(this)
    console.log(index)
    setActiveProject(index)
}


function setEventListenerProjects () {
    allAddedProjects.forEach(function(x) {
        x.addEventListener('click', getIndexActiveProject)
    })
}



// Delete a project



function removeProject() {
    let index = Array.from(projectDeleteBtn).indexOf(this)
    this.parentNode.remove()
    deleteProject(index)
    setActiveProject()
}

function setEventDelete () {
    projectDeleteBtn.forEach(function(x) {
        x.addEventListener('click', removeProject)
    })
}




submitProjectBtn.addEventListener('click', submitProject)
addProjectBtn.addEventListener('click', toggleAddProject)
