let allLists = [
  {
    id: 1,
    name: "name",
  },
  {
    id: 2,
    name: "name",
  },
];
const listsContainer = document.querySelector(".task-list");

// Functions
function listAddingProcess() {
  clearExistingElements(listsContainer);
  allLists.forEach((list) => {
    const listEl = document.createElement("li");
    listEl.id = list.id;
    listEl.classList.add("list-name");
    listEl.innerText = list.name;
    listsContainer.appendChild(listEl);
  });
}

function clearExistingElements(el) {
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
}

listAddingProcess();
