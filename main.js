"use strict";

import {setLetterTemplate, letterTemplate} from "/letter.js";
import {checkBylawsOutputTemplate, cityBylawLink, cityBylawName, bylawTextObj} from "/bylaw.js";
import {calcAndSetWhiteSpace, currentDateFormatted, upperCaseFirstLetter, lowerCaseFirstLetter, formatSentenceEnding} from "/helper-functions.js";
import {
  formSections, sectionsShowHideObj, checkButtonStep,
  parkingProblemRadioOptions, ticketIssuerRadioOptions, municipalityRadioOptions, studentOrEmployeeRadioOptions,
  ticketAccuracyRadioOptions, ticketReasonRadioOptions, ticketAppealBylawRadioOptions, potentialTicketRadioOptions,
  allRadiosArray, setupRBEventListeners
} from "/generic-form.js";

// TO LOAD DEFAULT VISIBILITY CONDITIONS (works)
window.onload = function setDefaultAnswerState() {
//  document.getElementById("parking-form-content").reset();
//  formSections.welcomeSection.scrollIntoView(true);
  //checkButtonStep(); // to display proper button at page load
  // To set initial rb visibility conditions
  parkingProblemRadioSelection(); // without this won't display city output without rb event change
  ticketIssuerSelection();
  municipalityRadioSelection();
  studentOrEmployeeRadioSelection();
  ticketAccuracyRadioSelection();
  ticketReasonRadioSelection();
  ticketAppealBylawRadioSelection();
  potentialTicketRadioSelection();
  (function init() {
/*    if (sessionStorage["ticket-number"]) {
        document.querySelector("#ticket-number-text-field").value = sessionStorage["ticket-number"];
    } */

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
      //  console.log("Treu or false", (sessionStorage["rb"] == element.value));
        if (sessionStorage[elementName] != undefined && sessionStorage[elementName] == element.value) {
          // set radiobutton to checked to match autosaved value
          element.checked = true;
        }
      });
    });

  })();
};

// LIST OF VARIABLES FOR LETTER OUTPUT
let templateType = ""; // to be used as parameter for setLetterTemplate() to update the output template on next step button click
let city = ""; // used for municipality section to set appropriate city name

// LIST OF VARIABLES FOR SPECIFIC ANSWERS
 // #ticket-number-section
let ticketNumberAnswer = "";
  // #ticket-reason-section
let ticketReason = "";
let checkBylawsPlainLanguageHint = "";
let ticketBylawExplanation = "";
  // #ticket-appeal-bylaw-section
let ticketAppealBylawAnswer = "";
let checkBylawsIntroParagraph = ""; // customized questionanire info box phrasing by city
  // #ticket-accuracy-section
let ticketErrorDescriptionAnswer = "";
  // #private-ticket-appeal-section
let privateTicketAppealAnswer = "";
  // #ticket-date-section
let ticketDay = document.getElementById("ticket-day-number").value;
let ticketMonth = document.getElementById("ticket-month").value;
let ticketYear = document.getElementById("ticket-year-text").value;
let ticketDate = ticketMonth + " " + ticketDay + ", "+ ticketYear;
  // #contact-details-section
let emailAnswer = "";
  // #name-section
let nameAnswer = "";
  // #mailing-address-section
let mailAddressAnswer = "";

// QUESTIONNAIRE SECTIONS
// Generic step 1 - What is your parking problem?
  // update visibiilty conditions
