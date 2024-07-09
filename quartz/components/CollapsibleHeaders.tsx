import { QuartzComponentConstructor, QuartzComponentProps } from "./types"

export default (() => {
  function CollapsibleHeaders({ displayClass }: QuartzComponentProps) {
    return <div class={`collapsible-headers ${displayClass ?? ""}`}></div>
  }

  CollapsibleHeaders.afterDOMLoaded = `
    document.addEventListener('DOMContentLoaded', function() {
      const headers = document.querySelectorAll('h2, h3, h4, h5, h6');
      
      headers.forEach(header => {
        // Add click event listener to each header
        header.addEventListener('click', function() {
          this.classList.toggle('collapsed');
          let currentElement = this.nextElementSibling;
          
          while (currentElement && !['H2', 'H3', 'H4', 'H5', 'H6'].includes(currentElement.tagName)) {
            if (currentElement.style.display === 'none') {
              currentElement.style.display = '';
            } else {
              currentElement.style.display = 'none';
            }
            currentElement = currentElement.nextElementSibling;
          }
        });
        
        // Add visual cue that header is clickable
        header.style.cursor = 'pointer';
      });
    });
  `

  CollapsibleHeaders.css = `
    h2, h3, h4, h5, h6 {
      transition: opacity 0.3s;
    }
    .collapsed + * {
      display: none;
    }
    .collapsed {
      opacity: 0.6;
    }
  `

  return CollapsibleHeaders
}) satisfies QuartzComponentConstructor
