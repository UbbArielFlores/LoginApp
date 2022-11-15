import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ConBackendService } from '../services/con-backend.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  emailUser= '';
  allEmail: any;
  verify = false;

  constructor(public router: Router, private conBackendService: ConBackendService) { }

  ngOnInit() {
    this.conBackendService.getAllCorreos().subscribe((rest)=>{
      this.allEmail= rest;
    });

  }

  continuar(){
    for(let email of this.allEmail){
      if(email.correo == this.emailUser ){
        let navigationExtras: NavigationExtras = {
          queryParams: {
            correo : email.correo
          }
        }
        this.router.navigate(['/contrasena'],navigationExtras);
      }
    }
    this.verify=true;
  }

}
