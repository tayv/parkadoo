import {allRadiosArray} from "./radio-buttons.js";

// MODULE FOR AUTOSAVING TEXT, TEXT AREA, RADIOS
// Sessionstorage is reset but clicked "RESET" in bottom nav link

// TO SAVE TO SESSIONSTORAGE
const autosaveText = () => {
  document.querySelectorAll("input[type='text']").forEach(function(element) {
    if (element.value != sessionStorage["element.value"]) {
      sessionStorage.setItem(element.id, element.value);
    }
  });
  document.querySelectorAll("textarea").forEach(function(element) {
    if (element.value != sessionStorage["element.value"]) {
      sessionStorage.setItem(element.id, element.value);
    }
  });
};

// Adds value of checked radio buttons to sessionStorage to be used by initSavedAnswers() in main.js
const autosaveRadio = (radioArrayParam) => {
  radioArrayParam.forEach(function(radioClass) {
    radioClass.forEach(function(element) {
      // if radio is checked then we want to save it in sessionStorage to retrieve if pg reloads
      if (element.checked) {
        sessionStorage.setItem(element.name, element.value );
      }
    });
  });
}

// FOR USE ON MAIN.JS ON WINDOW LOAD TO INIT ANY ANSWERS SAVED TO SESSIONSTORAGE
const initSavedAnswers = () => {
  // update textarea fields with autosave value
  document.querySelectorAll("textarea").forEach(function(element) {
    // use elementID to access input value in sessionStorage
    let elementID = element.id;
    // check to make sure it's not undefined and there is an autosave value to use
    if ((sessionStorage[elementID] != undefined) && (element.value != sessionStorage["element.value"])) {
      // update the text field with the autosaved value
      element.value = sessionStorage[elementID];
    }
  });

  // update standard text fields with autosave value
  document.querySelectorAll("input[type='text']").forEach(function(element) {
    // use elementID to access input value in sessionStorage
    let elementID = element.id;
    // check to make sure it's not undefined and there is an autosave value to use
    if ((sessionStorage[elementID] != undefined) && (element.value != sessionStorage["element.value"])) {
      // update the text field with the autosaved value
      element.value = sessionStorage[elementID];
    }
  });

  // update radio buttons with autosave value
  allRadiosArray.forEach(function(radioClass) {
    radioClass.forEach(function(element) {
      // use elementID to access input value in sessionStorage
      let elementName = element.name;
      // check to make sure it's not undefined and that current element radio is an autosave value to use
      if (sessionStorage[elementName] != undefined && sessionStorage[elementName] == element.value) {
        // set radiobutton to checked to match autosaved value
        element.checked = true;
      }
    });
  });
}

export {autosaveText, autosaveRadio, initSavedAnswers};
