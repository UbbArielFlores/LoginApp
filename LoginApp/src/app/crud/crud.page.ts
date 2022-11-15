import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConBackendService } from '../services/con-backend.service';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.page.html',
  styleUrls: ['./crud.page.scss'],
})
export class CrudPage implements OnInit {

  formAnadir : FormGroup;
  verify = false;

  //modals
  anadir = false;
  visualizar= false;
  editar= false;

  //array
  allUsers : any;

  //Selected
  apellidoM = '';
  apellidoP = '';
  contrasena= '';
  correo = '';
  nombre = '';
  telefono = '';

  constructor(private conBackendService: ConBackendService, private formBuilder: FormBuilder) { 

    this.formAnadir = this.formBuilder.group({
      correo:['', [Validators.required]],
      nombre:['', [Validators.required]],
      apellidoPaterno:['', [Validators.required]],
      apellidoMaterno:['', [Validators.required]],
      telefono:['', [Validators.required]],
      contrasena:['', [Validators.required]],

    });

    this.conBackendService.getAllUsuarios().subscribe((rest)=>{
      this.allUsers= rest;
    });;
  }

  ngOnInit() {
  }

  setOpen(isOpen: boolean) {
    this.verify=false;
    this.anadir = isOpen;
  }

  registrar(){
    if(this.formAnadir.valid){
      this.verify=false;
      let body = JSON.stringify(this.formAnadir.value);
      this.conBackendService.insertUsuario(body).subscribe((rest)=>{
        this.allUsers.push(this.formAnadir.value);
        this.anadir = false;
      });
    } 
    this.verify=true;
  }

  visualiza(isOpen: boolean, correo: string) {
    for(let user of this.allUsers){
      if(user.correo==correo){
        this.apellidoM = user.apellidoMaterno;
        this.apellidoP = user.apellidoPaterno;
        this.contrasena= user.contrasena;
        this.correo = user.correo;
        this.nombre = user.nombre;
        this.telefono = user.telefono;
        this.visualizar = isOpen;
      }
    }
  }

  edita(isOpen: boolean,correo: string) {
    this.verify=false
    for(let user of this.allUsers){
      if(user.correo==correo){
        this.apellidoM = user.apellidoMaterno;
        this.apellidoP = user.apellidoPaterno;
        this.contrasena= user.contrasena;
        this.correo = user.correo;
        this.nombre = user.nombre;
        this.telefono = user.telefono;
        this.editar = isOpen;
      }
    }
  }

  editado(){

    if(this.apellidoM != '' && this.apellidoP != '' && this.contrasena!='' && this.correo!='' &&
      this.nombre!=''&& this.telefono!=''){

      this.verify=false;
      let body={
        apellidoMaterno: this.apellidoM,
        apellidoPaterno: this.apellidoP,
        contrasena: this.contrasena,
        correo: this.correo,
        nombre: this.nombre,
        telefono: this.telefono
      }
      this.conBackendService.updateUsuario(body).subscribe((rest)=>{
        this.editar = false;

        let aux = [];
        for(let item of this.allUsers){
          if(item.correo==this.correo){
            aux.push(body);
          }else{
          aux.push(item);
        }
        }
        this.allUsers = aux;

      });
    }
    this.verify=true;
  }

  visualizaClose(isOpen: boolean) {
    this.verify=false;
    this.visualizar = isOpen;
  }

  editaClose(isOpen: boolean) {
    this.verify=false;
    this.editar = isOpen;
  }

  eliminar(mail: string){
    this.conBackendService.deleteUsuario({correo:mail}).subscribe((rest)=>{
      let aux = [];
        for(let item of this.allUsers){
          if(item.correo==mail){
            
          }else{
          aux.push(item);
        }
        }
        this.allUsers = aux;
    });;
  }

}
