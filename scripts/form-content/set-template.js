
// Function to load correct html page using .action after clicking submit
const loadLetter = (str) => {
  let formID = document.querySelector("#parking-form-content");
  switch(str)
  {
    case "city":
    formID.action = "letter-city.html";
    break;

    case "report abandoned vehicle":
    formID.action = "letter-neighbour.html";
    break;

    case "private operator":
    formID.action = "letter-private-op.html";
    break;

    case "institution":
    formID.action = "letter-private-op.html";
    break;
  }
}

export {loadLetter};
