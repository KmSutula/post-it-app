const addBtn = document.getElementById("add");
const contentDiv = document.querySelector(".main-container");

//add existing notes to page on load
const notes = JSON.parse(localStorage.getItem("notes"));
if (notes) {
  notes.forEach((note) => addNewNote(note));
}

addBtn.addEventListener("click", () => addNewNote());

function addNewNote(text = "") {
  const notepad = document.createElement("div");
  notepad.classList.add("notepad");
  notepad.innerHTML = `
    <div class="options">
        <select><option>Errand</option>
        <option>Work</option>
        <option>Cooking</option>
        <option>Home</option>
        </select><button class="edit"><i class="fas fa-edit"></i></button>
        <button class="delete"><i class="fas fa-trash-alt"></i></button>
    </div>
      <div class="main ${text ? "" : "hidden"}"></div>
      <textarea class="${text ? "hidden" : ""}">
      </textarea>
      `;
  const editBtn = notepad.querySelector(".edit");
  const deleteBtn = notepad.querySelector(".delete");
  const main = notepad.querySelector(".main");
  const textArea = notepad.querySelector("textarea");

  textArea.value = text;
  main.innerHTML = marked.parse(text);

  deleteBtn.addEventListener("click", () => {
    notepad.remove();
    updateLS();
  });
  editBtn.addEventListener("click", () => {
    main.classList.toggle("hidden");
    textArea.classList.toggle("hidden");
  });

  textArea.addEventListener("input", (e) => {
    const { value } = e.target;

    main.innerHTML = marked.parse(value);

    updateLS();
  });
  notepad.classList.add("here");
  contentDiv.appendChild(notepad);
}
function updateLS() {
  const notesText = document.querySelectorAll("textarea");
  const notes = [];

  notesText.forEach((note) => notes.push(note.value));

  localStorage.setItem("notes", JSON.stringify(notes));
}
