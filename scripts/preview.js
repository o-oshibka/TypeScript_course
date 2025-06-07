function initSpoilers() {
  try {
    const spoilers = document.querySelectorAll('.spoiler details');
    
    spoilers.forEach(details => {
      const content = details.querySelector('div');
      if (!content) return;

      details.addEventListener('toggle', () => {
        if (details.open) {
          console.debug('[SPOILERS] Applying fadeIn animation');
          content.style.animation = 'fadeIn 0.5s forwards';
        } else {
          console.debug('[SPOILERS] Applying fadeOut animation');
          content.style.animation = 'fadeOut 0.5s forwards';
        }
      });
    });
  } catch (error) {
    console.error('[SPOILERS] Initialization error:', error);
  }
}

// Запускаем при загрузке и при динамическом изменении DOM
document.addEventListener('DOMContentLoaded', initSpoilers);
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  initSpoilers();
}