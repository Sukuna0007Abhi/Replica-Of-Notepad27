const editor = document.getElementById("editor");
const toolbar = document.getElementById("toolbar");
const editorContainer = document.getElementById("editor-container");
const progressMessage = document.getElementById("progress-message");
const findModal = document.getElementById("find-replace-modal");

let saveTimeout;

window.onload = () => {
  const currentDoc = localStorage.getItem("currentDoc");

  if (currentDoc) {
      editor.innerHTML = localStorage.getItem(currentDoc);
      toolbar.classList.remove("hidden");
      editorContainer.classList.remove("hidden");
      document.getElementById("options-overlay").classList.add("hidden");
  }
};


// New Document
function newDocument() {
    document.getElementById("options-overlay").classList.add("hidden");
    toolbar.classList.remove("hidden");
    editorContainer.classList.remove("hidden");
    editor.innerHTML = "";
}

// Navigate to Saved Docs Page
function navigateToSavedDocs() {
    window.location.href = "saveddocs.html";
}

// Logout
function logout() {
    window.location.href = "index.html";
}

// Save Document with Auto-Save
function saveDocument() {
    const docName = "Untitled"; // Update to include a proper naming mechanism
    localStorage.setItem(docName, editor.innerHTML);
    showProgressMessage();
}

// Show Progress Message
function showProgressMessage() {
    progressMessage.style.display = "block";
    setTimeout(() => {
        progressMessage.style.display = "none";
    }, 1000);
}

// Auto-Save on Input
editor.addEventListener("input", () => {
    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(saveDocument, 2000);
});

// Formatting Commands
function execCommand(command) {
    document.execCommand(command, false, null);
}

function changeFontStyle(font) {
    document.execCommand("fontName", false, font);
}

function changeFontSize(size) {
    document.execCommand("fontSize", false, size);
}

function changeFontColor(color) {
    document.execCommand("foreColor", false, color);
}

function insertList(type) {
    document.execCommand(type === "ul" ? "insertUnorderedList" : "insertOrderedList", false, null);
}

// Insert Table
function insertTable() {
    const rows = 2, cols = 2; // Default 2x2 table
    let table = "<table border='1'>";
    for (let i = 0; i < rows; i++) {
        table += "<tr>";
        for (let j = 0; j < cols; j++) {
            table += "<td>&nbsp;</td>";
        }
        table += "</tr>";
    }
    table += "</table>";
    editor.innerHTML += table;
}

// Undo and Redo
function undo() {
    document.execCommand("undo");
}

function redo() {
    document.execCommand("redo");
}

// Find and Replace
function showFindReplace() {
    findModal.classList.remove("hidden");
}

function closeFindReplace() {
    findModal.classList.add("hidden");
}

function findAndReplace() {
    const findText = document.getElementById("find-input").value;
    const replaceText = document.getElementById("replace-input").value;
    const content = editor.innerHTML;
    const regex = new RegExp(findText, "g");
    editor.innerHTML = content.replace(regex, replaceText);
    closeFindReplace();
}

function saveDocument() {
  const docName = localStorage.getItem("currentDoc") || prompt("Enter document name:");

  if (docName) {
      localStorage.setItem(docName, editor.innerHTML);
      localStorage.setItem("currentDoc", docName); // Save the current doc name for future edits
      showProgressMessage();
  } else {
      alert("Document name is required to save.");
  }
}
