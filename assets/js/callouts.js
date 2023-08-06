// let isInitialized = false;

const addCollapsibleCallouts = () => {
//   if (isInitialized) {
//     return;
//   }
//   console.log("Adding Collapsible Callouts");

  

//   isInitialized = true;
// }

// // Call the function once
// addCollapsibleCallouts();


const collapsibleCallouts = document.querySelectorAll("blockquote.callout-collapsible");
  collapsibleCallouts.forEach(el => el.addEventListener('click', event => {
    console.log("register collapsible callout event");
    event.currentTarget.classList.toggle("callout-collapsed");
  }));
}
