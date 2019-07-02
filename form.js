"use strict";

// TO LOAD DEFAULT VISIBILITY CONDITIONS (works)
window.onload = function setDefaultAnswerState() {
  document.getElementById("parking-form-content").reset();
  welcomeSection.scrollIntoView(true);
  buttonVisibility(); // to display proper button
};

// LIST OF VARIABLES
  // Sections
const welcomeSection = document.getElementById("welcome-section");
const parkingProblemSection = document.getElementById("parking-problem-section");
    // If appealing ticket
const parkingTicketIssuerSection = document.getElementById("ticket-issuer-section");
    // If appealing city ticket
const municipalitySection = document.getElementById("municipality-section");
const newCityRequestSubsection = document.getElementById("new-city-request-subsection")
const ticketNumberSection = document.getElementById("ticket-number-section"); // also private operator
const ticketAccuracySection = document.getElementById("ticket-accuracy-section"); // also private operator
const ticketErrorDescriptionSubSection = document.getElementById("ticket-error-description-subsection"); // also private operator
const ticketReasonSection = document.getElementById("ticket-reason-section");
const ticketReasonOtherSubSection = document.getElementById("ticket-reason-other-subsection");
const ticketAppealBylawSection = document.getElementById("ticket-appeal-bylaw-section");
const ticketAppealSubSection = document.getElementById("ticket-appeal-bylaw-subsection");
const photoUploadSection = document.getElementById("photo-upload-section"); // also private operator
const photoUploadPromptSubSection = document.getElementById("photo-upload-prompt-subsection"); // also private operator
const ticketDateSection = document.getElementById("ticket-date-section");
const nameSection = document.getElementById("name-section"); // also private operator
const contactDetailsSection = document.getElementById("contact-details-section"); // also private operator
const mailingAddressSection = document.getElementById("mailing-address-section"); // possibly also private operator
    // If appealing university ticket
const studentOrEmployeeSection = document.getElementById("student-or-employee-section");

  // Output
let cityOutputTemplate = "";
let abandonedVehicleOutputTemplate = "";
let checkBylawsOutputTemplate = "";
let privateOperatorOutputTemplate = "";
let institutionOutputTemplate = "";
let city = "";
let yesStudentOrEmployee = "";

 // default array for sections to hide
var hidePushThisArray = [];

// variables for specific answers
 // .ticket-number-section
let ticketNumberAnswer = "";
  // .ticket-reason-section
let ticketReason = "";
let ticketBylawExplanation = "";
  // .ticket-appeal-bylaw-section
let ticketAppealBylawAnswer = "";
// .ticket-accuracy-section
let ticketErrorDescriptionAnswer = "";
  // .ticket-date-section
let ticketDay = document.getElementById("ticket-day-number").value;
let ticketMonth = document.getElementById("ticket-month").value;
let ticketYear = document.getElementById("ticket-year-text").value;
let ticketDate = ticketMonth + " " + ticketDay + ", "+ ticketYear;
// .contact-details-section
let emailAnswer = "";
// .name-section
let nameAnswer = "";
// .mailing-address-section
let mailAddressAnswer = "";

