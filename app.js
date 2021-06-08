const listsContainer = document.querySelector("[data-lists]");
const addNewListForm = document.querySelector(".add-new-list-form");
const addNewListInput = document.querySelector(".new-list-add");
const BtnDeleteList = document.querySelector(".btn-delete-list");
const LOCAL_STORAGE_LIST_KEY = "todo.lists";
const LOCAL_STORAGE_SELECTED = "todo.selectedList";
let allLists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];
let selectedList = localStorage.getItem(LOCAL_STORAGE_SELECTED);

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
    console.log(selectedList);
    saveAndListAddingProcess();
  }
});
BtnDeleteList.addEventListener("click", (e) => {
  allLists = allLists.filter((list) => list.id !== selectedList);
  selectedList = null;
  saveAndListAddingProcess();
});

function removeSelectedList() {
  if (listEl.contains.classList(".active-list")) {
  }
}

// Functions
function listAddingProcess() {
  clearExistingElements(listsContainer);
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
  return { id: Date.now().toString(), name: name, tasks: [] };
}

listAddingProcess();
