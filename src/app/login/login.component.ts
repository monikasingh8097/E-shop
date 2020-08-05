import { Component } from '@angular/core';

//import * as firebase from 'firebase/app';
//import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',      
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent

{
  constructor(private afAuth: AuthService) { 
  }

login(){

this.afAuth.login();
}
}
