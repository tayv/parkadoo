
// The checkbox used for night mode toggle
const toggleTheme = document.querySelector('.theme-switch input[type="checkbox"]');

// Use this to See if the user previously chose a theme. If so set it during main.js window.onload
const checkSavedTheme = () => {
  if (localStorage.getItem("theme")) {
    let existingTheme = localStorage.getItem("theme");
    setTheme(existingTheme);
  }
}

// Used to change the theme
const setTheme = (theme) => {
  if (theme === "light") {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
    document.querySelector(".theme-icon").innerHTML="☀️";
  } else if (theme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
      document.querySelector(".theme-icon").innerHTML="🌜";
  }
}

// Checkbox event listener used to toggle theme
function switchTheme(e) {
    if (e.target.checked) {
      setTheme("dark");
    }
    else {
      setTheme("light");
    }
}

toggleTheme.addEventListener("change", switchTheme, false);

// check theme on page load
checkSavedTheme();
