import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { MatButtonModule, MatCardModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatTableModule, MatTooltipModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { CrearUsuarioComponent } from './componentes/crear-usuario/crear-usuario.component';
import { EditarUsuarioComponent } from './componentes/editar-usuario/editar-usuario.component';
import { ListarUsuarioComponent } from './componentes/listar-usuario/listar-usuario.component';
import { UsuarioService } from './servicios/usuario.service';
import { SesionService } from './servicios/sesion.service';
import { LoginUsuarioComponent } from './componentes/login-usuario/login-usuario.component';
import { HttpClientModule } from '@angular/common/http';
import { JugarComponent } from './componentes/jugar/jugar.component';


@NgModule({
  declarations: [CrearUsuarioComponent, EditarUsuarioComponent, ListarUsuarioComponent, LoginUsuarioComponent, JugarComponent],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MatTableModule,
    HttpClientModule,
    MatIconModule,
    MatDialogModule
  ],
  providers:[
    UsuarioService,
    SesionService
  ],
  entryComponents: [EditarUsuarioComponent,CrearUsuarioComponent,JugarComponent],
})
export class UsuarioModule { }
