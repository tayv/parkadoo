"use strict";

// TO LOAD DEFAULT VISIBILITY CONDITIONS (works)
window.onload = function newsletterCBDefaultState() {
  // for newsletter checkbox
  if (newsletterCheckbox.checked == true) {
    ticketDate.style.display = "block";
  } else {
    ticketDate.style.display = "none";
    }
  // for parking violation radios
  if (hoomanYesRadio.checked == true) {
    typeOfViolation.style.display = "block";
  } else {
    typeOfViolation.style.display = "none";
    }
  };

// CB VISIBILITY CONDITION (works)
const newsletterCheckbox = document.getElementById("newsletterSignUp");
// element to be hidden
const ticketDate = document.getElementById("ticket-date");
// run checkbox visibility function
const newsletterCheckboxVisiblity = (function() {
newsletterCheckbox.addEventListener("click", checkboxChanged);
function checkboxChanged() {
  if (newsletterCheckbox.checked == true) {
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
    if (hoomanYesRadio.checked == true) {
      typeOfViolation.style.display = "block";
    } else {
      typeOfViolation.style.display = "none";
      }
    }
}());

// MULTI RADIO BUTTON VISIBILITY CONDITION
// From Stack Overflow (works when class added to radio buttons)
const inputs = document.querySelectorAll(".test-class");

const parkingViolationMULTIRadioAnswer = (function checkRadioAnswer() {

  for(let i = 0; i < inputs.length; i++) {
      inputs[i].addEventListener("click", checkRadioAnswer, false);
  }

  var radios = document.getElementsByName("violationType")

  function insertText() {
    document.getElementById("insert-text-here").innerHTML = "-insert answer 4 text here-";
  };

  for (let i = 0, length = radios.length; i < length; i++) {
    if (radios[i].checked) {
      if (radios[i].value == "1") {
        ticketDate.style.display = "none";
        document.getElementById("insert-text-here").innerHTML = "";
      }
      else if (radios[i].value == "2") {
        ticketDate.style.display = "none";
      }
      else if (radios[i].value == "3") {
        ticketDate.style.display = "block";
        document.getElementById("insert-text-here").innerHTML = "-insert answer 3 text here-";
      }
      else if (radios[i].value == "4") {
        ticketDate.style.display = "block";
        insertText();
      }
    }
  }
}());


/* works
const showNextQ = (function () {
  document.getElementById("button-next").addEventListener("click", scrollToQuestion);

  function scrollToQuestion() {
    document.getElementById("question2").scrollIntoView(true);
  }
}());
*/

/* works
const stepsQuestionnaire = document.getElementsByClassName("section-container");

const currentStep = (function() {
  for (var i=0; i<stepsQuestionnaire.length; i++) {
    document.getElementById("button-next").addEventListener("click", scrollToQuestion);

    function scrollToQuestion() {
      stepsQuestionnaire[i].scrollIntoView(true);
      i++
    }
    return
  }
}());
*/


/* Previous/Next/Submit button visiblity and to scroll to next div/step */
const stepsQuestionnaire = document.getElementsByClassName("section-container");

const buttonVisibility = (function() {
  var count = 0;
  function checkButtonStep() {
    if (count == 0) {
      document.getElementById("button-previous").style.display="none";
      document.getElementById("button-submit").style.display="none";
    } else if (count > 0 && count < stepsQuestionnaire.length -1) {
        document.getElementById("button-previous").style.display="inline";
        document.getElementById("button-submit").style.display="none";
    } else if (count >= stepsQuestionnaire.length - 1) {
        document.getElementById("button-previous").style.display="none";
        document.getElementById("button-next").style.display="none";
        document.getElementById("button-submit").style.display="block";
    }
  };

  checkButtonStep();

  document.getElementById("button-next").onclick = function() {
    if (count < stepsQuestionnaire.length - 1) {
      count++;
      stepsQuestionnaire[count].scrollIntoView(true);
      checkButtonStep();
    } else {
        checkButtonStep();
    } return count;
  };

  document.getElementById("button-previous").onclick = function() {
    if (count < 1) {
      checkButtonStep();
    } else if (count >= 1) {
        count--;
        stepsQuestionnaire[count].scrollIntoView(true);
        checkButtonStep();
    } return count;
  };

}());

// To add whitespace to the end of the document so each section div will scroll to the top of the window when Next button selected 
const setWhiteSpaceAtEndOfDocument = (function calcAndSetWhiteSpace() {
  var lastDivHeight = document.getElementById("final-section-container").offsetHeight;
  var headerHeight = document.getElementById("header-main").offsetHeight;
  var footerHeight = document.getElementById("footer-main").offsetHeight;
  var newPadding = (window.innerHeight - lastDivHeight - headerHeight - footerHeight);
  var setNewPadding = document.getElementById("output").style.paddingBottom = newPadding + "px";
}());








/*
const testAnswer = (function checkTestAnswer() {
  if (parkingViolationMULTIRadioAnswer.radios == radios[3]) {
  document.getElementById("ticket-date").innerHTML = "Some text to enter";
}
}());
*/



/*
// MULTI RADIO BUTTON CONDITION (works with html onclick added)
function parkingViolationRadioAnswer() {
  var radios = document.getElementsByName("violationType")
  for (var i = 0, length = radios.length; i < length; i++) {
      if (radios[i].checked) {
        if (radios[i].value == "1") {
          ticketDate.style.display = "none";
        }
        if (radios[i].value == "2") {
          ticketDate.style.display = "none";
        }
        if (radios[i].value == "3") {
          ticketDate.style.display = "block";
        }
        if (radios[i].value == "4") {
          ticketDate.style.display = "block";
        }
      }
    }
};
*/
