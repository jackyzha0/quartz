const addCollapsibleCallouts = () => {
  console.log("Adding Collapsible Callouts");  
  const collapsibleCallouts = document.querySelectorAll("blockquote.callout-collapsible");
  
  if (collapsibleCallouts.length != 0) {
    console.log(collapsibleCallouts);
    collapsibleCallouts.forEach(el => el.addEventListener('click', event => {
      const $toggledClass = "callout-collapsed";
      let $before = event.currentTarget.classList.contains($toggledClass);
      event.currentTarget.classList.toggle($toggledClass);
      let $after = event.currentTarget.classList.contains($toggledClass);
      if ($before == $after) {
        event.currentTarget.classList.toggle($toggledClass);
      }
    }));
  }
}
