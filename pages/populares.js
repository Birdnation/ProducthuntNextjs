import Layout from "../components/Layout";
import React from "react";
import useProductos from "../hooks/useProductos";
import DetalleProducto from "../components/DetalleProducto";

export default function Populares() {
  const { productos } = useProductos("votos");
  return (
    <div>
      <Layout>
        <div className="listado-productos">
          <div className="contenedor">
            <ul className="bg-white">
              {productos.map((producto) => (
                <DetalleProducto
                  key={producto.id}
                  producto={producto}
                ></DetalleProducto>
              ))}
            </ul>
          </div>
        </div>
      </Layout>
    </div>
  );
}
