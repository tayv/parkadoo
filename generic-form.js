"use strict";

// Sections
const formSections = {
// Holds the total number of sections
allFormSections: document.getElementsByClassName("section-container"),
// Generic sections
welcomeSection: document.getElementById("welcome-section"),
parkingProblemSection: document.getElementById("parking-problem-section"),
// If appealing ticket
parkingTicketIssuerSection: document.getElementById("ticket-issuer-section"),
// If appealing city ticket
municipalitySection: document.getElementById("municipality-section"),
cityUnavailableSection: document.getElementById("city-unavailable-section"),
ticketNumberSection: document.getElementById("ticket-number-section"),
ticketAccuracySection: document.getElementById("ticket-accuracy-section"),
ticketErrorDescriptionSubSection: document.getElementById("ticket-error-description-subsection"),
ticketReasonSection: document.getElementById("ticket-reason-section"),
ticketReasonOtherSubSection: document.getElementById("ticket-reason-other-subsection"),
ticketAppealBylawSection: document.getElementById("ticket-appeal-bylaw-section"),
ticketAppealSubSection: document.getElementById("ticket-appeal-bylaw-subsection"),
photoUploadSection: document.getElementById("photo-upload-section"),
photoUploadPromptSubSection: document.getElementById("photo-upload-prompt-subsection"),
ticketDateSection: document.getElementById("ticket-date-section"),
nameSection: document.getElementById("name-section"),
contactDetailsSection: document.getElementById("contact-details-section"),
mailingAddressSection: document.getElementById("mailing-address-section"),
// If appealing university ticket
studentOrEmployeeSection: document.getElementById("student-or-employee-section"),
// private operator and institution
privateTicketAppealSection: document.getElementById("private-ticket-appeal-section"),
// If checking bylaws
potentialIssueSection: document.getElementById("potential-issue-section"),
checkBylawsSection: document.getElementById("check-bylaw-info-section"),
// last step
finishedSectionDiv: document.getElementById("finished-section-container")
};

export {formSections};