const parkingProblemRadioSelection = () => {
  for (let i = 0; i < parkingProblemRadioOptions.length; i++) {
    if (parkingProblemRadioOptions[i].checked) {
      if (parkingProblemRadioOptions[i].value === "1") {
        sectionsShowHideObj.hideTheseSectionsArray = [
          formSections.cityUnavailableSection,
          formSections.studentOrEmployeeSection,
          formSections.potentialIssueSection,
          formSections.checkBylawsSection,
          formSections.privateTicketAppealSection
        ];
        sectionsShowHideObj.showTheseSectionsArray = [
          formSections.welcomeSection,
          formSections.parkingProblemSection,
          formSections.parkingTicketIssuerSection,
          formSections.municipalitySection,
          formSections.ticketNumberSection,
          formSections.ticketAccuracySection,
          formSections.ticketReasonSection,
          formSections.ticketAppealBylawSection,
          formSections.nameSection,
          formSections.contactDetailsSection,
          formSections.mailingAddressSection,
          formSections.finishedSectionDiv
        ];

        return templateType = "city";
      }
      else if (parkingProblemRadioOptions[i].value === "2") {
        sectionsShowHideObj.hideTheseSectionsArray = [
          formSections.potentialIssueSection,
          formSections.checkBylawsSection,
          formSections.parkingTicketIssuerSection,
          formSections.municipalitySection,
          formSections.cityUnavailableSection,
          formSections.studentOrEmployeeSection,
          formSections.ticketAppealBylawSection,
          formSections.ticketNumberSection,
          formSections.ticketAccuracySection,
          formSections.ticketReasonSection,
          formSections.ticketAppealBylawSection,
          formSections.privateTicketAppealSection,
          formSections.ticketDateSection,
          formSections.nameSection,
          formSections.contactDetailsSection,
          formSections.mailingAddressSection,
          formSections.photoUploadSection];
        sectionsShowHideObj.showTheseSectionsArray = [
          formSections.welcomeSection,
          formSections.parkingProblemSection,
          formSections.finishedSectionDiv
        ];
        return templateType = "report abandoned vehicle";
      }
      else if (parkingProblemRadioOptions[i].value === "3") {
        sectionsShowHideObj.hideTheseSectionsArray = [
          formSections.parkingTicketIssuerSection,
          formSections.municipalitySection,
          formSections.cityUnavailableSection,
          formSections.studentOrEmployeeSection,
          formSections.ticketAppealBylawSection,
          formSections.ticketNumberSection,
          formSections.ticketAccuracySection,
          formSections.ticketReasonSection,
          formSections.ticketAppealBylawSection,
          formSections.privateTicketAppealSection,
          formSections.ticketDateSection,
          formSections.nameSection,
          formSections.contactDetailsSection,
          formSections.mailingAddressSection,
          formSections.photoUploadSection];
        sectionsShowHideObj.showTheseSectionsArray = [
          formSections.welcomeSection,
          formSections.parkingProblemSection,
          formSections.potentialIssueSection,
          formSections.checkBylawsSection
        ];
        return templateType = "";
      }
   }
 }
};

// .ticket-issuer-section - Who issued your ticket?
  // Update dependant visibiilty conditions
const ticketIssuerSelection = () => {
  for (let i = 0; i < ticketIssuerRadioOptions.length; i++) {
    if (ticketIssuerRadioOptions[i].checked) {
      if (ticketIssuerRadioOptions[i].value === "1") {
        sectionsShowHideObj.hideTheseSectionsArray = [
          formSections.studentOrEmployeeSection,
          formSections.privateTicketAppealSection
        ];
        sectionsShowHideObj.showTheseSectionsArray = [
          formSections.welcomeSection,
          formSections.parkingProblemSection,
          formSections.parkingTicketIssuerSection,
          formSections.municipalitySection,
          formSections.ticketNumberSection,
          formSections.ticketAccuracySection,
          formSections.ticketReasonSection,
          formSections.ticketAppealBylawSection,
          formSections.photoUploadSection,
          formSections.ticketDateSection,
          formSections.nameSection,
          formSections.contactDetailsSection,
          formSections.mailingAddressSection,
          formSections.finishedSectionDiv
        ];
        return templateType = "city";
      }
      else if (ticketIssuerRadioOptions[i].value === "2") {
        sectionsShowHideObj.hideTheseSectionsArray = [
          formSections.municipalitySection
        ];
        sectionsShowHideObj.showTheseSectionsArray = [
          formSections.welcomeSection,
          formSections.parkingProblemSection,
          formSections.parkingTicketIssuerSection,
          formSections.ticketNumberSection,
          formSections.ticketAccuracySection,
          formSections.ticketReasonSection,
          formSections.privateTicketAppealSection,
          formSections.photoUploadSection,
          formSections.ticketDateSection,
          formSections.nameSection,
          formSections.contactDetailsSection,
          formSections.mailingAddressSection,
          formSections.finishedSectionDiv
        ];
        return templateType = "private operator";
      }
      else if (ticketIssuerRadioOptions[i].value === "3") {
        sectionsShowHideObj.hideTheseSectionsArray = [
          formSections.municipalitySection
        ];
        sectionsShowHideObj.showTheseSectionsArray = [
          formSections.welcomeSection,
          formSections.parkingProblemSection,
          formSections.parkingTicketIssuerSection,
          formSections.studentOrEmployeeSection,
          formSections.ticketNumberSection,
          formSections.ticketAccuracySection,
          formSections.ticketReasonSection,
          formSections.privateTicketAppealSection,
          formSections.photoUploadSection,
          formSections.ticketDateSection,
          formSections.nameSection,
          formSections.contactDetailsSection,
          formSections.mailingAddressSection,
          formSections.finishedSectionDiv
        ];
        return templateType = "institution";
        }
      }
    }
};

