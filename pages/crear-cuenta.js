import { css } from "@emotion/react";
import React from "react";
import Layout from "../components/Layout";
import { Formulario, Campo, InputSubmit } from "../components/ui/Formulario";

//Validaciones
import useValidation from "../hooks/useValidation";

const STATE_INIT = {
  nombre: "",
  email: "",
  password: "",
  repassword: "",
};

const CrearCuenta = () => {
  const {} = useValidation();
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
        <Formulario>
          <Campo>
            <label htmlFor="nombre">Nombre</label>
            <input
              type="name"
              id="nombre"
              placeholder="Tu nombre"
              name="nombre"
            ></input>
          </Campo>
          <Campo>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Tu email"
              name="email"
            ></input>
          </Campo>
          <Campo>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Tu password"
              name="password"
            ></input>
          </Campo>
          <Campo>
            <label htmlFor="re-password">Repite tu password</label>
            <input
              type="password"
              id="re-password"
              placeholder="Tu password"
              name="re-password"
            ></input>
          </Campo>
          <InputSubmit type="submit" value="Crear Cuenta"></InputSubmit>
        </Formulario>
      </Layout>
    </>
  );
};

export default CrearCuenta;
