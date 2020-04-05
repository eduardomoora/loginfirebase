import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
//animations  for modals windows 
import Swal from 'sweetalert2';
import { text } from '@angular/core/src/render3';
import { timeout } from 'rxjs/Operators';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http:AuthService, private router:Router) { }
  //User
  userLogin:UsuarioModel= new UsuarioModel();
  remindUser=false;

  ngOnInit() {
  
   if (localStorage.getItem('email')) {
   this.userLogin.email=localStorage.getItem('email');
   this.remindUser=true;
  }

   
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

    //Here check the status of checkbox and remind teh user's email
    if (this.remindUser) {
      localStorage.setItem('email',this.userLogin.email);
    }
    else {
      localStorage.removeItem('email');
    }
    console.log("i'm here")
    this.router.navigateByUrl('/home');
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
 

  })


  }

}
