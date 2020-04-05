import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

user:UsuarioModel;

  constructor(private auth:AuthService) { }

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
  },(err)=>{
    
    Swal.fire({
      title:'Error!',
      icon:'error',
      text:err.error.error.message
             
      });
  })
}

}
