import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginComponent } from '../pages/login/login.component';
import { UsuarioModel } from '../models/usuario.model';
import { map } from "rxjs/Operators";
//animations of windows modal

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //Token of current user
  userToken:string;
  private url="https://identitytoolkit.googleapis.com/v1/accounts:";
  private apikey="AIzaSyCapWinwdxLeZ-85IOq4Xg7NzfFxdj0re8";
//create a new user
//https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]



//login
//https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]




  constructor(private http:HttpClient) {
    this.readToken();
   }


logout(){

 }



login(usuario:UsuarioModel){
  const authData={
    ...usuario,
    returnSecureToken:true
  }
  return this.http.post(
    `${this.url}signInWithPassword?key=${this.apikey}`,
    authData
  ).pipe(map(resp=>{
    
    this.saveToken(resp['idToken']);
   
    return resp;
  }))
  ;

}

signup(usuario:UsuarioModel){

  const authData={
    ...usuario,
    returnSecureToken:true
  }
  
  return this.http.post(
    `${this.url}signUp?key=${this.apikey}`,
    authData
  ).pipe(map(resp=>{
   
    this.saveToken(resp['idToken']);
    
    return resp;
  }))
  ;
}

//save token localstorage
private saveToken(idToken:string){

  this.userToken=idToken;
  localStorage.setItem('token',idToken);

}

readToken(){
  if (localStorage.getItem('token')) {
    this.userToken=localStorage.getItem('token');
  } else {
    this.userToken='';
  }
  return this.userToken;
}

}

