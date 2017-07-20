// Import Less
import './index.less';

'use strict';

{
  // Feature detection for drag&drop upload
  const isAdvancedUpload = (() => {
    const div = document.createElement('div');
    return (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) && 'FormData' in window && 'FileReader' in window;
  })();

  const forms = document.querySelectorAll('.form');

  Array.prototype.forEach.call(forms, form => {
    const input = form.querySelector('input[type="file"]');
    const label = form.querySelector('label');
    let droppedFiles = false;

    const showFiles = files => {
      label.textContent = files[0].name;
    };

    input.addEventListener('change', e => {
      showFiles(e.target.files);
    });

    // Drag&Drop files if the feature is available
    if (isAdvancedUpload) {
      form.classList.add('has-advanced-upload');

      [
        'drag',
        'dragstart',
        'dragend',
        'dragover',
        'dragenter',
        'dragleave',
        'drop'
      ].forEach(event => {
        form.addEventListener(event, e => {
          e.preventDefault();
          e.stopPropagation();
        });
      });
      ['dragover', 'dragenter'].forEach(event => {
        form.addEventListener(event, () => {
          form.classList.add('is-dragover');
        });
      });
      ['dragleave', 'dragend', 'drop'].forEach(event => {
        form.addEventListener(event, () => {
          form.classList.remove('is-dragover');
        });
      });
      form.addEventListener('drop', e => {
        droppedFiles = e.dataTransfer.files;
        showFiles(droppedFiles);
      });
    }

    // If the form was submitted
    form.addEventListener('submit', e => {
      if (isAdvancedUpload) {
        e. preventDefault();

        // On submit code goes here

      }
    });
  });
}
