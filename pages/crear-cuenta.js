import { css } from "@emotion/react";
import React from "react";
import Layout from "../components/Layout";
import { Formulario, Campo, InputSubmit } from "../components/ui/Formulario";

//Validaciones
import useValidation from "../hooks/useValidation";
import validarCrearCuenta from "../validation/validarCrearCuenta";

const STATE_INIT = {
  nombre: "",
  email: "",
  password: "",
  repassword: "",
};

const CrearCuenta = () => {
  const { valores, errores, submitForm, handlerSubmit, handleChange } =
    useValidation(STATE_INIT, validarCrearCuenta, crearCuenta);

  const { nombre, email, password, repassword } = valores;

  function crearCuenta() {
    console.log("creando cuenta");
  }
  return (
    <>
      <Layout>
        <h1
          css={css`
            text-align: center;
            margin-top: 5rem;
          `}
        >
          Crear Cuenta
        </h1>
        <Formulario onSubmit={handlerSubmit} noValidate={true}>
          <Campo>
            <label htmlFor="nombre">Nombre</label>
            <input
              type="name"
              id="nombre"
              placeholder="Tu nombre"
              name="nombre"
              value={nombre}
              onChange={handleChange}
            ></input>
          </Campo>
          <Campo>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Tu email"
              name="email"
              value={email}
              onChange={handleChange}
            ></input>
          </Campo>
          <Campo>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Tu password"
              name="password"
              value={password}
              onChange={handleChange}
            ></input>
          </Campo>
          <Campo>
            <label htmlFor="repassword">Repite tu password</label>
            <input
              type="password"
              id="repassword"
              placeholder="Tu password"
              name="repassword"
              value={repassword}
              onChange={handleChange}
            ></input>
          </Campo>
          <InputSubmit type="submit" value="Crear Cuenta"></InputSubmit>
        </Formulario>
      </Layout>
    </>
  );
};

export default CrearCuenta;
