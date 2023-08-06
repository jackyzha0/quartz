const addCollapsibleCallouts = () => {
    const collapsibleCallouts = document.querySelectorAll("blockquote.callout-collapsible");
    collapsibleCallouts.forEach(el => el.addEventListener('click', event => {
        console.log(event.currentTarget);
        console.log(event.currentTarget.classList);
        event.currentTarget.classList.toggle("callout-collapsed");
        event.stopPropagation();
    }));
}
