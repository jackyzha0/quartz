const addCollapsibleCallouts = () => {
    const collapsibleCallouts = document.querySelectorAll("blockquote.callout-collapsible");
    collapsibleCallouts.forEach(el => el.addEventListener('click', event => {
        console.log(el);
        console.log(el.classList);
        el.classList.toggle("callout-collapsed");
    }));
}
