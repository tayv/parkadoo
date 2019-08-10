"use strict";

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
        outputTemplateText("check bylaws");
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
  for (let i = 0; i < ticketIssuerRadioOptions.length; i++) {
    if (ticketIssuerRadioOptions[i].checked) {
      if (ticketIssuerRadioOptions[i].value === "1") {
        hideSectionsNotInPath("city");
        applyActiveVisibilityConditions(hideTheseSectionsArray);
    //  outputTemplateText("city");
        return templateType = "city";

      }
      else if (ticketIssuerRadioOptions[i].value === "2") {
        hideSectionsNotInPath("private operator");
        applyActiveVisibilityConditions(hideTheseSectionsArray);
    //  outputTemplateText("private operator");
        return templateType = "private operator";;
      }
      else if (ticketIssuerRadioOptions[i].value === "3") {
        hideSectionsNotInPath("private institution");
        applyActiveVisibilityConditions(hideTheseSectionsArray);
    //  outputTemplateText("private institution");
        return templateType = "private institution";;
      }
    }
  }
}());

// #municipality-section
  // update sub-section visibility conditions
const municipalityRadioSelection = (function updateMunicipalityConditionals() {
  const municipalityRadioOptions = document.querySelectorAll(".municipality-radio-class");
  addRadioEventListener(municipalityRadioOptions, updateMunicipalityConditionals);
  for (let i = 0; i < municipalityRadioOptions.length; i++) {
    if (municipalityRadioOptions[i].checked) {
      if (municipalityRadioOptions[i].value === "1") {
        hideSectionsNotInPath("city");

      //  newCityRequestSubsection.style.display = "none"; // Sub-sections need individual visibility conditions since they don't use hideTheseSectionsArray
      //  outputTextCity("1");
        return;
      }
      else if (municipalityRadioOptions[i].value === "2") {
      //  newCityRequestSubsection.style.display = "block";
        hideSectionsNotInPath("city unavailable");

      //  outputTextCity("2");
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


// #student-or-employee-section
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

// #ticket-number-section
  // To update output text
  ticketNumberAnswer = document.getElementById("ticket-number-text-field").value;

// #ticket-accuracy-section
  // gatekeeper function for displaying subsection
const ticketAccuracyRadioSelection = (function updateTicketAccuracyConditionals() {
  const ticketAccuracyRadioOptions = document.querySelectorAll(".ticket-accuracy-radio-class");
  addRadioEventListener(ticketAccuracyRadioOptions, updateTicketAccuracyConditionals);
  for (let i = 0; i < ticketAccuracyRadioOptions.length; i++) {
    if (ticketAccuracyRadioOptions[i].checked) {
      if (ticketAccuracyRadioOptions[i].value === "1") {
        ticketErrorDescriptionSubSection.style.display = "block";
        ticketErrorDescriptionAnswer = "The ticket has incorrect details.</li> " + formatSentenceEnding(upperCaseFirstLetter(document.getElementById("ticket-error-description-text-field").value));
        return;
      } else if (ticketAccuracyRadioOptions[i].value === "2") {
          ticketErrorDescriptionSubSection.style.display = "none";
          ticketErrorDescriptionAnswer = "";
          return;
      }
    }
  }
}());

// #ticket-reason-section
  // Function for setting the correct ticket reason text
const ticketReasonRadioSelection = (function updateTicketReasonConditionals() {
  const ticketReasonRadioOptions = document.querySelectorAll(".ticket-reason-radio-class");
  addRadioEventListener(ticketReasonRadioOptions, updateTicketReasonConditionals);
  for (let i = 0; i < ticketReasonRadioOptions.length; i++) {
    if (ticketReasonRadioOptions[i].checked) {
      switch (i) {
        case 0:
          ticketReasonOtherSubSection.style.display = "none";
          ticketReason = bylawTextObj.ticketReason1;
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint1;
          ticketBylawExplanation = bylawTextObj.ticketBylawExplanation1;
          break;
        case 1:
          ticketReasonOtherSubSection.style.display = "none";
          ticketReason = bylawTextObj.ticketReason2;
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint2;
          ticketBylawExplanation = bylawTextObj.ticketBylawExplanation2;
          break;
        case 2:
          ticketReasonOtherSubSection.style.display = "none";
          ticketReason = bylawTextObj.ticketReason3;
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint3;
          ticketBylawExplanation = bylawTextObj.ticketBylawExplanation3;
          break;
        case 3:
          ticketReasonOtherSubSection.style.display = "none";
          ticketReason = bylawTextObj.ticketReason4;
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint4;
          ticketBylawExplanation = bylawTextObj.ticketBylawExplanation4;
          break;
        case 4:
          ticketReasonOtherSubSection.style.display = "none";
          ticketReason = bylawTextObj.ticketReason5;
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint5;
          ticketBylawExplanation = bylawTextObj.ticketBylawExplanation;
          break;
        case 5:
          ticketReasonOtherSubSection.style.display = "none";
          ticketReason = bylawTextObj.ticketReason6;
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint6;
          ticketBylawExplanation = bylawTextObj.ticketBylawExplanation6;
          break;
        case 6:
          ticketReasonOtherSubSection.style.display = "none";
          ticketReason = bylawTextObj.ticketReason7;
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint7;
          ticketBylawExplanation = bylawTextObj.ticketBylawExplanation7;
          break;
        case 7:
          ticketReasonOtherSubSection.style.display = "none";
          ticketReason = bylawTextObj.ticketReason8;
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint8;
          ticketBylawExplanation = bylawTextObj.ticketBylawExplanation8;
          break;
        case 8:
          ticketReasonOtherSubSection.style.display = "none";
          ticketReason = bylawTextObj.ticketReason9;
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint9;
          ticketBylawExplanation = bylawTextObj.ticketBylawExplanation9;
          break;
        case 9:
          ticketReasonOtherSubSection.style.display = "none";
          ticketReason = bylawTextObj.ticketReason10;
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint10;
          ticketBylawExplanation = bylawTextObj.ticketBylawExplanation10;
          break;
        case 10:
          ticketReasonOtherSubSection.style.display = "none";
          ticketReason = bylawTextObj.ticketReason11;
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint11;
          ticketBylawExplanation = bylawTextObj.ticketBylawExplanation11;
          break;
        case 11:
          ticketReasonOtherSubSection.style.display = "none";
          ticketReason = bylawTextObj.ticketReason12;
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint12;
          ticketBylawExplanation = bylawTextObj.ticketBylawExplanation12;
          break;
        case 12:
          ticketReasonOtherSubSection.style.display = "none";
          ticketReason = bylawTextObj.ticketReason13;
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint13;
          ticketBylawExplanation = bylawTextObj.ticketBylawExplanation13;
          break;
        case 13:
          ticketReasonOtherSubSection.style.display = "none";
          ticketReason = bylawTextObj.ticketReason14;
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint14;
          ticketBylawExplanation = bylawTextObj.ticketBylawExplanation14;
          break;
        case 14:
          ticketReasonOtherSubSection.style.display = "none";
          ticketReason = bylawTextObj.ticketReason15;
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint15;
          ticketBylawExplanation = bylawTextObj.ticketBylawExplanation15;
          break;
        case 15:
          ticketReasonOtherSubSection.style.display = "none";
          ticketReason = bylawTextObj.ticketReason16;
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint16;
          ticketBylawExplanation = bylawTextObj.ticketBylawExplanation16;
          break;
        case 16:
          ticketReasonOtherSubSection.style.display = "none";
          ticketReason = bylawTextObj.ticketReason17;
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint17;
          ticketBylawExplanation = bylawTextObj.ticketBylawExplanation17;
          break;
        case 17:
          ticketReasonOtherSubSection.style.display = "none";
          ticketReason = bylawTextObj.ticketReason18;
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint18;
          ticketBylawExplanation = bylawTextObj.ticketBylawExplanation18;
          break;
        case 18:
          ticketReasonOtherSubSection.style.display = "none";
          ticketReason = bylawTextObj.ticketReason19;
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint19;
          ticketBylawExplanation = bylawTextObj.ticketBylawExplanation19;
          break;
        case 19:
          ticketReasonOtherSubSection.style.display = "none";
          ticketReason = bylawTextObj.ticketReason20;
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint20;
          ticketBylawExplanation = bylawTextObj.ticketBylawExplanation20;
          break;
        case 20:
          ticketReasonOtherSubSection.style.display = "none";
          ticketReason = bylawTextObj.ticketReason21;
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint21;
          ticketBylawExplanation = bylawTextObj.ticketBylawExplanation21;
          break;
        case 21:
          ticketReasonOtherSubSection.style.display = "none";
          ticketReason = bylawTextObj.ticketReason22;
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint22;
          ticketBylawExplanation = bylawTextObj.ticketBylawExplanation22;
          break;
        case 22:
          ticketReasonOtherSubSection.style.display = "none";
          ticketReason = bylawTextObj.ticketReason23;
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint23;
          ticketBylawExplanation = bylawTextObj.ticketBylawExplanation23;
          break;
        case 23:
          ticketReasonOtherSubSection.style.display = "none";
          ticketReason = bylawTextObj.ticketReason24;
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint24;
          ticketBylawExplanation = bylawTextObj.ticketBylawExplanation24;
          break;
        case 24:
          ticketReasonOtherSubSection.style.display = "none";
          ticketReason = bylawTextObj.ticketReason25;
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint25;
          ticketBylawExplanation = bylawTextObj.ticketBylawExplanation25;
          break;
        case 25:
          ticketReasonOtherSubSection.style.display = "none";
          ticketReason = bylawTextObj.ticketReason26;
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint26;
          ticketBylawExplanation = bylawTextObj.ticketBylawExplanation26;
          break;
        case 26:
          ticketReasonOtherSubSection.style.display = "none";
          ticketReason = bylawTextObj.ticketReason27;
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint27;
          ticketBylawExplanation = bylawTextObj.ticketBylawExplanation27;
          break;
        case 27:
          ticketReasonOtherSubSection.style.display = "none";
          ticketReason = bylawTextObj.ticketReason28;
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint28;
          ticketBylawExplanation = bylawTextObj.ticketBylawExplanation28;
          break;
        case 28:
          ticketReasonOtherSubSection.style.display = "none";
          ticketReason = bylawTextObj.ticketReason29;
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint29;
          ticketBylawExplanation = bylawTextObj.ticketBylawExplanation29;
          break;
        case 29:
          ticketReasonOtherSubSection.style.display = "none";
          ticketReason = bylawTextObj.ticketReason30;
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint30;
          ticketBylawExplanation = bylawTextObj.ticketBylawExplanation30;
          break;
        case 30:
          ticketReasonOtherSubSection.style.display = "none";
          ticketReason = bylawTextObj.ticketReason31;
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint31;
          ticketBylawExplanation = bylawTextObj.ticketBylawExplanation31;
          break;
        case 31:
          ticketReasonOtherSubSection.style.display = "none";
          ticketReason = bylawTextObj.ticketReason32;
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint32;
          ticketBylawExplanation = bylawTextObj.ticketBylawExplanation32;
          break;
        case 32:
          ticketReasonOtherSubSection.style.display = "none";
          ticketReason = bylawTextObj.ticketReason33;
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint33;
          ticketBylawExplanation = bylawTextObj.ticketBylawExplanation33;
          break;
        case 33:
          ticketReasonOtherSubSection.style.display = "none";
          ticketReason = bylawTextObj.ticketReason34;
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint34;
          ticketBylawExplanation = bylawTextObj.ticketBylawExplanation34;
          break;
        case 34:
          ticketReasonOtherSubSection.style.display = "block";
          ticketReason = document.getElementById("ticket-reason-other-text-field").value;
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint35;
          ticketBylawExplanation = bylawTextObj.ticketBylawExplanation35;
          break;
        default:
          ticketReasonOtherSubSection.style.display = "none";
          ticketReason = "";
          checkBylawsPlainLanguageHint = "";
          ticketBylawExplanation = "";
      }
    }
  }
}());

// #ticket-appeal-bylaw-section
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
          ticketAppealBylawAnswer = "I don't believe the bylaw should apply because " + formatSentenceEnding(lowerCaseFirstLetter(document.getElementById("incorrect-bylaw-text-field").value));
          return;
      }
    }
  }
}());

