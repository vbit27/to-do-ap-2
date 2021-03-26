import { submitNewProject, allProjects, activeProject, setActiveProject, deleteProject } from './Manager.js'
import { updateActiveProject } from './UI-Tasks.js'

const submitProjectBtn = document.getElementById('submit-project')
const projectList = document.getElementById('project-list');




// Add Project toggle window

const addProjectBtn = document.getElementById('add-project')
const submitProjectWindow = document.querySelector('.submit-project-window')


function toggleSubmitProjectWindow() {
    submitProjectWindow.classList.toggle('visible');

}

addProjectBtn.addEventListener('click', toggleSubmitProjectWindow)

// Submit a new project

const submitProject = (ev) => {  
    ev.preventDefault();
    
    const name = document.getElementById('project-name').value;
    const description = document.getElementById('project-description').value;

    if (name && description) {
    submitNewProject(name, description);
    document.forms[0].reset();
    }

    toggleSubmitProjectWindow()
    renderProjct();
}


// Render projects inside container

function renderProjct() {
    projectList.innerHTML = '';

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

    setListenersToProject();
}



// ADD PROJECT FUNCTIONALITIES 

function setListenersToProject(){
    const projectElements = document.querySelectorAll('.single-project-container h3')
    const deleteProjectBtn = document.querySelectorAll('.delete-project-btn');

    function removeProject() {
        let index = Array.from(deleteProjectBtn).indexOf(this)
        this.parentNode.remove()
        
        deleteProject(index);
        setActiveProject()
        renderProjct()
    }

    // update active project after being clicked
    function updateActiveProject() {
        let index = Array.from(projectElements).indexOf(this)
        setActiveProject(index)
    }

    projectElements.forEach(x => x.addEventListener('click', updateActiveProject))
    deleteProjectBtn.forEach(x => x.addEventListener('click', removeProject))
};


submitProjectBtn.addEventListener('click', submitProject)
