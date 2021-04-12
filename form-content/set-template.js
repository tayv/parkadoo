
// Function to load correct html page using .action after clicking submit
const formAction = (str) => {
  console.log("FomrAction worked");
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
    formID.action = "letter-privateop.html";
    break;

    case "institution":
    formID.action = "letter-privateop.html";
    break;
  }
}

export {formAction};
