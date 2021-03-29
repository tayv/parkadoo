import {countStep, sectionsShowHideObj} from "../generic-form-functionality.js";
// SET focus
// Sets UI focus to first input in the active section
// Causes UI to break in FF
const focusInput = () => {
  let activeContainer = document.querySelector(".active-section-container");
  let inputs = activeContainer.querySelector("input");
  // Need to get first selected radio button in case user makes a different selection and then goes to prev section
  if (inputs.type == "radio") {
    activeContainer.querySelector("input[type=radio]:checked").focus();
  } else {
      activeContainer.querySelector("input").focus();
    }
}

document.addEventListener("keydown", function(event) {
  let complete = (countStep >= sectionsShowHideObj.showTheseSectionsArray.length - 1);
  if (!complete && event.key === "Enter") {
    // Form isn't finished so cancel the default form submit action
    event.preventDefault();
    // Go to the next step
    document.querySelector(".button-next").click();
  }
});

export {focusInput};
