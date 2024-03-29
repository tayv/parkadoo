"use strict";

// TO LOAD DEFAULT VISIBILITY CONDITIONS (works)
window.onload = function setDefaultAnswerState() {
  // for newsletter checkbox
//    newsletterCheckbox.checked = false;
  // for parking violation radios
//  hoomanYesRadio.checked = true

  // to display only first step until next button clicked
  buttonVisibility();
};

// To set default answers/visibility. To be used on page load.


/*
// Variable list
const checkboxSection = document.getElementById("checkbox-container"); OLD used in parkingViolationRadioAnswer()

// CB VISIBILITY CONDITION (works)
const newsletterCheckbox = document.getElementById("newsletterSignUp");
// element to be hidden
const ticketDate = document.getElementById("ticket-date");
// run checkbox visibility function
const newsletterCheckboxVisiblity = (function() {
newsletterCheckbox.addEventListener("click", checkboxChanged);
function checkboxChanged() {
  if (newsletterCheckbox.checked === true) {
    ticketDate.style.display = "block";
  } else {
    ticketDate.style.display = "none";
    }
  }
}());

// YN RADIO BUTTON VISIBILITY CONDITION (works)
const ifAHoomanYNRadio = document.getElementById("yn-hooman");
const hoomanYesRadio = document.getElementById("yes-hooman");
const hoomanNoRadio = document.getElementById("no-hooman");
// element to be hidden
const typeOfViolation = document.getElementById("parking-violation-radio");
// run y/n radio button visibility function
const hoomanYNRadioAnswer = (function() {
  ifAHoomanYNRadio.addEventListener("click", radioChangedYN);
  function radioChangedYN() {
    if (hoomanYesRadio.checked === true) {
      typeOfViolation.style.display = "block";
    } else {
      typeOfViolation.style.display = "none";
      }
    }
}());
*/

// To insert text into final output based on selections. May need to change to more specific if statement
function insertText(answerOption) {
  if (answerOption === "1") {
    document.getElementById("insert-text-here").innerHTML = "-insert answer 1 text here-";
  }
  else if (answerOption === "2") {
    document.getElementById("insert-text-here").innerHTML = "-insert answer 2 text here-";
  }
  else if (answerOption === "3") {
    document.getElementById("insert-text-here").innerHTML = "-insert answer 3 text here-";
  }
  else if (answerOption === "4") {
    document.getElementById("insert-text-here").innerHTML = "-insert answer 4 text here-"; // for output letter
  }
};



// Previous/Next/Submit button visiblity and to scroll to next div/step. Needs to be initialized before question specific visibility conditions
const stepsQuestionnaire = document.getElementsByClassName("section-container");
const finishedSectionDiv = document.getElementById("finished-section-container");
const buttonVisibility = function() {
  var count = 0;
  function checkButtonStep() {
    if (count === 0) {
      document.getElementById("button-previous").style.display="none";
      document.getElementById("button-submit").style.display="none";
    } else if (count > 0 && count < stepsQuestionnaire.length - 1) {
        document.getElementById("button-previous").style.display="inline";
        document.getElementById("button-submit").style.display="none";
    } else if (count >= stepsQuestionnaire.length - 1) {
        document.getElementById("button-previous").style.display="none";
        document.getElementById("button-next").style.display="none";
        document.getElementById("button-submit").style.display="block";
    }
  };

  checkButtonStep();

  // To hide all steps other than first and last section by default
  const stepHideByDefault = function() {
    for (var i = 1; i < stepsQuestionnaire.length; i++) {
      stepsQuestionnaire[i].style.display="none";
    }
  };
  stepHideByDefault();

  // To display and hide steps depending on visibility conditions
    const stepMakeVisible = function(...stepToHide) { // Keeping ... in parameter. Removing it causes a bug where the for loop doesn't fire
      for (let i = 0; i < stepToHide.length; i++) {
        if (stepsQuestionnaire[count] === stepToHide[0][i]) { // adding [0] necessary because ...stepToHide makes an array within an array
          if (stepsQuestionnaire[count+1] > stepsQuestionnaire.length) {
            finishedSectionDiv.scrollIntoView(true);
          } else {
              stepsQuestionnaire[count+1].style.display="block";
              stepsQuestionnaire[count+1].scrollIntoView(true);
          }
        } else {
          stepsQuestionnaire[count].style.display="block";
        }
      }
    };

  document.getElementById("button-next").onclick = function() {
    if (count < stepsQuestionnaire.length - 1) {
      count++;
      stepMakeVisible(hideTheseAnswersArray);
    //  applyActiveVisibilityConditions();
      stepsQuestionnaire[count].scrollIntoView(true);
      stepsQuestionnaire[count].style.opacity="1";
      stepsQuestionnaire[count-1].style.opacity="0.2"; // reduce opacity of a completed step so user focus is on current step
      checkButtonStep();
    } else {
        checkButtonStep();
    } return count;
  };

  document.getElementById("button-previous").onclick = function() {
    if (count < 1) {
      checkButtonStep();
    } else if (count >= 1) {
        count--;
        stepsQuestionnaire[count].style.opacity="1";
        stepsQuestionnaire[count+1].style.opacity="0.2";
        stepsQuestionnaire[count].scrollIntoView(true);
        checkButtonStep();
    } return count;
  };
};

