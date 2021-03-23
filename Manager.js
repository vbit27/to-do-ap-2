import { Project } from './Projects.js'
import { Task } from './Tasks.js'


const allProjects = []



const addNewProject = (name, description) =>{
    const project = new Project(name, description)
    allProjects.push(project);
}


function getProject(name) {
    return allProjects.find(x => x.name == name)
}

function deleteProject(name) {
   let index =  allProjects.indexOf(getProject(name))
   allProjects.splice(index, 1)
}

function createNewTask(name, description, dueDate, priority) {
    const task = new Task (name, description, dueDate, priority)
    this.addTask(task);
}


window.allProjects = allProjects;
window.createNewTask = createNewTask

//addNewTask('name', 'is', 'everything')

addNewProject('another', 'one');
addNewProject('another2', 'one');

addNewProject('newst', 'baby');

deleteProject('newst')

for (let projects of allProjects) {
    render(projects)
}

function render (project) {
    var h2 = document.createElement('h2'), markup ='';

    markup += `<a>`
    markup += project.name;
    markup += '</a>';

    h2.innerHTML = markup;

    h2.querySelector('a').addEventListener('click', createNewTask.bind(project))

    document.body.appendChild(h2)

}


const addProjectBtn = document.querySelector('button');

addProjectBtn.addEventListener('click', addNewProject)


window.addProjectBtn = addProjectBtn
