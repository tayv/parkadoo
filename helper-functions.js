// GENERIC FUNCTIONALITY - To add whitespace to the end of the document so each section div will scroll to the top of the window when Next button selected
const calcAndSetWhiteSpace = function(el) {
  let headerHeight = document.getElementById("header-main").offsetHeight;
  let footerHeight = document.getElementById("footer-main").offsetHeight;
  let newPadding = Math.round(document.getElementById("parking-form-main").offsetHeight - headerHeight - el.offsetHeight);
  let setNewPadding = document.getElementById("add-whitespace").style.paddingBottom = newPadding + "px";
  return setNewPadding;
};

// Generic function to grab current date and format it for letter
let currentDateUnformatted = new Date();

const formatCurrentDate = (currentDateUnformatted) => {
  let day = currentDateUnformatted.getDate();
//  let month = currentDateUnformatted.getMonth() + 1;
  let year = currentDateUnformatted.getFullYear();
  let monthArray = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"); // not available in Date object
  let month = monthArray[currentDateUnformatted.getMonth()];
  return month + " " + day.toString() + ", " + year.toString();
};

let currentDateFormatted = formatCurrentDate(currentDateUnformatted);

// Generic functions to upper or lowercase first letter in string
const upperCaseFirstLetter = (sentence) => {
  return sentence.charAt(0).toUpperCase() + sentence.slice(1);
};

const lowerCaseFirstLetter = (sentence) => {
  return sentence.charAt(0).toLowerCase() + sentence.slice(1);
};

// Generic function to prevent double . at end of sentence
const formatSentenceEnding = (sentence) => {
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
};

export {calcAndSetWhiteSpace, currentDateFormatted, upperCaseFirstLetter, lowerCaseFirstLetter, formatSentenceEnding};
