// localstorage
const LOCAL_STORAGE_LIST_KEY = "todo.lists";
const LOCAL_STORAGE_SELECTED = "todo.selectedList";
let allLists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];
let selectedList = localStorage.getItem(LOCAL_STORAGE_SELECTED);
const listsContainer = document.querySelector(".task-list");
// todo-container (tasks)
const todoCurrentTaskTitle = document.querySelector(".current-todo-tasklist");
const todoCurrentTaskList = document.querySelector(".tasks");
const todoCurrentTaskCounter = document.querySelector(".task-counter");
const todoTaskWrapper = document.querySelector(".todo-list");
const templateTask = document.querySelector(".task-template");
// new list
const addNewListForm = document.querySelector(".add-new-list-form");
const addNewListInput = document.querySelector(".new-list-add");
// new task
const addNewTaskForm = document.querySelector(".new-task form");
const addNewTaskInput = document.querySelector(".new-task-add");
const BtnTaskAdd = document.querySelector(".btn-task");
// del btn
const BtnDeleteList = document.querySelector(".btn-delete-list");
const BtnDeleteTasks = document.querySelector(".btn-clear-completed-tasks");
// dark theme
const BtnThemeToggle = document.querySelector(".theme-toggle");
const prefDarkTheme = window.matchMedia("(prefers-color-scheme: dark)");
let currentTheme = localStorage.getItem("theme");
const bodyMain = document.querySelector("main");
const myLists = document.querySelector(".all-tasks-list");
// Event Listeners

// for toggling the theme to dark
BtnThemeToggle.addEventListener("click", () => {
  currentTheme = localStorage.getItem("theme");
  if (currentTheme !== "dark") {
    darkTheme();
  } else {
    lightTheme();
  }
});

// for adding new lists
addNewListForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newListName = addNewListInput.value;
  if (newListName == null || newListName === "") return;
  const newList = createNewList(newListName);
  addNewListInput.value = null;
  allLists.push(newList);
  saveAndListAddingProcess();
});
// for creating new tasks
addNewTaskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const selectedListElement = allLists.find((el) => el.id === selectedList);
  const taskName = addNewTaskInput.value;
  if (taskName == null || taskName === "") return;
  const task = createNewTask(taskName);
  addNewTaskInput.value = null;
  selectedListElement.tasks.push(task);
  saveAndListAddingProcess();
});

// for ticking off tasks
todoCurrentTaskList.addEventListener("click", (e) => {
  if (e.target.tagName.toLowerCase() === "input") {
    const selectedListElement = allLists.find((el) => el.id === selectedList);
    const selectedTaskElement = selectedListElement.tasks.find(
      (task) => task.id === e.target.id
    );
    selectedTaskElement.complete = e.target.checked;
    save();
    taskCount(selectedListElement);
  }
});

// for highlighting the selected list
listsContainer.addEventListener("click", (e) => {
  if (e.target.tagName.toLowerCase() === "li") {
    selectedList = e.target.id;
    saveAndListAddingProcess();
  }
});
// for deleting the currently-selected list
BtnDeleteList.addEventListener("click", (e) => {
  allLists = allLists.filter((list) => list.id !== selectedList);
  selectedList = null;
  saveAndListAddingProcess();
});

BtnDeleteTasks.addEventListener("click", (e) => {
  const selectedListElement = allLists.find((el) => el.id === selectedList);
  selectedListElement.tasks = selectedListElement.tasks.filter(
    (task) => !task.complete
  );
  saveAndListAddingProcess();
});

// Functions
function listAddingProcess() {
  clearExistingElements(listsContainer);
  listRender();
  const selectedListElement = allLists.find((el) => el.id === selectedList);
  if (selectedList == null) {
    todoTaskWrapper.style.display = "none";
  } else {
    todoTaskWrapper.style.display = "";
    todoCurrentTaskTitle.innerText = selectedListElement.name;
    taskCount(selectedList);
    clearExistingElements(todoCurrentTaskList);
    taskRender(selectedList);
  }
}
// list-rendering
function listRender() {
  allLists.forEach((list) => {
    const listEl = document.createElement("li");
    listEl.id = list.id;
    listEl.classList.add("list-item");
    listEl.innerText = list.name;
    if (listEl.id === selectedList) {
      listEl.classList.add("active-list");
    }
    listsContainer.appendChild(listEl);
  });
}
// task-rendering
function taskRender(selectedList) {
  const selectedListElement = allLists.find((el) => el.id === selectedList);
  // console.log(selectedListElement);
  selectedListElement.tasks.forEach((task) => {
    const newTask = document.importNode(templateTask.content, true);
    const check = newTask.querySelector("input");
    check.id = task.id;
    check.checked = task.complete;
    const label = newTask.querySelector("label");
    label.htmlFor = task.id;
    label.append(task.name);
    todoCurrentTaskList.appendChild(newTask);
  });
}
// task count function with number/phrase modifier
function taskCount(selectedListEl) {
  const selectedListElement = allLists.find((el) => el.id === selectedList);
  const pendingTasks = selectedListElement.tasks.filter(
    (task) => !task.complete
  ).length;
  const taskWordModifier = pendingTasks === 1 ? "task" : "tasks";
  todoCurrentTaskCounter.innerText = `${pendingTasks} ${taskWordModifier} remaining`;
}

// element-clearing
function clearExistingElements(el) {
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
}
// saving func
function save() {
  localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(allLists));
  localStorage.setItem(LOCAL_STORAGE_SELECTED, selectedList);
}
// combination func
function saveAndListAddingProcess() {
  save();
  listAddingProcess();
}
// for creating new lists
function createNewList(name) {
  return {
    id: Date.now().toString(),
    name: name,
    tasks: [],
  };
}
// for creating new tasks
function createNewTask(name) {
  return {
    id: Date.now().toString(),
    name: name,
    complete: false,
  };
}

const darkTheme = () => {
  bodyMain.classList.value = "dark-theme";
  myLists.classList.add("all-tasks-list-dark");
  localStorage.setItem("theme", "dark");
};
const lightTheme = () => {
  bodyMain.classList.value = "";
  myLists.classList.remove("all-tasks-list-dark");
  localStorage.setItem("theme", "light");
};
// check on loading for existing localstorage value
if (currentTheme === "dark") {
  darkTheme();
} else {
  lightTheme();
}

listAddingProcess();
