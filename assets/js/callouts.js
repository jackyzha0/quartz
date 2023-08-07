let isInitialized = false;

const addCollapsibleCallouts = () => {
  console.log(isInitialized);
  if (isInitialized) {
    console.log("Collapsible Callouts already added!");
    return;
  }

  const collapsibleCallouts = document.querySelectorAll("blockquote.callout-collapsible");
  if (collapsibleCallouts.length != 0) {
    console.log("Adding Collapsible Callouts");
    collapsibleCallouts.forEach(el => el.addEventListener('click', event => {
      event.currentTarget.classList.toggle("callout-collapsed");
    }));
    isInitialized = true;
  }
}
