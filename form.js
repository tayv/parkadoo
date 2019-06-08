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
const ticketAppealDescriptionSection = document.getElementById("ticket-appeal-description-section");
const ticketAppealDescribeSubSection = document.getElementById("ticket-appeal-describe-subsection");
const photoUploadSection = document.getElementById("photo-upload-section"); // also private operator
const photoUploadPromptSubSection = document.getElementById("photo-upload-prompt-subsection"); // also private operator
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

  //testing
  /*
  const stepMakeVisibleTest = function(...stepToHide) { // Keeping ... in parameter. Removing it causes a bug where the for loop doesn't fire
      console.log("stepMakeVisible triggered. The parameter = ", stepToHide);
      for (let i = 0; i < stepToHide.length; i++) {
        console.log("i: ", i);
        console.log("stepToHide: ", stepToHide[i]);
        if (stepsQuestionnaire[count] === stepToHide[0][i]) { // adding [0] necessary because ...stepToHide makes an array within an array
          if (stepsQuestionnaire[count-1] === 0) {
            welcomeSection.scrollIntoView(true);
          } else {
              stepsQuestionnaire[count-1].style.display = "block";
              stepsQuestionnaire[count-1].scrollIntoView(true);
              console.log("hide a step");
          }
        } else {
          stepsQuestionnaire[count].style.display = "block";
          console.log("no step to hide. continue as usual");
        }
      }
    }; */

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

function updatehideTheseSectionsArray(addItem, subtractItem) { //use undefined when passing the unused parameter. Note that parameters must represent section IDs for stepMakeVisible() to work. Call it x times if need to hide multiple steps.
  function addTohideTheseSectionsArray(addItem) {
    if (hideTheseSectionsArray.indexOf(addItem) === -1 && typeof addItem !== "undefined") { // Need to exclude undefined because one parameter (either addItem or subtractItem) is likely left blank in the original function call
      hideTheseSectionsArray.push(addItem);
      console.log("add an item: ", addItem);
    } else {
        console.log("There's already an ", addItem, " here. Don't do anything");
    }
  }
  addTohideTheseSectionsArray(addItem);
  subtractFromhideTheseSectionsArray(subtractItem);
}

// testing
function addTohideTheseSectionsArrayTest(addItem) {
  if (hideTheseSectionsArray.indexOf(addItem) === -1 && typeof addItem !== "undefined") { // Need to exclude undefined because one parameter (either addItem or subtractItem) is likely left blank in the original function call
    hideTheseSectionsArray.push(addItem);
    console.log("add an item: ", addItem);
  } else {
      console.log("There's already an ", addItem, " here. Don't do anything");
  }
}

