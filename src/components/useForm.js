import React from "react";

export const useForm = () => {
  const [enteredValues, setEnteredValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isFormValid, setIsFormValid] = React.useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setEnteredValues({
      ...enteredValues,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: e.target.validationMessage,
    });

    setIsFormValid(e.target.closest(".form").checkValidity());
  };

  const resetForm = React.useCallback(
    (newValues = {}, newErrors = {}, newIsFormValid = false) => {
      setEnteredValues(newValues);
      setErrors(newErrors);
      setIsFormValid(newIsFormValid);
    },
    [setEnteredValues, setErrors, setIsFormValid]
  );

  return {
    enteredValues,
    errors,
    handleChange,
    isFormValid,
    resetForm,
  };
};