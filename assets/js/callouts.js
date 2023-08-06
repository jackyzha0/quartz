// let isInitialized = false;

const addCollapsibleCallouts = () => {
  if (isInitialized) {
    console.log("Collapsible Callouts already added!");
    return;
  }
  console.log("Adding Collapsible Callouts");
  const collapsibleCallouts = document.querySelectorAll("blockquote.callout-collapsible");
  collapsibleCallouts.forEach(el => el.addEventListener('click', event => {
    console.log("register collapsible callout event");
    event.currentTarget.classList.toggle("callout-collapsed");
  }));
  isInitialized = true;
}
