import "./styles.css";
import Tasks from "./tasks.js"

const taskExample1 = new Tasks("title-example", "due-date-example", "decription-example", "high-example", "default-example")
const taskExample2 = new Tasks("title-example", "due-date-example", "decription-example", "high-example", "default-example")
const taskExample3 = new Tasks("title-example", "due-date-example", "decription-example", "high-example", "default-example")
console.log(Tasks.returnAllTask())

