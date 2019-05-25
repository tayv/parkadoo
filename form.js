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

// LIST OF VARIABLES
  // Sections
const parkingProblemSection = document.getElementById("parking-problem-section");
    // If appealing ticket
const parkingTicketIssuerSection = document.getElementById("ticket-issuer-section");
    // If appealing city ticket
const municipalitySection = document.getElementById("municipality-section");
const newCityRequestSubsection = document.getElementById("new-city-request-subsection")
    // If appealing university ticket
const studentOrEmployee = document.getElementById("university-student-employee");

  // Output
let cityOutputTemplate = "";
let city = "";
/*
// To set default answers/visibility. To be used on page load.
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


// GENERIC FUNCTIONALITY - Previous/Next/Submit button visiblity and to scroll to next div/step. Needs to be initialized before question specific visibility conditions
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
  const hideUnseenStepsByDefault = function() {
    for (var i = 1; i < stepsQuestionnaire.length; i++) {
      stepsQuestionnaire[i].style.display="none";
    }
  };
  hideUnseenStepsByDefault();

  // To display and hide steps depending on visibility conditions
  const stepMakeVisible = function(...stepToHide) { // Keeping ... in parameter. Removing it causes a bug where the for loop doesn't fire
      console.log("stepMakeVisible triggered. The parameter = ", stepToHide);
      for (let i = 0; i < stepToHide.length; i++) {
        console.log("i: ", i);
        console.log("stepToHide: ", stepToHide[i]);
        if (stepsQuestionnaire[count] === stepToHide[0][i]) { // adding [0] necessary because ...stepToHide makes an array within an array
          if (stepsQuestionnaire[count+1] > stepsQuestionnaire.length) {
            finishedSectionDiv.scrollIntoView(true);
          } else {
              stepsQuestionnaire[count+1].style.display = "block";
              stepsQuestionnaire[count+1].scrollIntoView(true);
              console.log("hide a step");
          }
        } else {
          stepsQuestionnaire[count].style.display = "block";
          console.log("no step to hide. continue as usual");
        }
      }
    };

  document.getElementById("button-next").onclick = function() {
    if (count < stepsQuestionnaire.length - 1) {
      count++;
      stepMakeVisible(hideTheseAnswersArray);
      applyActiveVisibilityConditions();
      stepsQuestionnaire[count].scrollIntoView(true);
      stepsQuestionnaire[count].style.opacity="1";
      stepsQuestionnaire[count-1].style.opacity="0.2"; // reduce opacity of a completed step so user focus is on current step
      checkButtonStep();
      skipPastNextHiddenSections();
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
        skipPastPreviousHiddenSections();
    } return count;
  };

  // Added skipPast...HiddenSections() to prevent next/previous button onclick functions from trying to display hidden sections and requiring multiple clicks
  function skipPastNextHiddenSections() {
      while (stepsQuestionnaire[count].style.display === "none"){
        count++;
        stepMakeVisible(hideTheseAnswersArray);
        applyActiveVisibilityConditions();
        stepsQuestionnaire[count].scrollIntoView(true);
        stepsQuestionnaire[count].style.opacity="1";
        stepsQuestionnaire[count-1].style.opacity="0.2";
        checkButtonStep();
        if (stepsQuestionnaire[count].style.display === "block") {
        break;
      }
    }
  }

  function skipPastPreviousHiddenSections() {
       while (stepsQuestionnaire[count].style.display === "none"){
         count--;
         stepMakeVisible(hideTheseAnswersArray);
         stepsQuestionnaire[count].scrollIntoView(true);
         stepsQuestionnaire[count].style.opacity="1";
         stepsQuestionnaire[count-1].style.opacity="0.2";
         checkButtonStep();
         if (stepsQuestionnaire[count].style.display === "block") {
         break;
       }
     }
   }

};


// GENERIC FUNCTIONALITY: DETERMINE WHICH SECTIONS TO HIDE BY STORING THEM IN ARRAY
const hideTheseAnswersArray = [];

function updateHideTheseAnswersArray(addItem, subtractItem) { //use undefined when passing the unused parameter. Note that parameters must represent section IDs for stepMakeVisible() to work. Call it x times if need to hide multiple steps.
  function addToHideTheseAnswersArray(addItem) {
    if (hideTheseAnswersArray.indexOf(addItem) === -1 && typeof addItem !== "undefined") { // Need to exclude undefined because one parameter (either addItem or subtractItem) is likely left blank in the original function call
      hideTheseAnswersArray.push(addItem);
      console.log("add an item: ", addItem);
    } else {
        console.log("There's already an ", addItem, " here. Don't do anything");
    }
  }
  addToHideTheseAnswersArray(addItem);

  function subtractFromHideTheseAnswersArray(subtractItem) {
    if (hideTheseAnswersArray.indexOf(subtractItem) > -1 && typeof subtractItem !== "undefined") {
      var arrayIndex = hideTheseAnswersArray.indexOf(subtractItem);
      hideTheseAnswersArray.splice(arrayIndex, 1);
      console.log("subtract:" + subtractItem);
      console.log(subtractItem);
      }
  }
  subtractFromHideTheseAnswersArray(subtractItem);
}

function applyActiveVisibilityConditions() {
  if (hideTheseAnswersArray.includes(parkingTicketIssuerSection)) {
    parkingTicketIssuerSection.style.display = "none";
    console.log("I found " + parkingTicketIssuerSection + " in the array and will hide the step"); // can add another if statement if need multiple visibility conditions
  }
  if (hideTheseAnswersArray.includes(studentOrEmployee)) {
    studentOrEmployee.style.display = "none";
    console.log("I found " + studentOrEmployee + " in the array and will hide the step");
  }
};

// QUESTIONNAIRE SECTIONS
// Generic step 1 - What is your parking problem?
  // update visibiilty conditions
const parkingProblemRadioSelection = (function updateParkingProblemConditionals() {
  const parkingProblemRadioInputs = document.querySelectorAll(".parking-problem-radio-class");
  for(let i = 0; i < parkingProblemRadioInputs.length; i++) {
      parkingProblemRadioInputs[i].addEventListener("click", updateParkingProblemConditionals, false);
  }
  for (let i = 0, length = parkingProblemRadioInputs.length; i < length; i++) {
    if (parkingProblemRadioInputs[i].checked) {
      if (parkingProblemRadioInputs[i].value === "1") {
        updateHideTheseAnswersArray(undefined, parkingTicketIssuerSection);
        applyActiveVisibilityConditions();
        return;
      }
      else if (parkingProblemRadioInputs[i].value === "2") {
        updateHideTheseAnswersArray(parkingTicketIssuerSection, undefined); // call for each step you need to hide
        applyActiveVisibilityConditions();
        outputTemplateText("report abandoned vehicle");
        return;
      }
      else if (parkingProblemRadioInputs[i].value === "3") {
        updateHideTheseAnswersArray(parkingTicketIssuerSection, undefined);
        applyActiveVisibilityConditions();
        outputTemplateText("check bylaws");
        return;
      }
    }
  }
}());
// .ticket-issuer-section - Who issued your ticket?
  // Update dependant visibiilty conditions
const ticketIssuerRadioSelection = (function updateticketIssuerConditionals() {
  const ticketIssuerRadioInputs = document.querySelectorAll(".ticket-issuer-radio-class");
  for(let i = 0; i < ticketIssuerRadioInputs.length; i++) {
      ticketIssuerRadioInputs[i].addEventListener("click", updateticketIssuerConditionals, false);
  }
  for (let i = 0, length = ticketIssuerRadioInputs.length; i < length; i++) {
    if (ticketIssuerRadioInputs[i].checked) {
      if (ticketIssuerRadioInputs[i].value === "1") {
        updateHideTheseAnswersArray(undefined, municipalitySection);
        updateHideTheseAnswersArray(studentOrEmployee, undefined);
        applyActiveVisibilityConditions();
        outputTemplateText("city");
        return;
      }
      else if (ticketIssuerRadioInputs[i].value === "2") {
        updateHideTheseAnswersArray(municipalitySection, undefined); // call for each step you need to hide
        updateHideTheseAnswersArray(studentOrEmployee, undefined);
        applyActiveVisibilityConditions();
        return;
      }
      else if (ticketIssuerRadioInputs[i].value === "3") {
        updateHideTheseAnswersArray(municipalitySection, undefined);
        updateHideTheseAnswersArray(undefined, studentOrEmployee);
        applyActiveVisibilityConditions();
        return;
      }
    }
  }
}());
  // update output text - if city selected
function outputTemplateText(answerValue) {
  if (answerValue === "city") {
    cityOutputTemplate = // could move this to a separate file and reference in variable section at top of page
      "*name*<br>" +
      "*mailing address*<br><br>" +
      "*Today’s date*<br><br>" +
      "RE: Appealing Parking Ticket *ticket number*<br><br>" +
      "To Whom it May Concern, <br><br>" +
      "<p>I received a parking ticket on *ticket date* for *ticket reason*. While I appreciate that public streets are a shared resource and the " + city + " works hard to keep our roads safe, I am appealing the ticket for the following reasons:</p><br>" +
      "<p>*The ticket has incorrect details. *Ticket error description*.*</p>" +
      "<p>*I believe the violation description does not apply because *reason violation does not apply*.*</p><br>" +
      "<p>Thank you for considering my appeal. If you wish to discuss the issue further please contact me at *email*.</p><br>" +
      "Sincerely,<br><br>" +
      "*Name*<br>" +
      "*Photos enclosed* ";
    document.getElementById("insert-output-text-here").innerHTML = cityOutputTemplate;
  }
  else if (answerValue === "report abandoned vehicle") {
    document.getElementById("insert-output-text-here").innerHTML = "-insert answer 2 text here-";
  }
  else if (answerValue === "check bylaws") {
    document.getElementById("insert-output-text-here").innerHTML = "-insert answer 3 text here-";
  }
};

// .municipality-section
  // update visibility conditions
const municipalityRadioSelection = (function updateMunicipalityConditionals() {
  const municipalityRadioInputs = document.querySelectorAll(".municipality-radio-class");
  for(let i = 0; i < municipalityRadioInputs.length; i++) {
      municipalityRadioInputs[i].addEventListener("click", updateMunicipalityConditionals, false);
  }
  for (let i = 0, length = municipalityRadioInputs.length; i < length; i++) {
    if (municipalityRadioInputs[i].checked) {
      if (municipalityRadioInputs[i].value === "1") {
        newCityRequestSubsection.style.display = "none";
        outputTextCity("1");
        return;
      }
      else if (municipalityRadioInputs[i].value === "2") {
        newCityRequestSubsection.style.display = "block";
        outputTextCity("2");
        return;
      }
    }
  }
}());
  // update output text
function outputTextCity(answerValue) {
  if (answerValue === "1") { //problem might be here
    city = "City of Edmonton";
    outputTemplateText("city"); // need to run outputTemplate() each time to update output text with new variable value
  }
  else if (answerValue === "2") {
    city = document.getElementById("new-city-request-textfield").value;
    outputTemplateText("city");
  }
};


// To add whitespace to the end of the document so each section div will scroll to the top of the window when Next button selected
const setWhiteSpaceAtEndOfDocument = (function calcAndSetWhiteSpace() {
  var lastDivHeight = finishedSectionDiv.offsetHeight;
  var headerHeight = document.getElementById("header-main").offsetHeight;
  var footerHeight = document.getElementById("footer-main").offsetHeight;
  var newPadding = (window.innerHeight - lastDivHeight - headerHeight - footerHeight);
  var setNewPadding = document.getElementById("output").style.paddingBottom = newPadding + "px";
}());