// MULTI RADIO BUTTON VISIBILITY CONDITION
// From Stack Overflow (works when class added to radio buttons)
const inputs = document.querySelectorAll(".test-class");

const hideTheseAnswersArray = [];

function updateHideTheseAnswersArray(addItem, subtractItem) { //use undefined when passing the unused parameter. Note that parameters must represent section IDs for stepMakeVisible() to work. Call it x times if need to hide multiple steps.
  function addToHideTheseAnswersArray(addItem) {
    if (hideTheseAnswersArray.indexOf(addItem) === -1 && typeof addItem !== "undefined") { // Need to exclude undefined because one parameter (either addItem or subtractItem) is likely left blank in the original function call
      hideTheseAnswersArray.push(addItem);
    } else {
        // There's already an ${addItem} here. Don't do anything
    }
  }
  addToHideTheseAnswersArray(addItem);

  function subtractFromHideTheseAnswersArray(subtractItem) {
    if (hideTheseAnswersArray.indexOf(subtractItem) > -1 && typeof subtractItem !== "undefined") {
      var arrayIndex = hideTheseAnswersArray.indexOf(subtractItem);
      hideTheseAnswersArray.splice(arrayIndex, 1);
      // subtract ${subtractItem}
      }
  }
  subtractFromHideTheseAnswersArray(subtractItem);
}
/*
function applyActiveVisibilityConditions() {
  if (hideTheseAnswersArray.includes(ticketDate)) {
    ticketDate.style.display = "none";
    // Found ${ticketDate} in the array and will hide the step
  }
  if (hideTheseAnswersArray.includes(checkboxSection)) {
    checkboxSection.style.display = "none";
    // Found ${checkboxSection} in the array and will hide the step
  }
}

const parkingViolationMULTIRadioAnswer = (function checkRadioAnswer() {

  for(let i = 0; i < inputs.length; i++) {
      inputs[i].addEventListener("click", checkRadioAnswer, false);
  }

  var radios = document.getElementsByName("violationType")

  for (let i = 0, length = radios.length; i < length; i++) {
    if (radios[i].checked) {
      if (radios[i].value === "1") {
        ticketDate.style.display = "none";
        insertText("1");
        return; // to stop from going through entire loop
      }
      else if (radios[i].value === "2") {
        updateHideTheseAnswersArray(ticketDate, undefined);
        updateHideTheseAnswersArray(checkboxSection, undefined);
        insertText("2");
        return;
      }
      else if (radios[i].value === "3") {
        updateHideTheseAnswersArray(ticketDate, checkboxSection);
        insertText("3");
        return;
      }
      else if (radios[i].value === "4") {
        updateHideTheseAnswersArray(checkboxSection, ticketDate);
        insertText("4");
        return;
      }
    }

  }
}());
*/
// To add whitespace to the end of the document so each section div will scroll to the top of the window when Next button selected
const setWhiteSpaceAtEndOfDocument = (function calcAndSetWhiteSpace() {
  var lastDivHeight = finishedSectionDiv.offsetHeight;
  var headerHeight = document.getElementById("header-main").offsetHeight;
  var footerHeight = document.getElementById("footer-main").offsetHeight;
  var newPadding = (window.innerHeight - lastDivHeight - headerHeight - footerHeight);
  var setNewPadding = document.getElementById("output").style.paddingBottom = newPadding + "px";
}());
