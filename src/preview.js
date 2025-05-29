document.addEventListener('DOMContentLoaded', () => {
    const initMermaid = () => {
      if (window.mermaid) {
        mermaid.initialize({ 
          startOnLoad: true,
          theme: 'default',
          flowchart: { useMaxWidth: true }
        });
        mermaid.init(undefined, '.mermaid');
      }
    };
  
    const processSpoilers = () => {
      document.querySelectorAll('.spoiler details').forEach(details => {
        if (!details.hasAttribute('data-spoiler-initialized')) {
          details.addEventListener('toggle', () => {
            if (details.open) {
              details.style.animation = 'fadeIn 0.5s';
            }
          });
          details.setAttribute('data-spoiler-initialized', 'true');
        }
      });
    };
  
    processSpoilers();
    initMermaid();
  
    const observer = new MutationObserver((mutations) => {
      processSpoilers();
      initMermaid();
    });
    observer.observe(document.body, {
      subtree: true,
      childList: true,
    });
  });