// #municipality-section
  // update sub-section visibility conditions
const municipalityRadioSelection = () => {
  for (let i = 0; i < municipalityRadioOptions.length; i++) {
    if (municipalityRadioOptions[i].checked) {
      if (municipalityRadioOptions[i].value === "1") {
        sectionsShowHideObj.hideTheseSectionsArray = [
          formSections.cityUnavailableSection
        ];
        sectionsShowHideObj.showTheseSectionsArray = [
          formSections.welcomeSection,
          formSections.parkingProblemSection,
          formSections.parkingTicketIssuerSection,
          formSections.municipalitySection,
          formSections.ticketNumberSection,
          formSections.ticketAccuracySection,
          formSections.ticketReasonSection,
          formSections.ticketAppealBylawSection,
          formSections.privateTicketAppealSection,
          formSections.photoUploadSection,
          formSections.ticketDateSection,
          formSections.nameSection,
          formSections.contactDetailsSection,
          formSections.mailingAddressSection,
          formSections.finishedSectionDiv
        ];
        return city = "City of Edmonton";
      }
      else if (municipalityRadioOptions[i].value === "2") {
    //  sectionsShowHideObj.hideTheseSectionsArray = [];
        sectionsShowHideObj.showTheseSectionsArray = [
          formSections.welcomeSection,
          formSections.parkingProblemSection,
          formSections.parkingTicketIssuerSection,
          formSections.municipalitySection,
          formSections.cityUnavailableSection,
          formSections.ticketNumberSection,
          formSections.ticketAccuracySection,
          formSections.ticketReasonSection,
          formSections.ticketAppealBylawSection,
          formSections.privateTicketAppealSection,
          formSections.photoUploadSection,
          formSections.ticketDateSection,
          formSections.nameSection,
          formSections.contactDetailsSection,
          formSections.mailingAddressSection,
          formSections.finishedSectionDiv
        ];
        return city = document.getElementById("new-city-request-textfield").value;
      }
    }
  }
};

// #student-or-employee-section
  // update sub-section visibility conditions
const studentOrEmployeeRadioSelection = () => {
  for (let i = 0; i < studentOrEmployeeRadioOptions.length; i++) {
    if (studentOrEmployeeRadioOptions[i].checked) {
      if (studentOrEmployeeRadioOptions[i].value === "1") {
        // No change to sectionsShowHideObj.hideTheseSectionsArray or sectionsShowHideObj.showTheseSectionsArray
        document.getElementById("student-employee-tip").style.display = "block";
      }
      else if (studentOrEmployeeRadioOptions[i].value === "2") {
        document.getElementById("student-employee-tip").style.display = "none";
      }
    }
  }
};


// #ticket-number-section
  // To update output text
document.getElementById("ticket-number-text-field").onchange = () => {
  ticketNumberAnswer = document.getElementById("ticket-number-text-field").value;
};
// #ticket-accuracy-section
  // gatekeeper function for displaying subsection
const ticketAccuracyRadioSelection = () => {
  for (let i = 0; i < ticketAccuracyRadioOptions.length; i++) {
    if (ticketAccuracyRadioOptions[i].checked) {
      if (ticketAccuracyRadioOptions[i].value === "1") {
        formSections.ticketErrorDescriptionSubSection.style.display = "block";
        document.getElementById("ticket-error-description-text-field").onchange = () => {
          return ticketErrorDescriptionAnswer = document.getElementById("ticket-error-description-text-field").value;
        }
        return "The ticket has incorrect details.</li> " + formatSentenceEnding(upperCaseFirstLetter(ticketErrorDescriptionAnswer));
      } else if (ticketAccuracyRadioOptions[i].value === "2") {
          formSections.ticketErrorDescriptionSubSection.style.display = "none";
          return ticketErrorDescriptionAnswer = "";
      }
    }
  }
};

