"use strict";

// TO LOAD DEFAULT VISIBILITY CONDITIONS (works)
window.onload = function setDefaultAnswerState() {
  document.getElementById("parking-form-content").reset();
  welcomeSection.scrollIntoView(true);
  buttonVisibility(); // to display proper button
};

// LIST OF VARIABLES
  // Array that will hold sections to hide
var hidePushThisArray = [];
  // Holds the total number of sections
const stepsQuestionnaire = document.getElementsByClassName("section-container");

  // Sections
const welcomeSection = document.getElementById("welcome-section");
const parkingProblemSection = document.getElementById("parking-problem-section");
  // If appealing ticket
const parkingTicketIssuerSection = document.getElementById("ticket-issuer-section");
  // If appealing city ticket
const municipalitySection = document.getElementById("municipality-section");
const cityUnavailableSection = document.getElementById("city-unavailable-section");
const ticketNumberSection = document.getElementById("ticket-number-section"); // also private operator
const ticketAccuracySection = document.getElementById("ticket-accuracy-section"); // also private operator
const ticketErrorDescriptionSubSection = document.getElementById("ticket-error-description-subsection"); // also private operator
const ticketReasonSection = document.getElementById("ticket-reason-section");
const ticketReasonOtherSubSection = document.getElementById("ticket-reason-other-subsection");
const ticketAppealBylawSection = document.getElementById("ticket-appeal-bylaw-section");
const ticketAppealSubSection = document.getElementById("ticket-appeal-bylaw-subsection");
const privateTicketAppealReason = document.getElementById("private-ticket-appeal-section"); // private operator and institution only
const photoUploadSection = document.getElementById("photo-upload-section"); // also private operator
const photoUploadPromptSubSection = document.getElementById("photo-upload-prompt-subsection"); // also private operator
const ticketDateSection = document.getElementById("ticket-date-section");
const nameSection = document.getElementById("name-section"); // also private operator
const contactDetailsSection = document.getElementById("contact-details-section"); // also private operator
const mailingAddressSection = document.getElementById("mailing-address-section"); // possibly also private operator
// If appealing university ticket
const studentOrEmployeeSection = document.getElementById("student-or-employee-section");
// If checking bylaws
const potentialIssueSection = document.getElementById("potential-issue-section");
const checkBylawsSection = document.getElementById("check-bylaw-info-section");
// last step
const finishedSectionDiv = document.getElementById("finished-section-container");
// Output
var templateType = ""; // to be used as parameter for outputTemplateText() to update the output template on next step button click
let cityOutputTemplate = "";
let abandonedVehicleOutputTemplate = "";
let privateOperatorOutputTemplate = "";
let institutionOutputTemplate = "";
let city = "";
let yesStudentOrEmployee = "";

// GENERIC FUNCTIONALITY - Previous/Next/Submit button visiblity and to scroll to next div/step. Needs to be initialized before question specific visibility conditions
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
        console.trace;
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
      for (let i = 0; i < stepToHide.length; i++) {
        if (stepsQuestionnaire[count] === stepToHide[0][i]) { // adding [0] necessary because ...stepToHide makes an array within an array
          if (stepsQuestionnaire[count+1] > stepsQuestionnaire.length) {
            finishedSectionDiv.scrollIntoView(true);
          } else {
              stepsQuestionnaire[count+1].style.display = "block";
              stepsQuestionnaire[count+1].scrollIntoView(true);
          }
        } else {
          stepsQuestionnaire[count].style.display = "block";
        }
      }
    };


  document.getElementById("button-next").onclick = function() {
    if (count < stepsQuestionnaire.length - 1) {
      count++;
      stepMakeVisible(hideTheseSectionsArray);
      applyActiveVisibilityConditions();
      stepsQuestionnaire[count].scrollIntoView(true);
      stepsQuestionnaire[count].style.opacity="1";
      stepsQuestionnaire[count-1].style.opacity="0.2"; // reduce opacity of a completed step so user focus is on current step
      checkButtonStep();
      skipPastNextHiddenSections();
      outputTemplateText(templateType);
    } else {
        checkButtonStep();
    } return count;
  };

  document.getElementById("button-previous").onclick = function() {
    if (count < 1) {
      checkButtonStep();
    } else if (count >= 1) {
        count--;
    //    stepMakeVisibleTest(hideTheseSectionsArray); // might not be necessary
    //    applyActiveVisibilityConditions(); // might not be necessary
        stepsQuestionnaire[count].style.opacity="1";
        stepsQuestionnaire[count+1].style.opacity="0.2";
        stepsQuestionnaire[count].scrollIntoView(true);
        checkButtonStep();
        skipPastPreviousHiddenSections();
        outputTemplateText(templateType);
    } return count;
  };

  // Added skipPast...HiddenSections() to prevent next/previous button onclick functions from trying to display hidden sections and requiring multiple clicks
  function skipPastNextHiddenSections() {
      while (stepsQuestionnaire[count].style.display === "none"){
        count++;
        stepMakeVisible(hideTheseSectionsArray);
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
         stepMakeVisible(hideTheseSectionsArray);
         applyActiveVisibilityConditions();
         stepsQuestionnaire[count].scrollIntoView(true);
         stepsQuestionnaire[count].style.opacity="1";
         stepsQuestionnaire[count+1].style.opacity="0.2";
         checkButtonStep();
       if (stepsQuestionnaire[count].style.display === "block") {
         break;
       }
     }
   }
};


