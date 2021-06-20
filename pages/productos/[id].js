import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import React, { useEffect, useContext, useState } from "react";
import Error404 from "../../components/404";
import Layout from "../../components/Layout";
import { FirebaseContext } from "../../firebase";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { es } from "date-fns/locale";
import { Campo, InputSubmit } from "../../components/ui/Formulario";
import Boton from "../../components/ui/Boton";

const ContenedorProducto = styled.div`
  margin: 0 6rem 0 6rem;
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 2fr 1fr;
    column-gap: 2rem;
  }
`;

const Producto = () => {
  //state componente
  const [producto, setProducto] = useState({});
  const [error, setError] = useState(false);
  const [comentario, setComentario] = useState({});

  //router para obtener el id
  const router = useRouter();
  const {
    query: { id },
  } = router;

  const { firebase, user } = useContext(FirebaseContext);

  useEffect(() => {
    if (id) {
      const obtenerProducto = async () => {
        const productoQuery = await firebase.db.collection("productos").doc(id);
        const producto = await productoQuery.get();
        if (producto.exists) {
          setProducto(producto.data());
        } else {
          setError(true);
        }
      };
      obtenerProducto();
    }
  }, [id, producto]);

  const {
    id: identificacion,
    comentarios,
    creado,
    descripcion,
    empresa,
    nombre,
    url,
    urlImage,
    votos,
    creador,
    votadores,
  } = producto;

  //validar votos
  const votarProducto = () => {
    if (!user) {
      return router.push("/login");
    }

    //obtener y sumar botos
    const nuevoTotal = votos + 1;

    //verificar si el usuario actual ha votado
    if (votadores.includes(user.uid)) {
      return;
    }

    //guardar el id del usuario que a votado
    const hanVotado = [...votadores, user.uid];

    //actualizar en la base de datos
    firebase.db
      .collection("productos")
      .doc(id)
      .update({ votos: nuevoTotal, votadores: hanVotado });

    //actualizar el state
    setProducto({ ...producto, votos: nuevoTotal });
  };

  //función para crear comentarios
  const comentarioChange = (e) => {
    setComentario({
      ...comentario,
      [e.target.name]: e.target.value,
    });
  };

  //identifica si el comentario es del creador del producto
  const esCreador = (id) => {
    if (creador.id == id) {
      return true;
    }
  };

  const agregarComentario = (e) => {
    e.preventDefault();

    if (!user) {
      return router.push("/login");
    }

    //informacion extra al comentario
    comentario.userId = user.uid;
    comentario.userNombre = user.displayName;

    const nuevosComentarios = [...comentarios, comentario];

    //actualizar bd
    firebase.db
      .collection("productos")
      .doc(id)
      .update({ comentarios: nuevosComentarios });

    //actualizar state
    setProducto({ ...producto, comentarios: nuevosComentarios });
  };

  //funcion que revisa que el creador del producto sea el mismo que esta auth
  const puedeBorrar = () => {
    if (!user) {
      return false;
    }
    if (creador.id === user.uid) {
      return true;
    }
  };

  //eliminar producto de la db
  const eliminarProducto = async () => {
    if (!user) {
      return router.push("/login");
    }
    if (creador.id !== user.uid) {
      return router.push("/");
    }
    try {
      await firebase.db.collection("productos").doc(id).delete();
      router.push("/");
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <Layout>
      {error ? (
        <Error404 mensaje="El producto no existe..." />
      ) : (
        [
          Object.keys(producto).length === 0 ? (
            <h1
              css={css`
                margin-top: 5rem;
                text-align: center;
              `}
            >
              Cargando...
            </h1>
          ) : (
            <>
              <div
                className="contenedor"
                css={css`
                  text-align: center;
                  margin-top: 5rem;
                `}
              >
                <h1>{nombre}</h1>
              </div>
              <ContenedorProducto>
                <div>
                  <p>
                    Publicado hace:{" "}
                    {formatDistanceToNow(new Date(creado), { locale: es })}{" "}
                  </p>
                  <p>
                    Por: {creador.nombre} de {empresa}
                  </p>
                  <img src={urlImage}></img>
                  <p>{descripcion}</p>
                  {user ? (
                    <>
                      <h2>Agrega tu comentario:</h2>
                      <form onSubmit={agregarComentario}>
                        <Campo>
                          <input
                            type="text"
                            name="mensaje"
                            onChange={comentarioChange}
                          ></input>
                        </Campo>
                        <InputSubmit
                          type="submit"
                          value="Agregar Comentario"
                        ></InputSubmit>
                      </form>
                    </>
                  ) : null}
                  <h2
                    css={css`
                      margin: 2rem 0;
                    `}
                  >
                    Comentarios
                  </h2>
                  {comentarios.length === 0 ? (
                    <p>Aún no hay comentarios</p>
                  ) : (
                    <ul>
                      {comentarios.map((comentario, i) => (
                        <li
                          key={`${comentario.userId}-${i}`}
                          css={css`
                            border: 1px solid #e1e1e1;
                            padding: 2rem;
                          `}
                        >
                          <p>{comentario.mensaje}</p>

                          {esCreador(comentario.userId) ? (
                            <>
                              <p>
                                Escrito por:{" "}
                                <span
                                  css={css`
                                    font-weight: bold;
                                    color: green;
                                  `}
                                >
                                  {comentario.userNombre}
                                </span>
                              </p>
                              <Boton
                                bgColor={true}
                                css={css`
                                  display: inline-block !important;
                                `}
                              >
                                Es Creador!
                              </Boton>
                            </>
                          ) : (
                            <p>
                              Escrito por:{" "}
                              <span
                                css={css`
                                  font-weight: bold;
                                `}
                              >
                                {comentario.userNombre}
                              </span>
                            </p>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <aside>
                  <Boton target="_blank" bgColor="true" href={url}>
                    Visitar URL
                  </Boton>

                  {user ? (
                    <>
                      <Boton
                        css={css`
                          margin-top: 5rem;
                        `}
                        onClick={votarProducto}
                        bgColor={true}
                      >
                        Votar
                      </Boton>
                    </>
                  ) : null}
                  <p
                    css={css`
                      text-align: center;
                    `}
                  >
                    {votos} Votos
                  </p>
                </aside>
              </ContenedorProducto>
              {puedeBorrar() ? (
                <Boton
                  css={css`
                    background-color: red;
                  `}
                  onClick={eliminarProducto}
                >
                  Eliminar Producto
                </Boton>
              ) : null}
            </>
          ),
        ]
      )}
    </Layout>
  );
};

export default Producto;
