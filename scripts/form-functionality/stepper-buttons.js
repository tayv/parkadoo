import {
  parkingProblemRadioSelection, ticketIssuerSelection, municipalityRadioSelection, studentOrEmployeeRadioSelection, templateType,
  ticketAccuracyRadioSelection, ticketReasonRadioSelection, ticketAppealBylawRadioSelection, potentialTicketRadioSelection
} from "/scripts/main.js";
import {setLetterTemplate} from "/scripts/letter-builder.js";
import {calcAndSetWhiteSpace} from "/scripts/app-generic/formatting.js";
import {autosaveText, autosaveRadio} from "/scripts/form-functionality/autosave.js";
import {focusInput} from "/scripts/form-functionality/keyboard.js";
import {activeSection, setActiveClass, removeActiveClass, clickActiveClass, hideExtraSteps} from "/scripts/form-functionality/active-section.js";
import {countStep, setCurrentStep, sectionsShowHideObj} from "/scripts/form-functionality/step-tracker.js";
import {allRadiosArray} from "/scripts/form-functionality/radio-buttons.js";
import {loadLetter} from "/scripts/form-content/set-template.js";
import {formSections} from "/scripts/form-content/form-sections.js";


// GENERIC FUNCTIONALITY - Previous/Next/Submit button visiblity and to scroll to next div/step.

  // Call this inside checkButtonStep(). Sets button text and visiblity
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




export {checkButtonStep, sectionVisibility};
