
function addTitleToCodeBlocks() {
  var els = document.getElementsByClassName("highlight");
  for (var i = 0; i < els.length; i++) {
    if (els[i].title.length) {
      let div = document.createElement("div");
      if (els[i].getElementsByClassName("code-title").length) continue;
      div.textContent=els[i].title;
      div.classList.add("code-title")
      els[i].insertBefore(div, els[i].firstChild);
    }
  }
};
