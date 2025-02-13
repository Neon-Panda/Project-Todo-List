import "./styles.css";
import Tasks from "./tasks.js"
import { compareAsc } from 'date-fns';

const taskExample1 = new Tasks("title-example", new Date(1990, 10, 10), "decription-example", "high-example", "default")
const taskExample2 = new Tasks("title-example", new Date(1990, 10, 10), "decription-example", "high-example", "default")
const taskExample3 = new Tasks("title-example", new Date(1990, 10, 10), "decription-example", "high-example", "default")
const taskExample4 = new Tasks("title-example", new Date(1990, 10, 10), "decription-example", "high-example", "default")
const taskExample5 = new Tasks("title-example", new Date(1990, 10, 10), "decription-example", "high-example", "test")
const taskExample6 = new Tasks("title-example", new Date(1990, 10, 10), "decription-example", "high-example", "test")

refreshDisplay()
taskButtonEvents()

function refreshDisplay(project="default") {
    const allTasks = Tasks.returnAllTask();
    let filteredTask = []
    switch(project) {
        case "showOverdue":
            filteredTask = allTasks.filter((task) => task.overdue)
            break
        case "showCompleted":
            filteredTask = allTasks.filter((task) => task.completed)
            break
        case "showAll":
            filteredTask = allTasks
            break
        default:
            filteredTask = allTasks.filter((task) => task.project === project)
            break
    }
    const taskDisplay = document.querySelector("#content-projects")
    taskDisplay.innerHTML = ""
    filteredTask.forEach((task, index) => {
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

function compareDate() {
    const allTask = Tasks.returnAllTask()
    allTask.forEach(task => {
        Tasks.checkOverdue(task)
    });
}
compareDate()
