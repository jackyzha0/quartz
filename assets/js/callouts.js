let isInitialized = false;

const addCollapsibleCallouts = () => {
  if (isInitialized) {
    return;
  }
  console.log("Adding Collapsible Callouts");

  const collapsibleCallouts = document.querySelectorAll("blockquote.callout-collapsible");
  collapsibleCallouts.forEach(el => el.addEventListener('click', event => {
    event.currentTarget.classList.toggle("callout-collapsed");
  }));

  isInitialized = true;
}

// Call the function once
addCollapsibleCallouts();
