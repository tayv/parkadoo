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

  // Output
let cityOutputTemplate = "";
let abandonedVehicleOutputTemplate = "";
let privateOperatorOutputTemplate = "";
let institutionOutputTemplate = "";
let city = "";
let yesStudentOrEmployee = "";
  // Bylaw info box
let checkBylawsIntroParagraph = ""; // customized phrasing by city
let checkBylawsPlainLanguageHint = "";
let checkBylawsOutputTemplate = "";
let cityBylawLink = document.getElementById("city-bylaw-link");
cityBylawLink.href = "https://www.edmonton.ca/transportation/Bylaws/C5590.pdf"; // Can add links here as add more cities
let cityBylawLink2 = document.getElementById("city-bylaw-link-2");
cityBylawLink2.href = "https://www.edmonton.ca/transportation/Bylaws/C5590.pdf";
let cityBylawName = "Bylaw 5590";

 // default array for sections to hide
var hidePushThisArray = [];

// variables for specific answers
 // #ticket-number-section
let ticketNumberAnswer = "";
  // #ticket-reason-section
let ticketReason = "";
let ticketBylawExplanation = "";
  // #ticket-appeal-bylaw-section
let ticketAppealBylawAnswer = "";
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
  // bylaw object
let bylawTextObj = {
  ticketReason1: "parking in an expired meter zone",
  checkBylawsPlainLanguageHint1: "Looks like you shouldn't get a ticket if you still have time on the meter, have a permit displayed, or park during the meter's off-hours.",
  ticketBylawExplanation1: "<ul>s(42)<li>(1) A vehicle shall not be parked on a highway in any space governed by a parking meter unless there is unexpired time remaining on the meter.</li><li>(2) This section is only in effect on the days and during the times a parking meter is identified as being in effect.</li><li>(3) This section does not apply to a vehicle displaying a valid and subsisting permit issued by the City for metered space parking so long as all conditions of the permit are satisfied.</li></ul>",

  ticketReason2: "being parked in excess of posted limit in a time restricted zone",
  checkBylawsPlainLanguageHint2: "test number 1",
  ticketBylawExplanation2: "<ul>s(38) <li>A vehicle shall not be parked on a highway in any location identified as a time limited zone for a period of time in excess of the time limit.</li></ul>",

  ticketReason3: "parking outside a metered space",
  checkBylawsPlainLanguageHint3: "test number 2",
  ticketBylawExplanation3: "<ul>s(43) <li>A vehicle parked on a highway in any space governed by a parking meter shall: <br>(a) be parked completely within the metered space; and </li><li>(b) if the metered space is parallel to the edge of the roadway, be parked so that: <br>(i) the front of the vehicle is as close as possible to the parking meter if the meter is situated at the front of the space; or <br>(ii) the rear of the vehicle is  as close as possible to the parking meter if the meter is situated at the rear of the space; or <br>(iii) if the metered space is at an angle to the edge of the roadway, be parked so that the front of the vehicle is as close as possible to the parking meter.</li></ul>",

  ticketReason4: "parking in a closed pay and go zone",
  checkBylawsPlainLanguageHint4: "",
  ticketBylawExplanation4: "<ul>s(46) <li>A vehicle shall not be parked on a highway in any space identifiedas a pay and display zone when that zone is closed.</li></ul>",

  ticketReason5: "parking in a space with a hooded meter",
  checkBylawsPlainLanguageHint5: "",
  ticketBylawExplanation: "<ul>s(44) <li>A vehicle shall not be parked on a highway in any space governed by a parking meter on which a hood or cover has been placed.</li></ul>",

  ticketReason6: "parking too close to a stop or yield sign",
  checkBylawsPlainLanguageHint6: "",
  ticketBylawExplanation6: "<ul>s(6) <li>Unless a traffic control device permits or requires, a vehicle shall not be parked in the case of an approach to a stop sign or yield sign within 5 metres of the stop sign or yield sign.</li></ul>",

  ticketReason7: "parking too close to a crosswalk",
  checkBylawsPlainLanguageHint7: "",
  ticketBylawExplanation: "<ul>s(5) <li>Unless a traffic control device permits or requires, a vehicle shall not be parked: <br><br>(a) on a crosswalk or any part of a crosswalk; or <br><br>(b) within 5 metres of the near side of a marked crosswalk.</li></ul>",

  ticketReason8: "parking too close to a fire hydrant",
  checkBylawsPlainLanguageHint8: "",
  ticketBylawExplanation8: "<ul>s(8) <li>(1) Except as permitted in this section a vehicle shall not be stopped on a highway within 5 metres of a fire hydrant or, when the hydrant is not located at the curb, within 5 metres from the point on the curb nearest the fire hydrant.</li><li>(2) A taxi may stop within 5 metres of a hydrant identified as a taxi zone only if: <br><br>(i) the operator remains in the vehicle at all times; and <br><br>(ii) the operator immediately removes the vehicle from the taxi zone upon the direction of a peace officer or a member of the City’s Fire Rescue Service.</li></ul>",

  ticketReason9: "parking too close to an intersection",
  checkBylawsPlainLanguageHint9: "",
  ticketBylawExplanation9: "<ul>s(7) <li>Unless a traffic control device permits or requires, a vehicle shall not be parked: <br><br>(a) at an intersection within 5 metres of the projection of the curb or edge of the roadway; <br><br>(b) within an intersection other than immediately next to the curb or edge of the roadway in a “T” intersection; or <br><br>(c) within 1.5 metres of an access to a garage, private road or driveway or a vehicle crossway over a sidewalk.</li></ul>",

  ticketReason10: "parking too close to a centre line",
  checkBylawsPlainLanguageHint10: "",
  ticketBylawExplanation10: "<ul>s(16) <li>A vehicle shall not be parked within 3 metres of the centre line of the roadway on a highway where the roadway portion is 12 metres or more in width.</li></ul>",

  ticketReason11: "parallel parking more than 500mm from the curb",
  checkBylawsPlainLanguageHint11: "",
  ticketBylawExplanation11: "<ul>s(22) <li>(1) A vehicle parked on a highway shall be parked: <br><br>(a) with: <br><br>(i) the sides of the vehicle parallel to the curb or edge of the roadway, and <br><br>(ii) the right wheels of the vehicle not more than 500 millimetres from the right curb or edge of the roadway, or <br><br>(b) in the case of a one-way highway where parking on either side is permitted, with: <br><br>(i) the sides of the vehicle parallel to the curb or edge of the roadway, <br><br>(ii) the wheels that are the closest to a curb or edge of the roadway not more than 500 millimetres from that curb or edge, and <br><br>(iii) the vehicle facing in the direction of travel authorized for the highway</li></ul>",

  ticketReason12: "parking on a sidewalk or boulevard",
  checkBylawsPlainLanguageHint12: "",
  ticketBylawExplanation12: "<ul>s(4) <li>Unless a traffic control device permits or requires, a vehicle shall not be parked on a sidewalk or boulevard or any part of a sidewalk or boulevard.</li></ul>",

  ticketReason13: "parking in a way that caused an obstruction",
  checkBylawsPlainLanguageHint13: "",
  ticketBylawExplanation13: "<ul>s(15) <li>A vehicle shall not be parked on a highway in a manner that blocks or obstructs: <br><br>(a) the movement of traffic on the highway; <br><br>(b) a doorway to a building; or <br><br>(c) the approach to any fire station, police station, hospital or other place where emergency vehicles require regular access.</li></ul>",

  ticketReason14: "parking in a bus zone",
  checkBylawsPlainLanguageHint14: "",
  ticketBylawExplanation14: "<ul>s(35) <li>(1) Except as permitted in this section a vehicle shall not be stopped on a highway in any location identified as a bus zone unless the vehicle is a bus.</li><li>(2) A taxi may stop in the forward 6 metres of any bus zone while inthe process of actually loading or unloading passengers.</li></ul>",

  ticketReason15: "parking in an emergency access zone",
  checkBylawsPlainLanguageHint15: "",
  ticketBylawExplanation15: "<ul>s(33) <li>A vehicle shall not be parked on a highway in any location identified as a fire lane, an emergency access zone or otherwise being for the use of emergency vehicles.</li></ul>",

  ticketReason16: "parking on a seasonal parking route while a ban was in effect",
  checkBylawsPlainLanguageHint16: "",
  ticketBylawExplanation16: "<ul>s(36) <li>(1) A vehicle shall not be parked on a highway in any location identified as a seasonal parking ban route.</li><li>(2) This section only applies when the location identified as a seasonal parking ban route has been designated in effect by the City Manager.</li><li>(3) A vehicle parked on a highway in a location identified as a seasonal parking ban route must be removed from the location identified as a seasonal parking ban route within 8 hours of a seasonal parking route ban having been declared in effect.</li></ul>",

  ticketReason17: "parking in a permit zone without a proper permit",
  checkBylawsPlainLanguageHint17: "",
  ticketBylawExplanation17: "<ul>s(37) <li>A vehicle shall not be parked on a highway in any location where a permit to park is required unless a valid and subsisting permit is clearly displayed on the vehicle.</li></ul>",

  ticketReason18: "parking in a disabled zone without a permit",
  checkBylawsPlainLanguageHint18: "",
  ticketBylawExplanation18: "<ul>s(34) <li>A vehicle shall not be parked on a highway in any location identified as being for the use of persons with disabilities unless the vehicle: <br><br>(a) displays a valid disabled placard or license plate issued or recognized by the Registrar; and <br><br>(b) is being used for the transportation of a person with a disability.</li></ul>",

  ticketReason19: "parking in a no stopping zone",
  checkBylawsPlainLanguageHint19: "",
  ticketBylawExplanation19: "<ul>s(31) <li>A vehicle shall not be stopped on a highway in any location identified as a zone where stopping is prohibited.</li></ul>",

  ticketReason20: "parking in a no parking zone",
  checkBylawsPlainLanguageHint20: "",
  ticketBylawExplanation20: "<ul>s(30) <li>A vehicle shall not be parked on a highway in any location identified as a zone where parking is prohibited.</li></ul>",

  ticketReason21: "parking in a commercial loading zone",
  checkBylawsPlainLanguageHint21: "",
  ticketBylawExplanation21: "<ul>s(28) <li>(1) A vehicle shall not be parked on a highway in any location identified as a commercial loading zone unless the vehicle is a commercial vehicle.</li><li>(2) A vehicle shall not be parked on a highway in any location identified as a commercial loading zone for a period of time longer than that permitted.</li></ul>",

  ticketReason22: "parking in a passenger loading zone",
  checkBylawsPlainLanguageHint22: "",
  ticketBylawExplanation22: "<ul>s(27) <li>A vehicle shall not be parked on a highway in any location identified as a passenger loading zone for a period of time longer than that permitted.</li.</ul>",

  ticketReason23: "parking outside a marked space",
  checkBylawsPlainLanguageHint23: "",
  ticketBylawExplanation23: "<ul>s(14) <li>A vehicle parked on a highway in a location marked by lines or otherwise shall be parked entirely within the markings.</li></ul>",

  ticketReason24: "incorrect angle parking",
  checkBylawsPlainLanguageHint24: "",
  ticketBylawExplanation24: "<ul>s(23) <li>(1) When: <br><br>(a) a sign indicates that angle parking is permitted or required, and <br><br>(b) parking guide lines are visible on the roadway, a vehicle shall be parked with the vehicle’s sides between and parallel to any two of the guide lines, and <br><br>(c) in the case of a vehicle other than a motor cycle, with one front wheel not more than 500 millimetres from the curb or edge of the roadway, or <br><br>(d) in the case of a motor cycle with: <br><br>(i) a wheel of the motor cycle not more than 500 millimetres from the curb or edge of the roadway and <br><br>(ii) the motor cycle angled in the direction of travel authorized for the traffic lane that is adjacent to the lane on which the motor cycle is parked;</li.><li>(3) A vehicle with a total length exceeding 5.8 metres shall not be parked at an angle on a highway unless: <br><br>(a) a sign specifically permits such parking; or <br><br>(b) the vehicle displays a permit authorizing such parking issued by the City.</li></ul>",

  ticketReason25: "leaving my vehicle unattended while on a jack",
  checkBylawsPlainLanguageHint25: "",
  ticketBylawExplanation25: "<ul>s(25) <li>A vehicle shall not be parked and left unattended on a highway if: <br><br>(a) the vehicle is on a jack or a similar device, and <br><br>(b) one or more wheels have been removed from the vehicle or part of the vehicle is raised.</li></ul>",

  ticketReason26: "parking a vehicle that was more than 12.5 metres long",
  checkBylawsPlainLanguageHint26: "",
  ticketBylawExplanation26: "<ul>s(17) <li>(1) A vehicle, or a vehicle with a trailer attached, with a total length exceeding 12.5 metres shall not be parked on a highway: <br><br>(a) in a location adjoining residential property at any time; or <br><br>(b) in a location not adjoining residential property at anytime after 7:00 p.m. and before 7:00 a.m.</li><li>(2) This section does not apply if the vehicle: <br><br>(a) is a recreational vehicle; or <br><br>(b) is a commercial vehicle with the hazard warning lamps alight and in the process of loading or unloading goods.</li></ul>",

  ticketReason27: "parking a vehicle in the same location for more than 72 hrs",
  checkBylawsPlainLanguageHint27: "",
  ticketBylawExplanation28: "<ul>s(26) <li>(1) A vehicle shall not be abandoned on a highway.</li><li>(2) Without restricting the generality of subsection (1) a vehicle that is left standing in one location on a highway for more than 72 consecutive hours is deemed to have been abandoned at that location.</li></ul>",

  ticketReason28: "incorrectly parking a recreational vehicle on a public road",
  checkBylawsPlainLanguageHint28: "",
  ticketBylawExplanation28: "<ul>s(19) <li>(1) A recreational vehicle shall not be parked on a highway unless it is parked in a location completely adjoining the recreational vehicle owner’s residence as shown in the records of the Motor Vehicle Registry.</li><li>(2) A recreational vehicle parked pursuant to this section: <br><br>(a) shall not be parked for more than 72 consecutive hours; and <br><br>(b) shall be removed to an off-highway location for at least 48 consecutive hours before it may be parked again on a highway.</li></ul>",

  ticketReason29: "parking in an alley",
  checkBylawsPlainLanguageHint29: "",
  ticketBylawExplanation: "<ul>s(12) <li>(1) A vehicle shall not be parked in an alley unless:<br><br>(a) a traffic control device permits such parking; or <br><br>(b) the vehicle is a commercial vehicle with hazard warning lights alight and in the process of loading or unloading goods.</li><li>(2) Notwithstanding subsection (1)(b) a commercial vehicle shall not be parked in an alley for more than 30 minutes.</li><li>(3) Nothing in this section permits a person to park a vehicle in an alley in a manner that blocks or obstructs the movement of traffic.</li></ul>",

  ticketReason30: "double parking next to another vehicle",
  checkBylawsPlainLanguageHint30: "",
  ticketBylawExplanation30: "<ul>s(10) <li>Unless a traffic control device permits or requires, a vehicle shall not be parked on the roadway side of a vehicle that is parked at the curb or edge of the roadway.</li></ul>",

  ticketReason31: "parking in a bridge or tunnel",
  checkBylawsPlainLanguageHint31: "",
  ticketBylawExplanation31: "<ul>s(9) <li>Unless a traffic control device permits or requires, a vehicle shall not be parked on any bridge or in any tunnel or on any approach to either of them.</li></ul>",

  ticketReason32: "parking an unattached trailer",
  checkBylawsPlainLanguageHint32: "",
  ticketBylawExplanation: "<ul>s(20) <li>Notwithstanding any other provision of this bylaw, a trailer shall not be parked on a highway unless the trailer is attached to a vehicle by which it may be drawn.</li></ul>",

  ticketReason33: "pay and go zone violation",
  checkBylawsPlainLanguageHint33: "",
  ticketBylawExplanation33: "<ul>s(45) <li>(1) A vehicle shall not be parked on a highway in any space identified as a pay and display zone unless there is unexpired time remaining on a ticket issued by a pay and display machine.</li><li>(2) A vehicle shall not be parked on a highway in any space identifiedas a pay and display zone unless there is a ticket issued by a payand display machine displayed face up in a clearly visible location on the dashboard of the vehicle.</li><li>(3) This section is only in effect on the days and during the times a pay and display zone is identified as being in effect.</li><li>(4) This section does not apply to a vehicle displaying a valid permit issued by the City for pay and display zone parking so long as all conditions of the permit are satisfied.</li></ul>",

  ticketReason34: "EPark zone violation",
  checkBylawsPlainLanguageHint34: "",
  ticketBylawExplanation34: "<ul>s(38.1) <li>(1) A vehicle shall not be parked in an EPark zone: <br><br>(a) for a period of time in excess of the time limit indicated on a traffic control device; <br><br>(b) unless the full amount of the required payment for that EPark zone has been made in accordance with the instructions on a traffic control device; or <br><br>(c) contrary to any other restriction on a traffic control device.</li><li>(2) In a prosecution under this section, where a certified copy of a record of the City containing licence plate and payment information for an EPark zone from the time of the alleged offence is tendered: <br><br>(a) the Court may conclude that, in the absence of licence plate information being found in the record, the required payment has not been made in relation to the vehicle to which that licence plate corresponds; and <br>(b) where the licence plate information of a vehicle is absent from the record, the onus of proving a person has made the required payment in relation to that vehicle shall be on the person alleging the required payment has been made on a balance of probabilities</li></ul>",

  ticketReason35: "parking bylaw not found",
  checkBylawsPlainLanguageHint35: "",
  ticketBylawExplanation35: "Sorry, I couldn't find the bylaw for this situation :("
};

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
    hideSections(
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
    applyActiveVisibilityConditions();
    outputTemplateText("city");
  } else if (path === "private operator") {
      hideSections(
        potentialIssueSection,
        checkBylawsSection,
        municipalitySection,
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
        outputTemplateText("check bylaws");
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
  }
  else if (answerValue === "report abandoned vehicle") {
    abandonedVehicleOutputTemplate =
    currentDateFormatted +
    "<br><br>RE: Abandoned Vehicle" +
    "<br><br>Dear Neighbour," +
    "<br><br>It appears that a vehicle that belongs to a resident of this home has been parked for an extended period in the neighbourhood. Our strees are a shared public resource so if this vehicle belongs to you or someone you know it would be appreciated if you could take action in moving the vehicle as bylaw 5590 considers vehicles parked for over 72hrs without moving to be abandoned." +
    "<br>Thank you for understanding. If you have any questions about parking bylaws you can call the city at #311." +
    "<br><br>Sincerely," +
    "<br><br>A neighbour";
    document.getElementById("insert-output-text-here").innerHTML = abandonedVehicleOutputTemplate;
  }
  else if (answerValue === "check bylaws") {
    checkBylawsIntroParagraph = "Hey, I found this in the " + city + "&#39;s bylaws:";
    document.getElementById("check-bylaw-primary-question-insert-here").innerHTML = checkBylawsIntroParagraph;
    document.getElementById("bylaw-plain-language-hint-insert-here").innerHTML = checkBylawsPlainLanguageHint;
    checkBylawsOutputTemplate = ticketBylawExplanation;
    document.getElementById("city-bylaw-name").innerHTML = cityBylawName;
    document.getElementById("insert-check-bylaw-info-box-text-here").innerHTML = checkBylawsOutputTemplate;
  }
  else if (answerValue === "private operator") {
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
  }
  else if (answerValue === "private institution") { // not working // may want this to be apart of additional info section and not the output
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

// #municipality-section
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
  // function to update output text
function updateTicketNumberAnswer() {
  ticketNumberAnswer = document.getElementById("ticket-number-text-field").value;
}
updateTicketNumberAnswer();

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
          ticketReason = "parking in an expired meter zone";
          checkBylawsPlainLanguageHint = "Looks like you shouldn't get a ticket if you still have time on the meter, have a permit displayed, or park during the meter's off-hours.";
          ticketBylawExplanation = "<ul>s(42)<li>(1) A vehicle shall not be parked on a highway in any space governed by a parking meter unless there is unexpired time remaining on the meter.</li><li>(2) This section is only in effect on the days and during the times a parking meter is identified as being in effect.</li><li>(3) This section does not apply to a vehicle displaying a valid and subsisting permit issued by the City for metered space parking so long as all conditions of the permit are satisfied.</li></ul>";
          break;
        case 1:
          ticketReasonOtherSubSection.style.display = "none";
          ticketReason = "being parked in excess of posted limit in a time restricted zone";
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint2;
          ticketBylawExplanation = "<ul>s(38) <li>A vehicle shall not be parked on a highway in any location identified as a time limited zone for a period of time in excess of the time limit.</li></ul>";
          break;
        case 2:
          ticketReasonOtherSubSection.style.display = "none";
          ticketReason = "parking outside a metered space";
          checkBylawsPlainLanguageHint = bylawTextObj.checkBylawsPlainLanguageHint3;
          ticketBylawExplanation = "<ul>s(43) <li>A vehicle parked on a highway in any space governed by a parking meter shall: <br>(a) be parked completely within the metered space; and </li><li>(b) if the metered space is parallel to the edge of the roadway, be parked so that: <br>(i) the front of the vehicle is as close as possible to the parking meter if the meter is situated at the front of the space; or <br>(ii) the rear of the vehicle is  as close as possible to the parking meter if the meter is situated at the rear of the space; or <br>(iii) if the metered space is at an angle to the edge of the roadway, be parked so that the front of the vehicle is as close as possible to the parking meter.</li></ul>";
          break;
        case 3:
          ticketReasonOtherSubSection.style.display = "none";
          ticketReason = "parking in a closed pay and go zone";
          ticketBylawExplanation = "<ul>s(46) <li>A vehicle shall not be parked on a highway in any space identifiedas a pay and display zone when that zone is closed.</li></ul>";
          break;
        case 4:
          ticketReasonOtherSubSection.style.display = "none";
          ticketReason = "parking in a space with a hooded meter";
          ticketBylawExplanation = "<ul>s(44) <li>A vehicle shall not be parked on a highway in any space governed by a parking meter on which a hood or cover has been placed.</li></ul>";
          break;
        case 5:
          ticketReasonOtherSubSection.style.display = "none";
          ticketReason = "parking too close to a stop or yield sign";
          ticketBylawExplanation = "<ul>s(6) <li>Unless a traffic control device permits or requires, a vehicle shall not be parked in the case of an approach to a stop sign or yield sign within 5 metres of the stop sign or yield sign.</li></ul>";
          break;
        case 6:
          ticketReasonOtherSubSection.style.display = "none";
          ticketReason = "parking too close to a crosswalk";
          ticketBylawExplanation = "<ul>s(5) <li>Unless a traffic control device permits or requires, a vehicle shall not be parked: <br><br>(a) on a crosswalk or any part of a crosswalk; or <br><br>(b) within 5 metres of the near side of a marked crosswalk.</li></ul>";
          break;
        case 7:
          ticketReasonOtherSubSection.style.display = "none";
          ticketReason = "parking too close to a fire hydrant";
          ticketBylawExplanation = "<ul>s(8) <li>(1) Except as permitted in this section a vehicle shall not be stopped on a highway within 5 metres of a fire hydrant or, when the hydrant is not located at the curb, within 5 metres from the point on the curb nearest the fire hydrant.</li><li>(2) A taxi may stop within 5 metres of a hydrant identified as a taxi zone only if: <br><br>(i) the operator remains in the vehicle at all times; and <br><br>(ii) the operator immediately removes the vehicle from the taxi zone upon the direction of a peace officer or a member of the City’s Fire Rescue Service.</li></ul>";
          break;
        case 8:
          ticketReasonOtherSubSection.style.display = "none";
          ticketReason = "parking too close to an intersection";
          ticketBylawExplanation = "<ul>s(7) <li>Unless a traffic control device permits or requires, a vehicle shall not be parked: <br><br>(a) at an intersection within 5 metres of the projection of the curb or edge of the roadway; <br><br>(b) within an intersection other than immediately next to the curb or edge of the roadway in a “T” intersection; or <br><br>(c) within 1.5 metres of an access to a garage, private road or driveway or a vehicle crossway over a sidewalk.</li></ul>";
          break;
        case 9:
          ticketReasonOtherSubSection.style.display = "none";
          ticketReason = "parking too close to a centre line";
          ticketBylawExplanation = "<ul>s(16) <li>A vehicle shall not be parked within 3 metres of the centre line of the roadway on a highway where the roadway portion is 12 metres or more in width.</li></ul>";
          break;
        case 10:
          ticketReasonOtherSubSection.style.display = "none";
          ticketReason = "parallel parking more than 500mm from the curb";
          ticketBylawExplanation = "<ul>s(22) <li>(1) A vehicle parked on a highway shall be parked: <br><br>(a) with: <br><br>(i) the sides of the vehicle parallel to the curb or edge of the roadway, and <br><br>(ii) the right wheels of the vehicle not more than 500 millimetres from the right curb or edge of the roadway, or <br><br>(b) in the case of a one-way highway where parking on either side is permitted, with: <br><br>(i) the sides of the vehicle parallel to the curb or edge of the roadway, <br><br>(ii) the wheels that are the closest to a curb or edge of the roadway not more than 500 millimetres from that curb or edge, and <br><br>(iii) the vehicle facing in the direction of travel authorized for the highway</li></ul>";
          break;
        case 11:
          ticketReasonOtherSubSection.style.display = "none";
          ticketReason = "parking on a sidewalk or boulevard";
          ticketBylawExplanation = "<ul>s(4) <li>Unless a traffic control device permits or requires, a vehicle shall not be parked on a sidewalk or boulevard or any part of a sidewalk or boulevard.</li></ul>";
          break;
        case 12:
          ticketReasonOtherSubSection.style.display = "none";
          ticketReason = "parking in a way that caused an obstruction";
          ticketBylawExplanation = "<ul>s(15) <li>A vehicle shall not be parked on a highway in a manner that blocks or obstructs: <br><br>(a) the movement of traffic on the highway; <br><br>(b) a doorway to a building; or <br><br>(c) the approach to any fire station, police station, hospital or other place where emergency vehicles require regular access.</li></ul>";
          break;
        case 13:
          ticketReasonOtherSubSection.style.display = "none";
          ticketReason = "parking in a bus zone";
          ticketBylawExplanation = "<ul>s(35) <li>(1) Except as permitted in this section a vehicle shall not be stopped on a highway in any location identified as a bus zone unless the vehicle is a bus.</li><li>(2) A taxi may stop in the forward 6 metres of any bus zone while inthe process of actually loading or unloading passengers.</li></ul>";
          break;
        case 14:
          ticketReasonOtherSubSection.style.display = "none";
          ticketReason = "parking in an emergency access zone";
          ticketBylawExplanation = "<ul>s(33) <li>A vehicle shall not be parked on a highway in any location identified as a fire lane, an emergency access zone or otherwise being for the use of emergency vehicles.</li></ul>";
          break;
        case 15:
          ticketReasonOtherSubSection.style.display = "none";
          ticketReason = "parking on a seasonal parking route while a ban was in effect";
          ticketBylawExplanation = "<ul>s(36) <li>(1) A vehicle shall not be parked on a highway in any location identified as a seasonal parking ban route.</li><li>(2) This section only applies when the location identified as a seasonal parking ban route has been designated in effect by the City Manager.</li><li>(3) A vehicle parked on a highway in a location identified as a seasonal parking ban route must be removed from the location identified as a seasonal parking ban route within 8 hours of a seasonal parking route ban having been declared in effect.</li></ul>";
          break;
        case 16:
          ticketReasonOtherSubSection.style.display = "none";
          ticketReason = "parking in a permit zone without a proper permit";
          ticketBylawExplanation = "<ul>s(37) <li>A vehicle shall not be parked on a highway in any location where a permit to park is required unless a valid and subsisting permit is clearly displayed on the vehicle.</li></ul>";
          break;
        case 17:
          ticketReasonOtherSubSection.style.display = "none";
          ticketReason = "parking in a disabled zone without a permit";
          ticketBylawExplanation = "<ul>s(34) <li>A vehicle shall not be parked on a highway in any location identified as being for the use of persons with disabilities unless the vehicle: <br><br>(a) displays a valid disabled placard or license plate issued or recognized by the Registrar; and <br><br>(b) is being used for the transportation of a person with a disability.</li></ul>";
          break;
        case 18:
          ticketReasonOtherSubSection.style.display = "none";
          ticketReason = "parking in a no stopping zone";
          ticketBylawExplanation = "<ul>s(31) <li>A vehicle shall not be stopped on a highway in any location identified as a zone where stopping is prohibited.</li></ul>";
          break;
        case 19:
          ticketReasonOtherSubSection.style.display = "none";
          ticketReason = "parking in a no parking zone";
          ticketBylawExplanation = "<ul>s(30) <li>A vehicle shall not be parked on a highway in any location identified as a zone where parking is prohibited.</li></ul>";
          break;
        case 20:
          ticketReasonOtherSubSection.style.display = "none";
          ticketReason = "parking in a commercial loading zone";
          ticketBylawExplanation = "<ul>s(28) <li>(1) A vehicle shall not be parked on a highway in any location identified as a commercial loading zone unless the vehicle is a commercial vehicle.</li><li>(2) A vehicle shall not be parked on a highway in any location identified as a commercial loading zone for a period of time longer than that permitted.</li></ul>";
          break;
        case 21:
          ticketReasonOtherSubSection.style.display = "none";
          ticketReason = "parking in a passenger loading zone";
          ticketBylawExplanation = "<ul>s(27) <li>A vehicle shall not be parked on a highway in any location identified as a passenger loading zone for a period of time longer than that permitted.</li.</ul>";
          break;
        case 22:
          ticketReasonOtherSubSection.style.display = "none";
          ticketReason = "parking outside a marked space";
          ticketBylawExplanation = "<ul>s(14) <li>A vehicle parked on a highway in a location marked by lines or otherwise shall be parked entirely within the markings.</li></ul>";
          break;
        case 23:
          ticketReasonOtherSubSection.style.display = "none";
          ticketReason = "incorrect angle parking";
          ticketBylawExplanation = "<ul>s(23) <li>(1) When: <br><br>(a) a sign indicates that angle parking is permitted or required, and <br><br>(b) parking guide lines are visible on the roadway, a vehicle shall be parked with the vehicle’s sides between and parallel to any two of the guide lines, and <br><br>(c) in the case of a vehicle other than a motor cycle, with one front wheel not more than 500 millimetres from the curb or edge of the roadway, or <br><br>(d) in the case of a motor cycle with: <br><br>(i) a wheel of the motor cycle not more than 500 millimetres from the curb or edge of the roadway and <br><br>(ii) the motor cycle angled in the direction of travel authorized for the traffic lane that is adjacent to the lane on which the motor cycle is parked;</li.><li>(3) A vehicle with a total length exceeding 5.8 metres shall not be parked at an angle on a highway unless: <br><br>(a) a sign specifically permits such parking; or <br><br>(b) the vehicle displays a permit authorizing such parking issued by the City.</li></ul>";
          break;
        case 24:
          ticketReasonOtherSubSection.style.display = "none";
          ticketReason = "leaving my vehicle unattended while on a jack";
          ticketBylawExplanation = "<ul>s(25) <li>A vehicle shall not be parked and left unattended on a highway if: <br><br>(a) the vehicle is on a jack or a similar device, and <br><br>(b) one or more wheels have been removed from the vehicle or part of the vehicle is raised.</li></ul>";
          break;
        case 25:
          ticketReasonOtherSubSection.style.display = "none";
          ticketReason = "parking a vehicle that was more than 12.5 metres long";
          ticketBylawExplanation = "<ul>s(17) <li>(1) A vehicle, or a vehicle with a trailer attached, with a total length exceeding 12.5 metres shall not be parked on a highway: <br><br>(a) in a location adjoining residential property at any time; or <br><br>(b) in a location not adjoining residential property at anytime after 7:00 p.m. and before 7:00 a.m.</li><li>(2) This section does not apply if the vehicle: <br><br>(a) is a recreational vehicle; or <br><br>(b) is a commercial vehicle with the hazard warning lamps alight and in the process of loading or unloading goods.</li></ul>";
          break;
        case 26:
          ticketReasonOtherSubSection.style.display = "none";
          ticketReason = "parking a vehicle in the same location for more than 72 hrs";
          ticketBylawExplanation = "<ul>s(26) <li>(1) A vehicle shall not be abandoned on a highway.</li><li>(2) Without restricting the generality of subsection (1) a vehicle that is left standing in one location on a highway for more than 72 consecutive hours is deemed to have been abandoned at that location.</li></ul>";
          break;
        case 27:
          ticketReasonOtherSubSection.style.display = "none";
          ticketReason = "incorrectly parking a recreational vehicle on a public road";
          ticketBylawExplanation = "<ul>s(19) <li>(1) A recreational vehicle shall not be parked on a highway unless it is parked in a location completely adjoining the recreational vehicle owner’s residence as shown in the records of the Motor Vehicle Registry.</li><li>(2) A recreational vehicle parked pursuant to this section: <br><br>(a) shall not be parked for more than 72 consecutive hours; and <br><br>(b) shall be removed to an off-highway location for at least 48 consecutive hours before it may be parked again on a highway.</li></ul>";
          break;
        case 28:
          ticketReasonOtherSubSection.style.display = "none";
          ticketReason = "parking in an alley";
          ticketBylawExplanation = "<ul>s(12) <li>(1) A vehicle shall not be parked in an alley unless:<br><br>(a) a traffic control device permits such parking; or <br><br>(b) the vehicle is a commercial vehicle with hazard warning lights alight and in the process of loading or unloading goods.</li><li>(2) Notwithstanding subsection (1)(b) a commercial vehicle shall not be parked in an alley for more than 30 minutes.</li><li>(3) Nothing in this section permits a person to park a vehicle in an alley in a manner that blocks or obstructs the movement of traffic.</li></ul>";
          break;
        case 29:
          ticketReasonOtherSubSection.style.display = "none";
          ticketReason = "double parking next to another vehicle";
          ticketBylawExplanation = "<ul>s(10) <li>Unless a traffic control device permits or requires, a vehicle shall not be parked on the roadway side of a vehicle that is parked at the curb or edge of the roadway.</li></ul>";
          break;
        case 30:
          ticketReasonOtherSubSection.style.display = "none";
          ticketReason = "parking in a bridge or tunnel";
          ticketBylawExplanation = "<ul>s(9) <li>Unless a traffic control device permits or requires, a vehicle shall not be parked on any bridge or in any tunnel or on any approach to either of them.</li></ul>";
          break;
        case 31:
          ticketReasonOtherSubSection.style.display = "none";
          ticketReason = "parking an unattached trailer";
          ticketBylawExplanation = "<ul>s(20) <li>Notwithstanding any other provision of this bylaw, a trailer shall not be parked on a highway unless the trailer is attached to a vehicle by which it may be drawn.</li></ul>";
          break;
        case 32:
          ticketReasonOtherSubSection.style.display = "none";
          ticketReason = "pay and go zone violation";
          ticketBylawExplanation = "<ul>s(45) <li>(1) A vehicle shall not be parked on a highway in any space identified as a pay and display zone unless there is unexpired time remaining on a ticket issued by a pay and display machine.</li><li>(2) A vehicle shall not be parked on a highway in any space identifiedas a pay and display zone unless there is a ticket issued by a payand display machine displayed face up in a clearly visible location on the dashboard of the vehicle.</li><li>(3) This section is only in effect on the days and during the times a pay and display zone is identified as being in effect.</li><li>(4) This section does not apply to a vehicle displaying a valid permit issued by the City for pay and display zone parking so long as all conditions of the permit are satisfied.</li></ul>";
          break;
        case 33:
          ticketReasonOtherSubSection.style.display = "none";
          ticketReason = "EPark zone violation";
          ticketBylawExplanation = "<ul>s(38.1) <li>(1) A vehicle shall not be parked in an EPark zone: <br><br>(a) for a period of time in excess of the time limit indicated on a traffic control device; <br><br>(b) unless the full amount of the required payment for that EPark zone has been made in accordance with the instructions on a traffic control device; or <br><br>(c) contrary to any other restriction on a traffic control device.</li><li>(2) In a prosecution under this section, where a certified copy of a record of the City containing licence plate and payment information for an EPark zone from the time of the alleged offence is tendered: <br><br>(a) the Court may conclude that, in the absence of licence plate information being found in the record, the required payment has not been made in relation to the vehicle to which that licence plate corresponds; and <br>(b) where the licence plate information of a vehicle is absent from the record, the onus of proving a person has made the required payment in relation to that vehicle shall be on the person alleging the required payment has been made on a balance of probabilities</li></ul>";
          break;
        case 34:
          ticketReasonOtherSubSection.style.display = "block";
          ticketReason = document.getElementById("ticket-reason-other-text-field").value;
          ticketBylawExplanation = "Sorry, I couldn't find the bylaw for this situation :(";
          break;
        default:
          ticketReasonOtherSubSection.style.display = "none";
          ticketReason = "";
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
  // function to update privateTicketAppealAnswer
function updatePrivateTicketAppealAnswer() {
  if (document.getElementById("private-ticket-appeal-text-field").value) {
    return privateTicketAppealAnswer = document.getElementById("private-ticket-appeal-text-field").value;
  } else {
    return privateTicketAppealAnswer = "";
  }
}
updatePrivateTicketAppealAnswer();

// #photo-upload-section
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
