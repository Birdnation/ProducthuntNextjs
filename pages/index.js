import Layout from "../components/Layout";
import React from "react";
import DetalleProducto from "../components/DetalleProducto";
import useProductos from "../hooks/useProductos";

export default function Home() {
  const { productos } = useProductos("creado");
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
