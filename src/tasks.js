export default class Tasks {
    static allTask = [];

    constructor(title, due, description, priority, project) {
        this.title = title
        this.due = due
        this.description = description
        this.priority = priority
        this.project = project
        this.completed = false
        Tasks.allTask.push(this)
    }

    static returnAllTask() {
        return Tasks.allTask
    }
}