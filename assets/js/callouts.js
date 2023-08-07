const addCollapsibleCallouts = () => {
  console.log("Adding Collapsible Callouts");  
  const collapsibleCallouts = document.querySelectorAll("blockquote.callout-collapsible");
  
  if (collapsibleCallouts.length != 0) {
    console.log(collapsibleCallouts);

    window.addEventListener('million:navigate', (event) => {
      console.log("Navigating");
      console.log(event.detail.url.pathname);
      if (event.detail.url.pathname != window.location.pathname) {
        console.log("Adding Collapsible Callouts Event Listener");
        collapsibleCallouts.forEach(el => el.addEventListener('click', event => {
          event.currentTarget.classList.toggle("callout-collapsed");
        }));
      }
    });
  }
}
