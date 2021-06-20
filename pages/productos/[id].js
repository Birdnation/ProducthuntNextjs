import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import React, { useEffect, useContext, useState } from "react";
import Error404 from "../../components/404";
import Layout from "../../components/Layout";
import { FirebaseContext } from "../../firebase";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { es } from "date-fns/locale";

const ContenedorProducto = styled.div`
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

  //router para obtener el id
  const router = useRouter();
  const {
    query: { id },
  } = router;

  const { firebase } = useContext(FirebaseContext);

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
  }, [id]);

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
  } = producto;

  return (
    <Layout>
      {error ? (
        <Error404 />
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
            <div
              className="contenedor"
              css={css`
                text-align: center;
                margin-top: 5rem;
              `}
            >
              <h1>{nombre}</h1>
              <ContenedorProducto>
                <div>
                  <p>
                    Publicado hace:{" "}
                    {formatDistanceToNow(new Date(creado), { locale: es })}{" "}
                  </p>
                </div>
                <aside>2</aside>
              </ContenedorProducto>
            </div>
          ),
        ]
      )}
    </Layout>
  );
};

export default Producto;
