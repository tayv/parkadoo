"use strict";

// TO LOAD DEFAULT VISIBILITY CONDITIONS (works)
window.onload = function setDefaultAnswerState() {
  document.getElementById("parking-form-content").reset();
  welcomeSection.scrollIntoView(true);
  buttonVisibility(); // to display proper button
};

// LIST OF VARIABLES
  // Array that will hold sections to hide
let hideTheseSectionsArray = [];
  // Array that will hold section to display
let showTheseSectionsArray = [];
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
const ticketNumberSection = document.getElementById("ticket-number-section");
const ticketAccuracySection = document.getElementById("ticket-accuracy-section");
const ticketErrorDescriptionSubSection = document.getElementById("ticket-error-description-subsection");
const ticketReasonSection = document.getElementById("ticket-reason-section");
const ticketReasonOtherSubSection = document.getElementById("ticket-reason-other-subsection");
const ticketAppealBylawSection = document.getElementById("ticket-appeal-bylaw-section");
const ticketAppealSubSection = document.getElementById("ticket-appeal-bylaw-subsection");
const photoUploadSection = document.getElementById("photo-upload-section");
const photoUploadPromptSubSection = document.getElementById("photo-upload-prompt-subsection");
const ticketDateSection = document.getElementById("ticket-date-section");
const nameSection = document.getElementById("name-section");
const contactDetailsSection = document.getElementById("contact-details-section");
const mailingAddressSection = document.getElementById("mailing-address-section");
// If appealing university ticket
const studentOrEmployeeSection = document.getElementById("student-or-employee-section");
// private operator and institution
const privateTicketAppealReason = document.getElementById("private-ticket-appeal-section");
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

  // To hide all steps other than initial welcome section by default
  const hideUnseenStepsByDefault = function() {
    for (var i = 1; i < stepsQuestionnaire.length; i++) {
      stepsQuestionnaire[i].style.display="none";
    }
    finishedSectionDiv.style.display="none";
  };



  // To display and hide steps depending on visibility conditions
  const stepMakeVisible = function() {
      for (let i = 0; i < hideTheseSectionsArray.length; i++) {
        if (stepsQuestionnaire[count] === hideTheseSectionsArray[i]) {
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
      stepMakeVisible();
      hideSections(hideTheseSectionsArray);
      stepsQuestionnaire[count].scrollIntoView(true);
      stepsQuestionnaire[count].style.opacity="1";
      stepsQuestionnaire[count-1].style.opacity="0.2"; // reduce opacity of a completed step so user focus is on current step
      checkButtonStep();
    //  skipPastNextHiddenSections();
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
    //    hideSections(hideTheseSectionsArray);; // might not be necessary
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
        hideSections(hideTheseSectionsArray);;
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
         hideSections(hideTheseSectionsArray);;
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



// Call whenever you want to add a section to hideTheseSectionsArray
function addHiddenSection(addItem) {
  // Loop through and add each section to hideTheseSectionsArray.
  for (let i = 0; i < addItem.length; i++) {
    if (hideTheseSectionsArray.indexOf(addItem[i]) === -1 && typeof addItem[i] !== "undefined") { // Need to exclude undefined because one parameter (either addItem or subtractItem) is likely left blank in the original function call
      hideTheseSectionsArray.push(addItem[i]);
      console.log("add to hideTheseSectionsArray so section will be hidden: ", addItem[i]);
    } else {
        console.log("There's already an ", addItem[i], " here. Don't do anything");
    }
  }
}

// Call whenever you want to remove a section from hideTheseSectionsArray
function subtractSections(subtractItem) {
  // Subtracts one section from hideTheseSectionsArray. Loop allows one or more sections to be passed as parameters
  if (hideTheseSectionsArray.indexOf(subtractItem[i]) > -1 && typeof subtractItem[i] !== "undefined") {
    var arrayIndex = hideTheseSectionsArray.indexOf(subtractItem[i]);
    hideTheseSectionsArray.splice(arrayIndex);
    console.log("subtract from hideTheseSectionsArray so section will display: ", subtractItem[i]);
  }
}

// Hide any sections present in hideTheseSectionsArray
function hideSections(hideTheseSectionsArray) {
  console.log("hideSections(hideTheseSectionsArray); runs on line 203. These are the steps to hide. Should not be blank.", hideTheseSectionsArray);
  if (hideTheseSectionsArray.length > 0) {
    for (let i = 0; i <= hideTheseSectionsArray.length; i++) {
      if (hideTheseSectionsArray[i] !== undefined) {
        hideTheseSectionsArray[i].style.display = "none";
      }
    }
  }
};

// Hide any sections present in hideTheseSectionsArray
function showSections(showTheseSectionsArray) {
  if (showTheseSectionsArray.length > 0) {
    for (let i = 0; i <= showTheseSectionsArray.length; i++) {
      if (showTheseSectionsArray[i] !== undefined) {
        showTheseSectionsArray[i].style.display = "block";
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

/*
// function to bulk hide steps based on which questionnaire path the user chooses
function hideSectionsNotInPath(path) {
  if (path === "city") {
    hideSections(
      [cityUnavailableSection,
      studentOrEmployeeSection,
      potentialIssueSection,
      checkBylawsSection,
      privateTicketAppealReason]);
    subtractSections(
      [parkingTicketIssuerSection,
      municipalitySection,
      ticketNumberSection,
      ticketAccuracySection,
      ticketReasonSection,
      ticketAppealBylawSection,
      nameSection,
      contactDetailsSection,
      mailingAddressSection]);
      console.log("hideTheseSectionsArray WORKS HERE:", hideTheseSectionsArray);
    hideSections(hideTheseSectionsArray);;
    outputTemplateText("city");
  } else if (path === "city unavailable") {
    hideSections(
      [studentOrEmployeeSection,
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
      photoUploadSection]);
    console.log("STILL WORKING HERE. hideTheseSectionsArray holds: ", hideTheseSectionsArray);
    subtractSections(
      [parkingProblemSection,
      municipalitySection,
      cityUnavailableSection]);
      console.log("PROBLEM HAPPENS HERE: hideTheseSectionsArray should hold everything passed to hideSections(hideTheseSectionsArray);", hideTheseSectionsArray);
      hideSections(hideTheseSectionsArray);;
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
      subtractSections(
        parkingTicketIssuerSection,
        ticketNumberSection,
        ticketAccuracySection,
        privateTicketAppealReason,
        nameSection,
        contactDetailsSection);
      hideSections(hideTheseSectionsArray);;
      outputTemplateText("private operator");
  } else if (path === "institution") {
      hideSections(
        potentialIssueSection,
        checkBylawsSection,
        municipalitySection,
        cityUnavailableSection,
        ticketReasonSection,
        ticketAppealBylawSection);
      subtractSections(
        parkingTicketIssuerSection,
        studentOrEmployeeSection,
        ticketNumberSection,
        ticketAccuracySection,
        privateTicketAppealReason,
        nameSection,
        contactDetailsSection,
        mailingAddressSection);
      hideSections(hideTheseSectionsArray);;
      outputTemplateText("institution");
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
      hideSections(hideTheseSectionsArray);;
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
      subtractSections(
        potentialIssueSection,
        checkBylawsSection);
      hideSections(hideTheseSectionsArray);;
      outputTemplateText("check bylaws");
    }
};
*/

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
  } else if (answerValue === "institution") { // not working // may want this to be apart of additional info section and not the output
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






//VARIABLES
  // Bylaw info box
let checkBylawsOutputTemplate = "";
let cityBylawLink = document.getElementById("city-bylaw-link");
cityBylawLink.href = "https://www.edmonton.ca/transportation/Bylaws/C5590.pdf"; // Can add links here as add more cities
let cityBylawLink2 = document.getElementById("city-bylaw-link-2");
cityBylawLink2.href = "https://www.edmonton.ca/transportation/Bylaws/C5590.pdf";
let cityBylawName = "Bylaw 5590";

  // Edmonton bylaw object
let bylawTextObj = {
ticketReason1: "parking in an expired meter zone",
checkBylawsPlainLanguageHint1: "Looks like you shouldn't get a ticket if you still have time on the meter, have a permit displayed, or park during the meter's off-hours.",
ticketBylawExplanation1: "<ul>s(42)<li>(1) A vehicle shall not be parked on a highway in any space governed by a parking meter unless there is unexpired time remaining on the meter.</li><li>(2) This section is only in effect on the days and during the times a parking meter is identified as being in effect.</li><li>(3) This section does not apply to a vehicle displaying a valid and subsisting permit issued by the City for metered space parking so long as all conditions of the permit are satisfied.</li></ul>",

ticketReason2: "being parked in excess of posted limit in a time restricted zone",
checkBylawsPlainLanguageHint2: "This one is pretty straightforward. You need to stay within the displayed time limit if there is a parking sign nearby.",
ticketBylawExplanation2: "<ul>s(38) <li>A vehicle shall not be parked on a highway in any location identified as a time limited zone for a period of time in excess of the time limit.</li></ul>",

ticketReason3: "parking outside a metered space",
checkBylawsPlainLanguageHint3: "Looks like in order to avoid a ticket you need to have been parked within the metered space. You should also park as close as possible to the meter.",
ticketBylawExplanation3: "<ul>s(43) <li>A vehicle parked on a highway in any space governed by a parking meter shall: <br>(a) be parked completely within the metered space; and </li><li>(b) if the metered space is parallel to the edge of the roadway, be parked so that: <br>(i) the front of the vehicle is as close as possible to the parking meter if the meter is situated at the front of the space; or <br>(ii) the rear of the vehicle is  as close as possible to the parking meter if the meter is situated at the rear of the space; or <br>(iii) if the metered space is at an angle to the edge of the roadway, be parked so that the front of the vehicle is as close as possible to the parking meter.</li></ul>",

ticketReason4: "parking in a closed pay and display zone",
checkBylawsPlainLanguageHint4: "You can't park in a closed pay and display zone.",
ticketBylawExplanation4: "<ul>s(46) <li>A vehicle shall not be parked on a highway in any space identified as a pay and display zone when that zone is closed.</li></ul>",

ticketReason5: "parking in a space with a hooded meter",
checkBylawsPlainLanguageHint5: "You can't park in front of a covered meter.",
ticketBylawExplanation: "<ul>s(44) <li>A vehicle shall not be parked on a highway in any space governed by a parking meter on which a hood or cover has been placed.</li></ul>",

ticketReason6: "parking too close to a stop or yield sign",
checkBylawsPlainLanguageHint6: "You can't park within 5 metres of a stop or yield sign unless a traffic sign indicates otherwise.",
ticketBylawExplanation6: "<ul>s(6) <li>Unless a traffic control device permits or requires, a vehicle shall not be parked in the case of an approach to a stop sign or yield sign within 5 metres of the stop sign or yield sign.</li></ul>",

ticketReason7: "parking too close to a crosswalk",
checkBylawsPlainLanguageHint7: "You can't park within 5 metres of the nearest side of a crosswalk unless a sign indicates otherwise.",
ticketBylawExplanation: "<ul>s(5) <li>Unless a traffic control device permits or requires, a vehicle shall not be parked: <br><br>(a) on a crosswalk or any part of a crosswalk; or <br><br>(b) within 5 metres of the near side of a marked crosswalk.</li></ul>",

ticketReason8: "parking too close to a fire hydrant",
checkBylawsPlainLanguageHint8: "You can't park or stop within 5 metres of a fire hydrant (or the nearest curb). There is an exception if you are a taxi in a taxi zone and remain in the vehicle.",
ticketBylawExplanation8: "<ul>s(8) <li>(1) Except as permitted in this section a vehicle shall not be stopped on a highway within 5 metres of a fire hydrant or, when the hydrant is not located at the curb, within 5 metres from the point on the curb nearest the fire hydrant.</li><li>(2) A taxi may stop within 5 metres of a hydrant identified as a taxi zone only if: <br><br>(i) the operator remains in the vehicle at all times; and <br><br>(ii) the operator immediately removes the vehicle from the taxi zone upon the direction of a peace officer or a member of the City’s Fire Rescue Service.</li></ul>",

ticketReason9: "parking too close to an intersection",
checkBylawsPlainLanguageHint9: "Looks like you can't park within 5 metres of an intersection or 1.5 metres from a private access, driveway, or any other vehicle crossing over a sidewalk unless a sign states otherwise.",
ticketBylawExplanation9: "<ul>s(7) <li>Unless a traffic control device permits or requires, a vehicle shall not be parked: <br><br>(a) at an intersection within 5 metres of the projection of the curb or edge of the roadway; <br><br>(b) within an intersection other than immediately next to the curb or edge of the roadway in a “T” intersection; or <br><br>(c) within 1.5 metres of an access to a garage, private road or driveway or a vehicle crossway over a sidewalk.</li></ul>",

ticketReason10: "parking too close to a centre line",
checkBylawsPlainLanguageHint10: "You can't park within 3 metres of the road centre line if the road is at least 12 metres wide.",
ticketBylawExplanation10: "<ul>s(16) <li>A vehicle shall not be parked within 3 metres of the centre line of the roadway on a highway where the roadway portion is 12 metres or more in width.</li></ul>",

ticketReason11: "parallel parking more than 500mm from the curb",
checkBylawsPlainLanguageHint11: "If you parallel park you need to be within 500mm from the curb and facing the direction of travel.",
ticketBylawExplanation11: "<ul>s(22) <li>(1) A vehicle parked on a highway shall be parked: <br><br>(a) with: <br><br>(i) the sides of the vehicle parallel to the curb or edge of the roadway, and <br><br>(ii) the right wheels of the vehicle not more than 500 millimetres from the right curb or edge of the roadway, or <br><br>(b) in the case of a one-way highway where parking on either side is permitted, with: <br><br>(i) the sides of the vehicle parallel to the curb or edge of the roadway, <br><br>(ii) the wheels that are the closest to a curb or edge of the roadway not more than 500 millimetres from that curb or edge, and <br><br>(iii) the vehicle facing in the direction of travel authorized for the highway</li></ul>",

ticketReason12: "parking on a sidewalk or boulevard",
checkBylawsPlainLanguageHint12: "You can't park on any part of a sidewalk or boulevard unless a sign states otherwise.",
ticketBylawExplanation12: "<ul>s(4) <li>Unless a traffic control device permits or requires, a vehicle shall not be parked on a sidewalk or boulevard or any part of a sidewalk or boulevard.</li></ul>",

ticketReason13: "parking in a way that caused an obstruction",
checkBylawsPlainLanguageHint13: "You can't park in a way that blocks traffic, a building's doorway, or anywhere an emergency vehicle needs regular access to such as a hospital, police or fire station.",
ticketBylawExplanation13: "<ul>s(15) <li>A vehicle shall not be parked on a highway in a manner that blocks or obstructs: <br><br>(a) the movement of traffic on the highway; <br><br>(b) a doorway to a building; or <br><br>(c) the approach to any fire station, police station, hospital or other place where emergency vehicles require regular access.</li></ul>",

ticketReason14: "parking in a bus zone",
checkBylawsPlainLanguageHint14: "Unless you're a bus you can't park in a bus zone. A taxi can stop 6 metres in front of a bus zone if they are loading/unloading passengers.",
ticketBylawExplanation14: "<ul>s(35) <li>(1) Except as permitted in this section a vehicle shall not be stopped on a highway in any location identified as a bus zone unless the vehicle is a bus.</li><li>(2) A taxi may stop in the forward 6 metres of any bus zone while in the process of actually loading or unloading passengers.</li></ul>",

ticketReason15: "parking in an emergency access zone",
checkBylawsPlainLanguageHint15: "You can't park in a fire lane or any emergency access zone.",
ticketBylawExplanation15: "<ul>s(33) <li>A vehicle shall not be parked on a highway in any location identified as a fire lane, an emergency access zone or otherwise being for the use of emergency vehicles.</li></ul>",

ticketReason16: "parking on a seasonal parking route while a ban was in effect",
checkBylawsPlainLanguageHint16: "You have 8 hours to remove your vehicle from a seasonal parking route once a ban is put in effect.",
ticketBylawExplanation16: "<ul>s(36) <li>(1) A vehicle shall not be parked on a highway in any location identified as a seasonal parking ban route.</li><li>(2) This section only applies when the location identified as a seasonal parking ban route has been designated in effect by the City Manager.</li><li>(3) A vehicle parked on a highway in a location identified as a seasonal parking ban route must be removed from the location identified as a seasonal parking ban route within 8 hours of a seasonal parking route ban having been declared in effect.</li></ul>",

ticketReason17: "parking in a permit zone without a proper permit",
checkBylawsPlainLanguageHint17: "You can't park in a permit zone unless you have a valid permit displayed.",
ticketBylawExplanation17: "<ul>s(37) <li>A vehicle shall not be parked on a highway in any location where a permit to park is required unless a valid and subsisting permit is clearly displayed on the vehicle.</li></ul>",

ticketReason18: "parking in a disabled zone without a permit",
checkBylawsPlainLanguageHint18: "You can't park in a disabled zone unless you are transporting someone with a disability and have a valid permit/license plate.",
ticketBylawExplanation18: "<ul>s(34) <li>A vehicle shall not be parked on a highway in any location identified as being for the use of persons with disabilities unless the vehicle: <br><br>(a) displays a valid disabled placard or license plate issued or recognized by the Registrar; and <br><br>(b) is being used for the transportation of a person with a disability.</li></ul>",

ticketReason19: "parking in a no stopping zone",
checkBylawsPlainLanguageHint19: "Pretty straight forward. You can't stop anywhere designated as a no stopping zone.",
ticketBylawExplanation19: "<ul>s(31) <li>A vehicle shall not be stopped on a highway in any location identified as a zone where stopping is prohibited.</li></ul>",

ticketReason20: "parking in a no parking zone",
checkBylawsPlainLanguageHint20: "No surprises here. You can't park anywhere designated as a no-parking zone.",
ticketBylawExplanation20: "<ul>s(30) <li>A vehicle shall not be parked on a highway in any location identified as a zone where parking is prohibited.</li></ul>",

ticketReason21: "parking in a commercial loading zone",
checkBylawsPlainLanguageHint21: "Unless you're a commerical vehicle, you can't park in a marked commercial loading zone. Commercial vehicles still need to obey any posted time restrictions.",
ticketBylawExplanation21: "<ul>s(28) <li>(1) A vehicle shall not be parked on a highway in any location identified as a commercial loading zone unless the vehicle is a commercial vehicle.</li><li>(2) A vehicle shall not be parked on a highway in any location identified as a commercial loading zone for a period of time longer than that permitted.</li></ul>",

ticketReason22: "parking in a passenger loading zone",
checkBylawsPlainLanguageHint22: "You can't stay in a passenger loading zone longer than signage allows.",
ticketBylawExplanation22: "<ul>s(27) <li>A vehicle shall not be parked on a highway in any location identified as a passenger loading zone for a period of time longer than that permitted.</li.</ul>",

ticketReason23: "parking outside a marked space",
checkBylawsPlainLanguageHint23: "Your vehicle needs to be completely inside the lines when you park in a marked space.",
ticketBylawExplanation23: "<ul>s(14) <li>A vehicle parked on a highway in a location marked by lines or otherwise shall be parked entirely within the markings.</li></ul>",

ticketReason24: "incorrect angle parking",
checkBylawsPlainLanguageHint24: "Looks like if you are angle parking you need to make sure your front wheels are within 500mm of the front of the stall. Motorcyles can have either wheel within 500mm of the front of the stall so long as they are angled in the direction of travel. If your vehicle is more than 5.8 metres long you can't angle park unless you have a permit or there is signage allowing angle parking.",
ticketBylawExplanation24: "<ul>s(23) <li>(1) When: <br><br>(a) a sign indicates that angle parking is permitted or required, and <br><br>(b) parking guide lines are visible on the roadway, a vehicle shall be parked with the vehicle’s sides between and parallel to any two of the guide lines, and <br><br>(c) in the case of a vehicle other than a motor cycle, with one front wheel not more than 500 millimetres from the curb or edge of the roadway, or <br><br>(d) in the case of a motor cycle with: <br><br>(i) a wheel of the motor cycle not more than 500 millimetres from the curb or edge of the roadway and <br><br>(ii) the motor cycle angled in the direction of travel authorized for the traffic lane that is adjacent to the lane on which the motor cycle is parked;</li.><li>(3) A vehicle with a total length exceeding 5.8 metres shall not be parked at an angle on a highway unless: <br><br>(a) a sign specifically permits such parking; or <br><br>(b) the vehicle displays a permit authorizing such parking issued by the City.</li></ul>",

ticketReason25: "leaving my vehicle unattended while on a jack",
checkBylawsPlainLanguageHint25: "You can't leave your vehicle unattended if its on a jack or you are missing a wheel.",
ticketBylawExplanation25: "<ul>s(25) <li>A vehicle shall not be parked and left unattended on a highway if: <br><br>(a) the vehicle is on a jack or a similar device, and <br><br>(b) one or more wheels have been removed from the vehicle or part of the vehicle is raised.</li></ul>",

ticketReason26: "parking a vehicle that was more than 12.5 metres long",
checkBylawsPlainLanguageHint26: "Unless you have a recreational vehicle or are loading/unloading a commercial vehicle with hazard lights on, you can't park a vehicle longer than 12.5 metres (including trailers) next to residential property. Public roads not adjacent to residential property should be ok unless it is between 7pm-7am.",
ticketBylawExplanation26: "<ul>s(17) <li>(1) A vehicle, or a vehicle with a trailer attached, with a total length exceeding 12.5 metres shall not be parked on a highway: <br><br>(a) in a location adjoining residential property at any time; or <br><br>(b) in a location not adjoining residential property at anytime after 7:00 p.m. and before 7:00 a.m.</li><li>(2) This section does not apply if the vehicle: <br><br>(a) is a recreational vehicle; or <br><br>(b) is a commercial vehicle with the hazard warning lamps alight and in the process of loading or unloading goods.</li></ul>",

ticketReason27: "parking a vehicle in the same location for more than 72 hrs",
checkBylawsPlainLanguageHint27: "A vehicle is considered abandoned if it's left parked for 72 hrs.",
ticketBylawExplanation28: "<ul>s(26) <li>(1) A vehicle shall not be abandoned on a highway.</li><li>(2) Without restricting the generality of subsection (1) a vehicle that is left standing in one location on a highway for more than 72 consecutive hours is deemed to have been abandoned at that location.</li></ul>",

ticketReason28: "incorrectly parking a recreational vehicle on a public road",
checkBylawsPlainLanguageHint28: "You can't park a recreational vehicle on the road unless it's completely adjoining the owner's residence (aka is parked next to your property only) and isn't left for more than 72 hrs. You also need to wait at least 48hrs before re-parking in the same spot.",
ticketBylawExplanation28: "<ul>s(19) <li>(1) A recreational vehicle shall not be parked on a highway unless it is parked in a location completely adjoining the recreational vehicle owner’s residence as shown in the records of the Motor Vehicle Registry.</li><li>(2) A recreational vehicle parked pursuant to this section: <br><br>(a) shall not be parked for more than 72 consecutive hours; and <br><br>(b) shall be removed to an off-highway location for at least 48 consecutive hours before it may be parked again on a highway.</li></ul>",

ticketReason29: "parking in an alley",
checkBylawsPlainLanguageHint29: "You can't park in an alley unless a sign states otherwise or are a commercial vehicle loading/unloading with your hazard lights on and don't take longer than 30 min. No vehicle is allowed to block an alley.",
ticketBylawExplanation: "<ul>s(12) <li>(1) A vehicle shall not be parked in an alley unless:<br><br>(a) a traffic control device permits such parking; or <br><br>(b) the vehicle is a commercial vehicle with hazard warning lights alight and in the process of loading or unloading goods.</li><li>(2) Notwithstanding subsection (1)(b) a commercial vehicle shall not be parked in an alley for more than 30 minutes.</li><li>(3) Nothing in this section permits a person to park a vehicle in an alley in a manner that blocks or obstructs the movement of traffic.</li></ul>",

ticketReason30: "double parking next to another vehicle",
checkBylawsPlainLanguageHint30: "You can't double park next to a vehicle unless a sign states otherwise.",
ticketBylawExplanation30: "<ul>s(10) <li>Unless a traffic control device permits or requires, a vehicle shall not be parked on the roadway side of a vehicle that is parked at the curb or edge of the roadway.</li></ul>",

ticketReason31: "parking in a bridge or tunnel",
checkBylawsPlainLanguageHint31: "You can't park in, or on the approach to, a bridge or tunnel unless a sign states otherwise.",
ticketBylawExplanation31: "<ul>s(9) <li>Unless a traffic control device permits or requires, a vehicle shall not be parked on any bridge or in any tunnel or on any approach to either of them.</li></ul>",

ticketReason32: "parking an unattached trailer",
checkBylawsPlainLanguageHint32: "You can't leave trailers unattached. Trailers need to be attached to a vehicle capable of towing it.",
ticketBylawExplanation: "<ul>s(20) <li>Notwithstanding any other provision of this bylaw, a trailer shall not be parked on a highway unless the trailer is attached to a vehicle by which it may be drawn.</li></ul>",

ticketReason33: "pay and display zone violation",
checkBylawsPlainLanguageHint33: "You need to have a valid ticket or permit displayed while you're in an active pay and display zone. These rules don't apply during the zone's off hours.",
ticketBylawExplanation33: "<ul>s(45) <li>(1) A vehicle shall not be parked on a highway in any space identified as a pay and display zone unless there is unexpired time remaining on a ticket issued by a pay and display machine.</li><li>(2) A vehicle shall not be parked on a highway in any space identified as a pay and display zone unless there is a ticket issued by a pay and display machine displayed face up in a clearly visible location on the dashboard of the vehicle.</li><li>(3) This section is only in effect on the days and during the times a pay and display zone is identified as being in effect.</li><li>(4) This section does not apply to a vehicle displaying a valid permit issued by the City for pay and display zone parking so long as all conditions of the permit are satisfied.</li></ul>",

ticketReason34: "EPark zone violation",
checkBylawsPlainLanguageHint34: "Looks like you can't exceed the paid time remaining as displayed on the traffic control device unless signage indicates off-hours. If your license plate is absent or incorrectly recorded into the EPark device, the court will consider payment was not made unless you are able to prove otherwise.",
ticketBylawExplanation34: "<ul>s(38.1) <li>(1) A vehicle shall not be parked in an EPark zone: <br><br>(a) for a period of time in excess of the time limit indicated on a traffic control device; <br><br>(b) unless the full amount of the required payment for that EPark zone has been made in accordance with the instructions on a traffic control device; or <br><br>(c) contrary to any other restriction on a traffic control device.</li><li>(2) In a prosecution under this section, where a certified copy of a record of the City containing licence plate and payment information for an EPark zone from the time of the alleged offence is tendered: <br><br>(a) the Court may conclude that, in the absence of licence plate information being found in the record, the required payment has not been made in relation to the vehicle to which that licence plate corresponds; and <br>(b) where the licence plate information of a vehicle is absent from the record, the onus of proving a person has made the required payment in relation to that vehicle shall be on the person alleging the required payment has been made on a balance of probabilities</li></ul>",

ticketReason35: "parking bylaw not found",
checkBylawsPlainLanguageHint35: "",
ticketBylawExplanation35: "Sorry, I couldn't find the bylaw for this situation :("
};









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
        // // hideSectionsNotInPath("city");
        hideTheseSectionsArray = [cityUnavailableSection,
          studentOrEmployeeSection,
          potentialIssueSection,
          checkBylawsSection,
          privateTicketAppealReason];
        hideSections(hideTheseSectionsArray);
        showTheseSectionsArray = [
          parkingTicketIssuerSection,
          municipalitySection,
          ticketNumberSection,
          ticketAccuracySection,
          ticketReasonSection,
          ticketAppealBylawSection,
          nameSection,
          contactDetailsSection,
          mailingAddressSection];
        showSections(showTheseSectionsArray);
        return;
      }
      else if (parkingProblemRadioOptions[i].value === "2") {
        // // hideSectionsNotInPath("report abandoned vehicle");
        hideTheseSectionsArray = [
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
          photoUploadSection];
        hideSections(hideTheseSectionsArray);
        showTheseSectionsArray = [];
        showSections(showTheseSectionsArray);
        outputTemplateText("report abandoned vehicle");
        return;
      }
      else if (parkingProblemRadioOptions[i].value === "3") {
      //  // hideSectionsNotInPath("check bylaws");
        hideTheseSectionsArray = [
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
          photoUploadSection];
        hideSections(hideTheseSectionsArray);
        showTheseSectionsArray = [
          potentialIssueSection,
          checkBylawsSection];
        showSections(showTheseSectionsArray);
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
        hideTheseSectionsArray = [studentOrEmployeeSection];
        hideSections(hideTheseSectionsArray);
        showTheseSectionsArray = [
          parkingProblemSection,
          parkingTicketIssuerSection,
          municipalitySection,
          ticketNumberSection,
          ticketAccuracySection,
          ticketReasonSection,
          ticketAppealBylawSection,
          privateTicketAppealReason,
          photoUploadSection,
          ticketDateSection,
          nameSection,
          contactDetailsSection,
          mailingAddressSection
        ];
        showSections(showTheseSectionsArray);
        return templateType = "city";

      }
      else if (ticketIssuerRadioOptions[i].value === "2") {
        hideTheseSectionsArray = [municipalitySection];
        hideSections(hideTheseSectionsArray);
        showTheseSectionsArray = [
          parkingProblemSection,
          parkingTicketIssuerSection,
          ticketNumberSection,
          ticketAccuracySection,
          ticketReasonSection,
          privateTicketAppealReason,
          photoUploadSection,
          ticketDateSection,
          nameSection,
          contactDetailsSection,
          mailingAddressSection
        ];
        showSections(showTheseSectionsArray);
        return templateType = "private operator";
      }
      else if (ticketIssuerRadioOptions[i].value === "3") {
        hideTheseSectionsArray = [municipalitySection];
        hideSections(hideTheseSectionsArray);
        showTheseSectionsArray = [
          parkingProblemSection,
          parkingTicketIssuerSection,
          ticketNumberSection,
          ticketAccuracySection,
          ticketReasonSection,
          privateTicketAppealReason,
          photoUploadSection,
          ticketDateSection,
          nameSection,
          contactDetailsSection,
          mailingAddressSection
        ];
        showSections(showTheseSectionsArray);
        return templateType = "institution";
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
        hideTheseSectionsArray = [cityUnavailableSection];
        hideSections(hideTheseSectionsArray);
        showTheseSectionsArray = [
          parkingProblemSection,
          parkingTicketIssuerSection,
          municipalitySection,
          ticketNumberSection,
          ticketAccuracySection,
          ticketReasonSection,
          ticketAppealBylawSection,
          privateTicketAppealReason,
          photoUploadSection,
          ticketDateSection,
          nameSection,
          contactDetailsSection,
          mailingAddressSection
        ];
        showSections(showTheseSectionsArray);
        return city = "City of Edmonton";
      }
      else if (municipalityRadioOptions[i].value === "2") {
      //  hideTheseSectionsArray = [];
      //  hideSections(hideTheseSectionsArray);
        showTheseSectionsArray = [
          parkingProblemSection,
          parkingTicketIssuerSection,
          municipalitySection,
          cityUnavailableSection,
          ticketNumberSection,
          ticketAccuracySection,
          ticketReasonSection,
          ticketAppealBylawSection,
          privateTicketAppealReason,
          photoUploadSection,
          ticketDateSection,
          nameSection,
          contactDetailsSection,
          mailingAddressSection
        ];
        showSections(showTheseSectionsArray);
        return city = document.getElementById("new-city-request-textfield").value;;
      }
    }
  }
}());
/*
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
*/

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
    outputTemplateText("institution");
  } else if (answerValue === "2") {
    yesStudentOrEmployee = "";
    outputTemplateText("institution")
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
