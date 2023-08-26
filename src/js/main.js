import modal from './modules/modal.js';

window.addEventListener('DOMContentLoaded', () => {
	modal({
		modalSelector: '.modal',
		modalTitleSelector: '.modal-content__title',
		modalFormSelector: '.modal-content__form',
		modalOpenBtnsSelector: '[data-modal]',
		modalCloseBtnSelector: '.modal-close',
		modalInputsSelector: 'input[type="text"], textarea',
		modalErrorsSelector: '.modal-content__error'
	});
});
