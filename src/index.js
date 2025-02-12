import "./styles.css";
import Tasks from "./tasks.js"

const taskExample1 = new Tasks("title-example", "due-date-example", "decription-example", "high-example", "default-example")
const taskExample2 = new Tasks("title-example", "due-date-example", "decription-example", "high-example", "default-example")
const taskExample3 = new Tasks("title-example", "due-date-example", "decription-example", "high-example", "default-example")

const allTasks = Tasks.returnAllTask();
const taskDisplay = document.querySelector("#content-projects")

allTasks.forEach((task, index) => {
    let taskDOM = Tasks.returnTaskDOM(task, index)
    taskDisplay.appendChild(taskDOM)
});

