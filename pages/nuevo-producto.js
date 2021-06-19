import { css } from "@emotion/react";
import React, { useState, useContext } from "react";
import Router, { useRouter } from "next/router";
import Layout from "../components/Layout";
import {
  Formulario,
  Campo,
  InputSubmit,
  Error,
} from "../components/ui/Formulario";
import { FirebaseContext } from "../firebase";

//Validaciones
import useValidation from "../hooks/useValidation";
import validarCrearProducto from "../validation/validarCrearProducto";

const STATE_INIT = {
  nombre: "",
  empresa: "",
  url: "",
  descripcion: "",
};

const NuevoProducto = () => {
  const [error, setError] = useState(false);
  const {
    valores,
    errores,
    submitForm,
    handlerSubmit,
    handleChange,
    handlerBlur,
  } = useValidation(STATE_INIT, validarCrearProducto, crearProducto);

  const { nombre, empresa, imagen, url, descripcion } = valores;

  //hook de routing para redireccionar
  const router = useRouter();

  //Context con las operaciones CRUD de firebase
  const { user, firebase } = useContext(FirebaseContext);

  async function crearProducto() {
    //si el usuario no esta autenticado:
    if (!user) {
      return router.push("/login");
    }

    const producto = {
      nombre,
      empresa,
      url,
      descripcion,
      votos: 0,
      comentarios: [],
      creado: Date.now(),
    };

    console.log(producto);

    //insertando en base de datos
    firebase.db.collection("productos").add(producto);
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
          Nuevo Producto
        </h1>
        <Formulario onSubmit={handlerSubmit} noValidate={true}>
          <fieldset>
            <legend>Información General</legend>

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
              <label htmlFor="empresa">Empresa</label>
              <input
                type="name"
                id="empresa"
                placeholder="Nombre Empresa o Compañía"
                name="empresa"
                value={empresa}
                onChange={handleChange}
                onBlur={handlerBlur}
              ></input>
            </Campo>
            {errores.empresa && <Error>{errores.empresa}</Error>}

            {/* <Campo>
              <label htmlFor="imagen">Imagen</label>
              <input
                type="file"
                id="imagen"
                name="imagen"
                value={imagen}
                onChange={handleChange}
                onBlur={handlerBlur}
              ></input>
            </Campo>
            {errores.imagen && <Error>{errores.imagen}</Error>} */}

            <Campo>
              <label htmlFor="url">Url</label>
              <input
                type="url"
                id="url"
                name="url"
                placeholder="URL del producto"
                value={url}
                onChange={handleChange}
                onBlur={handlerBlur}
              ></input>
            </Campo>
            {errores.url && <Error>{errores.url}</Error>}
          </fieldset>

          <fieldset>
            <legend>Sobre tu Producto</legend>

            <Campo>
              <label htmlFor="descripcion">Descripción</label>
              <textarea
                id="descripcion"
                name="descripcion"
                value={descripcion}
                onChange={handleChange}
                onBlur={handlerBlur}
              ></textarea>
            </Campo>
            {errores.descripcion && <Error>{errores.descripcion}</Error>}
          </fieldset>

          {error && <Error>Error al crear producto</Error>}
          <InputSubmit type="submit" value="Crear Producto"></InputSubmit>
        </Formulario>
      </Layout>
    </>
  );
};

export default NuevoProducto;
