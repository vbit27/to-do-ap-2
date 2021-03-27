
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




// SUBMIT NEW TASK

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
            const taskPriority = document.createElement('h6')
            const taskDueDate = document.createElement('h6')
            const editTaskBtn = document.createElement('button')
            const deleteTaskBtn = document.createElement('button')

            singleTask.classList.add('single-task-container')
            titleContainer.classList.add('task-title-container')
            circle.classList.add('dot')
            taskTitle.innerText = task.name;
            taskDueDate.innerText = task.dueDate;
            taskPriority.innerText = task.priority;
            taskPriority.classList.add('task-priority')
            editTaskBtn.innerText = 'Edit';
            editTaskBtn.classList.add('edit-task')
            deleteTaskBtn.innerText = 'X';
            deleteTaskBtn.classList.add('delete-task')

            titleContainer.appendChild(circle)
            titleContainer.appendChild(taskTitle)
            titleContainer.appendChild(taskPriority)
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
    const taskTitleElements = document.querySelectorAll('.task-title-container');
    const deleteTaskBtn = document.querySelectorAll('.delete-task');
    const editTaskBtn = document.querySelectorAll('.edit-task');
    const editTaskWindow = document.getElementById('edit-task-window');



    function removeTask() {
        const index = Array.from(deleteTaskBtn).indexOf(this)

        this.parentNode.remove()
        allProjects[activeProject].deleteTask(index)
        renderTasks(activeProject)
    }
    
    function updateTaskStatus() {
        const index = Array.from(taskTitleElements).indexOf(this)
        allProjects[activeProject].tasks[index].setStatus()
    }


    // EDIT TASK


    function editTaskInit() {
        const submitEditBtn = document.getElementById('edit-task');

        toggleEditTaskWindow()
        const index = Array.from(editTaskBtn).indexOf(this)

        function editTask(ev) {
            ev.preventDefault();
    
            const name = document.getElementById('edit-task-name').value;
            const description = document.getElementById('edit-task-description').value;
            const dueDate = document.getElementById('edit-task-due-date').value;
            const priority = document.getElementById('edit-priority').value;
            
            allProjects[activeProject].tasks[index].setProperties(name, description, dueDate, priority)

            renderTasks(activeProject)
            editTaskWindow.classList.remove('visible')
        }

        submitEditBtn.addEventListener('click', editTask)
    }


    function toggleEditTaskWindow() {
        editTaskWindow.classList.toggle('visible')
    }



    editTaskBtn.forEach(element => element.addEventListener('click', editTaskInit))
    deleteTaskBtn.forEach(element => element.addEventListener('click', removeTask))
    taskTitleElements.forEach(element => element.addEventListener('click', updateTaskStatus))

}

