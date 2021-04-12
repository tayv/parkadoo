import {
  parkingProblemRadioSelection, ticketIssuerSelection, municipalityRadioSelection, studentOrEmployeeRadioSelection, templateType,
  ticketAccuracyRadioSelection, ticketReasonRadioSelection, ticketAppealBylawRadioSelection, potentialTicketRadioSelection
} from "/main.js";
import {setLetterTemplate} from "/letter.js";
import {calcAndSetWhiteSpace} from "/app-generic/formatting.js";
import {autosaveText, autosaveRadio} from "/form-functionality/autosave.js";
import {focusInput} from "/form-functionality/keyboard.js";
import {activeSection, setActiveClass, removeActiveClass, clickActiveClass, hideExtraSteps} from "/form-functionality/active-section.js";
import {countStep, setCurrentStep, sectionsShowHideObj} from "/form-functionality/step-tracker.js";
import {allRadiosArray} from "/form-functionality/radio-buttons.js";
import {loadLetter} from "/form-content/set-template.js";

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




// GENERIC FUNCTIONALITY - Previous/Next/Submit button visiblity and to scroll to next div/step.

  // Called inside checkButtonStep(). Sets button text and visiblity
const ctaDisplay = (position) => {
  switch (position) {
    case "start":
      document.getElementById("button-prev").style.display="none";
      document.querySelector(".button-next").value = "Get Started";
      document.querySelector(".button-next").style.display="inline";
      document.querySelector("#button-submit").style.display="none";
      break;
    case "inProgress":
      document.getElementById("button-prev").style.display="inline";
      document.querySelector("#button-prev").value = "Previous Question";
      document.querySelector(".button-next").style.display="inline";
      document.querySelector(".button-next").value = "Next Question";
      document.querySelector("#button-submit").style.display="none";
      break;
    case "bylawComplete":
      document.getElementById("button-prev").style.display="inline";
      document.querySelector("#button-prev").value = "Check Another Bylaw";
      document.querySelector(".button-next").style.display="none";
      document.querySelector("#button-submit").style.display="none";
      break;
    case "letterComplete":
      document.getElementById("button-prev").style.display="none";
      document.querySelector(".button-next").style.display="none";
      removeActiveClass();
      document.getElementById("button-submit").style.display="block";
      break;
    case "cityUnavailable":
      document.getElementById("button-prev").style.display="inline";
      document.querySelector(".button-next").style.display="none";
      document.getElementById("button-submit").style.display="none";
      break;
  }
};
  // Needs to be initialized before question specific visibility conditions
const checkButtonStep = () => {
  let start = (countStep === 0);
  let inProgress = countStep > 0 && countStep < sectionsShowHideObj.showTheseSectionsArray.length - 1;
  let complete = (countStep >= sectionsShowHideObj.showTheseSectionsArray.length - 1);
  if (start) {
    ctaDisplay("start");
  } else if (inProgress) {
      ctaDisplay("inProgress");
  } else if (complete) {
     switch(true) {
      case templateType == "":
        ctaDisplay("bylawComplete");
        break;
      case templateType == "no city":
        ctaDisplay("cityUnavailable");
        break;
      default:
        ctaDisplay("letterComplete");
     }
    }
};

  // show/hide questionnaire sections based on user's answers
const sectionVisibility = (sectionsShowHideObj) => {
  // Show sections
  if (sectionsShowHideObj.showTheseSectionsArray.length > 0 && sectionsShowHideObj.showTheseSectionsArray[countStep] !== undefined) {
    sectionsShowHideObj.showTheseSectionsArray[countStep].style.display = "block";
  }
  // hide sections
  if (sectionsShowHideObj.hideTheseSectionsArray.length > 0) {
    for (let i = 0; i <= sectionsShowHideObj.hideTheseSectionsArray.length && sectionsShowHideObj.hideTheseSectionsArray[i] !== undefined; i++) {
      sectionsShowHideObj.hideTheseSectionsArray[i].style.display = "none";
    }
  }
};

// functionality for displaying steps on prev/next button click

const nextStepActions = () => {
   if (countStep < sectionsShowHideObj.showTheseSectionsArray.length - 1) {
        removeActiveClass();
        setCurrentStep(countStep + 1);
        setActiveClass(sectionsShowHideObj.showTheseSectionsArray[countStep]);
        sectionVisibility(sectionsShowHideObj);
        calcAndSetWhiteSpace(activeSection);
        activeSection.scrollIntoView(true);
    //    focusInput();
        checkButtonStep();
      } else {
          checkButtonStep();
    } return countStep;
  };

const prevStepActions = () => {
    if (countStep < 1) {
      checkButtonStep();
      removeActiveClass();
    } else if (countStep >= 1) {
        removeActiveClass();
        hideExtraSteps(countStep);
        setCurrentStep(countStep - 1);
        setActiveClass(sectionsShowHideObj.showTheseSectionsArray[countStep]);
        sectionVisibility(sectionsShowHideObj);
        checkButtonStep();
        calcAndSetWhiteSpace(activeSection);
        activeSection.scrollIntoView(true);
    //    focusInput();
    } return countStep;
  };

document.querySelector(".button-next").onclick = () => {
  nextStepActions();
  calcAndSetWhiteSpace(activeSection);
  autosaveText(); // updates sessionStorage for each step
  autosaveRadio(allRadiosArray); // updates sessionStorage for each step
};

document.querySelector("#button-prev").onclick = () => {
  prevStepActions();
  calcAndSetWhiteSpace(activeSection);
  autosaveText(); // updates sessionStorage for each step
  autosaveRadio(allRadiosArray); // updates sessionStorage for each step
};









export {formSections, checkButtonStep, sectionVisibility};
