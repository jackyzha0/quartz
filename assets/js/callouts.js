const addCollapsibleCallouts = () => {
    const collapsibleCallouts = document.querySelectorAll("blockquote.callout-collapsible");
    collapsibleCallouts.forEach(el => el.addEventListener('click', event => {
        console.log(el);
        event.currentTarget.classList.toggle("callout-collapsed");
    }));
}