/*
// To set default answers/visibility. To be used on page load.
// CB VISIBILITY CONDITION (works)
const newsletterCheckbox = document.getElementById("newsletterSignUp");
// element to be hidden
const ticketDateOld = document.getElementById("ticket-date");
// run checkbox visibility function
const newsletterCheckboxVisiblity = (function() {
newsletterCheckbox.addEventListener("click", checkboxChanged);
function checkboxChanged() {
  if (newsletterCheckbox.checked === true) {
    ticketDateOld.style.display = "block";
  } else {
    ticketDateOld.style.display = "none";
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
      console.log("add an item: ", addItem);
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
      console.log("subtract:" + subtractItem);
      console.log(subtractItem);
      }
  }
  // Loop allows one or more sections to be passed as parameters to unhideSections()
    for (let i = 0; i < subtractSections.length; i++) {
      subtractFromHideTheseSectionsArray(subtractSections[i]);
    }
}

// Hide any sections present in hideTheseSectionsArray
function applyActiveVisibilityConditions() {
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
    console.log("radio event added", radioClassName);
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
    hideSections(studentOrEmployeeSection);
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
    applyActiveVisibilityConditions();
    outputTemplateText("city");
  } else if (path === "private operator") {
      hideSections(
        municipalitySection,
        studentOrEmployeeSection,
        ticketReasonSection,
        ticketAppealBylawSection,
        municipalitySection);
      unhideSections(
        parkingTicketIssuerSection,
        ticketNumberSection,
        ticketAccuracySection,
        ticketReasonSection,
        ticketAppealBylawSection,
        nameSection,
        contactDetailsSection,
        mailingAddressSection);
      applyActiveVisibilityConditions();
      outputTemplateText("private operator");
  } else if (path === "private institution") {
      hideSections(
        municipalitySection,
        ticketReasonSection,
        ticketAppealBylawSection);
      unhideSections(
        parkingTicketIssuerSection,
        studentOrEmployeeSection,
        ticketNumberSection,
        ticketAccuracySection,
        ticketReasonSection,
        ticketAppealBylawSection,
        nameSection,
        contactDetailsSection,
        mailingAddressSection);
      applyActiveVisibilityConditions();
      outputTemplateText("private institution");
  } else if (path === "report abandoned vehicle") {
      hideSections(
        parkingTicketIssuerSection,
        municipalitySection,
        studentOrEmployeeSection,
        ticketAppealBylawSection,
        ticketNumberSection,
        ticketAccuracySection,
        ticketReasonSection,
        ticketAppealBylawSection,
        nameSection,
        contactDetailsSection,
        mailingAddressSection);
      applyActiveVisibilityConditions();
      outputTemplateText("report abandoned vehicle");
  } else if (path === "check bylaws") {
      hideSections(
        parkingTicketIssuerSection,
        municipalitySection,
        studentOrEmployeeSection,
        ticketAppealBylawSection,
        ticketNumberSection,
        ticketAccuracySection,
        ticketReasonSection,
        ticketAppealBylawSection,
        nameSection,
        contactDetailsSection,
        mailingAddressSection);
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
function upperCaseFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function lowerCaseFirstLetter(string) {
    return string.charAt(0).toLowerCase() + string.slice(1);
}

// QUESTIONNAIRE SECTIONS - Should this be moved into own file?
// Generic step 1 - What is your parking problem?
  // update visibiilty conditions
const parkingProblemRadioSelection = (function updateParkingProblemConditionals() {
  const parkingProblemRadioOptions = document.querySelectorAll(".parking-problem-radio-class");
  addRadioEventListener(parkingProblemRadioOptions, updateParkingProblemConditionals);
  for (let i = 0; i < parkingProblemRadioOptions.length; i++) {
    if (parkingProblemRadioOptions[i].checked) {
      if (parkingProblemRadioOptions[i].value === "1") {
        hideSectionsNotInPath("city");
        return;
      }
      else if (parkingProblemRadioOptions[i].value === "2") {
        hideSectionsNotInPath("report abandoned vehicle");
        return;
      }
      else if (parkingProblemRadioOptions[i].value === "3") {
        hideSectionsNotInPath("check bylaws");
        return;
      }
    }
  }
}());
var templateType = ""; // to be used as parameter for outputTemplateText() to update the output on button click
// .ticket-issuer-section - Who issued your ticket?
  // Update dependant visibiilty conditions
const ticketIssuerRadioSelection = (function updateticketIssuerConditionals() {
  const ticketIssuerRadioOptions = document.querySelectorAll(".ticket-issuer-radio-class");
  addRadioEventListener(ticketIssuerRadioOptions, updateticketIssuerConditionals);
  for (let i = 0; i < ticketIssuerRadioOptions.length; i++) {
    if (ticketIssuerRadioOptions[i].checked) {
      if (ticketIssuerRadioOptions[i].value === "1") {
        hideSectionsNotInPath("city");
        applyActiveVisibilityConditions();
    //  outputTemplateText("city");
        return templateType = "city";

      }
      else if (ticketIssuerRadioOptions[i].value === "2") {
        hideSectionsNotInPath("private operator");
        applyActiveVisibilityConditions();
    //  outputTemplateText("private operator");
        return templateType = "private operator";;
      }
      else if (ticketIssuerRadioOptions[i].value === "3") {
        hideSectionsNotInPath("private institution");
        applyActiveVisibilityConditions();
    //  outputTemplateText("private institution");
        return templateType = "private institution";;
      }
    }
  }
}());
  // function to update output text based on questionnaire selection
function outputTemplateText(answerValue) {
  if (answerValue === "city") {
    cityOutputTemplate = // could move this to a separate file and reference in variable section at top of page
      "<br>" + nameAnswer + "<br>" +
      mailAddressAnswer + "<br>" +
      currentDateFormatted + "<br><br>" +
      "RE: Appealing Parking Ticket: " + ticketNumberAnswer + "<br><br>" +
      "To Whom it May Concern, <br><br>" +
      "I received a parking ticket on " + ticketDate + " for " + ticketReason + ". While I appreciate that public streets are a shared resource and the " + city + " works hard to keep our roads safe, I am appealing the ticket for the following reasons:<br>" +
      ticketErrorDescriptionAnswer +
      ticketAppealBylawAnswer +
      "Thank you for considering my appeal. If you wish to discuss the issue further please contact me at " + emailAnswer + ".<br>" +
      "<br>Sincerely,<br><br>" +
      nameAnswer;
    document.getElementById("insert-output-text-here").innerHTML = cityOutputTemplate;
  }
  else if (answerValue === "report abandoned vehicle") {
    abandonedVehicleOutputTemplate =
    "*Neighbour's mailing address*\n\n" +
    "*Today’s date*\n\n" +
    "RE: Abandoned Vehicle\n\n" +
    "Dear Neighbour, \n\n" +
    "<p>It appears that a vehicle that belongs to a resident of this home has been parked for an extended period in the neighbourhood. Our strees are a shared public resource so if this vehicle belongs to you or someone you know it would be appreciated if you could take action in moving the vehicle as *city bylaw 5590* considers vehicles parked for over 72hrs without moving to be abandoned.</p>\n" +
    "<p>Thank you for understanding. If you have any questions about parking bylaws you can call the city at #311.</p>" +
    "Sincerely,\n\n" +
    "A concerned neighbour";
    document.getElementById("insert-output-text-here").innerHTML = abandonedVehicleOutputTemplate;
  }
  else if (answerValue === "check bylaws") {
    checkBylawsOutputTemplate =
    "I took a look at " + city + "&#39;s bylaws and this is how I interpreted them: " +
    "*Insert bylaw interpretation*" +
    "However, please remember that I'm not a lawyer and don't guarantee this info is correct. Please check out *link to bylaw* yourself to be sure. :)";
    document.getElementById("insert-output-text-here").innerHTML = checkBylawsOutputTemplate;
  }
  else if (answerValue === "private operator") {
    privateOperatorOutputTemplate =
    "private operator letter goes here";
    document.getElementById("insert-output-text-here").innerHTML = privateOperatorOutputTemplate;
  }
  else if (answerValue === "private institution") { // not working // may want this to be apart of additional info section and not the output
    institutionOutputTemplate =
    yesStudentOrEmployee +
    "institution letter goes here";
    document.getElementById("insert-output-text-here").innerHTML = institutionOutputTemplate;
  }
}

// .municipality-section
  // update sub-section visibility conditions
const municipalityRadioSelection = (function updateMunicipalityConditionals() {
  const municipalityRadioOptions = document.querySelectorAll(".municipality-radio-class");
  addRadioEventListener(municipalityRadioOptions, updateMunicipalityConditionals);
  for (let i = 0; i < municipalityRadioOptions.length; i++) {
    if (municipalityRadioOptions[i].checked) {
      if (municipalityRadioOptions[i].value === "1") {
        newCityRequestSubsection.style.display = "none"; // Sub-sections need individual visibility conditions since they don't use hideTheseSectionsArray
        outputTextCity("1");
        return;
      }
      else if (municipalityRadioOptions[i].value === "2") {
        newCityRequestSubsection.style.display = "block";
        outputTextCity("2");
        return;
      }
    }
  }
}());
  // function to update output text
function outputTextCity(answerValue) {
  if (answerValue === "1") {
    city = "City of Edmonton";
    outputTemplateText("city"); // need to run outputTemplate() each time to update output text with new variable value
  }
  else if (answerValue === "2") {
    city = document.getElementById("new-city-request-textfield").value;
    outputTemplateText("city");
  }
}


// .student-or-employee-section
  // update sub-section visibility conditions
const studentOrEmployeeRadioSelection = (function updateStudentOrEmployeeConditionals() {
  const studentOrEmployeeRadioOptions = document.querySelectorAll(".student-or-employee-class");
  addRadioEventListener(studentOrEmployeeRadioOptions, updateStudentOrEmployeeConditionals);
  for (let i = 0; i < studentOrEmployeeRadioOptions.length; i++) {
    if (studentOrEmployeeRadioOptions[i].checked) {
      if (studentOrEmployeeRadioOptions[i].value === "1") {
        outputTextStudentOrEmployee("1");
        return;
      }
      else if (studentOrEmployeeRadioOptions[i].value === "2") {
        return;
      }
    }
  }
}());
  // function to update output text
function outputTextStudentOrEmployee(answerValue) {
  if (answerValue === "1") {
    yesStudentOrEmployee = "Note: As a student or employee of the issuer, be aware that although they can't force you to pay, the institution could withhold class credits or use other negative tactics against you if the vehicle is registered in your name and you refuse to pay the ticket.";
    outputTemplateText("private institution");
  } else if (answerValue === "2") {
    yesStudentOrEmployee = "";
    outputTemplateText("private institution")
  }
}

// .ticket-number-section
  // function to update output text
function updateTicketNumberAnswer() {
  ticketNumberAnswer = document.getElementById("ticket-number-text-field").value;
}
updateTicketNumberAnswer();

// .ticket-accuracy-section
  // gatekeeper function for displaying subsection
const ticketAccuracyRadioSelection = (function updateTicketAccuracyConditionals() {
  const ticketAccuracyRadioOptions = document.querySelectorAll(".ticket-accuracy-radio-class");
  addRadioEventListener(ticketAccuracyRadioOptions, updateTicketAccuracyConditionals);
  for (let i = 0; i < ticketAccuracyRadioOptions.length; i++) {
    if (ticketAccuracyRadioOptions[i].checked) {
      if (ticketAccuracyRadioOptions[i].value === "1") {
        ticketErrorDescriptionSubSection.style.display = "block";
        ticketErrorDescriptionAnswer = "The ticket has incorrect details. " + document.getElementById("ticket-error-description-text-field").value + ".<br>";
        return;
      } else if (ticketAccuracyRadioOptions[i].value === "2") {
          ticketErrorDescriptionSubSection.style.display = "none";
          ticketErrorDescriptionAnswer = "";
          return;
      }
    }
  }
}());

// .ticket-reason-section
  // Function for setting the correct ticket reason text
const ticketReasonRadioSelection = (function updateTicketReasonConditionals() {
  const ticketReasonRadioOptions = document.querySelectorAll(".ticket-reason-radio-class");
  addRadioEventListener(ticketReasonRadioOptions, updateTicketReasonConditionals);
  for (let i = 0; i < ticketReasonRadioOptions.length; i++) {
    if (ticketReasonRadioOptions[i].checked) {
      switch (i) {
        case 0:
          ticketReasonOtherSubSection.style.display = "none";
          ticketReason = "parking in an expired meter zone";
          ticketBylawExplanation = "s(42) (1) A vehicle shall not be parked on a highway in any space governed by a parking meter unless there is unexpired time remaining on themeter. \n(2) This section is only in effect on the days and during the times a parking meter is identified as being in effect. \n(3) This section does not apply to a vehicle displaying a valid andsubsisting permit issued by the City for metered space parking so long as all conditions of the permit are satisfied.";
          break;
        case 1:
          ticketReasonOtherSubSection.style.display = "none";
          ticketReason = "being parked in excess of posted limit in a time restricted zone";
          ticketBylawExplanation = "s(38) A vehicle shall not be parked on a highway in any location identified as a time limited zone for a period of time in excess of the time limit.";
          break;
        case 2:
          ticketReasonOtherSubSection.style.display = "none";
          ticketReason = "parking outside a metered space";
          ticketBylawExplanation = "s(43) A vehicle parked on a highway in any space governed by a parking meter shall: \n(a) be parked completely within the metered space; and \n(b) if the metered space is parallel to the edge of the roadway, be parked so that: \n(i) the front of the vehicle is as close as possible to the parking meter if the meter is situated at the front of the space; or \n(ii) the rear of the vehicle is  as close as possible to theparking meter if the meter is situated at  the rear ofthe space; or \n(iii) if the metered space is at an angle to the edge of the roadway, be parked so that the front of the vehicle is as close as possible to the parking meter.";
          break;
        case 3:
          ticketReasonOtherSubSection.style.display = "none";
          ticketReason = "parking in a closed pay and go zone";
          ticketBylawExplanation = "s(46) A vehicle shall not be parked on a highway in any space identifiedas a pay and display zone when that zone is closed.";
          break;
        case 4:
          ticketReasonOtherSubSection.style.display = "none";
          ticketReason = "parking in a space with a hooded meter";
          ticketBylawExplanation = "s(44) A vehicle shall not be parked on a highway in any space governed by a parking meter on which a hood or cover has been placed.";
          break;
        case 5:
          ticketReasonOtherSubSection.style.display = "none";
          ticketReason = "parking too close to a stop or yield sign";
          ticketBylawExplanation = "s(6) Unless a traffic control device permits or requires, a vehicle shallnot be parked in the case of an approach to a stop sign or yield signwithin 5 metres of the stop sign or yield sign.";
          break;
        case 6:
          ticketReasonOtherSubSection.style.display = "none";
          ticketReason = "parking too close to a crosswalk";
          ticketBylawExplanation = "s(5) Unless a traffic control device permits or requires, a vehicle shallnot be parked: \n(a) on a crosswalk or any part of a crosswalk; or \n(b) within 5 metres of the near side of a marked crosswalk.";
          break;
        case 7:
          ticketReasonOtherSubSection.style.display = "none";
          ticketReason = "parking too close to a fire hydrant";
          ticketBylawExplanation = "s(8) (1) Except as permitted in this section a vehicle shall not be stopped on a highway within 5 metres of a fire hydrant or, when the hydrant is not located at the curb, within 5 metres from the point on the curb nearest the fire hydrant. \n(2) A taxi may stop within 5 metres of a hydrant identified as a taxi zone only if: \n(i) the operator remains in the vehicle at all times; and \n(ii) the operator immediately removes the vehicle from the taxi zone upon the direction of a peace officer or a member of the City’s Fire Rescue Service.";
          break;
        case 8:
          ticketReasonOtherSubSection.style.display = "none";
          ticketReason = "parking too close to an intersection";
          ticketBylawExplanation = "7 Unless a traffic control device permits or requires, a vehicle shall not be parked: \n(a) at an intersection within 5 metres of the projection of the curb or edge of the roadway; \n(b) within an intersection other than immediately next to the curb or edge of the roadway in a  “T” intersection; or \n(c) within 1.5 metres of an access to a garage, private road ordriveway or a vehicle crossway over a sidewalk";
          break;
        case 9:
          ticketReasonOtherSubSection.style.display = "none";
          ticketReason = "parking too close to a centre line";
          ticketBylawExplanation = "s(16) A vehicle shall not be parked within 3 metres of the centre line of the roadway on a highway where the roadway portion is 12 metres or more in width. ";
          break;
        case 10:
          ticketReasonOtherSubSection.style.display = "none";
          ticketReason = "parallel parking more than 500mm from the curb";
          ticketBylawExplanation = "s(22) (1) A vehicle parked on a highway shall be parked: \n(a) with: \n(i) the sides of the vehicle parallel to the curb or edge of the roadway, and \n(ii) the right wheels of the vehicle not more than 500millimetres from the right curb or edge of the roadway, or \n(b) in the case of a  one-way highway where parking on either side is permitted, with: \n(i) the sides of the vehicle parallel to the curb or edge of the roadway, \n(ii) the wheels that are the closest to a curb or edge of the roadway not more than 500 millimetres from that curb or edge, and \n(iii) the vehicle facing in the direction of travel authorized for the highway;";
          break;
        case 11:
          ticketReasonOtherSubSection.style.display = "none";
          ticketReason = "parking on a sidewalk or boulevard";
          ticketBylawExplanation = "s(4) Unless a traffic control device permits or requires, a vehicle shall not be parked on a sidewalk or boulevard or any part of a sidewalk or boulevard.";
          break;
        case 12:
          ticketReasonOtherSubSection.style.display = "none";
          ticketReason = "parking in a way that caused an obstruction";
          ticketBylawExplanation = "A vehicle shall not be parked on a highway in a manner that blocks or obstructs: \n(a) the movement of traffic on the highway; \n(b) a doorway to a building; or \n(c) the approach to any fire station, police station, hospital or other place where emergency vehicles require regular access.";
          break;
        case 13:
          ticketReasonOtherSubSection.style.display = "none";
          ticketReason = "parking in a bus zone";
          ticketBylawExplanation = "s(35) (1) Except as permitted in this section a vehicle shall not be stopped on a highway in any location identified as a bus zone unless the vehicle is a bus.(2) A taxi may stop in the forward 6 metres of any bus zone while inthe process of actually loading or unloading passengers.";
          break;
        case 14:
          ticketReasonOtherSubSection.style.display = "none";
          ticketReason = "parking in an emergency access zone";
          ticketBylawExplanation = "s(33) A vehicle shall not be parked on a highway in any location identified as a fire lane, an emergency access zone or otherwise being for the use of emergency vehicles.";
          break;
        case 15:
          ticketReasonOtherSubSection.style.display = "none";
          ticketReason = "parking on a seasonal parking route while a ban was in effect";
          ticketBylawExplanation = "36  (1) A vehicle shall not be parked on a highway in any location identified as a seasonal parking ban route. \n(2) This section only applies when the location identified as a seasonal parking ban route has been designated in effect by the City Manager. \n(3) A vehicle parked on a highway in a location identified as a seasonal parking ban route must be removed from the location identified as a seasonal parking ban route within 8 hours of a seasonal parking route ban having been declared in effect.";
          break;
        case 16:
          ticketReasonOtherSubSection.style.display = "none";
          ticketReason = "parking in a permit zone without a proper permit";
          ticketBylawExplanation = "s(37) A vehicle shall not be parked on a highway in any location where a permit to park is required unless a valid and subsisting permit is clearly displayed on the vehicle.";
          break;
        case 17:
          ticketReasonOtherSubSection.style.display = "none";
          ticketReason = "parking in a disabled zone without a permit";
          ticketBylawExplanation = "s(34) A vehicle shall not be parked on a highway in any location identified as being for the use of persons with disabilities unless the vehicle: \n(a)displays a valid disabled placard or license plate issued or recognized by the Registrar; and \n(b) is being used for the transportation of a person with a disability.";
          break;
        case 18:
          ticketReasonOtherSubSection.style.display = "none";
          ticketReason = "parking in a no stopping zone";
          ticketBylawExplanation = "s(31) A vehicle shall not be stopped on a highway in any location identified as a zone where stopping is prohibited.";
          break;
        case 19:
          ticketReasonOtherSubSection.style.display = "none";
          ticketReason = "parking in a no parking zone";
          ticketBylawExplanation = "s(30) A vehicle shall not be parked on a highway in any location identified as a zone where parking is prohibited.";
          break;
        case 20:
          ticketReasonOtherSubSection.style.display = "none";
          ticketReason = "parking in a commercial loading zone";
          ticketBylawExplanation = "s(28) (1) A vehicle shall not be parked on a highway in any location identified as a commercial loading zone unless the vehicle is a commercial vehicle. \n(2) A vehicle shall not be parked on a highway in any location identified as a commercial loading zone for a period of time longer than that permitted.";
          break;
        case 21:
          ticketReasonOtherSubSection.style.display = "none";
          ticketReason = "parking in a passenger loading zone";
          ticketBylawExplanation = "s(27) A vehicle shall not be parked on a highway in any location identified as a passenger loading zone for a period of time longer than that permitted.";
          break;
        case 22:
          ticketReasonOtherSubSection.style.display = "none";
          ticketReason = "parking outside a marked space";
          ticketBylawExplanation = "s(14) A vehicle parked on a highway in a location marked by lines or otherwise shall be parked entirely within the markings.";
          break;
        case 23:
          ticketReasonOtherSubSection.style.display = "none";
          ticketReason = "incorrect angle parking";
          ticketBylawExplanation = "s(23) (1) When: \n(a) a sign indicates that angle parking is permitted or required, and \n(b) parking guide lines are visible on the roadway, a vehicle shall be parked with the vehicle’s sides between and parallel to any two of the guide lines, and \n(c) in the case of a  vehicle other than a motor cycle, with one front wheel not more than 500 millimetres from the curb or edge of the roadway, or \n";
          break;
        case 24:
          ticketReasonOtherSubSection.style.display = "none";
          ticketReason = "leaving my vehicle unattended while on a jack";
          ticketBylawExplanation = "s(25) A vehicle shall not be parked and left unattended on a highway if: \n(a) the vehicle is on a jack or a similar device, and \n(b) one or more wheels have been removed from the vehicle or part of the vehicle is raised.";
          break;
        case 25:
          ticketReasonOtherSubSection.style.display = "none";
          ticketReason = "parking a vehicle that was more than 12.5 metres long";
          ticketBylawExplanation = "s(17) (1) A vehicle, or a  vehicle with a  trailer attached, with a total length exceeding 12.5 metres shall not be parked on a highway: \n(a) in a location adjoining residential property at any time; or \n(b) in a location not adjoining residential property at anytime after 7:00 p.m. and before 7:00 a.m. \n(2) This section does not apply if the vehicle: \n(a) is a recreational vehicle; or \n(b) is a commercial vehicle with the hazard warning lamps alight and in the process of loading or unloading goods.";
          break;
        case 26:
          ticketReasonOtherSubSection.style.display = "none";
          ticketReason = "parking a vehicle in the same location for more than 72 hrs";
          ticketBylawExplanation = "s(26) (1) A vehicle shall not be abandoned on a highway. \n(2) Without restricting the generality of subsection (1) a vehicle that is left standing in one location on a highway for more than 72 consecutive hours is deemed to have been abandoned at  that location.";
          break;
        case 27:
          ticketReasonOtherSubSection.style.display = "none";
          ticketReason = "incorrectly parking a recreational vehicle on a public road";
          ticketBylawExplanation = "s(19) (1) A recreational vehicle shall not be parked on a highway unless it is parked in a location completely adjoining the recreational vehicle owner’s residence as shown in the records of the Motor Vehicle Registry. \n(2) A recreational vehicle parked pursuant to this section: (a) shall not be parked for more than 72 consecutive hours; and(b)shall be removed to an off-highway location for at least 48 consecutive hours before it may be parked again on a highway.";
          break;
        case 28:
          ticketReasonOtherSubSection.style.display = "none";
          ticketReason = "parking in an alley";
          ticketBylawExplanation = "s(12) (1) A vehicle shall not be parked in an alley unless: \n(a) a traffic control device permits such parking; or \n(b) the vehicle is a commercial vehicle with hazard warning lights alight and in the process of loading or unloading goods. \n(2) Notwithstanding subsection (1)(b) a commercial vehicle shall not be parked in an alley for more than 30 minutes. \n(3) Nothing in this section permits a person to park a vehicle in an alley in a manner that blocks or obstructs the movement of traffic.";
          break;
        case 29:
          ticketReasonOtherSubSection.style.display = "none";
          ticketReason = "double parking next to another vehicle";
          ticketBylawExplanation = "s(10) Unless a traffic control device permits or requires, a vehicle shall not be parked on the roadway side of a vehicle that is parked at the curb or edge of the roadway.";
          break;
        case 30:
          ticketReasonOtherSubSection.style.display = "none";
          ticketReason = "parking in a bridge or tunnel";
          ticketBylawExplanation = "s(9) Unless a  traffic control device permits or requires, a vehicle shall not be parked on any bridge or in any tunnel or on any approach to either of them.";
          break;
        case 31:
          ticketReasonOtherSubSection.style.display = "none";
          ticketReason = "parking an unattached trailer";
          ticketBylawExplanation = "s(20) Notwithstanding any other provision of this bylaw, a trailer shall not be parked on a highway unless the trailer is attached to a vehicle by which it may be drawn.";
          break;
        case 32:
          ticketReasonOtherSubSection.style.display = "none";
          ticketReason = "pay and go zone violation";
          ticketBylawExplanation = "s(45) (1) A vehicle shall not be parked on a highway in any space identified as a pay and display zone unless there is unexpired time remaining on a ticket issued by a pay and display machine. \n(2) A vehicle shall not be parked on a highway in any space identifiedas a pay and display zone unless there is a ticket issued by a payand display machine displayed face up in a clearly visible locationon the dashboard of the vehicle. \n(3) This section is only in effect on the days and during the times a pay and display zone is identified as being in effect. \n(4) This section does not apply to a vehicle displaying a valid permit issued by the City for pay and display zone parking so long as all conditions of the permit are satisfied.";
          break;
        case 33:
          ticketReasonOtherSubSection.style.display = "none";
          ticketReason = "EPark zone violation";
          ticketBylawExplanation = "s(38.1) (1) A vehicle shall not be parked in an EPark zone: \n(a) for a period of time in excess of the time limit indicated on a traffic control device; \n(b) unless the full amount of the required payment for that EPark zone has been made in accordance with the instructions on a traffic control device; or \n(c) contrary to any other restriction on a traffic control device. \n(2) In a prosecution under this section, where a certified copy of a record of the City containing licence plate and payment information for an EPark zone from the time of the alleged offence is tendered: \n(a) the Court may conclude that, in the absence of licence plate information being found in the record, the required payment has not been made in relation to the vehicle to which that licence plate corresponds; and \n(b) where the licence plate information of a vehicle is absent from the record, the onus of proving a person has made the required payment in relation to that vehicle shall be on the person alleging the required payment has been made on a balance of probabilities";
          break;
        case 34:
          ticketReasonOtherSubSection.style.display = "block";
          ticketReason = document.getElementById("ticket-reason-other-text-field").value;
          ticketBylawExplanation = "";
          break;
        default:
          ticketReasonOtherSubSection.style.display = "none";
          ticketReason = "";
          ticketBylawExplanation = "";
      }
    }
  }
}());

// .ticket-appeal-bylaw-section
  // gatekeeper function for displaying subsection
const ticketAppealBylawRadioSelection = (function updateTicketBylawAppealConditionals() {
  const ticketAppealBylawRadioOptions = document.querySelectorAll(".yn-ticket-valid-class");
  addRadioEventListener(ticketAppealBylawRadioOptions, updateTicketBylawAppealConditionals);
  for (let i = 0; i < ticketAppealBylawRadioOptions.length; i++) {
    if (ticketAppealBylawRadioOptions[i].checked) {
      if (ticketAppealBylawRadioOptions[i].value === "1") {
        ticketAppealSubSection.style.display = "none";
        ticketAppealBylawAnswer = "";
        return;
      } else if (ticketAppealBylawRadioOptions[i].value === "2") {
          ticketAppealSubSection.style.display = "block";
          ticketAppealBylawAnswer = "I don't believe the bylaw should apply because " + lowercaseFirstLetter(document.getElementById("incorrect-bylaw-text-field").value) + ".<br>";
          return;
      }
    }
  }
}());

// .photo-upload-section
  // Setup variables for this section
let photoOfTicket = "";
  // Trigger photo Upload
const photoUploadRadioSelection = (function updatePhotoUploadConditionals() {
  const photoUploadRadioOptions = document.querySelectorAll(".yn-upload-photo-class");
  addRadioEventListener(photoUploadRadioOptions, updatePhotoUploadConditionals);
  for (let i = 0; i < photoUploadRadioOptions.length; i++) {
    if (photoUploadRadioOptions[i].checked) {
      if (photoUploadRadioOptions[i].value === "1") {
        photoOfTicket = prompt("Please choose a photo to upload");
        return photoOfTicket;
      } else if (photoUploadRadioOptions[i].value === "2") {
        photoOfTicket = "";
        return photoOfTicket;
      }
    }
  }
}());

// .name-section
  // functions to update nameAnswer
function updateNameAnswer() {
  if (document.getElementById("person-name-text-field").value) {
    return nameAnswer = document.getElementById("person-name-text-field").value;
  } else {
    return nameAnswer = "_______________";
  }
}
updateNameAnswer();

// .contact-details-section
  // Functions to update emailAnswer
function updateEmailAnswer() {
  if (document.getElementById("email-field").value) {
    return emailAnswer = document.getElementById("email-field").value;
  } else {
    return emailAnswer = "_______________";
  }
}
updateEmailAnswer();

// .mailing-address-section
  // function to update mailAddressAnswer
function updateMailAddressAnswer() {
  if (document.getElementById("mailing-address-text-field").value) {
    return mailAddressAnswer = document.getElementById("mailing-address-text-field").value;
  } else {
    return mailAddressAnswer = "_______________\n_______________";
  }
}
updateMailAddressAnswer();
