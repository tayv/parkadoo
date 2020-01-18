"use strict";
import {
  parkingProblemRadioSelection, ticketIssuerSelection, municipalityRadioSelection, studentOrEmployeeRadioSelection, templateType,
  ticketAccuracyRadioSelection, ticketReasonRadioSelection, ticketAppealBylawRadioSelection, potentialTicketRadioSelection
} from "/main.js";
import {setLetterTemplate} from "/letter.js";
import {calcAndSetWhiteSpace} from "/helper-functions.js";


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

// LIST OF VARIABLES
  // Used as index to track which step to show on button clicks
let countStep = 0;
let finishedQuestions; // Boolean to check if questionnaire is done
  // Object of sections to show/hide. Needs to be object so can be mutated in main.js
let sectionsShowHideObj = {
  hideTheseSectionsArray: [],
  showTheseSectionsArray: []
};

// To hide multiple next steps if user skips multiple sections by scrolling up
const hideExtraSteps = (counter) => {
  sectionsShowHideObj.showTheseSectionsArray.slice(counter).forEach(function(element) {
    element.style.display="none"
  });
}

// For Active-class on scrolling
let activeSection = formSections.welcomeSection; // to keep track of current step when scrolling
const headerHeight = document.getElementById("header-main").offsetHeight;
const footerHeight = document.getElementById("footer-main").offsetHeight;
const visibleWindowHeight = (window.innerHeight - headerHeight - footerHeight);
//  const throttledScroll = _.throttle(isScrolledIntoView(activeSection), 200); unable to import lodash

const clickActiveClass = () => {
  if (!event.target.closest("SECTION")) return; // short circuit if don't click on section-container or its child elements
  removeActiveClass();
  let sectionDiv = event.target.closest(".section-container");
  sectionDiv.classList.add("active-section-container");
  countStep = sectionsShowHideObj.showTheseSectionsArray.indexOf(sectionDiv);
  checkButtonStep();
  hideExtraSteps(countStep+1);
}

// CLICK & SCROLL EVENTS TO HIGHLIGHT SECTION-CONTAINER WHEN USER INTERACTS WITH IT
document.getElementById("parking-form-content").addEventListener("click", clickActiveClass);

const nextStepActionsScroll = () => {
      // want to check that the questionnaire hasn't finished and that the next step scrolling to hasn't been scrolled to already
    if ((countStep < sectionsShowHideObj.showTheseSectionsArray.length - 1) && window.getComputedStyle(sectionsShowHideObj.showTheseSectionsArray[countStep+1]).display==="block")  {
      removeActiveClass();
      countStep++;
      activeSection = sectionsShowHideObj.showTheseSectionsArray[countStep]
      sectionVisibility(sectionsShowHideObj);
      if (activeSection == document.querySelector("#finished-section-container")) return;
      activeSection.classList.add("active-section-container");
      activeSection = sectionsShowHideObj.showTheseSectionsArray[countStep];
    } else {
        checkButtonStep();
    } return countStep;
  };

const prevStepActionsScroll = () => {
    if (countStep < 1) {
      checkButtonStep();
      removeActiveClass();
    } else if (countStep >= 1) {
        removeActiveClass();
        countStep--;
        activeSection = sectionsShowHideObj.showTheseSectionsArray[countStep];
        activeSection.classList.add("active-section-container");
    }
    return countStep;
  };

function isScrolledIntoView(el) {
    let rect = el.getBoundingClientRect();
    let activeElemTop = Math.round(rect.top);
    let activeElemBottom = Math.round(rect.bottom);
    let contentHeight = Math.round(document.getElementById("parking-form-main").offsetHeight);
    let paddingHeight = Math.round(contentHeight * 0.1); // for more natural transition of active-class when div leaves viewing area
    let topHeight = Math.round(headerHeight + paddingHeight);
    let bottomHeight = Math.round(contentHeight - paddingHeight);
    if (activeElemTop > bottomHeight) {
      // element is above the header so scrolling up
      prevStepActionsScroll();
    } else if (activeElemBottom < topHeight) {
      // element is below the footer so scrolling down
      nextStepActionsScroll();
    }
}

// ACTIVECLASS SCROLL LISTENER
// needs lodash throttle still
window.addEventListener("scroll", function() {
  isScrolledIntoView(activeSection);
    }, {
          capture: true,
          passive: true
        });

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
      if (templateType == "") {
        ctaDisplay("bylawComplete");
      } else {
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

  // TO REMOVE ACTIVE SECTION STYLES
  const removeActiveClass = () => {
    sectionsShowHideObj.showTheseSectionsArray.forEach(section => {
      section.classList.remove("active-section-container");
    });
  }

  // functionality for displaying steps on prev/next button click

const nextStepActions = () => {
   if (countStep < sectionsShowHideObj.showTheseSectionsArray.length - 1) {
        removeActiveClass();
        countStep++;
        activeSection = sectionsShowHideObj.showTheseSectionsArray[countStep];
        sectionVisibility(sectionsShowHideObj);
        activeSection.classList.add("active-section-container");
        calcAndSetWhiteSpace(activeSection);
        activeSection.scrollIntoView(true);
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
        countStep--;
        activeSection = sectionsShowHideObj.showTheseSectionsArray[countStep];
        sectionVisibility(sectionsShowHideObj);
        checkButtonStep();
        if (activeSection == document.querySelector("#welcome-section")) return;
        activeSection.classList.add("active-section-container");
        calcAndSetWhiteSpace(activeSection);
        activeSection.scrollIntoView(true);
    } return countStep;
  };

document.querySelector(".button-next").onclick = () => {
  nextStepActions();
  calcAndSetWhiteSpace(activeSection);

  // AUTOSAVE TEXT, TEXT AREA, RADIOS
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

  // Adds value of checked radio buttons to sessionStorage to be used by initSavedAnswers() in main.js
  function autosaveRadio(radioArray) {
    radioArray.forEach(function(radioClass) {
      radioClass.forEach(function(element) {
        // if radio is checked then we want to save it in sessionStorage to retrieve if pg reloads
        if (element.checked) {
          sessionStorage.setItem(element.name, element.value );
        }
      });
    });
  }
  autosaveRadio(allRadiosArray);
};

document.querySelector("#button-prev").onclick = () => {
  prevStepActions();
  calcAndSetWhiteSpace(activeSection);
};

// Function to send to correct html page after clicked Submit
const formAction = (str) => {
  let formID = document.querySelector("#parking-form-content");
  switch(str)
  {
    case "city":
    formID.action = "letter-city.html";
    break;

    case "report abandoned vehicle":
    formID.action = "letter-neighbour.html";
    break;

    case "private operator":
    formID.action = "letter-privateop.html";
    break;

    case "institution":
    formID.action = "letter-privateop.html";
    break;
  }
}

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

  formAction(templateType); // To send to right html page
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
const allRadiosArray = [
  parkingProblemRadioOptions,
  ticketIssuerRadioOptions,
  municipalityRadioOptions,
  studentOrEmployeeRadioOptions,
  ticketAccuracyRadioOptions,
  ticketReasonRadioOptions,
  ticketAppealBylawRadioOptions,
  potentialTicketRadioOptions
];

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
  formSections, sectionsShowHideObj, checkButtonStep, parkingProblemRadioOptions,
  ticketIssuerRadioOptions, municipalityRadioOptions, studentOrEmployeeRadioOptions, ticketAccuracyRadioOptions,
  ticketReasonRadioOptions, ticketAppealBylawRadioOptions, potentialTicketRadioOptions, allRadiosArray, setupRBEventListeners
};
