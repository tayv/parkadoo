"use strict";
import {
  parkingProblemRadioSelection, ticketIssuerSelection, municipalityRadioSelection, studentOrEmployeeRadioSelection, templateType,
  ticketAccuracyRadioSelection, ticketReasonRadioSelection, ticketAppealBylawRadioSelection, potentialTicketRadioSelection
} from "/main.js";
import {setLetterTemplate} from "/letter.js";

// Sections
const formSections = {
  // Holds the total number of sections
  allFormSections: document.getElementsByClassName("section-container"),
  // Generic sections
  welcomeSection: document.getElementById("welcome-section"),
  parkingProblemSection: document.getElementById("parking-problem-section"),
  // If appealing ticket
  parkingTicketIssuerSection: document.getElementById("ticket-issuer-section"),
  // If appealing city ticket
  municipalitySection: document.getElementById("municipality-section"),
  cityUnavailableSection: document.getElementById("city-unavailable-section"),
  ticketNumberSection: document.getElementById("ticket-number-section"),
  ticketAccuracySection: document.getElementById("ticket-accuracy-section"),
  ticketErrorDescriptionSubSection: document.getElementById("ticket-error-description-subsection"),
  ticketReasonSection: document.getElementById("ticket-reason-section"),
  ticketReasonOtherSubSection: document.getElementById("ticket-reason-other-subsection"),
  ticketAppealBylawSection: document.getElementById("ticket-appeal-bylaw-section"),
  ticketAppealSubSection: document.getElementById("ticket-appeal-bylaw-subsection"),
  photoUploadSection: document.getElementById("photo-upload-section"),
  photoUploadPromptSubSection: document.getElementById("photo-upload-prompt-subsection"),
  ticketDateSection: document.getElementById("ticket-date-section"),
  nameSection: document.getElementById("name-section"),
  contactDetailsSection: document.getElementById("contact-details-section"),
  mailingAddressSection: document.getElementById("mailing-address-section"),
  // If appealing university ticket
  studentOrEmployeeSection: document.getElementById("student-or-employee-section"),
  // private operator and institution
  privateTicketAppealSection: document.getElementById("private-ticket-appeal-section"),
  // If checking bylaws
  potentialIssueSection: document.getElementById("potential-issue-section"),
  checkBylawsSection: document.getElementById("check-bylaw-info-section"),
  // last step
  finishedSectionDiv: document.getElementById("finished-section-container")
};

// experimental
var elements = document.querySelectorAll(".section-container");

elements = Array.prototype.slice.call(elements);
//let testArray = [document.getElementById("parking-problem-section"), document.getElementById("ticket-issuer-section")];

const myFunction = () => {
console.log("MyFunction fired");
let visResult = isScrolledIntoView(sectionTest);
if (visResult) {
   console.log("TRUE fired");
  document.getElementById("parking-problem-section").style.color = "red";
} else {
  //alert("Didn't fire");
  document.getElementById("parking-problem-section").style.color = "green";
}
};


let sectionTest = document.getElementById("parking-problem-section");
function isScrolledIntoView(el) {
    var rect = el.getBoundingClientRect();
    var elemTop = rect.top;
    var elemBottom = rect.bottom;

    // Only completely visible elements return true:
    var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
    // Partially visible elements return true:
    //isVisible = elemTop < window.innerHeight && elemBottom >= 0;
    console.log(isVisible);
    return isVisible;
}

elements.forEach(function(element) {
  window.addEventListener("scroll", myFunction, {
    capture: true,
    passive: true
  });
});




// LIST OF VARIABLES
  // Used as index to track which step to show on button clicks
let countStep = 0;
  // Object of sections to show/hide. Needs to be object so can be mutated in main.js
let sectionsShowHideObj = {
  hideTheseSectionsArray: [],
  showTheseSectionsArray: []
};
/*  // Array that will hold sections to hide
let hideTheseSectionsArray = [];
  // Array that will hold section to display
let showTheseSectionsArray = []; */


// To hide all steps other than initial welcome section by default
const hideAllSteps = () => {
  for (let i = 1; i < formSections.allFormSections.length; i++) {
    formSections.allFormSections[i].style.display="none";
  }
  formSections.finishedSectionDiv.style.display="none";
};

// GENERIC FUNCTIONALITY - Previous/Next/Submit button visiblity and to scroll to next div/step.
  // Needs to be initialized before question specific visibility conditions
const checkButtonStep = () => {
  if (countStep === 0) {
    document.getElementById("button-previous").style.display="none";
    document.getElementById("button-submit").style.display="none";
  } else if (countStep > 0 && countStep < sectionsShowHideObj.showTheseSectionsArray.length - 1) {
      document.getElementById("button-previous").style.display="inline";
      document.getElementById("button-submit").style.display="none";
  } else if (countStep >= sectionsShowHideObj.showTheseSectionsArray.length - 1) {
      document.getElementById("button-previous").style.display="none";
      document.getElementById("button-next").style.display="none";
      document.getElementById("button-submit").style.display="block";
  }
};

  // show/hideSections() based on prev/next button onclick