function subtractFromhideTheseSectionsArray(subtractItem) {
  if (hideTheseSectionsArray.indexOf(subtractItem) > -1 && typeof subtractItem !== "undefined") {
    var arrayIndex = hideTheseSectionsArray.indexOf(subtractItem);
    hideTheseSectionsArray.splice(arrayIndex);
    console.log("subtract:" + subtractItem);
    console.log(subtractItem);
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
    addTohideTheseSectionsArrayTest(studentOrEmployeeSection);
    // hideTheseSectionsArray.add(studentOrEmployeeSection);
    subtractFromhideTheseSectionsArray(
      parkingTicketIssuerSection,
      municipalitySection,
      ticketNumberSection,
      ticketAccuracySection,
      ticketReasonSection,
      ticketAppealDescriptionSection,
      nameSection,
      contactDetailsSection,
      mailingAddressSection);
    applyActiveVisibilityConditions();
    outputTemplateText("city");
  } else if (path === "private operator") {
      addTohideTheseSectionsArrayTest(municipalitySection);
      addTohideTheseSectionsArrayTest(studentOrEmployeeSection);
      addTohideTheseSectionsArrayTest(ticketReasonSection);
      addTohideTheseSectionsArrayTest(ticketAppealDescriptionSection);
      addTohideTheseSectionsArrayTest(municipalitySection);
      subtractFromhideTheseSectionsArray(parkingTicketIssuerSection);
      subtractFromhideTheseSectionsArray(ticketNumberSection);
      subtractFromhideTheseSectionsArray(ticketAccuracySection);
      subtractFromhideTheseSectionsArray(ticketReasonSection);
      subtractFromhideTheseSectionsArray(ticketAppealDescriptionSection);
      subtractFromhideTheseSectionsArray(nameSection);
      subtractFromhideTheseSectionsArray(contactDetailsSection);
      subtractFromhideTheseSectionsArray(mailingAddressSection);
      applyActiveVisibilityConditions();
      outputTemplateText("private operator");
  } else if (path === "private institution") {
      addTohideTheseSectionsArrayTest(municipalitySection);
      addTohideTheseSectionsArrayTest(ticketReasonSection);
      addTohideTheseSectionsArrayTest(ticketAppealDescriptionSection);
      subtractFromhideTheseSectionsArray(parkingTicketIssuerSection);
      subtractFromhideTheseSectionsArray(studentOrEmployeeSection);
      subtractFromhideTheseSectionsArray(ticketNumberSection);
      subtractFromhideTheseSectionsArray(ticketAccuracySection);
      subtractFromhideTheseSectionsArray(ticketReasonSection);
      subtractFromhideTheseSectionsArray(ticketAppealDescriptionSection);
      subtractFromhideTheseSectionsArray(nameSection);
      subtractFromhideTheseSectionsArray(contactDetailsSection);
      subtractFromhideTheseSectionsArray(mailingAddressSection);
    /*  hideTheseSectionsArray.push(
        municipalitySection,
        ticketReasonSection,
        ticketAppealDescriptionSection);
      subtractFromhideTheseSectionsArray(
        parkingTicketIssuerSection,
        studentOrEmployeeSection,
        ticketNumberSection,
        ticketAccuracySection,
        ticketReasonSection,
        ticketAppealDescriptionSection,
        nameSection,
        contactDetailsSection,
        mailingAddressSection); */
      applyActiveVisibilityConditions();
      outputTemplateText("private institution");
  } else if (path === "report abandoned vehicle") {
      addTohideTheseSectionsArrayTest(parkingTicketIssuerSection);
      addTohideTheseSectionsArrayTest(municipalitySection);
      addTohideTheseSectionsArrayTest(studentOrEmployeeSection);
      addTohideTheseSectionsArrayTest(ticketAppealDescriptionSection);
      addTohideTheseSectionsArrayTest(ticketNumberSection);
      addTohideTheseSectionsArrayTest(ticketAccuracySection);
      addTohideTheseSectionsArrayTest(ticketReasonSection);
      addTohideTheseSectionsArrayTest(ticketAppealDescriptionSection);
      addTohideTheseSectionsArrayTest(nameSection);
      addTohideTheseSectionsArrayTest(contactDetailsSection);
      addTohideTheseSectionsArrayTest(mailingAddressSection);
    /*  hideTheseSectionsArray.push(
        parkingTicketIssuerSection,
        studentOrEmployeeSection,
        municipalitySection,
        ticketNumberSection,
        ticketAccuracySection,
        ticketReasonSection,
        ticketAppealDescriptionSection,
        nameSection,
        contactDetailsSection,
        mailingAddressSection); */
      applyActiveVisibilityConditions();
      outputTemplateText("report abandoned vehicle");
  } else if (path === "check bylaws") {
      addTohideTheseSectionsArrayTest(parkingTicketIssuerSection);
      addTohideTheseSectionsArrayTest(municipalitySection);
      addTohideTheseSectionsArrayTest(studentOrEmployeeSection);
      addTohideTheseSectionsArrayTest(ticketAppealDescriptionSection);
      addTohideTheseSectionsArrayTest(ticketNumberSection);
      addTohideTheseSectionsArrayTest(ticketAccuracySection);
      addTohideTheseSectionsArrayTest(ticketReasonSection);
      addTohideTheseSectionsArrayTest(ticketAppealDescriptionSection);
      addTohideTheseSectionsArrayTest(nameSection);
      addTohideTheseSectionsArrayTest(contactDetailsSection);
      addTohideTheseSectionsArrayTest(mailingAddressSection);
    /*  hideTheseSectionsArray.push(
        parkingTicketIssuerSection,
        studentOrEmployeeSection,
        municipalitySection,
        ticketNumberSection,
        ticketAccuracySection,
        ticketReasonSection,
        ticketAppealDescriptionSection,
        nameSection,
        contactDetailsSection,
        mailingAddressSection); */
      applyActiveVisibilityConditions();
      outputTemplateText("check bylaws");
    }
};


