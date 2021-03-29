import {sectionsShowHideObj, removeActiveClass, countStep, checkButtonStep, hideExtraSteps} from "../generic-form-functionality.js";

const clickActiveClass = () => {
  if (!event.target.closest("SECTION")) return; // short circuit if don't click on section-container or its child elements
  removeActiveClass();
  let sectionDiv = event.target.closest(".section-container");
  sectionDiv.classList.add("active-section-container");
  countStep = sectionsShowHideObj.showTheseSectionsArray.indexOf(sectionDiv);
  checkButtonStep();
  hideExtraSteps(countStep+1);
}

// CLICK EVENT TO HIGHLIGHT SECTION-CONTAINER WHEN USER INTERACTS WITH IT
document.getElementById("parking-form-content").addEventListener("click", clickActiveClass);



(function () {
    console.log("FIRED");
})();



export {clickActiveClass};
