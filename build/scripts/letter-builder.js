import {
  templateType, city, nameAnswer, mailAddressAnswer, currentDateFormatted, ticketNumberAnswer, ticketDate,
  ticketReason, emailAnswer, ticketAppealBylawAnswer, privateTicketAppealAnswer, ticketErrorDescriptionAnswer
} from "./main.js";


let letterTemplate = "";
// setLetterTemplate() updates output text based on questionnaire selections
const setLetterTemplate = (x) => {
  if (x === "city") {
    // Letter output
    letterTemplate = // could move this to a separate file and reference in variable section at top of page
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
    return letterTemplate;
  } else if (x === "report abandoned vehicle") {
      letterTemplate =
      currentDateFormatted +
      "<br><br>RE: Abandoned Vehicle" +
      "<br><br>Dear Neighbour," +
      "<br><br>It appears that a vehicle that belongs to a resident of this home has been parked for an extended period in the neighbourhood. Our streets are a shared public resource so if this vehicle belongs to you or someone you know it would be appreciated if you could take action in moving the vehicle as bylaw 5590 considers vehicles parked for over 72hrs without moving to be abandoned." +
      "<br><br>Thank you for understanding. If you have any questions about parking bylaws you can call the city at #311." +
      "<br><br>Sincerely," +
      "<br><br>Anonymous neighbour";
      return letterTemplate;
  } else if (x === "private operator") {
      letterTemplate =
      currentDateFormatted +
      "<br><br>RE: Appealing Parking Ticket: " + ticketNumberAnswer +
      "<br><br>To Whom It May Concern," +
      "<br><br>I received a parking ticket on " + ticketDate + " for " + ticketReason + ". While I appreciate that private parking lots are an important city resource, I am requesting that the ticket be cancelled for the following reasons:" +
      "<br><br>" + ticketErrorDescriptionAnswer +
      "<br>" + privateTicketAppealAnswer +
      "<br><br>Thank you for taking my request seriously. If you wish to discuss the issue further please contact me at " + emailAnswer + "." +
      "<br><br>Sincerely,<br><br><br>" +
      nameAnswer;
      return letterTemplate;
  } else if (x === "institution") { // not working // may want this to be apart of additional info section and not the output
      letterTemplate =
      currentDateFormatted +
      "<br><br>RE: Appealing Parking Ticket: " + ticketNumberAnswer +
      "<br><br>To Whom It May Concern," +
      "<br><br>I received a parking ticket on " + ticketDate + " for " + ticketReason + ". Although I can appreciate that the available parking is limited, I am requesting that the ticket be cancelled for the following reasons:" +
      "<br><br>" + ticketErrorDescriptionAnswer +
      "<br>" + privateTicketAppealAnswer +
      "<br><br>Thank you for taking the time to consider my request. If you wish to discuss the issue further please contact me at " + emailAnswer + "." +
      "<br><br>Sincerely,<br><br><br>" +
      nameAnswer;
      return letterTemplate;
  }
}

export {setLetterTemplate, letterTemplate};
