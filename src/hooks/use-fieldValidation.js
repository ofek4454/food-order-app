import { useState } from "react";

const useFieldValidation = (validate) => {
  const [field, setField] = useState("");
  const [fieldIsTouched, setFielsIsTouched] = useState(false);

  const fieldIsValid = validate(field);
  const hasError = !fieldIsValid && fieldIsTouched;

  const fieldChanged = (event) => {
    setField(event.target.value);
  };

  const fieldUnfocused = (event) => {
    setFielsIsTouched(true);
  };

  const clearField = () => {
    setField("");
    setFielsIsTouched(false);
  };

  return {
    field,
    hasError,
    fieldChanged,
    fieldUnfocused,
    clearField,
  };
};

export default useFieldValidation;
