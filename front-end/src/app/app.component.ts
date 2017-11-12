import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //Init
  title = "App Login";
  user = "Usuario";
  userPlaceholder = "Introduzca un usuario";
  password = "Contraseña";
  passwordPlaceholder = "Introduzca una contraseña";
  btnLogin = "Iniciar sesión";
  btnCreate = "Crear usuario";
  btnSignUp = "Registrarse";
  btnCancel = "Cancelar";
  credentials = { user: 'usuario', password: 'usuario' };
  createMode = true;

  //Actions
  logIn(){
    //TODO
  }
}
