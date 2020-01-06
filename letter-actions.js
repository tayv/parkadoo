"use strict";

//import {templateType} from "/main.js"

// This converts JSON sessionStorage letter and prints it onto letter.html after submitted on index.html
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("insert-letter-output-text-here").innerHTML = JSON.parse(sessionStorage.getItem("letter-output"));
  }, false);

// CTA Actions
function copyDivToClipboard() {
  var range = document.createRange();
  range.selectNode(document.getElementById("insert-letter-output-text-here"));
  window.getSelection().removeAllRanges(); // clear current selection
  window.getSelection().addRange(range); // to select text
  document.execCommand("copy");
    window.getSelection().style.color="red";
  window.getSelection().removeAllRanges(); // to deselect
}

// copy to clipboard
if (document.getElementById("button-copy")) {
  document.getElementById("button-copy").onclick = () => {
    copyDivToClipboard();
    alert("copied");
  }
}

// print
if (document.getElementById("button-print")) {
  document.getElementById("button-print").onclick = () => {
    window.print();
  }
}
