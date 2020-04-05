import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


import { AuthService } from 'src/app/services/auth.service';


import Swal from 'sweetalert2';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
remind=false;
user:UsuarioModel;

  constructor(private auth:AuthService, private router:Router) { }

  ngOnInit() {
    this.user= new UsuarioModel();

    
   }
 //create a new user   
onSubmit(form:NgForm){

  if (form.invalid) 
  {
    return;
  }
  Swal.fire({
    allowOutsideClick:false,
    title:'Login',
    text:'Ingresando...',

   
  });
  Swal.showLoading();
  this.auth.signup(this.user).subscribe(resp=>{
   Swal.close();

   //reminding user checkbox
   if(this.remind){
   localStorage.setItem('email',this.user.email)
   }
   this.router.navigateByUrl('/home');
  },(err)=>{
    
    Swal.fire({
      title:'Error!',
      icon:'error',
      text:err.error.error.message
             
      });
  })
}

}
