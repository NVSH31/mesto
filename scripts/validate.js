const showInputError = (formElement, inputElement, errorMessage, obj) => {
    const errorSpanElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(obj.inputErrorClass);
    errorSpanElement.textContent = errorMessage;
    errorSpanElement.classList.add(obj.errorClass);
  };

  const hideInputError = (formElement, inputElement, obj) => {
    const errorSpanElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(obj.inputErrorClass);
    errorSpanElement.classList.remove(obj.errorClass);
    errorSpanElement.textContent = '';
  };

  const hasValidInput = (inputList) => {
    return inputList.every((inputElement) => {
      return inputElement.validity.valid;
    });
  };

  const toggleButtonState = ((inputList, buttonElement, obj) => {
    if (hasValidInput(inputList)) {
      buttonElement.classList.remove(obj.inactiveButtonClass);
      buttonElement.disabled = "";
    } else {
      buttonElement.classList.add(obj.inactiveButtonClass);
      buttonElement.disabled = "disabled";
    }
  });

  const isValid = (formElement, inputElement, obj) => {
    if (inputElement.validity.valid) {
      hideInputError(formElement, inputElement, obj);
    } else {
      showInputError(formElement, inputElement, inputElement.validationMessage, obj);
    }
  };

  const setEventListeners = (formElement, obj) => {
    const inputList = Array.from(formElement.querySelectorAll(obj.inputSelector));
    const buttonElement = formElement.querySelector(obj.submitButtonSelector);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        isValid(formElement, inputElement, obj);
        toggleButtonState(inputList, buttonElement, obj);
      });
    });
  };

  const enableValidation = (obj) => {
    const formList = Array.from(document.querySelectorAll(obj.formSelector));
    formList.forEach((formElement) => {
      setEventListeners(formElement, obj);
    });
  };

  enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_disabled',
    inputErrorClass: 'popup__field_type_error',
    errorClass: 'popup__input-error'
  });
