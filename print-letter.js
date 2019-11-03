"use strict";

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("insert-letter-output-text-here").innerHTML = JSON.parse(sessionStorage.getItem("letter-output"));
  }, false);
