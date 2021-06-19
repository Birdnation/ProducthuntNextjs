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
import validarCrearCuenta from "../validation/validarCrearCuenta";

const STATE_INIT = {
  nombre: "",
  email: "",
  password: "",
  repassword: "",
};

const CrearCuenta = () => {
  const [error, setError] = useState(false);
  const {
    valores,
    errores,
    submitForm,
    handlerSubmit,
    handleChange,
    handlerBlur,
  } = useValidation(STATE_INIT, validarCrearCuenta, crearCuenta);

  const { nombre, email, password, repassword } = valores;

  async function crearCuenta() {
    try {
      await firebase.registrar(nombre, email, password);
      Router.push("/");
    } catch (error) {
      console.log("Error al crear usuario", error);
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
              onBlur={handlerBlur}
            ></input>
          </Campo>
          {errores.nombre && <Error>{errores.nombre}</Error>}
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
          <Campo>
            <label htmlFor="repassword">Repite tu password</label>
            <input
              type="password"
              id="repassword"
              placeholder="Tu password"
              name="repassword"
              value={repassword}
              onChange={handleChange}
              onBlur={handlerBlur}
            ></input>
          </Campo>
          {errores.repassword && <Error>{errores.repassword}</Error>}
          {error && <Error>Error al crear la cuenta</Error>}
          <InputSubmit type="submit" value="Crear Cuenta"></InputSubmit>
        </Formulario>
      </Layout>
    </>
  );
};

export default CrearCuenta;
