let isInitialized = false;

const addCollapsibleCallouts = () => {
  console.log(isInitialized);
  // if (isInitialized) {
  //   console.log("Collapsible Callouts already added!");
  //   return;
  // }

  const collapsibleCallouts = document.querySelectorAll("blockquote.callout-collapsible");
  if (collapsibleCallouts.length != 0) {
    console.log("Adding Collapsible Callouts");
    console.log(collapsibleCallouts);
    collapsibleCallouts.forEach(el => el.addEventListener('click', event => {
      console.log("Adding Collapsible Callouts Event Listener");
      event.currentTarget.classList.toggle("callout-collapsed");
    }));
    isInitialized = true;
  }
}
