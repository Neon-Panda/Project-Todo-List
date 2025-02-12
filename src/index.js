import "./styles.css";
import Tasks from "./tasks.js"

const taskExample1 = new Tasks("title-example", "due-date-example", "decription-example", "high-example", "default-example")
const taskExample2 = new Tasks("title-example", "due-date-example", "decription-example", "high-example", "default-example")
const taskExample3 = new Tasks("title-example", "due-date-example", "decription-example", "high-example", "default-example")
const taskExample4 = new Tasks("title-example", "due-date-example", "decription-example", "high-example", "default-example")
const taskExample5 = new Tasks("title-example", "due-date-example", "decription-example", "high-example", "default-example")
const taskExample6 = new Tasks("title-example", "due-date-example", "decription-example", "high-example", "default-example")

refreshDisplay()
taskButtonEvents()

function refreshDisplay() {
    const allTasks = Tasks.returnAllTask();
    const taskDisplay = document.querySelector("#content-projects")
    taskDisplay.innerHTML = ""
    allTasks.forEach((task, index) => {
    task.uniqueID = index
    const taskDOM = Tasks.returnTaskDOM(task, index)
    taskDisplay.appendChild(taskDOM)
    }
)};

function taskButtonEvents() {
    const projectsDisplayElem = document.querySelector("#content-projects")     
    projectsDisplayElem.addEventListener("click", event => {
    const buttonDataset = event.target.dataset.taskBtn
    switch(buttonDataset) {
        case "delete":
            const taskElem = event.target.parentElement.parentElement.parentElement
            const indexOfTask = taskElem.dataset.indexNum
            Tasks.deleteTask(indexOfTask)
            refreshDisplay()
        case "edit":
            break
        default:
            break
    }
    })
}

function taskModal() {
    const modalElem = document.querySelector("#modal")
    const addTaskBtn = document.querySelector("#add-task")

    addTaskBtn.addEventListener("click", event => {
        modalElem.showModal()
    })
}
taskModal()

function addTask() {
    const form = document.querySelector("#form")
    form.addEventListener("submit", event => {
        console.log("test")
        const title = form.querySelector("#form-title").value
        const due = form.querySelector("#form-due-date").value
        const description = form.querySelector("#form-description").value
        const priority = form.querySelector("input[name='priority']:checked").value
        console.log(title, due, description, priority)
        new Tasks(title, due, description, priority, "default-example")
        refreshDisplay()
    })
}
addTask()