// GENERIC FUNCTIONALITY: DETERMINE WHICH SECTIONS TO HIDE BY STORING THEM IN ARRAY
let hideTheseSectionsArray = [];

// Call whenever you want to hide sections
function hideSections(...addSections) {
  // Adds one section to hideTheseSectionsArray
  function addToHideTheseSectionsArray(addItem) {
    if (hideTheseSectionsArray.indexOf(addItem) === -1 && typeof addItem !== "undefined") { // Need to exclude undefined because one parameter (either addItem or subtractItem) is likely left blank in the original function call
      hideTheseSectionsArray.push(addItem);
      console.log("add to hideTheseSectionsArray so section will be hidden: ", addItem);
    } else {
        console.log("There's already an ", addItem, " here. Don't do anything");
    }
  }
  // Loop allows one or more sections to be passed as parameters in hideSections()
    for (let i = 0; i < addSections.length; i++) {
      addToHideTheseSectionsArray(addSections[i]);
    }
}

// Call whenever you want to unhide or make sure a section displays
function unhideSections(...subtractSections) {
  // Subtracts one section from hideTheseSectionsArray
  function subtractFromHideTheseSectionsArray(subtractItem) {
    if (hideTheseSectionsArray.indexOf(subtractItem) > -1 && typeof subtractItem !== "undefined") {
      var arrayIndex = hideTheseSectionsArray.indexOf(subtractItem);
      hideTheseSectionsArray.splice(arrayIndex);
      console.log("subtract from hideTheseSectionsArray so section will display: ", subtractItem);
      }
  }
  // Loop allows one or more sections to be passed as parameters to unhideSections()
    for (let i = 0; i < subtractSections.length; i++) {
      subtractFromHideTheseSectionsArray(subtractSections[i]);
    }
}

// Hide any sections present in hideTheseSectionsArray
function applyActiveVisibilityConditions() {
  console.log("applyActiveVisibilityConditions() runs on line 375. These are the steps to hide. Should not be blank.", hideTheseSectionsArray);
  if (hideTheseSectionsArray.length > 0) {
    for (let i = 0; i <= hideTheseSectionsArray.length; i++) {
      let hideThisSectionPlease = hideTheseSectionsArray[i];
      if (hideThisSectionPlease !== undefined) {
        hideThisSectionPlease.style.display = "none";
      }
    }
  }
};

// GENERIC FUNCTIONALITY: Add event listener to radio buttons within visibility condition function
function addRadioEventListener(radioClassName, updateConditionalsFunctionName) {
  for(let i = 0; i < radioClassName.length; i++) {
    radioClassName[i].addEventListener("change", updateConditionalsFunctionName, false);
  }
};

// GENERIC FUNCTIONALITY - To add whitespace to the end of the document so each section div will scroll to the top of the window when Next button selected
const setWhiteSpaceAtEndOfDocument = (function calcAndSetWhiteSpace() {
  var lastDivHeight = finishedSectionDiv.offsetHeight;
  var headerHeight = document.getElementById("header-main").offsetHeight;
  var footerHeight = document.getElementById("footer-main").offsetHeight;
  var newPadding = (window.innerHeight - lastDivHeight - headerHeight - footerHeight);
  var setNewPadding = document.getElementById("output").style.paddingBottom = newPadding + "px";
}());