const showSections = (sectionsShowHideObj) => {
  if (sectionsShowHideObj.showTheseSectionsArray.length > 0 && sectionsShowHideObj.showTheseSectionsArray[countStep] !== undefined) {
    sectionsShowHideObj.showTheseSectionsArray[countStep].style.display = "block";
  }
};
const hideSections = (sectionsShowHideObj) => {
  if (sectionsShowHideObj.hideTheseSectionsArray.length > 0) {
    for (let i = 0; i <= sectionsShowHideObj.hideTheseSectionsArray.length && sectionsShowHideObj.hideTheseSectionsArray[i] !== undefined; i++) {
      sectionsShowHideObj.hideTheseSectionsArray[i].style.display = "none";
    }
  }
};

  // functionality for displaying steps on prev/next button click
document.getElementById("button-next").onclick = () => {
  if (countStep < sectionsShowHideObj.showTheseSectionsArray.length - 1) {
    countStep++;
    hideSections(sectionsShowHideObj);
    showSections(sectionsShowHideObj);
    sectionsShowHideObj.showTheseSectionsArray[countStep].scrollIntoView(true);
    sectionsShowHideObj.showTheseSectionsArray[countStep].style.opacity="1";
    sectionsShowHideObj.showTheseSectionsArray[countStep-1].style.opacity="0.2"; // reduce opacity of a completed step so user focus is on current step
    checkButtonStep();
  } else {
      checkButtonStep();
  } return countStep;
};

document.getElementById("button-previous").onclick = () => {
  if (countStep < 1) {
    checkButtonStep();
  } else if (countStep >= 1) {
      countStep--;
      hideSections(sectionsShowHideObj);
      showSections(sectionsShowHideObj);
      sectionsShowHideObj.showTheseSectionsArray[countStep].style.opacity="1";
      sectionsShowHideObj.showTheseSectionsArray[countStep+1].style.opacity="0.2";
      sectionsShowHideObj.showTheseSectionsArray[countStep].scrollIntoView(true);
      checkButtonStep();
  } return countStep;
};

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
};


// GENERIC FUNCTIONALITY: Add event listener to radio buttons within visibility condition function
const addRadioEventListener = (rbClassName, updateConditionalsFunction) => {
  for(let i = 0; i < rbClassName.length; i++) {
    rbClassName[i].addEventListener("change", updateConditionalsFunction, false);
  }
};

// Used to loop through section rb's to add event listeners
const parkingProblemRadioOptions = document.querySelectorAll(".parking-problem-radio-class");
const ticketIssuerRadioOptions = document.querySelectorAll(".ticket-issuer-radio-class");
const municipalityRadioOptions = document.querySelectorAll(".municipality-radio-class");
const studentOrEmployeeRadioOptions = document.querySelectorAll(".student-or-employee-class");
const ticketAccuracyRadioOptions = document.querySelectorAll(".ticket-accuracy-radio-class");
const ticketReasonRadioOptions = document.querySelectorAll(".ticket-reason-radio-class");
const ticketAppealBylawRadioOptions = document.querySelectorAll(".yn-ticket-valid-class");
const potentialTicketRadioOptions = document.querySelectorAll(".potential-ticket-radio-class");

const setupRBEventListeners = () => {
  addRadioEventListener(parkingProblemRadioOptions, parkingProblemRadioSelection);
  addRadioEventListener(ticketIssuerRadioOptions, ticketIssuerSelection);
  addRadioEventListener(municipalityRadioOptions, municipalityRadioSelection);
  addRadioEventListener(studentOrEmployeeRadioOptions, studentOrEmployeeRadioSelection);
  addRadioEventListener(ticketAccuracyRadioOptions, ticketAccuracyRadioSelection);
  addRadioEventListener(ticketReasonRadioOptions, ticketReasonRadioSelection);
  addRadioEventListener(ticketAppealBylawRadioOptions, ticketAppealBylawRadioSelection);
  addRadioEventListener(potentialTicketRadioOptions, potentialTicketRadioSelection);
} // Note this is being called at bottom of main.js to initialize rb event listeners




export {
  formSections, sectionsShowHideObj, hideAllSteps, checkButtonStep, parkingProblemRadioOptions,
  ticketIssuerRadioOptions, municipalityRadioOptions, studentOrEmployeeRadioOptions, ticketAccuracyRadioOptions,
  ticketReasonRadioOptions, ticketAppealBylawRadioOptions, potentialTicketRadioOptions, setupRBEventListeners
};
