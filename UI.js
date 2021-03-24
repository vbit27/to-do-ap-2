import { submitNewProject, allProjects, activeProject, setActiveProject } from './Manager.js'


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
    singleProjectContainer.classList.add('project-element');

    const projectTitle = document.createElement('h3')
    projectTitle.innerText = project.name;

    singleProjectContainer.appendChild(projectTitle)
    projectList.appendChild(singleProjectContainer);
    }

    getProjectElement();

}

// Clear Project list 

function clearProjects() {
    projectList.innerHTML = '';
}


// Set Active Project

let projectEl;


function getProjectElement(){
    projectEl = document.querySelectorAll('.project-element h3');
    setEventListenerProjects()
};


function setEventListenerProjects () {
    projectEl.forEach(function(x) {
        x.addEventListener('click', function(e){
            updateActiveProject(e)
        })
    })
}



function updateActiveProject(e) {
    // check index of the clicked item using its content
    const clickedElement = (element) => element.innerText === e.target.innerText;

    let index = Array.from(projectEl).findIndex(clickedElement)

    setActiveProject(index)
 }




/*
function setEventListenerProjects () {
    projectEl.forEach(function(x) {
        x.addEventListener('click', function(e){
            updateActiveProject(e)
        })
    })
}


function updateActiveProject(e) {
   let selectedProject = e.target.innerText
   allProjects.findIndex('')
}

*/











submitProjectBtn.addEventListener('click', submitProject)
addProjectBtn.addEventListener('click', toggleAddProject)
