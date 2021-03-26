
import { activeProject, allProjects, createNewTask } from './Manager.js'

// Set active project title and description

export function updateActiveProject(index) {
    updateProjectTitle(index);
    renderTasks(index);


}




//  UPDATE CURRENT PROJECT TITLE ABOVE TASKS

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

//addTaskButton.addEventListener('click', addNewTask)





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
    setListenersToTaks();

}


submitTaskButton.addEventListener('click', submitTask)



// Render tasks inside of project

function renderTasks(index) {
    const taskContainer = document.querySelector('.task-list-container')
    taskContainer.innerHTML = '';

        if(allProjects.length && allProjects[index].tasks.length) {
            for (let task of allProjects[index].tasks) {
                const singleTask = document.createElement('div')
                const circle = document.createElement('span')
                const taskTitle = document.createElement('div')
                const editTaskBtn = document.createElement('button')
                const deleteTaskBtn = document.createElement('button')

                singleTask.classList.add('task')
                circle.classList.add('dot')
                taskTitle.innerText = task.name
                editTaskBtn.innerText = 'Edit';
                editTaskBtn.classList.add('edit-task')
                deleteTaskBtn.innerText = 'X';
                deleteTaskBtn.classList.add('delete-task')

                singleTask.appendChild(circle)
                singleTask.appendChild(taskTitle)
                singleTask.appendChild(editTaskBtn)
                singleTask.appendChild(deleteTaskBtn)
                taskContainer.appendChild(singleTask)
            }
        }

}


// ADD TASK FUNCTIONALITIES 

function setListenersToTaks() {
    const taskElements = document.querySelectorAll('.task-list-container .task')
    const deleteTaskBtn = document.querySelectorAll('.delete-task')
    const editTaskBtn = document.querySelectorAll('.edit-task')


    function removeTask() {
        this.parentNode.remove()
    
        let index = Array.from(deleteTaskBtn).indexOf(this)
        allProjects[activeProject].removeTask(index)
    
        renderTasks(activeProject)
        setListenersToTaks()
    }
    
    function updateTaskStatus() {
        let index = Array.from(taskElements).indexOf(this)
        allProjects[activeProject].tasks[index].setStatus()
    }


    deleteTaskBtn.forEach(element => element.addEventListener('click', removeTask))
    taskElements.forEach(element => element.addEventListener('click', updateTaskStatus))
}

