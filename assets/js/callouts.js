let isInitialized = false;

const addCollapsibleCallouts = () => {
  if (isInitialized) {
    console.log("addCollapsibleCallouts() has already been called.");
    return;
  }

  const collapsibleCallouts = document.querySelectorAll("blockquote.callout-collapsible");
  collapsibleCallouts.forEach(el => el.addEventListener('click', event => {
    console.log(event.currentTarget);
    console.log(event.currentTarget.classList);
    event.currentTarget.classList.toggle("callout-collapsed");
  }));

  isInitialized = true;
}

// Call the function once
addCollapsibleCallouts();
