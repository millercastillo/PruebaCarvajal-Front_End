import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { Validacion } from '../../modelos/validacion';
import { SesionService } from '../../servicios/sesion.service';
import { UsuarioService } from '../../servicios/usuario.service';


@Component({
  selector: 'app-login-usuario',
  templateUrl: './login-usuario.component.html',
  styleUrls: ['./login-usuario.component.css']
})
export class LoginUsuarioComponent implements OnInit, OnDestroy {
  public errorUsuario: Validacion[] = [
    {tipo: 'required', msn: 'Usuario es requerido'}
  ];

  public errorPass: Validacion[] = [
    {tipo: 'required', msn: 'Contraseña es requerido'}
  ];


  public mnsErrorUs = '';
  public mnsErrorPass = '';



  public controls = {
    usuario: new FormControl('', [Validators.required]),
    contrasena: new FormControl('', [Validators.required])
  };

  hide = true;

  public usuarioForm: FormGroup;

  private subs: ReplaySubject<void> = new ReplaySubject();


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private usuarioServicio: UsuarioService,
    private sesion: SesionService
  ) {
  }

  ngOnInit(): void {
    this.usuarioForm = this.fb.group({
      usurios: this.controls.usuario,
      contrasena: this.controls.contrasena,
    });
  }

  volver(): void{
    this.router.navigateByUrl('/usuario/listar');
  }

  guardar(): void {
    let timerInterval;
    let tiempo = 1500;
    /*if (this.usuarioForm.valid) {
      const usuario = {Correo: this.controls.usuario.value, Contrasena: this.controls.contrasena.value};
      this.usuarioServicio.login(usuario).subscribe(
        (valor) => {
          Swal.fire({
            title: 'Validando!',
            html: 'Por favor espere.',
            timer: tiempo,
            timerProgressBar: true,
            didOpen: () => {
              Swal.showLoading();
              timerInterval = setInterval(() => {
              }, 100);
            },
            willClose: () => {
              clearInterval(timerInterval);
            }
          }).then((result) => {
            //Read more about handling dismissals below
            if (result.dismiss === Swal.DismissReason.timer) {
              if (valor) {
                Swal.fire({
                  icon: 'success',
                  title: 'Usuario logeado con exito',
                  showConfirmButton: false,
                  timer: 1500
                });
                this.router.navigateByUrl('/usuario/listar');
                localStorage.setItem('logueado', 'true');
                this.sesion.logueado.next(true);
              } else {
                Swal.fire({
                  icon: 'error',
                  title: 'Usuario o contraseña incorrectos',
                  showConfirmButton: false,
                  timer: 1500
                });
                localStorage.setItem('logueado', 'false');
                this.sesion.logueado.next(false);
              }
            }
          });
        },
        () => {},
        () => {
          tiempo = 0;
        }
      );
    }*/
  }

  ngAfterViewInit(): void {
    console.log('entra a after view');
    this.controls.usuario.statusChanges.pipe(takeUntil(this.subs)).subscribe((valor) => {
      if (valor === 'INVALID') {
        this.errorUsuario.forEach((error) => {
          if (this.controls.usuario.hasError(error.tipo)) {
            this.mnsErrorUs = error.msn;
          }
        });
      }
      console.log('entra a validar');
    });
    this.controls.contrasena.statusChanges.pipe(takeUntil(this.subs)).subscribe((valor) => {
      if (valor === 'INVALID') {
        this.errorPass.forEach((error) => {
          if (this.controls.contrasena.hasError(error.tipo)) {
            this.mnsErrorPass = error.msn;
          }
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.subs.next();
    this.subs.complete();
  }


}
//Esta funcion va por fuera?
function takeUntil(subs: ReplaySubject<void>): import("rxjs").OperatorFunction<any, unknown> {
  throw new Error('Function not implemented.');
}
