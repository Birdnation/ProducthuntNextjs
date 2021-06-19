import React, { useEffect, useState } from "react";

const useValidation = (stateInicial, validar, fn) => {
  const [valores, setValores] = useState(stateInicial);
  const [errores, setErrores] = useState({});
  const [submitForm, setSubmitForm] = useState(false);

  useEffect(() => {
    if (submitForm) {
      const noErrores = Object.keys(errores).length === 0;

      if (noErrores) {
        fn();
      }
      setSubmitForm(false);
    }
  }, [errores]);

  //función que ejecuta conforme el usuario escribe
  const handleChange = (e) => {
    setValores({ ...valores, [e.target.name]: e.target.value });
  };

  //función que se ejecuta cuando el usuario hace submit
  const handlerSubmit = (e) => {
    e.preventDefault();
    const ErroresValidacion = validar(valores);
    setErrores(ErroresValidacion);
    setSubmitForm(true);
  };

  return {
    valores,
    errores,
    submitForm,
    handlerSubmit,
    handleChange,
  };
};

export default useValidation;
