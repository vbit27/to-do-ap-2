import { Task } from './Tasks.js'


export class Project  {
    constructor(name, description) {
        this.name = name;
        this.description = description;
        this.tasks = [];
        this.tasksDone = [];
    }

    getName() {
        return this.name;
    }

    getDescription(){
        return this.description;
    }

    setName(text) {
        this.name = text;
    }

    setDescription(text) {
        this.description = text; 
    }

    addTask(task) {
       this.tasks.push(task)
    }

    getTask(taskName) {
        return this.tasks.find(x = x.getName() === taskName)
    }

    deleteTask(name) {
        const taskToDelete = getTask(name)
        this.tasks.splice(this.tasks.indexOf(taskToDelete), 1)
    }
}