// #ticket-reason-section
  // Function for setting the correct ticket reason text
const ticketReasonRadioSelection = () => {
  for (let i = 0; i < ticketReasonRadioOptions.length; i++) {
    if (ticketReasonRadioOptions[i].checked) {
      switch (i) {
        case 0:
          formSections.ticketReasonOtherSubSection.style.display = "none";
          ticketReason = bylawTextObj.ticketReason1;
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint1;
          ticketBylawExplanation = bylawTextObj.ticketBylawExplanation1;
          break;
        case 1:
          formSections.ticketReasonOtherSubSection.style.display = "none";
          ticketReason = bylawTextObj.ticketReason2;
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint2;
          ticketBylawExplanation = bylawTextObj.ticketBylawExplanation2;
          break;
        case 2:
          formSections.ticketReasonOtherSubSection.style.display = "none";
          ticketReason = bylawTextObj.ticketReason3;
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint3;
          ticketBylawExplanation = bylawTextObj.ticketBylawExplanation3;
          break;
        case 3:
          formSections.ticketReasonOtherSubSection.style.display = "none";
          ticketReason = bylawTextObj.ticketReason4;
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint4;
          ticketBylawExplanation = bylawTextObj.ticketBylawExplanation4;
          break;
        case 4:
          formSections.ticketReasonOtherSubSection.style.display = "none";
          ticketReason = bylawTextObj.ticketReason5;
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint5;
          ticketBylawExplanation = bylawTextObj.ticketBylawExplanation;
          break;
        case 5:
          formSections.ticketReasonOtherSubSection.style.display = "none";
          ticketReason = bylawTextObj.ticketReason6;
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint6;
          ticketBylawExplanation = bylawTextObj.ticketBylawExplanation6;
          break;
        case 6:
          formSections.ticketReasonOtherSubSection.style.display = "none";
          ticketReason = bylawTextObj.ticketReason7;
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint7;
          ticketBylawExplanation = bylawTextObj.ticketBylawExplanation7;
          break;
        case 7:
          formSections.ticketReasonOtherSubSection.style.display = "none";
          ticketReason = bylawTextObj.ticketReason8;
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint8;
          ticketBylawExplanation = bylawTextObj.ticketBylawExplanation8;
          break;
        case 8:
          formSections.ticketReasonOtherSubSection.style.display = "none";
          ticketReason = bylawTextObj.ticketReason9;
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint9;
          ticketBylawExplanation = bylawTextObj.ticketBylawExplanation9;
          break;
        case 9:
          formSections.ticketReasonOtherSubSection.style.display = "none";
          ticketReason = bylawTextObj.ticketReason10;
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint10;
          ticketBylawExplanation = bylawTextObj.ticketBylawExplanation10;
          break;
        case 10:
          formSections.ticketReasonOtherSubSection.style.display = "none";
          ticketReason = bylawTextObj.ticketReason11;
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint11;
          ticketBylawExplanation = bylawTextObj.ticketBylawExplanation11;
          break;
        case 11:
          formSections.ticketReasonOtherSubSection.style.display = "none";
          ticketReason = bylawTextObj.ticketReason12;
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint12;
          ticketBylawExplanation = bylawTextObj.ticketBylawExplanation12;
          break;
        case 12:
          formSections.ticketReasonOtherSubSection.style.display = "none";
          ticketReason = bylawTextObj.ticketReason13;
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint13;
          ticketBylawExplanation = bylawTextObj.ticketBylawExplanation13;
          break;
        case 13:
          formSections.ticketReasonOtherSubSection.style.display = "none";
          ticketReason = bylawTextObj.ticketReason14;
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint14;
          ticketBylawExplanation = bylawTextObj.ticketBylawExplanation14;
          break;
        case 14:
          formSections.ticketReasonOtherSubSection.style.display = "none";
          ticketReason = bylawTextObj.ticketReason15;
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint15;
          ticketBylawExplanation = bylawTextObj.ticketBylawExplanation15;
          break;
        case 15:
          formSections.ticketReasonOtherSubSection.style.display = "none";
          ticketReason = bylawTextObj.ticketReason16;
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint16;
          ticketBylawExplanation = bylawTextObj.ticketBylawExplanation16;
          break;
        case 16:
          formSections.ticketReasonOtherSubSection.style.display = "none";
          ticketReason = bylawTextObj.ticketReason17;
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint17;
          ticketBylawExplanation = bylawTextObj.ticketBylawExplanation17;
          break;
        case 17:
          formSections.ticketReasonOtherSubSection.style.display = "none";
          ticketReason = bylawTextObj.ticketReason18;
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint18;
          ticketBylawExplanation = bylawTextObj.ticketBylawExplanation18;
          break;
        case 18:
          formSections.ticketReasonOtherSubSection.style.display = "none";
          ticketReason = bylawTextObj.ticketReason19;
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint19;
          ticketBylawExplanation = bylawTextObj.ticketBylawExplanation19;
          break;
        case 19:
          formSections.ticketReasonOtherSubSection.style.display = "none";
          ticketReason = bylawTextObj.ticketReason20;
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint20;
          ticketBylawExplanation = bylawTextObj.ticketBylawExplanation20;
          break;
        case 20:
          formSections.ticketReasonOtherSubSection.style.display = "none";
          ticketReason = bylawTextObj.ticketReason21;
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint21;
          ticketBylawExplanation = bylawTextObj.ticketBylawExplanation21;
          break;
        case 21:
          formSections.ticketReasonOtherSubSection.style.display = "none";
          ticketReason = bylawTextObj.ticketReason22;
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint22;
          ticketBylawExplanation = bylawTextObj.ticketBylawExplanation22;
          break;
        case 22:
          formSections.ticketReasonOtherSubSection.style.display = "none";
          ticketReason = bylawTextObj.ticketReason23;
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint23;
          ticketBylawExplanation = bylawTextObj.ticketBylawExplanation23;
          break;
        case 23:
          formSections.ticketReasonOtherSubSection.style.display = "none";
          ticketReason = bylawTextObj.ticketReason24;
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint24;
          ticketBylawExplanation = bylawTextObj.ticketBylawExplanation24;
          break;
        case 24:
          formSections.ticketReasonOtherSubSection.style.display = "none";
          ticketReason = bylawTextObj.ticketReason25;
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint25;
          ticketBylawExplanation = bylawTextObj.ticketBylawExplanation25;
          break;
        case 25:
          formSections.ticketReasonOtherSubSection.style.display = "none";
          ticketReason = bylawTextObj.ticketReason26;
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint26;
          ticketBylawExplanation = bylawTextObj.ticketBylawExplanation26;
          break;
        case 26:
          formSections.ticketReasonOtherSubSection.style.display = "none";
          ticketReason = bylawTextObj.ticketReason27;
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint27;
          ticketBylawExplanation = bylawTextObj.ticketBylawExplanation27;
          break;
        case 27:
          formSections.ticketReasonOtherSubSection.style.display = "none";
          ticketReason = bylawTextObj.ticketReason28;
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint28;
          ticketBylawExplanation = bylawTextObj.ticketBylawExplanation28;
          break;
        case 28:
          formSections.ticketReasonOtherSubSection.style.display = "none";
          ticketReason = bylawTextObj.ticketReason29;
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint29;
          ticketBylawExplanation = bylawTextObj.ticketBylawExplanation29;
          break;
        case 29:
          formSections.ticketReasonOtherSubSection.style.display = "none";
          ticketReason = bylawTextObj.ticketReason30;
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint30;
          ticketBylawExplanation = bylawTextObj.ticketBylawExplanation30;
          break;
        case 30:
          formSections.ticketReasonOtherSubSection.style.display = "none";
          ticketReason = bylawTextObj.ticketReason31;
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint31;
          ticketBylawExplanation = bylawTextObj.ticketBylawExplanation31;
          break;
        case 31:
          formSections.ticketReasonOtherSubSection.style.display = "none";
          ticketReason = bylawTextObj.ticketReason32;
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint32;
          ticketBylawExplanation = bylawTextObj.ticketBylawExplanation32;
          break;
        case 32:
          formSections.ticketReasonOtherSubSection.style.display = "none";
          ticketReason = bylawTextObj.ticketReason33;
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint33;
          ticketBylawExplanation = bylawTextObj.ticketBylawExplanation33;
          break;
        case 33:
          formSections.ticketReasonOtherSubSection.style.display = "none";
          ticketReason = bylawTextObj.ticketReason34;
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint34;
          ticketBylawExplanation = bylawTextObj.ticketBylawExplanation34;
          break;
        case 34:
          formSections.ticketReasonOtherSubSection.style.display = "block";
          ticketReason = document.getElementById("ticket-reason-other-text-field").value;
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint35;
          ticketBylawExplanation = bylawTextObj.ticketBylawExplanation35;
          break;
        default:
          formSections.ticketReasonOtherSubSection.style.display = "none";
          ticketReason = "";
          checkBylawsPlainLanguageHint = "";
          ticketBylawExplanation = "";
      }
    }
  }
};

