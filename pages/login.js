import { css } from "@emotion/react";
import React, { useState } from "react";
import Router from "next/router";
import Layout from "../components/Layout";
import {
  Formulario,
  Campo,
  InputSubmit,
  Error,
} from "../components/ui/Formulario";
import firebase from "../firebase";

//Validaciones
import useValidation from "../hooks/useValidation";
import validarIniciarSesion from "../validation/validarIniciarSesion";

const STATE_INIT = {
  email: "",
  password: "",
};

const Login = () => {
  const [error, setError] = useState(false);
  const {
    valores,
    errores,
    submitForm,
    handlerSubmit,
    handleChange,
    handlerBlur,
  } = useValidation(STATE_INIT, validarIniciarSesion, iniciarSesion);

  const { email, password } = valores;

  async function iniciarSesion() {
    try {
      const usuario = await firebase.login(email, password);
      Router.push("/");
    } catch (error) {
      console.log("Error al iniciar sesion", error);
      setError(true);
    }
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
          Iniciar Sesión
        </h1>
        <Formulario onSubmit={handlerSubmit} noValidate={true}>
          <Campo>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Tu email"
              name="email"
              value={email}
              onChange={handleChange}
              onBlur={handlerBlur}
            ></input>
          </Campo>
          {errores.email && <Error>{errores.email}</Error>}
          <Campo>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Tu password"
              name="password"
              value={password}
              onChange={handleChange}
              onBlur={handlerBlur}
            ></input>
          </Campo>
          {errores.password && <Error>{errores.password}</Error>}
          {error && <Error>Error al intentar logear</Error>}
          <InputSubmit type="submit" value="Iniciar Sesión"></InputSubmit>
        </Formulario>
      </Layout>
    </>
  );
};

export default Login;
