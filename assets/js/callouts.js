const addCollapsibleCallouts = () => {
  console.log("Adding Collapsible Callouts");  
  const collapsibleCallouts = document.querySelectorAll("blockquote.callout-collapsible");
  
  if (collapsibleCallouts.length != 0) {
    console.log(collapsibleCallouts);
    collapsibleCallouts.forEach(el => {
      el.addEventListener('click', event => {
        const $toggledClass = "callout-collapsed";
        let $before = event.currentTarget.classList.contains($toggledClass);
        event.currentTarget.classList.toggle($toggledClass);
        let $after = event.currentTarget.classList.contains($toggledClass);
        console.log($before, $after);
        if ($before == $after) { // in an event the class fails to toggle
          location.reload();
        }
      }, { once: true });
    });
  }
}
