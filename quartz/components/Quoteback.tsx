import { QuartzComponentConstructor, QuartzComponentProps } from "./types"

interface Options {
  includeScript: boolean
}

const defaultOptions: Options = {
  includeScript: true,
}

export default ((userOpts?: Options) => {
  const opts = { ...defaultOptions, ...userOpts }

  function Quoteback(props: QuartzComponentProps) {
    if (!opts.includeScript) {
      return null
    }

    return (
      <>
        <script src="/static/js/quoteback.js" defer></script>
        <script defer>
          {`
            function initializeQuotebacksWrapper() {
              if (typeof initializeQuotebacks === 'function') {
                initializeQuotebacks();
              }
            }

            document.addEventListener('DOMContentLoaded', initializeQuotebacksWrapper);

            // Add a listener for internal navigation events
            document.addEventListener('click', function(event) {
              const target = event.target.closest('a');
              if (target && target.href) {
                setTimeout(initializeQuotebacksWrapper, 500); // Adjust the timeout as necessary
              }
            });

            // Use MutationObserver to detect changes in the DOM and reinitialize quotebacks
            const observer = new MutationObserver((mutations) => {
              mutations.forEach((mutation) => {
                if (mutation.addedNodes.length || mutation.removedNodes.length) {
                  initializeQuotebacksWrapper();
                }
              });
            });

            observer.observe(document.body, {
              childList: true,
              subtree: true,
            });
          `}
        </script>
      </>
    )
  }

  return Quoteback
}) satisfies QuartzComponentConstructor
