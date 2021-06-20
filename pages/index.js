import Layout from "../components/Layout";
import React, { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../firebase";
import DetalleProducto from "../components/DetalleProducto";

export default function Home() {
  //state para productos
  const [productos, setProductos] = useState([]);

  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const obtenerProductos = () => {
      firebase.db
        .collection("productos")
        .orderBy("creado", "desc")
        .onSnapshot(manejarSnapshot);
    };
    obtenerProductos();
  }, []);

  function manejarSnapshot(snapshot) {
    const productos = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    setProductos(productos);
  }

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
