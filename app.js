const listsContainer = document.querySelector(".task-list");
const addNewListForm = document.querySelector(".add-new-list-form");
const addNewListInput = document.querySelector(".new-list-add");
const LOCAL_STORAGE_LIST_KEY = "todo.lists";
const LOCAL_STORAGE_SELECTED = "todo.selectedList";
let allLists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];
let selectedList = localStorage.getItem(LOCAL_STORAGE_SELECTED);

// Event Listeners
addNewListForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newListName = addNewListInput.value;
  if (newListName == null || newListName === "") return;
  const newList = createNewList(newListName);
  addNewListInput.value = null;
  allLists.push(newList);
  saveAndListAddingProcess();
});

// Functions
function listAddingProcess() {
  clearExistingElements(listsContainer);
  allLists.forEach((list) => {
    const listEl = document.createElement("li");
    listEl.id = list.id;
    listEl.classList.add("list-name");
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
}
function saveAndListAddingProcess() {
  save();
  listAddingProcess();
}

function createNewList(name) {
  return { id: Date.now().toString(), name: name, tasks: [] };
}

listAddingProcess();
