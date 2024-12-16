const notepad = document.getElementById("notepad");
const status = document.getElementById("status");
window.onload = () => {
  const savedContent = localStorage.getItem("notepadContent");
  if (savedContent) {
    notepad.value = savedContent;
    status.textContent = "Content loaded from last session.";
  } else {
    status.textContent = "Start writing; changes will be autosaved.";
  }
};

let typingTimer;
notepad.addEventListener("input", () => {
  status.textContent = "Autosaving...";
  clearTimeout(typingTimer); 
  typingTimer = setTimeout(() => {
    localStorage.setItem("notepadContent", notepad.value);
    status.textContent = "All changes saved.";
  }, 1000); 
});

window.onbeforeunload = () => {
  localStorage.setItem("notepadContent", notepad.value);
};