import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConBackendService } from '../services/con-backend.service';

@Component({
  selector: 'app-contrasena',
  templateUrl: './contrasena.page.html',
  styleUrls: ['./contrasena.page.scss'],
})
export class ContrasenaPage implements OnInit {

  credencial: any;
  correoUsuario: any;
  password='';
  verify = false;

  constructor(private router: Router, private route: ActivatedRoute, private conBackendService: ConBackendService) { 
    this.route.queryParams.subscribe(params => {
      this.correoUsuario = params.correo;
      this.conBackendService.getUsuarioById({correo: this.correoUsuario}).subscribe((rest)=>{
        this.credencial= rest;
      });;
  
    });
  }

  ngOnInit() {
  }

  ingresar(){
    if(this.password==this.credencial[0].contrasena){
      this.verify=false;
      this.router.navigate(['/crud']);
    }
    this.verify=true;
  }

}
