import {activeSection} from "/form-functionality/active-section.js";
import {countStep, setCurrentStep, sectionsShowHideObj} from "/form-functionality/step-tracker.js";

// Add event listener to stop the form from submitting when a user presses enter unless they're on the last step
document.addEventListener("keydown", function(event) {
  let complete = (countStep >= sectionsShowHideObj.showTheseSectionsArray.length - 1);
  if (!complete && event.key === "Enter") {
    // Form isn't finished so cancel the default form submit action
    event.preventDefault();
    // Go to the next step
    document.querySelector(".button-next").click();
  }
});

// SET FOCUS
  // Sets UI focus to first input in the active section
  // BUG: Causes UI to break in FF
  // Used in the up/down scrolling and prev/next button functions
const focusInput = () => {
  let activeContainer = activeSection; //document.querySelector(".active-section-container");
  let inputs = activeContainer.querySelector("input");
  // Need to get first selected radio button in case user makes a different selection and then goes to prev section
  if (inputs && inputs.type == "radio") {
    activeContainer.querySelector("input[type=radio]:checked").focus();
  } else {
    //  activeContainer.querySelector("input").focus();
    }
}



export {focusInput};
