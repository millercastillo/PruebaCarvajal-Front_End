import { UsuarioCrear } from './../../modelos/usuarioCrear';
import { Usuario } from './../../modelos/usuario';
import { UsuarioService } from './../../servicios/usuario.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {
  usuario: UsuarioCrear;
  formulario:FormGroup;
  constructor(public dialogRef: MatDialogRef<CrearUsuarioComponent>,private formBuilder:FormBuilder, public usuarioservice: UsuarioService) { }

  ngOnInit() {
    this.crearFormulario();
  }

  cancelar(){
    this.dialogRef.close();
  }
  private crearFormulario():void{
    this.formulario = this.formBuilder.group(
      {
        nombre: ['', [Validators.maxLength(30)]],
        apellido: ['',[Validators.maxLength(30)]],
        idTipoIdentificacion: ['',[Validators.required]],
        numeroIdentificacion:['',[Validators.required]],
        contraseña:['', [Validators.required, Validators.minLength(5)] ],
        correo: ['', [Validators.required, Validators.email]]
      });
  }
  onSubmit(){
    if (this.formulario.valid) {
      let usu={
        nombre: this.formulario.get('nombre').value,
        apellido: this.formulario.get('apellido').value,
        idTipoIdentificacion:Number(this.formulario.get('idTipoIdentificacion').value),
        numeroIdentificacion:Number(this.formulario.get('numeroIdentificacion').value),
        contraseña:this.formulario.get('contraseña').value,
        correo: this.formulario.get('correo').value
      };
      console.log("usuario formado:",usu);
      this.usuarioservice.guardarUsuario(usu).subscribe(data =>{
        console.log('guardado exitosamente');
        this.dialogRef.close();
      });
      Swal.fire(
        'Exito!',
        'Usuario guardado!',
        'success'
      );
    }
    else{
      Swal.fire(
        'Fallo!',
        'Usuario no guardado!',
        'error'
      );
    }
    this.ngOnInit();
  }
}
