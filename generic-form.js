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

// LIST OF VARIABLES
  // Used as index to track which step to show on button clicks
let countStep = 0;
let finishedQuestions; // Boolean to check if questionnaire is done
  // Object of sections to show/hide. Needs to be object so can be mutated in main.js
let sectionsShowHideObj = {
  hideTheseSectionsArray: [],
  showTheseSectionsArray: []
};

// EXPERIMENTAL
let activeSection = formSections.welcomeSection; // to keep track of current step when scrolling
const headerHeight = document.getElementById("header-main").offsetHeight;
const footerHeight = document.getElementById("footer-main").offsetHeight;
const visibleWindowHeight = (window.innerHeight - headerHeight - footerHeight);
//  const throttledScroll = _.throttle(isScrolledIntoView(activeSection), 200); unable to import lodash
// experimental
const elements = document.querySelectorAll(".section-container");
const lastScrollTop = 30;
/*
const testScroll = function(){
   console.log("testScroll fired");
   let scrollAmount = window.pageYOffset
     if (scrollAmount > lastScrollTop){
        // downscroll code
        console.log("DOWNSCROLL fired: ", scrollAmount);
     } else {
        // upscroll code
        console.log("UPSCROLL fired", scrollAmount);
     }
};
*/

const clickActiveClass = () => {
  if (!event.target.closest("SECTION")) return; // short circuit if don't click on section-container or its child elements
  removeActiveClass();
  let sectionDiv = event.target.closest(".section-container");

  sectionDiv.classList.add('active-section-container');
  countStep = sectionsShowHideObj.showTheseSectionsArray.indexOf(sectionDiv);
  checkButtonStep();
}

// CLICK EVENT TO HIGHLIGHT SECTION-CONTAINER WHEN USER INTERACTS WITH IT
document.getElementById("parking-form-content").addEventListener("click", clickActiveClass);

const nextStepActionsScroll = () => {
      // want to check that the questionnaire hasn't finished and that the next step scrolling to hasn't been scrolled to already
    if ((countStep < sectionsShowHideObj.showTheseSectionsArray.length - 1) && window.getComputedStyle(sectionsShowHideObj.showTheseSectionsArray[countStep+1]).display==="block")  {
      removeActiveClass();
      countStep++;
      activeSection = sectionsShowHideObj.showTheseSectionsArray[countStep]
      sectionVisibility(sectionsShowHideObj);
      activeSection.classList.add('active-section-container');
      activeSection = sectionsShowHideObj.showTheseSectionsArray[countStep];
    } else {
        checkButtonStep();
    } return countStep;
  };

const prevStepActionsScroll = () => {
    if (countStep < 1) {
      checkButtonStep();
    } else if (countStep >= 1) {
        removeActiveClass();
        countStep--;
        activeSection = sectionsShowHideObj.showTheseSectionsArray[countStep];
        activeSection.classList.add('active-section-container');
    }
    return countStep;
  };

function isScrolledIntoView(el) {
    let rect = el.getBoundingClientRect();
    let activeElemTop = Math.round(rect.top);
    let activeElemBottom = Math.round(rect.bottom);
    let contentHeight = Math.round(document.getElementById("parking-form-main").offsetHeight);
    /*
    let headerHeight = Math.round(document.getElementById("header-main").offsetHeight);
    let footerHeight = Math.round(document.getElementById("footer-main").offsetHeight);
    let ctaHeight = Math.round(document.querySelector(".cta-sticky-container").offsetHeight);
    let windowHeight = Math.round(window.innerHeight); // If don't use opacity header/footer styling then using parking form container instead of window could simplify math
*/
    let paddingHeight = Math.round(contentHeight * 0.1); // for more natural transition of active-class when div leaves viewing area
    let topHeight = Math.round(headerHeight + paddingHeight);
    let bottomHeight = Math.round(contentHeight - paddingHeight);
  //  let bottomHeight = Math.round(windowHeight - footerHeight - ctaHeight - paddingHeight);
  // return true/false values to trigger correct conditions on scroll
    let isTopHidden = (activeElemTop < topHeight) && (activeElemBottom < bottomHeight);
    let isTopScrolledDown = (activeElemTop > topHeight);

    if (activeElemTop > bottomHeight) {
      console.log("TOP IS BELOW THE FOOTER");
      prevStepActionsScroll();
    } else if (activeElemBottom < topHeight) {
      console.log("BOTTOM IS ABOVE THE HEADER");
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
  //  finishedQuestions = false;
    document.getElementById("button-previous").style.display="none";
    document.getElementById("button-next").style.display="inline";
    document.getElementById("button-submit").style.display="none";
  } else if (countStep > 0 && countStep < sectionsShowHideObj.showTheseSectionsArray.length - 1) {
      document.getElementById("button-previous").style.display="inline";
      document.getElementById("button-next").style.display="inline";
      document.getElementById("button-submit").style.display="none";
  } else if (countStep >= sectionsShowHideObj.showTheseSectionsArray.length - 1) {
    //  finishedQuestions = true;
      document.getElementById("button-previous").style.display="none";
      document.getElementById("button-next").style.display="none";
      document.getElementById("button-submit").style.display="block";
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
      section.classList.remove('active-section-container');
    });
  }

  // functionality for displaying steps on prev/next button click

const nextStepActions = () => {
   if (countStep < sectionsShowHideObj.showTheseSectionsArray.length - 1) {
        removeActiveClass();
        countStep++;
        activeSection = sectionsShowHideObj.showTheseSectionsArray[countStep];
        sectionVisibility(sectionsShowHideObj);
        activeSection.classList.add('active-section-container');
        activeSection.scrollIntoView(true);
        checkButtonStep();
      } else {
        checkButtonStep();
    } return countStep;
  };

const prevStepActions = () => {
    if (countStep < 1) {
      checkButtonStep();
    } else if (countStep >= 1) {
        removeActiveClass();
        sectionsShowHideObj.showTheseSectionsArray.slice(countStep).forEach(function(element) { // To hide multiple next steps if user skips multiple sections using scroll
          element.style.display="none"
        });
        countStep--;
        activeSection = sectionsShowHideObj.showTheseSectionsArray[countStep];
        sectionVisibility(sectionsShowHideObj)
        activeSection.classList.add('active-section-container');
        activeSection.scrollIntoView(true);
        checkButtonStep();
    } return countStep;
  };


document.getElementById("button-next").onclick = () => {
  nextStepActions();
};

document.getElementById("button-previous").onclick = () => {
  prevStepActions();
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
