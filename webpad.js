const editor = document.getElementById("editor");
const toolbar = document.getElementById("toolbar");
const editorContainer = document.getElementById("editor-container");
const progressMessage = document.getElementById("progress-message");
const findModal = document.getElementById("find-replace-modal");

const userKey = "currentUser"; // Key for current user in localStorage
const docsKey = "userDocuments"; // Key for storing all documents in localStorage
let saveTimeout;

// Load Current Document on Page Load
window.onload = () => {
    const currentUser = JSON.parse(localStorage.getItem(userKey));

    if (!currentUser) {
        alert("Please log in to access the WebPad.");
        window.location.href = "index.html"; // Redirect to login page
        return;
    }

    const currentDoc = JSON.parse(localStorage.getItem("currentDoc"));
    if (currentDoc) {
        const allDocs = JSON.parse(localStorage.getItem(docsKey)) || {};
        const userDocs = allDocs[currentUser.email] || [];
        const doc = userDocs.find(doc => doc.title === currentDoc.title);

        if (doc) {
            editor.innerHTML = doc.content;
        }
    }

    toolbar.classList.remove("hidden");
    editorContainer.classList.remove("hidden");
    document.getElementById("options-overlay").classList.add("hidden");
};

//Overlay
function toggleOverlay(show) {
    const overlay = document.getElementById("options-overlay");
    if (show) {
        overlay.classList.remove("hidden");
    } else {
        overlay.classList.add("hidden");
    }
}

// Example: Show overlay on page load if needed
window.onload = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
        toggleOverlay(true);
    }
};


// New Document
function newDocument() {
    document.getElementById("options-overlay").classList.add("hidden");
    toolbar.classList.remove("hidden");
    editorContainer.classList.remove("hidden");
    editor.innerHTML = "";
    localStorage.removeItem("currentDoc");
}

// Navigate to Saved Docs Page
function navigateToSavedDocs() {
    window.location.href = "saveddocs.html";
}

// Logout
function logout() {
    localStorage.removeItem(userKey);
    localStorage.removeItem("currentDoc");
    window.location.href = "index.html";
}

// Save Document
function saveDocument() {
    const currentUser = JSON.parse(localStorage.getItem(userKey));

    if (!currentUser) {
        alert("You must be logged in to save documents.");
        return;
    }

    let currentDoc = JSON.parse(localStorage.getItem("currentDoc"));
    let docName;

    if (currentDoc && currentDoc.title) {
        docName = currentDoc.title;
    } else {
        docName = prompt("Enter document name:");
    }

    if (!docName) {
        alert("Document name is required to save.");
        return;
    }

    const allDocs = JSON.parse(localStorage.getItem(docsKey)) || {};
    const userDocs = allDocs[currentUser.email] || [];
    const existingDocIndex = userDocs.findIndex(doc => doc.title === docName);

    if (existingDocIndex !== -1) {
        userDocs[existingDocIndex].content = editor.innerHTML;
    } else {
        userDocs.push({ title: docName, content: editor.innerHTML });
    }

    allDocs[currentUser.email] = userDocs;
    localStorage.setItem(docsKey, JSON.stringify(allDocs));
    localStorage.setItem("currentDoc", JSON.stringify({ title: docName }));

    showProgressMessage();
}

// Show Progress Message
function showProgressMessage(message = "Saving...") {
    if (!progressMessage) {
        console.error("Progress message element not found in DOM.");
        return;
    }

    progressMessage.innerText = message;
    progressMessage.style.display = "block";

    setTimeout(() => {
        progressMessage.style.display = "none";
    }, 1500); // Show message for 1.5 seconds
}

//Auto-Save (Temporary Draft)
function autoSave() {
    const currentUser = JSON.parse(localStorage.getItem(userKey));
    const currentDoc = JSON.parse(localStorage.getItem("currentDoc"));

    if (!currentUser || !currentDoc) {
        console.warn("Auto-save skipped: No user or document found.");
        return; // Skip auto-save if user or document is missing
    }

    const allDocs = JSON.parse(localStorage.getItem(docsKey)) || {};
    const userDocs = allDocs[currentUser.email] || [];
    const existingDocIndex = userDocs.findIndex(doc => doc.title === currentDoc.title);

    if (existingDocIndex !== -1) {
        // Update the temporary draft for the current doc
        userDocs[existingDocIndex].content = editor.innerHTML;
        allDocs[currentUser.email] = userDocs;
        localStorage.setItem(docsKey, JSON.stringify(allDocs));
    } else {
        console.warn("Auto-save skipped: Document not found in user's saved documents.");
    }
}

// Auto-Save on Input
editor.addEventListener("input", () => {
    clearTimeout(saveTimeout);

    // Wait 2 seconds after the user stops typing
    saveTimeout = setTimeout(() => {
        autoSave(); // Trigger auto-save
        showProgressMessage("Progress saved."); // Show the progress message
    }, 2000); // Delay before saving (2 seconds)
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
    document.execCommand(type === "ul" ? "insertUnorderedList" : "insertOrderedList", false, null);     // Check the type and call the appropriate command
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
    document.execCommand("undo");         // Check the type and call the appropriate command(undo)
}

function redo() {
    document.execCommand("redo");         // Check the type and call the appropriate command(redo)
}

// Find and Replace
function showFindReplace() {
    findModal.classList.remove("hidden");      // Show the find and replace modal
}

function closeFindReplace() {
    findModal.classList.add("hidden");         // Hide the find and replace modal
}

// Find and Replace
function findAndReplace() {
    const findText = document.getElementById("find-input").value;
    const replaceText = document.getElementById("replace-input").value;
    const content = editor.innerHTML;
    const regex = new RegExp(findText, "g");            // Create a regular expression with the find text
    editor.innerHTML = content.replace(regex, replaceText);
    closeFindReplace();
}

function logout() {
  localStorage.removeItem("currentUser"); // Clear user session
  localStorage.removeItem("currentDoc"); // Clear current document
  window.location.href = "LogNSign.html"; // Redirect to login/signup page
}