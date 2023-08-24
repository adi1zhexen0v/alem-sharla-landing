const modal = ({
  modalSelector,
  modalTitleSelector,
  modalFormSelector,
  modalOpenBtnsSelector,
  modalCloseBtnSelector,
  modalInputsSelector,
  modalErrorsSelector
}) => {
  const modal = document.querySelector(modalSelector);
  const modalTitle = document.querySelector(modalTitleSelector);
  const modalForm = document.querySelector(modalFormSelector);
  const modalOpenBtns = document.querySelectorAll(modalOpenBtnsSelector);
  const modalCloseBtn = document.querySelector(modalCloseBtnSelector);
  const modalInputs = modal.querySelectorAll(modalInputsSelector);
  const modalErrors = modal.querySelectorAll(modalErrorsSelector);

  const setError = (i) => {
    modalErrors[i].textContent = 'Заполните поле';
    modalInputs[i].classList.add('modal-content__form-input-error');
  }

  const clearFormErrors = () => {
    for (let i = 0; i < modalInputs.length; i++) {
      modalErrors[i].textContent = '';
      modalInputs[i].classList.remove('modal-content__form-input-error');
    }
  }

  const clearForm = () => {
    modalInputs.forEach(input => {
      input.value = '';
    });
  }

  modalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    clearFormErrors();
    let amountOfErrors = 0;
    modalInputs.forEach((input, index) => {
      if (input.value.trim() === "") {
        setError(index);
        amountOfErrors++;
      }
    });

    if (amountOfErrors === 0) {
      modalForm.style.display = 'none';
      modalTitle.textContent = 'Ваше сообщение успешно отправлено, мы свяжемся с вами в ближайшее время';
    }
  });

  const openModal = () => {
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
  }

  const closeModal = () => {
    clearForm();
    clearFormErrors();
    modal.classList.add('hide');
    document.body.style.overflow = '';
  }
  
  modalCloseBtn.addEventListener('click', closeModal);
  modalOpenBtns.forEach(btn => { 
    btn.addEventListener('click', openModal);
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.code === "Escape") {
      closeModal();
    }
  });
}

export default modal;