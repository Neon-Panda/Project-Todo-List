import { format, compareAsc } from "date-fns"
export default class Tasks {
    static allTask = [];
    static projects = [];

    constructor(title, due, description, priority, project) {
        this.title = title
        this.due = due
        this.description = description
        this.priority = priority
        this.project = project
        this.completed = false
        this.overdue = false
        Tasks.allTask.push(this)
    }

    static returnAllTask() {
        return Tasks.allTask
    }

    static deleteTask(index) {
        Tasks.allTask.splice(index, 1)
    }

    static checkOverdue(task) {
        const overdue = compareAsc(task.due, new Date())
        overdue === -1 ? task.overdue = true : task.overdue = false
    }

    static compareDate() {
        const allTask = Tasks.returnAllTask()
        allTask.forEach(task => {
            Tasks.checkOverdue(task)
        });
    }

    static returnTaskDOM(task, index) { 
        let itemList = document.createElement("li")
        let itemInput = document.createElement("input")
        let itemLabel = document.createElement("label")
        let itemSpanTitle = document.createElement("span")
        let itemSpanDue = document.createElement("span")
        let itemSpanPriority = document.createElement("span")
        let itemIcons = document.createElement("div")
        let itemDelteBtn = document.createElement("button")
        let itemEditBtn = document.createElement("button")
        let itemDescriptionDiv = document.createElement("div")
        let itemDescription = document.createElement("span")
    
        itemList.classList.add("task-item")
        itemList.dataset.indexNum = index
        itemInput.type = "checkbox"
        itemInput.id = `toggle${index}`
        itemInput.classList.add("task-input")
        itemLabel.setAttribute("for", `toggle${index}`)
        itemLabel.classList.add("task-visisble")
        itemSpanTitle.classList.add("task-title")
        itemSpanDue.classList.add("task-due")
        itemSpanPriority.classList.add("task-priority")
        itemIcons.classList.add("icons")
        itemDelteBtn.dataset.taskBtn = "delete"
        itemEditBtn.dataset.taskBtn = "edit"
        itemDescriptionDiv.classList.add("task-expand")
    
        itemSpanTitle.textContent = task.title
        itemSpanDue.textContent = format(task.due, "MMMM do yyyy")
        itemSpanPriority.textContent = task.priority
        itemDescription.textContent = task.description
        itemDelteBtn.textContent = "Delete"
        itemEditBtn.textContent = "Edit"
    
        itemIcons.appendChild(itemDelteBtn)
        itemIcons.appendChild(itemEditBtn)
        itemLabel.appendChild(itemSpanTitle)
        itemLabel.appendChild(itemSpanDue)
        itemLabel.appendChild(itemSpanPriority)
        itemLabel.appendChild(itemIcons)
        itemDescriptionDiv.appendChild(itemDescription)
        itemList.appendChild(itemInput)
        itemList.appendChild(itemLabel)
        itemList.appendChild(itemDescriptionDiv)

        if (task.due) itemList.dataset.overdue = true
    
        return itemList
    }
}