import "./styles.css";
import Tasks from "./tasks.js"

const taskExample1 = new Tasks("title-example", "due-date-example", "decription-example", "high-example", "default-example")
const taskExample2 = new Tasks("title-example", "due-date-example", "decription-example", "high-example", "default-example")
const taskExample3 = new Tasks("title-example", "due-date-example", "decription-example", "high-example", "default-example")
const taskExample4 = new Tasks("title-example", "due-date-example", "decription-example", "high-example", "default-example")
const taskExample5 = new Tasks("title-example", "due-date-example", "decription-example", "high-example", "default-example")
const taskExample6 = new Tasks("title-example", "due-date-example", "decription-example", "high-example", "default-example")

const allTasks = Tasks.returnAllTask();
const taskDisplay = document.querySelector("#content-projects")

function refreshDisplay() {
    taskDisplay.innerHTML = ""
    allTasks.forEach((task, index) => {
    task.uniqueID = index
    const taskDOM = Tasks.returnTaskDOM(task, index)
    taskDisplay.appendChild(taskDOM)
    }
)};
refreshDisplay()

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

