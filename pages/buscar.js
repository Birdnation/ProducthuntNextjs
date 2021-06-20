import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import DetalleProducto from "../components/DetalleProducto";
import useProductos from "../hooks/useProductos";

const Buscar = () => {
  const router = useRouter();
  const {
    query: { q },
  } = router;

  //todos los productos
  const { productos } = useProductos("creado");
  const [resultado, setResultado] = useState([]);

  useEffect(() => {
    const busqueda = q.toLowerCase();

    const filtro = productos.filter((producto) => {
      return (
        producto.nombre.toLowerCase().includes(busqueda) ||
        producto.descripcion.toLowerCase().includes(busqueda)
      );
    });
    setResultado(filtro);
  }, [q, productos]);

  return (
    <>
      <Layout>
        <div className="listado-productos">
          <div className="contenedor">
            <ul className="bg-white">
              {resultado.map((producto) => (
                <DetalleProducto
                  key={producto.id}
                  producto={producto}
                ></DetalleProducto>
              ))}
            </ul>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Buscar;
