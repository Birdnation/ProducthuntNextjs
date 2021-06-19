export default function validarCrearCuenta(valores) {
  let errores = {};

  //validar el nombre
  if (!valores.nombre) {
    errores.nombre = "el nombre es obligatorio";
  }

  //validar empresa
  if (!valores.empresa) {
    errores.empresa = "La empresa es obligatoria";
  }

  //validar la url
  if (!valores.url) {
    errores.url = "La url es obligatoria";
  } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(valores.url)) {
    errores.url = "Url invalida";
  }

  //validar la descripcion
  if (!valores.descripcion) {
    errores.descripcion = "la descipcion es obligatoria";
  }

  return errores;
}
