import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-jugar',
  templateUrl: './jugar.component.html',
  styleUrls: ['./jugar.component.css']
})
export class JugarComponent implements OnInit {
  game = [
    [],
    [],
    [],
  ];
  turno = true;
  form: FormGroup;
  constructor(private formBuilder: FormBuilder,public dialogRef: MatDialogRef<JugarComponent>) { }

  ngOnInit(): void {
    this.crearFormulario();
  }

  crearFormulario(): void {
    this.form=null;
    this.form = this.formBuilder.group(
      {
        f0c0: [''], f0c1: [''], f0c2: [''],
        f1c0: [''], f1c1: [''], f1c2: [''],
        f2c0: [''], f2c1: [''], f2c2: [''],
      }
    );

    this.form.get('f0c0').enable(); this.form.get('f0c1').enable(); this.form.get('f0c2').enable()
    this.form.get('f1c0').enable(); this.form.get('f1c1').enable(); this.form.get('f1c2').enable()
    this.form.get('f2c0').enable(); this.form.get('f2c1').enable(); this.form.get('f2c2').enable()
  }
  pintar(e: any) {
    let id = e.target.id
    let fila = id[1]
    let col = id[3]
    let content=''
    console.log(`Fila:   ${fila}   -   Columna:   ${col}`)
    console.log("Contenido:  ", this.form.get(`${id}`).value)
    if (this.turno) {
      this.form.get(`${id}`).setValue('X')
      this.game[fila][col] = 'X'
      content='X'
    }
    else {
      this.form.get(`${id}`).setValue('O')
      this.game[fila][col] = 'O';
      content='O'
    }
    this.comprobar(fila,col,content)
    this.form.get(`${id}`).disable()
    this.turno = !this.turno

    console.log("MATRIZ:   ", this.game);
  }
  comprobar(fila:number, col:number,content:string):void{
    let contCol=0;
    let contFil=0;
    //Compruebo fila
      for(let j=0;j<3;j++){
        if(this.game[fila][j]==content){
          contCol++;
          console.log("Aumentando cont en Columna",contCol)
          if(contCol>2){
            console.log("GANÓ ",content);
            this.congratulations(content);
          }
        }
      }
      //Compruebo Columna
      for(let i=0;i<3;i++){
        if(this.game[i][col]==content){
          contFil++;
          console.log("Aumentando cont en FILA",contFil)
          if(contFil>2){
            console.log("GANÓ ",content);
            this.congratulations(content);
          }
        }
      }
      //Compruebo Diagonales

  }
  congratulations(content: string) {
    let player=""
    if(content=='X')
    player='PLAYER1 X'
    else
    player='PLAYER2 O'

    Swal.fire({
      title: `Felicitaciones ${player}   GANASTE`,
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    })
  }
  reset(){
    this.form.reset();
    this.crearFormulario()
    this.game = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
    var btn:any; btn=document.getElementById("f0c0");  btn.disabled=false;
    var btn:any; btn=document.getElementById("f0c1");  btn.disabled=false;
    var btn:any; btn=document.getElementById("f0c2");  btn.disabled=false;
    var btn:any; btn=document.getElementById("f1c0");  btn.disabled=false;
    var btn:any; btn=document.getElementById("f1c1");  btn.disabled=false;
    var btn:any; btn=document.getElementById("f1c2");  btn.disabled=false;
    var btn:any; btn=document.getElementById("f2c0");  btn.disabled=false;
    var btn:any; btn=document.getElementById("f2c1");  btn.disabled=false;
    var btn:any; btn=document.getElementById("f2c2");  btn.disabled=false;
  }
  salir(){
    this.dialogRef.close();
  }

}