// #private-ticket-appeal-section
if (document.getElementById("private-ticket-appeal-text-field").value) {
   privateTicketAppealAnswer = document.getElementById("private-ticket-appeal-text-field").value;
} else {
   privateTicketAppealAnswer = "";
}

// #name-section
  // functions to update nameAnswer
function updateNameAnswer() {
  if (document.getElementById("person-name-text-field").value) {
    return nameAnswer = document.getElementById("person-name-text-field").value;
  } else {
    return nameAnswer = "_______________";
  }
}
updateNameAnswer();

// #contact-details-section
  // Functions to update emailAnswer
function updateEmailAnswer() {
  if (document.getElementById("email-field").value) {
    return emailAnswer = document.getElementById("email-field").value;
  } else {
    return emailAnswer = "_______________";
  }
}
updateEmailAnswer();

// #mailing-address-section
  // function to update mailAddressAnswer
function updateMailAddressAnswer() {
  if (document.getElementById("mailing-address-text-field").value) {
    return mailAddressAnswer = document.getElementById("mailing-address-text-field").value;
  } else {
    return mailAddressAnswer = "_______________<br>_______________";
  }
}
updateMailAddressAnswer();

// #potential-issue-section
  // Function for displaying bylaw text in the form
function displayPotentialTicketContent () {
  checkBylawsIntroParagraph = "Hey, I found this in the " + city + "&#39;s bylaws:";
  document.getElementById("check-bylaw-primary-question-insert-here").innerHTML = checkBylawsIntroParagraph;
  document.getElementById("bylaw-plain-language-hint-insert-here").innerHTML = checkBylawsPlainLanguageHint;
  checkBylawsOutputTemplate = ticketBylawExplanation;
  document.getElementById("city-bylaw-name").innerHTML = cityBylawName;
  document.getElementById("insert-check-bylaw-info-box-text-here").innerHTML = checkBylawsOutputTemplate;
}

  // Function for setting the correct parking bylaw text
const potentialTicketRadioSelection = (function updatePotentialTicketConditionals() {
  const potentialTicketRadioOptions = document.querySelectorAll(".potential-ticket-radio-class");
  addRadioEventListener(potentialTicketRadioOptions, updatePotentialTicketConditionals);
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
}());
