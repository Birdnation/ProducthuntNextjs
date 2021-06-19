export default function validarIniciarSesion(valores) {
  let errores = {};

  //validar email
  if (!valores.email) {
    errores.email = "El email es obligatorio";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(valores.email)) {
    errores.email = "Debe ingresar un email valido";
  }

  //validar el password
  if (!valores.password) {
    errores.password = "La contraseña es obligatoria";
  }

  return errores;
}
