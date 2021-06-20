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
                      <form>
                        <Campo>
                          <input type="text" name="mensaje"></input>
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
                  {comentarios.map((comentario) => (
                    <li>
                      <p>{comentario.nombre}</p>
                      <p>Escrito por: {comentario.usuarioNombre}</p>
                    </li>
                  ))}
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
            </>
          ),
        ]
      )}
    </Layout>
  );
};

export default Producto;
