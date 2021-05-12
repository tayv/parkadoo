import {checkButtonStep, sectionVisibility} from "/scripts/form-functionality/stepper-buttons.js";
import {countStep, setCurrentStep, sectionsShowHideObj} from "/scripts/form-functionality/step-tracker.js";
import {formSections} from "/scripts/form-content/form-sections.js";

// INITIALIZE VARIABLES

// setup variable and function to be used by click and scroll events in order to set css styling for active section
let activeSection = document.querySelector("#welcome-section");

// Used by Active-class on scrolling
const headerHeight = document.getElementById("header-main").offsetHeight;
const footerHeight = document.getElementById("footer-main").offsetHeight;
const visibleWindowHeight = (window.innerHeight - headerHeight - footerHeight);


// GENERIC FUNCTIONS

// To update the active section
function setActiveClass(section) {
  activeSection = section;
  // short circuit if first or last section as they don't need active class
  if (activeSection == (document.querySelector("#welcome-section") || document.querySelector("#finished-section-container"))) {
    return;
  }
  // Add active css style to any section other than first and last section
  activeSection.classList.add("active-section-container");
}

// To remove the active section from an older step
const removeActiveClass = () => {
  sectionsShowHideObj.showTheseSectionsArray.forEach(section => {
    section.classList.remove("active-section-container");
  });
}

// To hide multiple next steps if user skips multiple sections by scrolling up
const hideExtraSteps = (counter) => {
  sectionsShowHideObj.showTheseSectionsArray.slice(counter).forEach(function(element) {
    element.style.display="none"
  });
}


// CLICK EVENT: ACTIVE CLASS
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


// SCROLL EVENTS TO HIGHLIGHT SECTION-CONTAINER WHEN USER INTERACTS WITH IT
const nextStepActionsScroll = () => {
      // want to check that the questionnaire hasn't finished and that the next step scrolling to hasn't been scrolled to already
    if ((countStep < sectionsShowHideObj.showTheseSectionsArray.length - 1) && window.getComputedStyle(sectionsShowHideObj.showTheseSectionsArray[countStep+1]).display==="block")  {
      removeActiveClass();
      setCurrentStep(countStep + 1);
      setActiveClass(sectionsShowHideObj.showTheseSectionsArray[countStep]);
      sectionVisibility(sectionsShowHideObj);
    } else {
        checkButtonStep();
    } return countStep;
  };

const prevStepActionsScroll = () => {
    if (countStep < 1) {
      checkButtonStep();
      removeActiveClass();
    } else if (countStep >= 1) {
        removeActiveClass();
        setCurrentStep(countStep - 1);
        setActiveClass(sectionsShowHideObj.showTheseSectionsArray[countStep]);
    }
    return countStep;
  };

function isScrolledIntoView(el) {
    let rect = el.getBoundingClientRect();
    let activeElemTop = Math.round(rect.top);
    let activeElemBottom = Math.round(rect.bottom);
    let contentHeight = Math.round(document.getElementById("parking-form-main").offsetHeight);
    let paddingHeight = Math.round(contentHeight * 0.4); // for more natural transition of active-class when div leaves viewing area
    let topHeight = Math.round(headerHeight + paddingHeight);
    let bottomHeight = Math.round(contentHeight - paddingHeight);
    if (activeElemTop > bottomHeight) {
      // element is above the header so scrolling up
      prevStepActionsScroll();
    } else if (activeElemBottom < topHeight) {
      // element is below the footer so scrolling down
      nextStepActionsScroll();
    }
}

// ACTIVECLASS SCROLL LISTENER
// may need lodash throttle function
window.addEventListener("scroll", function() {
  if (activeSection !== document.querySelector("#welcome-section")) {
    isScrolledIntoView(activeSection);
  }
    }, {
          capture: true,
          passive: true
        });






export {activeSection, setActiveClass, removeActiveClass, clickActiveClass, hideExtraSteps};
