import modal from './modules/modal.js';

window.addEventListener('DOMContentLoaded', () => {
  modal({
    modalSelector: '.modal',
    modalTitleSelector: '.modal-content__title',
    modalFormSelector: '.modal-content__form',
    modalOpenBtnSelector: '.nav-btn',
    modalCloseBtnSelector: '.modal-close',
    modalInputsSelector: 'input[type="text"], textarea',
    modalErrorsSelector: '.modal-content__error'
  });
});