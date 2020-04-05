import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
//animations  for modals windows 
import Swal from 'sweetalert2';
import { text } from '@angular/core/src/render3';
import { timeout } from 'rxjs/Operators';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http:AuthService) { }
  //User
  userLogin:UsuarioModel;
  ngOnInit() {
   this.userLogin = new UsuarioModel();
   
  }



  //verificate a new user and log in
  logIn(form:NgForm){


    if (form.invalid) {return;}
   
    
    Swal.fire({
      allowOutsideClick:false,
      title:'Login',
      text:'Ingresando...',

     
    });
    Swal.showLoading();

  this.http.login(this.userLogin).subscribe(resp=>{

    Swal.close();
  },err=>{


    if (err.error.error.message==='INVALID_PASSWORD') {
      Swal.fire({
        title:'Error!',
        icon:'error',
        text:'Por favor ingrese un Password valido'
      });
       
    } else {
      Swal.fire({
      title:'Error!',
      icon:'error',
      text:'Por favor ingrese un Email valido'
      

       
      });
       
    }
 
/*     Swal.fire({
      allowOutsideClick:false,
      title:'Login',
      text:'Ingresando...',

      timer:2000
   */

    console.log(err.error.error.message)
  })


  }

}
