const addCollapsibleCallouts = () => {
  var initToggle = false;
  const collapsibleCallouts = document.querySelectorAll("blockquote.callout-collapsible");
  
  if (collapsibleCallouts.length != 0) {
    console.log(collapsibleCallouts);
    var initToggle = true;
    collapsibleCallouts.forEach(el => el.addEventListener('click', (event) => {
      event.currentTarget.classList.toggle("callout-collapsed");
    }));
  }
}
