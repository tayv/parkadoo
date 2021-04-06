import {formSections, removeActiveClass, checkButtonStep, hideExtraSteps} from "../generic-form-functionality.js";
import {countStep, setCurrentStep, sectionsShowHideObj} from "/form-functionality/step-tracker.js";

// Initialize variable that will keep track of active section container
let activeSection;
// To update the active section
function setActiveSection(section) {
  activeSection = section;
  // short circuit if first or last section as they don't need active class
  if (activeSection == (document.querySelector("#welcome-section") || document.querySelector("#finished-section-container"))) {
    return;
  } 
  // Add active css style to any section other than first and last section
  activeSection.classList.add("active-section-container");
}

// Set the active section on click
const clickActiveClass = () => {
  if (!event.target.closest("SECTION")) return; // short circuit if don't click on section-container or its child elements
  removeActiveClass();
  let sectionDiv = event.target.closest(".section-container");
  sectionDiv.classList.add("active-section-container");
  // countStep = sectionsShowHideObj.showTheseSectionsArray.indexOf(sectionDiv);
  setCurrentStep(sectionsShowHideObj.showTheseSectionsArray.indexOf(sectionDiv));
  checkButtonStep();
  hideExtraSteps(countStep+1);
}
// CLICK EVENT TO HIGHLIGHT SECTION-CONTAINER WHEN USER INTERACTS WITH IT
document.getElementById("parking-form-content").addEventListener("click", clickActiveClass);






export {activeSection, setActiveSection, clickActiveClass};
