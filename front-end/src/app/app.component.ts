import { Component } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //Constructor
  constructor(private http: Http) {}

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
  credentials = { user: '', password: '' };
  createMode = false;

  //Actions
  logIn(){
    //TODO
  }

  signUp(){
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({ headers: headers });

    const body = {
      name : this.credentials.user,
      password : this.credentials.password
    };

    this.http
      .post('http://localhost:3000/api/login', body, options)
      .map(response => response.json())
      .subscribe(
        response =>  alert('OK' + response.message),
        error => alert('ERROR' + error.message)
    );
  }
}