// #ticket-appeal-bylaw-section
  // gatekeeper function for displaying subsection
const ticketAppealBylawRadioSelection = () => {
  // Bylaw info box output
  checkBylawsIntroParagraph = "Here's the " + city + "&#39;s bylaw:";
  document.getElementById("check-bylaw-correct-primary-question-2-insert-here").innerHTML = checkBylawsIntroParagraph;
  document.getElementById("bylaw-plain-language-hint-2-insert-here").innerHTML = checkBylawsPlainLanguageHint;
  document.getElementById("city-bylaw-name-2").innerHTML = cityBylawName;
  document.getElementById("insert-bylaw-correct-info-box-text-here").innerHTML = ticketBylawExplanation;
  // radio button conditions
  for (let i = 0; i < ticketAppealBylawRadioOptions.length; i++) {
    if (ticketAppealBylawRadioOptions[i].checked) {
      if (ticketAppealBylawRadioOptions[i].value === "1") {
        formSections.ticketAppealSubSection.style.display = "none";
        return ticketAppealBylawAnswer = "";
      } else if (ticketAppealBylawRadioOptions[i].value === "2") {
          formSections.ticketAppealSubSection.style.display = "block";
          document.getElementById("incorrect-bylaw-text-field").onchange = () => {
               ticketAppealBylawAnswer = document.getElementById("incorrect-bylaw-text-field").value;
               return ticketAppealBylawAnswer;
          };
          return "I don't believe the bylaw should apply because " + formatSentenceEnding(lowerCaseFirstLetter(ticketAppealBylawAnswer));
      }
    }
  }
};

