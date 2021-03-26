import { Project } from './Projects.js'
import { Task } from './Tasks.js'
import { updateActiveProject } from './UI-Tasks.js'


export const allProjects = []
export let activeProject = 0;



export const submitNewProject = (name, description) =>{
    const project = new Project(name, description)
    allProjects.push(project);
    setActiveProject(allProjects.length - 1);
}

export const setActiveProject = (num = 0) => {
    activeProject = num;
    updateActiveProject(num)
}

function getProject(name) {
    return allProjects.find(x => x.name == name)
}

export function deleteProject(index) {
   allProjects.splice(index, 1)
}

export function createNewTask(name, description, dueDate, priority) {
    const task = new Task (name, description, dueDate, priority)
    allProjects[activeProject].addTask(task);
}


window.allProjects = allProjects;
window.createNewTask = createNewTask



