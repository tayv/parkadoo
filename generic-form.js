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
let timeout; // stores timeout so can use debouncing with scroll events
  // Object of sections to show/hide. Needs to be object so can be mutated in main.js
let sectionsShowHideObj = {
  hideTheseSectionsArray: [],
  showTheseSectionsArray: []
};

// EXPERIMENTAL
let activeSection; // to keep track of current step when scrolling
const headerHeight = document.getElementById("header-main").offsetHeight;
const footerHeight = document.getElementById("footer-main").offsetHeight;
const visibleWindowHeight = (window.innerHeight - headerHeight - footerHeight);

// INTERSECTION OBSERVER
// init the observer
const options = {
	//rootMargin: "-80px",
	threshold: [0.5, 0.75, 1]
}
	// simple function to use for callback in the intersection observer
const callbackIO = (entries, observer) => {
  let prevElIntersecting = false;
	entries.forEach((entry) => {
    //  console.log(entry.target.getAttribute("id"), "Is intersecting: ", entry.isIntersecting, "intersection ratio: ", entry.intersectionRatio, "root height: ", visibleWindowHeight,"target height", entry.target.clientHeight, "Target bigger than root: ", (visibleWindowHeight < entry.target.clientHeight));
    //  console.log("OFFSET HIEGIHT: ", entry.target.offsetHeight, "Within area? ", (entry.target.offsetHeight > headerHeight) && (entry.target.offsetHeight < 400));

    // verify the element is intersecting
    if((entry.target.offsetHeight > headerHeight) && (entry.target.offsetHeight < 400) && ((entry.isIntersecting && visibleWindowHeight < entry.target.clientHeight && entry.intersectionRatio > 0.1) || (entry.isIntersecting && visibleWindowHeight >= entry.target.clientHeight && entry.intersectionRatio > 0.9))){
    	// remove previous active-section-container class
      if(document.querySelector(".active-section-container")) {
      	document.querySelector(".active-section-container").classList.remove("active-section-container");
        entry.target.classList.add("active-section-container");
        }
			// add active-section-container class
			 entry.target.classList.add("active-section-container");

			// get id of the intersecting section
			console.log("active-section-container: ", entry.target.getAttribute('id'), "ENTRY ITEM: ", entry);
		} else {
    	//	entry.target.classList.remove('active-section-container');
      //  entry.target.classList.add("active-section-container");
    }
	});
}

const observer = new IntersectionObserver(callbackIO, options);

// target the elements to be observed
const targets = document.querySelectorAll(".section-container");
targets.forEach((target) => {
	observer.observe(target);
});

// END INTERSECTION OBSERVER

const nextStepActionsScroll = () => {
    if (countStep < sectionsShowHideObj.showTheseSectionsArray.length - 1) {
      countStep++;
      hideSections(sectionsShowHideObj);
      showSections(sectionsShowHideObj);
  //    sectionsShowHideObj.showTheseSectionsArray[countStep].scrollIntoView(true);
      sectionsShowHideObj.showTheseSectionsArray[countStep].style.opacity="1";
      sectionsShowHideObj.showTheseSectionsArray[countStep-1].style.opacity="0.2"; // reduce opacity of a completed step so user focus is on current step
      activeSection = sectionsShowHideObj.showTheseSectionsArray[countStep];
    } else {
        checkButtonStep();
    } return countStep;
  };

const prevStepActionsScroll = () => {
    if (countStep < 1) {
      checkButtonStep();
    } else if (countStep >= 1) {
        countStep--;
        hideSections(sectionsShowHideObj);
        showSections(sectionsShowHideObj);
        sectionsShowHideObj.showTheseSectionsArray[countStep].style.opacity="1";
        sectionsShowHideObj.showTheseSectionsArray[countStep+1].style.opacity="0.2";
        activeSection = sectionsShowHideObj.showTheseSectionsArray[countStep];
      //  sectionsShowHideObj.showTheseSectionsArray[countStep].scrollIntoView(true);
    } return countStep;
  };

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
    finishedQuestions = false;
    document.getElementById("button-previous").style.display="none";
    document.getElementById("button-submit").style.display="none";
  } else if (countStep > 0 && countStep < sectionsShowHideObj.showTheseSectionsArray.length - 1) {
      document.getElementById("button-previous").style.display="inline";
      document.getElementById("button-submit").style.display="none";
  } else if (countStep >= sectionsShowHideObj.showTheseSectionsArray.length - 1) {
      finishedQuestions = true;
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

const nextStepActions = () => {
    if (countStep < sectionsShowHideObj.showTheseSectionsArray.length - 1) {
      countStep++;
      hideSections(sectionsShowHideObj);
      showSections(sectionsShowHideObj);
      sectionsShowHideObj.showTheseSectionsArray[countStep].scrollIntoView(true);
    //  sectionsShowHideObj.showTheseSectionsArray[countStep].style.opacity="1";
    //  sectionsShowHideObj.showTheseSectionsArray[countStep-1].style.opacity="0.2"; // reduce opacity of a completed step so user focus is on current step
      activeSection = sectionsShowHideObj.showTheseSectionsArray[countStep];
      checkButtonStep();
    } else {
        checkButtonStep();
    } return countStep;
  };

const prevStepActions = () => {
    if (countStep < 1) {
      checkButtonStep();
    } else if (countStep >= 1) {
        countStep--;
        hideSections(sectionsShowHideObj);
        showSections(sectionsShowHideObj);
    //    sectionsShowHideObj.showTheseSectionsArray[countStep].style.opacity="1";
    //    sectionsShowHideObj.showTheseSectionsArray[countStep+1].style.opacity="0.2";
        sectionsShowHideObj.showTheseSectionsArray[countStep].scrollIntoView(true);
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