// #private-ticket-appeal-section
document.getElementById("private-ticket-appeal-text-field").onchange = () => {
  if (document.getElementById("private-ticket-appeal-text-field").value) {
     return privateTicketAppealAnswer = document.getElementById("private-ticket-appeal-text-field").value;
  } else {
     return privateTicketAppealAnswer = "";
  }
};

// #name-section
  // functions to update nameAnswer
document.getElementById("person-name-text-field").onchange = () => {
  if (document.getElementById("person-name-text-field").value) {
    return nameAnswer = document.getElementById("person-name-text-field").value;
  } else {
    return nameAnswer = "_______________";
  }
};

// #contact-details-section
  // Functions to update emailAnswer
document.getElementById("email-field").onchange = () => {
  if (document.getElementById("email-field").value) {
    return emailAnswer = document.getElementById("email-field").value;
  } else {
    return emailAnswer = "_______________";
  }
};

// #mailing-address-section
  // function to update mailAddressAnswer
document.getElementById("mailing-address-text-field").onchange = () => {
  if (document.getElementById("mailing-address-text-field").value) {
    return mailAddressAnswer = document.getElementById("mailing-address-text-field").value;
  } else {
    return mailAddressAnswer = "_______________<br>_______________";
  }
};

// #potential-issue-section
  // Function for displaying bylaw text in the form
const displayPotentialTicketContent = () => {
  checkBylawsIntroParagraph = "Hey, I found this in the " + city + "&#39;s bylaws:";
  document.getElementById("check-bylaw-primary-question-insert-here").innerHTML = checkBylawsIntroParagraph;
  document.getElementById("bylaw-plain-language-hint-insert-here").innerHTML = checkBylawsPlainLanguageHint;
  document.getElementById("city-bylaw-name").innerHTML = cityBylawName;
  document.getElementById("insert-check-bylaw-info-box-text-here").innerHTML = ticketBylawExplanation;
};

  // Function for setting the correct parking bylaw text
