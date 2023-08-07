const addCollapsibleCallouts = () => {
  let onPageNavigation = false;
  console.log("Adding Collapsible Callouts");  
  const collapsibleCallouts = document.querySelectorAll("blockquote.callout-collapsible");
  
  if (collapsibleCallouts.length != 0) {
    console.log(collapsibleCallouts);

    window.addEventListener('million:navigate', (event) => {
      console.log("Navigating");
      console.log(event.detail.target);
      if (event.detail.target === "_self") {
        onPageNavigation = true;
      }
    });

    console.log(onPageNavigation);
    if (!onPageNavigation) {
      collapsibleCallouts.forEach(el => el.addEventListener('click', event => {
        console.log("Adding Collapsible Callouts Event Listener");
        event.currentTarget.classList.toggle("callout-collapsed");
      }));
    }
  }
}
