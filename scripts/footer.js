// reusable footer

const footerHTMLContent = `
    <div id="footer-nav-container">
      <a id="articles" href="articles.html" rel="articles">ARTICLES</a>
      <a id="reset" href="index.html" rel="reset" onclick="sessionStorage.clear()">RESTART</a>
      <a id="feedback" href="mailto:" rel="feedback">FEEDBACK</a>
    </div>
  `;

document.getElementById("footer-main").innerHTML = footerHTMLContent;
