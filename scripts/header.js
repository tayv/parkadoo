
// reusable header

const headerHTMLContent = `
  <div id="header-nav-container">
    <a id="logo" href="index.html" rel="home">parkadoo.</a>
    <label class="theme-switch" for="theme-cb">
      <input type="checkbox" id="theme-cb" style="opacity:0"/>
      <span class="theme-icon">☀️</span>
    </label>
  </div>
  `;

document.getElementById("header-main").innerHTML = headerHTMLContent;
