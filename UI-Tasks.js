
import { activeProject, allProjects, createNewTask } from './Manager.js'

// TOGGLE ADD TASK WINDOW

const addTaskButton = document.querySelector('.add-task');
const addTaskWindow = document.getElementById('submit-task-window');

function toggleAddTaskWindow() {
    if (allProjects.length) {
    addTaskWindow.classList.toggle('visible');
    } else alert('Please add a project first')
}

addTaskButton.addEventListener('click', toggleAddTaskWindow)



// Set active project title and description

export function updateActiveProject(index) {
    updateProjectTitle(index);
    renderTasks(index);
}




//  UPDATE CURRENT PROJECT TITLE ABOVE TASKS

const updateProjectTitle = (index) => {
    const activeProjectDetails = document.querySelector('.active-project-description')
    activeProjectDetails.innerHTML = ''

    if (allProjects.length) {

        const activeTitle = document.createElement('h3');
        activeTitle.innerText = allProjects[index].name;

        const activeDescription = document.createElement('h5');
        activeDescription.innerText = allProjects[index].description;

        activeProjectDetails.appendChild(activeTitle)
        activeProjectDetails.appendChild(activeDescription)
    }
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
    toggleAddTaskWindow()
}


submitTaskButton.addEventListener('click', submitTask)



// Render tasks inside of project

function renderTasks(index) {
    const taskContainer = document.querySelector('.task-list-container')
    taskContainer.innerHTML = '';

    if(allProjects.length && allProjects[index].tasks.length) {
        for (let task of allProjects[index].tasks) {
            const singleTask = document.createElement('div')
            const titleContainer = document.createElement('div')
            const circle = document.createElement('span')
            const taskTitle = document.createElement('h5')
            const taskDueDate = document.createElement('h6')
            const editTaskBtn = document.createElement('button')
            const deleteTaskBtn = document.createElement('button')

            singleTask.classList.add('single-task-container')
            titleContainer.classList.add('task-title-container')
            circle.classList.add('dot')
            taskTitle.innerText = task.name;
            taskDueDate.innerText = task.dueDate;
            editTaskBtn.innerText = 'Edit';
            editTaskBtn.classList.add('edit-task')
            deleteTaskBtn.innerText = 'X';
            deleteTaskBtn.classList.add('delete-task')

            titleContainer.appendChild(circle)
            titleContainer.appendChild(taskTitle)
            titleContainer.appendChild(taskDueDate)
            singleTask.appendChild(titleContainer)
            singleTask.appendChild(editTaskBtn)
            singleTask.appendChild(deleteTaskBtn)
            taskContainer.appendChild(singleTask)
        }

        setListenersToTaks();
    }

}


// ADD TASK FUNCTIONALITIES 


function setListenersToTaks() {
    
    const taskElements = document.querySelectorAll('.task-title-container');
    const deleteTaskBtn = document.querySelectorAll('.delete-task');
    const editTaskBtn = document.querySelector('.edit-task');
    const editTaskWindow = document.getElementById('edit-task-window');
    const submitEditBtn = document.getElementById('edit-task');

    console.log(editTaskBtn)
    console.log(editTaskWindow)

    // get index of current task
    let index = Array.from(deleteTaskBtn).indexOf(this)
    console.log(allProjects[activeProject].tasks[index])


    function removeTask() {
        this.parentNode.remove()

        allProjects[activeProject].deleteTask(index)

        renderTasks(activeProject)
    }
    
    function updateTaskStatus() {
        allProjects[activeProject].tasks[index].setStatus()
    }


    // EDIT TASK

    function editTask(ev) {
        ev.preventDefault();

        const name = document.getElementById('edit-task-name').value;
        const description = document.getElementById('edit-task-description').value;
        const dueDate = document.getElementById('edit-task-due-date').value;
        const priority = document.getElementById('edit-priority').value;

        allProjects[activeProject].tasks[index]
                .setName(name)
                .setDescription(description)
                .setDueDate(dueDate)
                .setPriority(priority)


        renderTasks(activeProject)
        toggleAddTaskWindow()
    }


    function toggleEditTaskWindow() {
        editTaskWindow.classList.toggle('visible')
    }


    submitEditBtn.addEventListener('click', editTask)
    editTaskBtn.addEventListener('click', toggleEditTaskWindow)
    deleteTaskBtn.forEach(element => element.addEventListener('click', removeTask))
    taskElements.forEach(element => element.addEventListener('click', updateTaskStatus))
}

