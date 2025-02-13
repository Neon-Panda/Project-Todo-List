import "./styles.css";
import Tasks from "./tasks.js"
import { compareAsc } from 'date-fns';


class Display {
    static refreshDisplayContent(project="default") {
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
    )}

    static taskButtonEvents() {
        const projectsDisplayElem = document.querySelector("#content-projects")     
        projectsDisplayElem.addEventListener("click", event => {
        const buttonDataset = event.target.dataset.taskBtn
        switch(buttonDataset) {
            case "delete":
                const taskElem = event.target.parentElement.parentElement.parentElement
                const indexOfTask = taskElem.dataset.indexNum
                Tasks.deleteTask(indexOfTask)
                Local.saveLocalStorage()
                Display.refreshDisplayContent()
            case "edit":
                break
            default:
                break
            }
        })
    }

    static taskModal() {
        const modalElem = document.querySelector("#modal-form")
        const addTaskBtn = document.querySelector("#add-task")

        addTaskBtn.addEventListener("click", event => {
            modalElem.showModal()
        })
    }

    static addTask() {
        const form = document.querySelector("#form")
        form.addEventListener("submit", event => {
            const title = form.querySelector("#form-title").value
            form.querySelector("#form-title").value = ""
            const due = form.querySelector("#form-due-date").value
            form.querySelector("#form-due-date").value = ""
            const description = form.querySelector("#form-description").value
            form.querySelector("#form-description").value = ""
            const priority = form.querySelector("input[name='priority']:checked").value
            const project = form.querySelector("#form-select-project").value
            new Tasks(title, due, description, priority, project)
            Display.refreshDisplayContent()
            Local.saveLocalStorage()
        })
    }

    static projectModal() {
        const modalElem = document.querySelector("#modal-add-project")
        const addProjectBtn = document.querySelector("#add-project")

        addProjectBtn.addEventListener("click", event => {
            modalElem.showModal()
        })
    }

    static addProject() {
        const form = document.querySelector("#project-form")
        form.addEventListener("submit", event => {
            const input = form.querySelector("#project-name").value
            form.querySelector("#project-name").value = ""
            Tasks.projects.push(input)

            Display.addProjectsToForm()
            Display.refreshProjectsDisplay()
            Local.saveLocalStorage()
        })
    }

    static refreshProjectsDisplay() {
        const allProjects = Tasks.projects
        const addProjectBtn = document.querySelector("#add-project")
        allProjects.forEach(project => {
            let newProject = document.createElement("button")
            newProject.classList.add("sidebar-button")
            newProject.dataset.navBtn = project
            newProject.textContent = project
            addProjectBtn.parentNode.insertBefore(newProject, addProjectBtn)
        });
    }

    static addProjectsToForm() {
        const formProjectDropdown = document.querySelector("#form-select-project")
        const allProjects = Tasks.projects

        allProjects.forEach(project => {
            const option = document.createElement("option")
            option.setAttribute("value", project)
            option.textContent = project
            formProjectDropdown.appendChild(option)
        });
    }

    static navButtonEvents() {
        const navButtons = document.querySelector("#sidebar")
        navButtons.addEventListener("click", event => {
            const buttonsDataset = event.target.dataset.navBtn
            switch(buttonsDataset) {
                case "all":
                    Display.refreshDisplayContent("showAll")
                    break
                case "completed":
                    Display.refreshDisplayContent("showCompleted")
                    break
                case "overdue":
                    Display.refreshDisplayContent("showOverdue")
                    break
                case "add-project":
                    break
                case "project-default":
                    Display.refreshDisplayContent("default")
                    break
                default:
                    Display.refreshDisplayContent(buttonsDataset)
                    break
            }
        })
    }
}

class Local {
    static saveLocalStorage() {
        const allTasksStringify = JSON.stringify(Tasks.allTask)
        const projectsStringify = JSON.stringify(Tasks.projects)
        localStorage.setItem("allTasks", allTasksStringify)
        localStorage.setItem("projects", projectsStringify)
    }

    static loadLocalStorage() {
        const allTasksParse = JSON.parse(localStorage.getItem("allTasks"))
        const projectsParse = JSON.parse(localStorage.getItem("projects"))
        Tasks.allTask = allTasksParse
        Tasks.projects = projectsParse
    }
}

Local.loadLocalStorage()
Tasks.compareDate()
Display.refreshDisplayContent()
Display.taskButtonEvents()
Display.taskModal()
Display.projectModal()
Display.addTask()
Display.navButtonEvents()
Display.addProject()


console.log(Tasks.returnAllTask())
