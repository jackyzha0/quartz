import Plausible from 'plausible-tracker'
const { trackPageview } = Plausible()
document.addEventListener("nav", () => trackPageview())
