"use strict";

// This converts JSON sessionStorage letter and prints it onto letter.hmtl after submitted on index.html
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("insert-letter-output-text-here").innerHTML = JSON.parse(sessionStorage.getItem("letter-output"));
  }, false);
