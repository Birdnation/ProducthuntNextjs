import app from "firebase/app";
import firebaseConfig from "./config";
import "firebase/auth";

class Firebase {
  constructor() {
    if (!app.apps.length) {
      app.initializeApp(firebaseConfig);
    }
    this.auth = app.auth();
  }

  //registra un usuario
  async registrar(nombre, email, password) {
    const nuevoUsuario = await this.auth.createUserWithEmailAndPassword(
      email,
      password
    );

    return await nuevoUsuario.user.updateProfile({
      displayName: nombre,
    });
  }

  //iniciar sesion user
  async login(email, password) {
    return await this.auth.signInWithEmailAndPassword(email, password);
  }

  //cerrar sesion user
  async cerrarSesion() {
    await this.auth.signOut();
  }
}

const firebase = new Firebase();

export default firebase;
