function loadSavedDocs() {
    const savedDocsContainer = document.getElementById("saved-docs-container");

    // Clear any existing content
    savedDocsContainer.innerHTML = "";

    const keys = Object.keys(localStorage);

    // Filter keys to only include document-related items
    const docKeys = keys.filter((key) => !key.includes("@") && key !== "currentDoc");

    if (docKeys.length === 0) {
        savedDocsContainer.innerHTML = "<h2>No documents saved yet.</h2>";
        return;
    }

    docKeys.forEach((key) => {
        const content = localStorage.getItem(key);

        // Create elements to display the document
        const docCard = document.createElement("div");
        docCard.className = "doc-card";

        const docTitle = document.createElement("h3");
        docTitle.textContent = key;

        const docContent = document.createElement("div");
        docContent.className = "doc-content";
        docContent.innerHTML = content.substring(0, 100) + "..."; // Show a snippet of the content

        const viewButton = document.createElement("button");
        viewButton.textContent = "View Document";
        viewButton.onclick = () => openDocument(key);

        docCard.appendChild(docTitle);
        docCard.appendChild(docContent);
        docCard.appendChild(viewButton);

        savedDocsContainer.appendChild(docCard);
    });
}

function openDocument(docName) {
    // Redirect to WebPad and load the specific document
    localStorage.setItem("currentDoc", docName);
    window.location.href = "webpad.html";
}

// Load saved documents when the page loads
window.onload = loadSavedDocs;
