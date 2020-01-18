//import {templateType} from "/main.js"

// This converts JSON sessionStorage letter and prints it onto letter.html after submitted on index.html
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("insert-letter-output-text-here").innerHTML = JSON.parse(sessionStorage.getItem("letter-output"));
  }, false);

// CTA Actions
// send email button
if (document.getElementById("button-send")) {
  document.getElementById("button-send").onclick = () => {
    let htmlLetterContent = document.getElementById("insert-letter-output-text-here").innerHTML;
    let formattedContent = htmlLetterContent.replace(/<br>/g, "%0D%0A") // converts all instance of <br> with mailto appropriate line breaks
     document.getElementById("test-mail").href=`mailto:test?subject=Parking%20ticket%20appeal&body=${formattedContent}`;
  }
}

// copy to clipboard function
function copyDivToClipboard() {
  var range = document.createRange();
  range.selectNode(document.getElementById("insert-letter-output-text-here"));
  window.getSelection().removeAllRanges(); // clear current selection
  window.getSelection().addRange(range); // to select text
  document.execCommand("copy");
  window.getSelection().removeAllRanges(); // to deselect
}

// copy to clipboard event listener
if (document.getElementById("button-copy")) {
  document.getElementById("button-copy").onclick = () => {
    copyDivToClipboard();
    let copyInput = document.querySelector('input[name="copy"]')
    // Success message & styling
    copyInput.value ="✅ Copied!";
    copyInput.classList.remove("button-cta-letter:hover");
    copyInput.classList.add("button-success");
    setTimeout(function() {
      // to reset cta to original state
      copyInput.classList.add(".button-cta-letter:hover");
      copyInput.classList.remove("button-success");
      copyInput.value ="👯 Copy To Clipboard";
    }, 2000);

  }
}

// print
if (document.getElementById("button-print")) {
  document.getElementById("button-print").onclick = () => {
    window.print();
  }
}