// function to bulk hide steps based on which questionnaire path the user chooses
function hideSectionsNotInPath(path) {
  if (path === "city") {
    hideSections(
      cityUnavailableSection,
      studentOrEmployeeSection,
      potentialIssueSection,
      checkBylawsSection,
      privateTicketAppealReason);
    unhideSections(
      parkingTicketIssuerSection,
      municipalitySection,
      ticketNumberSection,
      ticketAccuracySection,
      ticketReasonSection,
      ticketAppealBylawSection,
      nameSection,
      contactDetailsSection,
      mailingAddressSection);
      console.log("hideTheseSectionsArray WORKS HERE:", hideTheseSectionsArray);
    applyActiveVisibilityConditions();
    outputTemplateText("city");
  } else if (path === "city unavailable") {
    hideSections(
      studentOrEmployeeSection,
      potentialIssueSection,
      checkBylawsSection,
      privateTicketAppealReason,
      parkingTicketIssuerSection,
      ticketNumberSection,
      ticketAccuracySection,
      ticketReasonSection,
      ticketAppealBylawSection,
      nameSection,
      ticketDateSection,
      contactDetailsSection,
      mailingAddressSection,
      photoUploadSection);
    console.log("STILL WORKING HERE. hideTheseSectionsArray holds: ", hideTheseSectionsArray);
    unhideSections(
      parkingProblemSection,
      municipalitySection,
      cityUnavailableSection);
      console.log("PROBLEM HAPPENS HERE: hideTheseSectionsArray should hold everything passed to hideSections()", hideTheseSectionsArray);
      applyActiveVisibilityConditions();
  // outputTemplateText("city");
    } else if (path === "private operator") {
      hideSections(
        potentialIssueSection,
        checkBylawsSection,
        municipalitySection,
        cityUnavailableSection,
        studentOrEmployeeSection,
        ticketReasonSection,
        ticketAppealBylawSection,
        municipalitySection,
        mailingAddressSection);
      unhideSections(
        parkingTicketIssuerSection,
        ticketNumberSection,
        ticketAccuracySection,
        privateTicketAppealReason,
        nameSection,
        contactDetailsSection);
      applyActiveVisibilityConditions();
      outputTemplateText("private operator");
  } else if (path === "private institution") {
      hideSections(
        potentialIssueSection,
        checkBylawsSection,
        municipalitySection,
        cityUnavailableSection,
        ticketReasonSection,
        ticketAppealBylawSection);
      unhideSections(
        parkingTicketIssuerSection,
        studentOrEmployeeSection,
        ticketNumberSection,
        ticketAccuracySection,
        privateTicketAppealReason,
        nameSection,
        contactDetailsSection,
        mailingAddressSection);
      applyActiveVisibilityConditions();
      outputTemplateText("private institution");
  } else if (path === "report abandoned vehicle") {
      hideSections(
        potentialIssueSection,
        checkBylawsSection,
        parkingTicketIssuerSection,
        municipalitySection,
        cityUnavailableSection,
        studentOrEmployeeSection,
        ticketAppealBylawSection,
        ticketNumberSection,
        ticketAccuracySection,
        ticketReasonSection,
        ticketAppealBylawSection,
        privateTicketAppealReason,
        ticketDateSection,
        nameSection,
        contactDetailsSection,
        mailingAddressSection,
        photoUploadSection);
      applyActiveVisibilityConditions();
      outputTemplateText("report abandoned vehicle");
  } else if (path === "check bylaws") {
      hideSections(
        parkingTicketIssuerSection,
        municipalitySection,
        cityUnavailableSection,
        studentOrEmployeeSection,
        ticketAppealBylawSection,
        ticketNumberSection,
        ticketAccuracySection,
        ticketReasonSection,
        ticketAppealBylawSection,
        privateTicketAppealReason,
        ticketDateSection,
        nameSection,
        contactDetailsSection,
        mailingAddressSection,
        photoUploadSection);
      unhideSections(
        potentialIssueSection,
        checkBylawsSection);
      applyActiveVisibilityConditions();
      outputTemplateText("check bylaws");
    }
};

// Generic function to grab current date and format it for letter
let currentDateUnformatted = new Date();
let currentDateFormatted = formatCurrentDate(currentDateUnformatted);

function formatCurrentDate(currentDateUnformatted) {
  let day = currentDateUnformatted.getDate();
//  let month = currentDateUnformatted.getMonth() + 1;
  let year = currentDateUnformatted.getFullYear();
  let monthArray = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"); // not available in Date object
  let month = monthArray[currentDateUnformatted.getMonth()];
  return month + " " + day.toString() + ", " + year.toString();
}

// Generic functions to upper or lowercase first letter in string
function upperCaseFirstLetter(sentence) {
  return sentence.charAt(0).toUpperCase() + sentence.slice(1);
}

function lowerCaseFirstLetter(sentence) {
  return sentence.charAt(0).toLowerCase() + sentence.slice(1);
}

// Generic function to prevent double . at end of sentence
function formatSentenceEnding(sentence) {
  if (sentence.endsWith(".")) {
    return sentence;
  } else if (sentence.endsWith(". ") || sentence.endsWith("  ")) {
    sentence = sentence.slice(0, -2);
    return sentence += ".";
  } else if (sentence.endsWith(" ")) {
    sentence = sentence.slice(0, -1);
    return sentence += ".";
  } else {
    return sentence += ".";
  }
}