const potentialTicketRadioSelection = () => {
  for (let i = 0; i < potentialTicketRadioOptions.length; i++) {
    if (potentialTicketRadioOptions[i].checked) {
      switch (i) {
        case 0:
          ticketReason = bylawTextObj.ticketReason6;
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint6;
          ticketBylawExplanation = bylawTextObj.ticketBylawExplanation6;
          displayPotentialTicketContent();
          break;
        case 1:
          ticketReason = bylawTextObj.ticketReason7;
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint7;
          ticketBylawExplanation = bylawTextObj.ticketBylawExplanation7;
          displayPotentialTicketContent();
          break;
        case 2:
          ticketReason = bylawTextObj.ticketReason8;
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint8;
          ticketBylawExplanation = bylawTextObj.ticketBylawExplanation8;
          displayPotentialTicketContent();
          break;
        case 3:
          ticketReason = bylawTextObj.ticketReason9;
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint9;
          ticketBylawExplanation = bylawTextObj.ticketBylawExplanation9;
          displayPotentialTicketContent();
          break;
        case 4:
          ticketReason = bylawTextObj.ticketReason24;
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint24;
          ticketBylawExplanation = bylawTextObj.ticketBylawExplanation;
          displayPotentialTicketContent();
          break;
        case 5:
          ticketReason = bylawTextObj.ticketReason26;
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint26;
          ticketBylawExplanation = bylawTextObj.ticketBylawExplanation26;
          displayPotentialTicketContent();
          break;
        case 6:
          ticketReason = bylawTextObj.ticketReason32;
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint32;
          ticketBylawExplanation = bylawTextObj.ticketBylawExplanation32;
          displayPotentialTicketContent();
          break;
        case 7:
          ticketReason = bylawTextObj.ticketReason28;
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint28;
          ticketBylawExplanation = bylawTextObj.ticketBylawExplanation28;
          displayPotentialTicketContent();
          break;
        case 8:
          ticketReason = bylawTextObj.ticketReason10;
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint10;
          ticketBylawExplanation = bylawTextObj.ticketBylawExplanation10;
          displayPotentialTicketContent();
          break;
        case 9:
          ticketReason = bylawTextObj.ticketReason11;
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint11;
          ticketBylawExplanation = bylawTextObj.ticketBylawExplanation11;
          displayPotentialTicketContent();
          break;
        case 10:
          ticketReason = bylawTextObj.ticketReason4;
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint4;
          ticketBylawExplanation = bylawTextObj.ticketBylawExplanation4;
          displayPotentialTicketContent();
          break;
        case 11:
          ticketReason = bylawTextObj.ticketReason5;
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint5;
          ticketBylawExplanation = bylawTextObj.ticketBylawExplanation5;
          displayPotentialTicketContent();
          break;
        case 12:
          ticketReason = bylawTextObj.ticketReason12;
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint12;
          ticketBylawExplanation = bylawTextObj.ticketBylawExplanation12;
          displayPotentialTicketContent();
          break;
        case 13:
          ticketReason = bylawTextObj.ticketReason13;
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint13;
          ticketBylawExplanation = bylawTextObj.ticketBylawExplanation13;
          displayPotentialTicketContent();
          break;
        case 14:
          ticketReason = bylawTextObj.ticketReason14;
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint14;
          ticketBylawExplanation = bylawTextObj.ticketBylawExplanation14;
          displayPotentialTicketContent();
          break;
        case 15:
          ticketReason = bylawTextObj.ticketReason15;
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint15;
          ticketBylawExplanation = bylawTextObj.ticketBylawExplanation15;
          displayPotentialTicketContent();
          break;
        case 16:
          ticketReason = bylawTextObj.ticketReason16;
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint16;
          ticketBylawExplanation = bylawTextObj.ticketBylawExplanation16;
          displayPotentialTicketContent();
          break;
        case 17:
          ticketReason = bylawTextObj.ticketReason17;
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint17;
          ticketBylawExplanation = bylawTextObj.ticketBylawExplanation17;
          displayPotentialTicketContent();
          break;
        case 18:
          ticketReason = bylawTextObj.ticketReason18;
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint18;
          ticketBylawExplanation = bylawTextObj.ticketBylawExplanation18;
          displayPotentialTicketContent();
          break;
        case 19:
          ticketReason = bylawTextObj.ticketReason19;
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint19;
          ticketBylawExplanation = bylawTextObj.ticketBylawExplanation19;
          displayPotentialTicketContent();
          break;
        case 20:
          ticketReason = bylawTextObj.ticketReason21;
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint21;
          ticketBylawExplanation = bylawTextObj.ticketBylawExplanation21;
          displayPotentialTicketContent();
          break;
        case 21:
          ticketReason = bylawTextObj.ticketReason22;
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint22;
          ticketBylawExplanation = bylawTextObj.ticketBylawExplanation22;
          displayPotentialTicketContent();
          break;
        case 22:
          ticketReason = bylawTextObj.ticketReason23;
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint23;
          ticketBylawExplanation = bylawTextObj.ticketBylawExplanation23;
          displayPotentialTicketContent();
          break;
        case 23:
          ticketReason = bylawTextObj.ticketReason25;
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint25;
          ticketBylawExplanation = bylawTextObj.ticketBylawExplanation25;
          displayPotentialTicketContent();
          break;
        case 24:
          ticketReason = bylawTextObj.ticketReason27;
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint27;
          ticketBylawExplanation = bylawTextObj.ticketBylawExplanation27;
          displayPotentialTicketContent();
          break;
        case 25:
          ticketReason = bylawTextObj.ticketReason29;
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint29;
          ticketBylawExplanation = bylawTextObj.ticketBylawExplanation29;
          displayPotentialTicketContent();
          break;
        case 26:
          ticketReason = bylawTextObj.ticketReason30;
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint30;
          ticketBylawExplanation = bylawTextObj.ticketBylawExplanation30;
          displayPotentialTicketContent();
          break;
        case 27:
          ticketReason = bylawTextObj.ticketReason31;
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint31;
          ticketBylawExplanation = bylawTextObj.ticketBylawExplanation31;
          displayPotentialTicketContent();
          break;
        case 28:
          ticketReason = bylawTextObj.ticketReason33;
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint33;
          ticketBylawExplanation = bylawTextObj.ticketBylawExplanation33;
          displayPotentialTicketContent();
          break;
        case 29:
          ticketReason = bylawTextObj.ticketReason34;
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint34;
          ticketBylawExplanation = bylawTextObj.ticketBylawExplanation34;
          displayPotentialTicketContent();
          break;
        case 30:
          ticketReason = bylawTextObj.ticketReason3;
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint3;
          ticketBylawExplanation = bylawTextObj.ticketBylawExplanation3;
          displayPotentialTicketContent();
          break;
        case 31:
          ticketReason = bylawTextObj.ticketReason2;
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint2;
          ticketBylawExplanation = bylawTextObj.ticketBylawExplanation2;
          displayPotentialTicketContent();
          break;
        case 32:
          ticketReason = bylawTextObj.ticketReason1;
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint1;
          ticketBylawExplanation = bylawTextObj.ticketBylawExplanation1;
          displayPotentialTicketContent();
          break;
        case 33:
          ticketReason = bylawTextObj.ticketReason20;
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint20;
          ticketBylawExplanation = bylawTextObj.ticketBylawExplanation20;
          displayPotentialTicketContent();
          break;
        case 34:
          ticketReason = bylawTextObj.ticketReason35;
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint35;
          ticketBylawExplanation = bylawTextObj.ticketBylawExplanation35;
          displayPotentialTicketContent();
          break;
        default:
          ticketReason = "";
          checkBylawsPlainLanguageHint = "";
          ticketBylawExplanation = "";
          displayPotentialTicketContent();
      }
    }
  }
};
setupRBEventListeners(); // To setup rb event listeners after all conditions are loaded
export {
  templateType, city, nameAnswer, mailAddressAnswer, currentDateFormatted, ticketNumberAnswer, ticketDate,
  ticketReason, emailAnswer, ticketAppealBylawAnswer, privateTicketAppealAnswer, ticketErrorDescriptionAnswer,
  parkingProblemRadioSelection, ticketIssuerSelection, municipalityRadioSelection, studentOrEmployeeRadioSelection,
  ticketAccuracyRadioSelection, ticketReasonRadioSelection, ticketAppealBylawRadioSelection, potentialTicketRadioSelection
};
