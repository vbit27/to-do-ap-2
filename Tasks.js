export class Task {
    constructor(name, description, dueDate, priority) {
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }

    getName() {
        return this.name;
    }

    getDescription(){
        return this.description;
    }

    getPriority(){
       return this.priority;
    }

    setName(text) {
        this.name = text;
    }

    setDescription(text){
        this.description = text;
    }

    setPriority(text){
        this.priority = text;
    }
}
