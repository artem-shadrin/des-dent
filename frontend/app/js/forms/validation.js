import Forms from "./index";
import { getAttr } from "../utils/getAttr";

export default class Validation {
  static regex = {
    email:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    phone: /^((\+7|7|8)+([0-9]){10})$/,
  };

  static getInputs(form) {
    return [...form.querySelectorAll(Forms.els.input)];
  }

  static isValid(form, isHighlight = true) {
    const inputs = Validation.getInputs(form);
    let result = true;
    inputs.forEach((input) => {
      const validateType = input.getAttribute(getAttr(Forms.els.input));
      const validationFn = Validation.patternValidation.has(validateType)
        ? Validation.patternValidation.get(validateType)
        : Validation.patternValidation.get("");
      const isValid = validationFn(input);
      if (isHighlight) {
        Validation.setInputState(input, isValid);
      }
      if (!isValid) result = false;
    });
    return result;
  }

  static setInputState(input, isValid = true) {
    isValid
      ? input.classList.remove(Forms.stateClasses.invalid)
      : input.classList.add(Forms.stateClasses.invalid);
  }

  static patternValidation = new Map([
    ["", (input) => Validation.isValidateEmpty(input)],
    ["email", (input) => Validation.isValidateEmail(input)],
    ["phone", (input) => Validation.isValidatePhone(input)],
  ]);

    static isValidateEmpty(value) {
    return !!value.value?.trim().length;
  }
  static isValidateEmail(value) {
    return Validation.regex.email.test(value.value);
  }
  static isValidatePhone(value) {
    return Validation.regex.phone.test(value.value);
  }
}
