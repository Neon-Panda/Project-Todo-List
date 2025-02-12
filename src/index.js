import "./styles.css";
import Tasks from "./tasks.js"

const taskExample1 = new Tasks("title-example", "due-date-example", "decription-example", "high-example", "default-example")
const taskExample2 = new Tasks("title-example", "due-date-example", "decription-example", "high-example", "default-example")
const taskExample3 = new Tasks("title-example", "due-date-example", "decription-example", "high-example", "default-example")

const allTasks = Tasks.returnAllTask();
console.log(allTasks)

const taskDisplay = document.querySelector("#content-projects")
console.log(taskDisplay)

allTasks.forEach((element, index) => {
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

    itemSpanTitle.textContent = element.title
    itemSpanDue.textContent = element.due
    itemSpanPriority.textContent = element.priority
    itemDescription.textContent = element.description
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

    console.log(itemList)
    taskDisplay.appendChild(itemList)
});