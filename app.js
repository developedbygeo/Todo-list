// localstorage
const LOCAL_STORAGE_LIST_KEY = "todo.lists";
const LOCAL_STORAGE_SELECTED = "todo.selectedList";
let allLists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];
let selectedList = localStorage.getItem(LOCAL_STORAGE_SELECTED);
const listsContainer = document.querySelector(".task-list");
// todo-container (tasks)
const todoCurrentContainer = document.querySelector(".todo-list");
const todoCurrentTaskList = document.querySelector(".current-todo-tasklist");
const todoCurrentTaskCounter = document.querySelector(".task-counter");
const todoTaskWrapper = document.querySelector(".todo-list");
// new list
const addNewListForm = document.querySelector(".add-new-list-form");
const addNewListInput = document.querySelector(".new-list-add");
// del btn
const BtnDeleteList = document.querySelector(".btn-delete-list");

// Event Listeners

// for adding new list
addNewListForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newListName = addNewListInput.value;
  if (newListName == null || newListName === "") return;
  const newList = createNewList(newListName);
  addNewListInput.value = null;
  allLists.push(newList);
  saveAndListAddingProcess();
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

// Functions
function listAddingProcess() {
  clearExistingElements(listsContainer);
  listRender();
  const selectedListElement = allLists.find((el) => el.id === selectedList);
  if (selectedList == null) {
    todoTaskWrapper.style.display = "none";
  } else {
    todoTaskWrapper.style.display = "";
    todoCurrentTaskList.innerText = selectedListElement.name;
    taskCount(selectedList);
  }
}
function taskCount(selectedList) {
  console.log(selectedList);
  const pendingTasks = selectedList.tasks.filter(
    (task) => !task.complete
  ).length;
  const taskWordModifier = pendingTasks === 1 ? "task" : "tasks";
  todoCurrentTaskCounter.innerText = `${pendingTasks} ${taskWordModifier} remaining`;
}

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

function clearExistingElements(el) {
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
}
function save() {
  localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(allLists));
  localStorage.setItem(LOCAL_STORAGE_SELECTED, selectedList);
}
function saveAndListAddingProcess() {
  save();
  listAddingProcess();
}

function createNewList(name) {
  return { id: Date.now().toString(), name: name, tasks: ["test1"] };
}

listAddingProcess();
