import { Usuario } from './../../modelos/usuario';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../servicios/usuario.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {
  @Input() usuario: Usuario;
  formulario:FormGroup;

  constructor(public dialogRef: MatDialogRef<EditarUsuarioComponent>,private formBuilder:FormBuilder, public usuarioservice: UsuarioService) { }

  ngOnInit() {
    this.crearFormulario();
  }
  private crearFormulario():void{
    console.log("llego usuario", this.usuario);

    this.formulario = this.formBuilder.group(
      {
        nombre: [this.usuario.nombre, [Validators.maxLength(30)]],
        apellido: [this.usuario.apellido,[Validators.maxLength(30)]],
        idTipoIdentificacion: [this.usuario.idTipoIdentificacion, [Validators.required]],
        numeroIdentificacion:[this.usuario.numeroIdentificacion,[ Validators.required]],
        contraseña:[this.usuario.contraseña, [Validators.required, Validators.minLength(5)] ],
        correo: [this.usuario.correo, [Validators.required, Validators.email]]
      });

      this.formulario.get('nombre').valueChanges.subscribe(
        value=>{
          if(this.formulario.get('nombre').valid){
            this.usuario.nombre=this.formulario.get('nombre').value;
          }
        }
      );
      this.formulario.get('apellido').valueChanges.subscribe(
        value=>{
          if(this.formulario.get('apellido').valid){
            this.usuario.apellido=this.formulario.get('apellido').value;
          }
        }
      );
      this.formulario.get('idTipoIdentificacion').valueChanges.subscribe(
        value=>{
          if(this.formulario.get('idTipoIdentificacion').valid){
            this.usuario.idTipoIdentificacion=this.formulario.get('idTipoIdentificacion').value;
          }
        }
      );
      this.formulario.get('numeroIdentificacion').valueChanges.subscribe(
        value=>{
          if(this.formulario.get('numeroIdentificacion').valid){
            this.usuario.numeroIdentificacion=Number(this.formulario.get('numeroIdentificacion').value);
          }
        }
      );
      this.formulario.get('contraseña').valueChanges.subscribe(
        value=>{
          if(this.formulario.get('contraseña').valid){
            this.usuario.contraseña=this.formulario.get('contraseña').value;
          }
        }
      );
      this.formulario.get('correo').valueChanges.subscribe(
        value=>{
          if(this.formulario.get('correo').valid){
            this.usuario.correo=this.formulario.get('correo').value;
          }
        }
      );

     this.formulario.valueChanges.pipe(
      ).subscribe(
        value=>{
          console.log(value);
        }
      );
  }
  onSubmit(){
    if (this.formulario.valid) {
      let usu={
        idUsuario: this.usuario.idUsuario,
        nombre: this.usuario.nombre,
        apellido: this.usuario.apellido,
        idTipoIdentificacion:Number(this.usuario.idTipoIdentificacion),
        numeroIdentificacion:Number(this.usuario.numeroIdentificacion),
        contraseña:this.usuario.contraseña,
        correo: this.usuario.correo
      };
      console.log(" USUARIO EDITADO$$$$$$:   ",usu);
      this.usuarioservice.actualizarUsuario(usu.idUsuario,usu).subscribe(data =>
        {
          console.log("respuesta editar: ",data);
        });
      this.ngOnInit();
      this.dialogRef.close();
    }
    this.ngOnInit();
  }
  cancelar(){
    this.dialogRef.close();
  }

}


function debounceTime(arg0: number): import("rxjs").OperatorFunction<any, unknown> {
  throw new Error('Function not implemented.');
}

