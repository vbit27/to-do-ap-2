
import { activeProject, allProjects, createNewTask } from './Manager.js'

// Set active project title and description

export function updateActiveProject(index) {
    updateProjectTitle(index);
    renderTasks(index)

}


// Update title of current project above tasks

const updateProjectTitle = (index) => {
    const activeProjectDetails = document.querySelector('.active-project-description')


    if (allProjects.length) {
        activeProjectDetails.innerHTML = ''

        const activeTitle = document.createElement('h3');
        activeTitle.innerText = allProjects[index].name;

        const activeDescription = document.createElement('h5');
        activeDescription.innerText = allProjects[index].description;

        activeProjectDetails.appendChild(activeTitle)
        activeProjectDetails.appendChild(activeDescription)
    } else {
        activeProjectDetails.innerHTML = ''
    }
}

const addTaskButton = document.querySelector('.add-task');

addTaskButton.addEventListener('click', addNewTask)


function addNewTask() {

}



// Submit new task

const submitTaskButton = document.getElementById('submit-task');


function submitTask(ev) {
    ev.preventDefault();

    const name = document.getElementById('task-name').value;
    const description = document.getElementById('task-description').value;
    const dueDate = document.getElementById('task-due-date').value;
    const priority = document.getElementById('priority').value;

    
    createNewTask(name, description, dueDate, priority)
    renderTasks(activeProject)
}


submitTaskButton.addEventListener('click', submitTask)



// Render tasks inside of project

function renderTasks(index) {
    const taskContainer = document.querySelector('.task-list-container')
    taskContainer.innerHTML = '';

    if(allProjects[index].tasks.length) {
        for (let task of allProjects[index].tasks) {
            const singleTask = document.createElement('div')
            singleTask.classList.add('task')

            const circle = document.createElement('span')
            circle.classList.add('dot')

            const taskTitle = document.createElement('div')
            taskTitle.innerText = task.name
            console.log(this)

            singleTask.appendChild(circle)
            singleTask.appendChild(taskTitle)
            taskContainer.appendChild(singleTask)
        }
    }

}