const addCollapsibleCallouts = () => {
  const collapsibleCallouts = document.querySelectorAll("blockquote.callout-collapsible");
  
  if (collapsibleCallouts.length != 0) {
    console.log(collapsibleCallouts);

    collapsibleCallouts.forEach(el => el.onclick = (event) => {
      event.currentTarget.classList.toggle("callout-collapsed");
    });
  }
}
