const addCollapsibleCallouts = () => {
  var initToggle = false;
  const collapsibleCallouts = document.querySelectorAll("blockquote.callout-collapsible");
  const toggler = fucntion(event) {
    event.currentTarget.classList.toggle("callout-collapsed");
  };
  
  if (collapsibleCallouts.length != 0) {
    console.log(collapsibleCallouts);
    var initToggle = true;
    collapsibleCallouts.forEach(el => el.addEventListener('click', toggler));
  }
}
