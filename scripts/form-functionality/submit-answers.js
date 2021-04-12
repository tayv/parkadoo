import {loadLetter} from "/scripts/form-content/set-template.js";
import {templateType} from "/scripts/main.js";
import {setLetterTemplate} from "/scripts/letter-builder.js";

//sessionstorage used instead of localstorage so that answer data only persists during current browser session

// SUBMIT BUTTON
  // Using sessionStorage to save user answers
document.getElementById("button-submit").onclick = () => {
  try {
      let storage = window.sessionStorage || {};
      // Sanitize user input data
      let templateDataDirty = setLetterTemplate(templateType); // So that we display the correct letter with up to date variables in letter.html
      let templateDataClean = DOMPurify.sanitize(templateDataDirty);
      // Store data
      sessionStorage.setItem("letter-output", JSON.stringify(templateDataClean));
      // Retrieving data done in letter.html header script on page load

  } catch (e) {
      let storage = {};
      // Chrome doesn't allow sessStorage when 3rd party cookies are blocked.
      alert(e.message, "Sorry, looks like I'm blocked from saving and displaying your answers because your browser doesn't allow 3rd party cookies in your advanced browser settings.");
  }

  // To load the correct html letter template using form.action
  loadLetter(templateType);
};
