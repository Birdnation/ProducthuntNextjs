export default function validarCrearCuenta(valores) {
  let errores = {};

  //validar el nombre
  if (!valores.nombre) {
    errores.nombre = "el Nombre es obligatorio";
  }

  //validar email
  if (!valores.email) {
    errores.email = "El email es Obligatorio";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(valores.email)) {
    errores.email = "Debe ingresar un email valido";
  }

  //validar el password
  if (!valores.password) {
    errores.password = "La contraseña es obligatoria";
    errores.repassword = "La contraseña es obligatoria";
  } else if (valores.password !== valores.repassword) {
    errores.password = "Las contraseñas no coinciden";
    errores.repassword = "Las contraseñas no coinciden";
  } else if (valores.password.length < 6) {
    errores.password = "La contraseña debe tener al menos 6 caracteres";
  }
  return errores;
}
