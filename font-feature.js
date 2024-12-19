const fontFamily = document.getElementById("font-family");
const fontSize = document.getElementById("font-size");
const fontColor = document.getElementById("font-color");
const fontStyle = document.getElementById("font-style");
const editor = document.getElementById("editor");


fontFamily.addEventListener("change", () => {
  editor.style.fontFamily = fontFamily.value;
});


fontSize.addEventListener("change", () => {
  editor.style.fontSize = fontSize.value;
});


fontColor.addEventListener("input", () => {
  editor.style.color = fontColor.value;
});


fontStyle.addEventListener("change", () => {
  const style = fontStyle.value;

  
  editor.style.fontWeight = "normal";
  editor.style.fontStyle = "normal";
  editor.style.textDecoration = "none";

  
  if (style === "bold") {
    editor.style.fontWeight = "bold";
  } else if (style === "italic") {
    editor.style.fontStyle = "italic";
  } else if (style === "underline") {
    editor.style.textDecoration = "underline";
  }
});