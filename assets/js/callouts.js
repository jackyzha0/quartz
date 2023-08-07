const addCollapsibleCallouts = () => {
  console.log("Adding Collapsible Callouts");  
  const collapsibleCallouts = document.querySelectorAll("blockquote.callout-collapsible");
  
  if (collapsibleCallouts.length != 0) {
    console.log(collapsibleCallouts);
    collapsibleCallouts.forEach(el => el.addEventListener('click', event => {
      event.currentTarget.classList.toggle("callout-collapsed");
    }));
  }
}
