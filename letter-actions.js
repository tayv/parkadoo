"use strict";

//import {templateType} from "/main.js"

// This converts JSON sessionStorage letter and prints it onto letter.html after submitted on index.html
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("insert-letter-output-text-here").innerHTML = JSON.parse(sessionStorage.getItem("letter-output"));
  }, false);

/*
function checkIT () {
  if (window.location.href.match("letter.html")) {
    document.getElementById("parking-form-content").removeEventListener("click", clickActiveClass);
  }
}
  console.log(templateType);
  if (templateType == "report abandoned vehicle") {
    document.querySelector("p").textContent = "hi";
  } */
