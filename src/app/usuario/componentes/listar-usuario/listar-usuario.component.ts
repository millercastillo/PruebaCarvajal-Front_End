import { UsuarioService } from './../../servicios/usuario.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Usuario } from '../../modelos/usuario';
import { EditarUsuarioComponent } from '../editar-usuario/editar-usuario.component';
import { MatDialog } from '@angular/material';
import { CrearUsuarioComponent } from '../crear-usuario/crear-usuario.component';
import { JugarComponent } from '../jugar/jugar.component';

/**
 * @title Table with sorting
 */
 @Component({
  selector: 'app-listar-usuario',
  templateUrl: './listar-usuario.component.html',
  styleUrls: ['./listar-usuario.component.css']
})
export class ListarUsuarioComponent implements OnInit {
  displayedColumns: string[] = ['Nombre', 'Apellido', 'Cedula', 'Accion'];
  listUsuarios:Array<Usuario>=[];
  dataSource = new MatTableDataSource<Usuario>();

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(public usuarioservice: UsuarioService, private dialog: MatDialog){}
  ngOnInit() {
    this.listUsuarios=[];
    this.usuarioservice.obtenerUsuarios().subscribe(

      result => {
        console.log(result);
        result.forEach((element:Usuario) => {
          this.listUsuarios.push(element);
          console.log("array",this.listUsuarios);
        });
        this.dataSource.data = this.listUsuarios;
        this.dataSource.sort = this.sort;
      }
    );

  }
  editarUsuario(usu: Usuario){
    let act:Usuario={...usu};
    const dialogRef = this.dialog.open(EditarUsuarioComponent, {
      width: '700px', height: '600px',
      data: {
      }
    });
    dialogRef.componentInstance.usuario = act;
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.ngOnInit();
    });
  }
  eliminarUsuario(id: number){
    console.log("entro a eliminar: ",id);
    if(confirm("¿Esta seguro que desea eliminar el registro?")){
      this.usuarioservice.eliminarUsuario(id).subscribe(data =>
        {
          this.usuarioservice.obtenerUsuarios();
          this.ngOnInit();
        });

    }
  }
  AgregarUsuario(){
      const dialogRef = this.dialog.open(CrearUsuarioComponent, {
        width: '700px', height: '600px',
        data: {
        }
      });
      dialogRef.afterClosed().subscribe((result) => {
        console.log('The dialog was closed');
        this.ngOnInit();
      });
  }
  jugarTriqui(){
    const dialogRef = this.dialog.open(JugarComponent, {
      width: '900px', height: '600px',
      data: {
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.ngOnInit();
    });
  }
}