// outputTemplateText() updates output text based on questionnaire selections
function outputTemplateText(answerValue) {
  if (answerValue === "city") {
    // Bylaw info box output
    checkBylawsIntroParagraph = "Here's the " + city + "&#39;s bylaw:";
    document.getElementById("check-bylaw-correct-primary-question-2-insert-here").innerHTML = checkBylawsIntroParagraph;
    document.getElementById("bylaw-plain-language-hint-2-insert-here").innerHTML = checkBylawsPlainLanguageHint;
    checkBylawsOutputTemplate = ticketBylawExplanation;
    document.getElementById("city-bylaw-name-2").innerHTML = cityBylawName;
    document.getElementById("insert-bylaw-correct-info-box-text-here").innerHTML = checkBylawsOutputTemplate;
    // Letter output
    cityOutputTemplate = // could move this to a separate file and reference in variable section at top of page
      "City of Edmonton, Bylaw Ticket Administration" +
      "<br>PO Box 2024" +
      "<br>Edmonton, AB  T5J 4M6" +
      "<br>" + nameAnswer +
      "<br>" + mailAddressAnswer +
      "<br>" + currentDateFormatted +
      "<br><br>RE: Appealing Parking Ticket: " + ticketNumberAnswer +
      "<br><br>To Whom It May Concern," +
      "<br><br>I received a parking ticket on " + ticketDate + " for " + ticketReason + ". While I appreciate that public streets are a shared resource and the " + city + " works hard to keep our roads safe, I am appealing the ticket for the following reasons:" +
      "<br><br>" + ticketErrorDescriptionAnswer +
      "<br>" + ticketAppealBylawAnswer +
      "<br><br>Thank you for considering my appeal. If you wish to discuss the issue further please contact me at " + emailAnswer + "." +
      "<br><br>Sincerely,<br><br><br>" +
      nameAnswer;
    document.getElementById("insert-output-text-here").innerHTML = cityOutputTemplate;
  } else if (answerValue === "report abandoned vehicle") {
      abandonedVehicleOutputTemplate =
      currentDateFormatted +
      "<br><br>RE: Abandoned Vehicle" +
      "<br><br>Dear Neighbour," +
      "<br><br>It appears that a vehicle that belongs to a resident of this home has been parked for an extended period in the neighbourhood. Our strees are a shared public resource so if this vehicle belongs to you or someone you know it would be appreciated if you could take action in moving the vehicle as bylaw 5590 considers vehicles parked for over 72hrs without moving to be abandoned." +
      "<br>Thank you for understanding. If you have any questions about parking bylaws you can call the city at #311." +
      "<br><br>Sincerely," +
      "<br><br>A neighbour";
      document.getElementById("insert-output-text-here").innerHTML = abandonedVehicleOutputTemplate;
  } else if (answerValue === "private operator") {
      privateOperatorOutputTemplate =
      currentDateFormatted +
      "<br><br>RE: Appealing Parking Ticket: " + ticketNumberAnswer +
      "<br><br>To Whom It May Concern," +
      "<br><br>I received a parking ticket on " + ticketDate + " for " + ticketReason + ". While I appreciate that private parking lots are an important city resource, I am requesting that the ticket be cancelled for the following reasons:" +
      "<br><br>" + ticketErrorDescriptionAnswer +
      "<br>" + privateTicketAppealAnswer +
      "<br><br>Thank you for taking my request seriously. If you wish to discuss the issue further please contact me at " + emailAnswer + "." +
      "<br><br>Sincerely,<br><br><br>" +
      nameAnswer;
      document.getElementById("insert-output-text-here").innerHTML = privateOperatorOutputTemplate;
  } else if (answerValue === "private institution") { // not working // may want this to be apart of additional info section and not the output
      institutionOutputTemplate =
      currentDateFormatted +
      "<br><br>RE: Appealing Parking Ticket: " + ticketNumberAnswer +
      "<br><br>To Whom It May Concern," +
      "<br><br>I received a parking ticket on " + ticketDate + " for " + ticketReason + ". Although I can appreciate that the available parking is limited, I am requesting that the ticket be cancelled for the following reasons:" +
      "<br><br>" + ticketErrorDescriptionAnswer +
      "<br>" + privateTicketAppealAnswer +
      "<br><br>Thank you for taking the time to consider my request. If you wish to discuss the issue further please contact me at " + emailAnswer + "." +
      "<br><br>Sincerely,<br><br><br>" +
      nameAnswer;
      document.getElementById("insert-output-text-here").innerHTML = institutionOutputTemplate;
  }
}
