
// Used as index value for sectionsShowHideObj to show/hide appropriate steps
let countStep = 0;

// Setter function to be used in other modules since es6 modules don't allow variable reassignment
function setCurrentStep(value) {
    return countStep = value;
}

// Each section to be shown or hidden gets added here. Current step determined using counStep as index
let sectionsShowHideObj = {
  hideTheseSectionsArray: [],
  showTheseSectionsArray: []
};

export {countStep, setCurrentStep, sectionsShowHideObj};
