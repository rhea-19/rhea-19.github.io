(() => {
'use strict';
// Use one modal for quick looks; native details remain available without JavaScript.
const pipelineDialog = document.getElementById('pipeline-dialog');
if (pipelineDialog && typeof pipelineDialog.showModal === 'function') {
  const dialogTitle = pipelineDialog.querySelector('#pipeline-dialog-title');
  const dialogBody = pipelineDialog.querySelector('.pipeline-dialog-body');
  const repositoryLink = pipelineDialog.querySelector('.pipeline-repository');
  const closeButton = pipelineDialog.querySelector('.pipeline-close');
  let activeTrigger = null;
  let savedOverflow = '';
  let savedPadding = '';

  document.querySelectorAll('.project-details').forEach((details) => {
    // Clear disclosure state restored by the browser after a reload or back navigation.
    details.open = false;
    details.classList.add('quick-look-ready');
    const trigger = details.querySelector('summary');
    trigger.setAttribute('aria-haspopup', 'dialog');
    trigger.setAttribute('aria-controls', 'pipeline-dialog');
    trigger.setAttribute('aria-expanded', 'false');
    trigger.classList.add('quick-look-trigger');
    trigger.addEventListener('click', (event) => {
      event.preventDefault();
      const card = details.closest('.tech-card');
      const repository = card.querySelector('.project-link');
      dialogTitle.textContent = card.querySelector('h4').textContent;
      dialogBody.replaceChildren(details.querySelector('.pipeline-panel').cloneNode(true));
      repositoryLink.hidden = !repository;
      if (repository) repositoryLink.href = repository.href;
      else repositoryLink.removeAttribute('href');
      activeTrigger = trigger;
      trigger.setAttribute('aria-expanded', 'true');
      savedOverflow = document.body.style.overflow;
      savedPadding = document.body.style.paddingRight;
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${parseFloat(getComputedStyle(document.body).paddingRight) + scrollbarWidth}px`;
      }
      document.body.style.overflow = 'hidden';
      pipelineDialog.showModal();
      dialogBody.scrollTop = 0;
      closeButton.focus({preventScroll: true});
    });
  });

  closeButton.addEventListener('click', () => pipelineDialog.close());
  pipelineDialog.addEventListener('keydown', (event) => {
    if (event.key !== 'Tab') return;
    const focusable = [...pipelineDialog.querySelectorAll('button, a[href], [tabindex="0"]')]
      .filter((element) => !element.disabled && element.getClientRects().length > 0);
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
  // Ignore drags that begin within the panel and end over the backdrop.
  let backdropPress = false;
  const outsideDialog = (event) => {
    const rect = pipelineDialog.getBoundingClientRect();
    return event.clientX < rect.left || event.clientX > rect.right ||
      event.clientY < rect.top || event.clientY > rect.bottom;
  };
  pipelineDialog.addEventListener('pointerdown', (event) => {
    backdropPress = event.target === pipelineDialog && outsideDialog(event);
  });
  pipelineDialog.addEventListener('click', (event) => {
    if (backdropPress && event.target === pipelineDialog && outsideDialog(event)) pipelineDialog.close();
    backdropPress = false;
  });
  pipelineDialog.addEventListener('close', () => {
    document.body.style.overflow = savedOverflow;
    document.body.style.paddingRight = savedPadding;
    activeTrigger?.setAttribute('aria-expanded', 'false');
    activeTrigger?.focus({preventScroll: true});
    dialogBody.replaceChildren();
  });
}

})();