// QUESTIONNAIRE SECTIONS - Should this be moved into own file?
// Generic step 1 - What is your parking problem?
  // update visibiilty conditions
const parkingProblemRadioSelection = (function updateParkingProblemConditionals() {
  const parkingProblemRadioOptions = document.querySelectorAll(".parking-problem-radio-class");
  addRadioEventListener(parkingProblemRadioOptions, updateParkingProblemConditionals);
  for (let i = 0, length = parkingProblemRadioOptions.length; i < length; i++) {
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
// .ticket-issuer-section - Who issued your ticket?
  // Update dependant visibiilty conditions
const ticketIssuerRadioSelection = (function updateticketIssuerConditionals() {
  const ticketIssuerRadioOptions = document.querySelectorAll(".ticket-issuer-radio-class");
  addRadioEventListener(ticketIssuerRadioOptions, updateticketIssuerConditionals);
  for (let i = 0, length = ticketIssuerRadioOptions.length; i < length; i++) {
    if (ticketIssuerRadioOptions[i].checked) {
      if (ticketIssuerRadioOptions[i].value === "1") {
        hideSectionsNotInPath("city");
        applyActiveVisibilityConditions();
        outputTemplateText("city");
        return;
      }
      else if (ticketIssuerRadioOptions[i].value === "2") {
        hideSectionsNotInPath("private operator");
        applyActiveVisibilityConditions();
        outputTemplateText("private operator");
        return;
      }
      else if (ticketIssuerRadioOptions[i].value === "3") {
        hideSectionsNotInPath("private institution");
        applyActiveVisibilityConditions();
        outputTemplateText("private institution");
        return;
      }
    }
  }
}());
  // function to update output text based on questionnaire selection
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
    abandonedVehicleOutputTemplate =
    "*Neighbour's mailing address*<br><br>" +
    "*Today’s date*<br><br>" +
    "RE: Abandoned Vehicle<br><br>" +
    "Dear Neighbour, <br><br>" +
    "<p>It appears that a vehicle that belongs to a resident of this home has been parked for an extended period in the neighbourhood. Our strees are a shared public resource so if this vehicle belongs to you or someone you know it would be appreciated if you could take action in moving the vehicle as *city bylaw 5590* considers vehicles parked for over 72hrs without moving to be abandoned.</p><br>" +
    "<p>Thank you for understanding. If you have any questions about parking bylaws you can call the city at #311.</p>" +
    "Sincerely,<br><br>" +
    "A friendly neighbour";
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
};

// .municipality-section
  // update sub-section visibility conditions
const municipalityRadioSelection = (function updateMunicipalityConditionals() {
  const municipalityRadioOptions = document.querySelectorAll(".municipality-radio-class");
  addRadioEventListener(municipalityRadioOptions, updateMunicipalityConditionals);
  for (let i = 0, length = municipalityRadioOptions.length; i < length; i++) {
    if (municipalityRadioOptions[i].checked) {
      if (municipalityRadioOptions[i].value === "1") {
        newCityRequestSubsection.style.display = "none"; // Sub-sections need individual visibility conditions as don't use hideTheseSectionsArray
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
};


// .student-or-employee-section
  // update sub-section visibility conditions
const studentOrEmployeeRadioSelection = (function updateStudentOrEmployeeConditionals() {
  const studentOrEmployeeRadioOptions = document.querySelectorAll(".student-or-employee-class");
  addRadioEventListener(studentOrEmployeeRadioOptions, updateStudentOrEmployeeConditionals);
  for (let i = 0, length = studentOrEmployeeRadioOptions.length; i < length; i++) {
    if (studentOrEmployeeRadioOptions[i].checked) {
      if (studentOrEmployeeRadioOptions[i].value === "1") {
        newCityRequestSubsection.style.display = "none"; // Sub-sections need individual visibility conditions as don't use hideTheseSectionsArray
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
  }
};
