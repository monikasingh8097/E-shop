import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
import { UserService } from './user.service';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';


@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate{

  constructor(private auth : AuthService, private userService : UserService) { }

canActivate(): Observable<boolean> {
 // return this.auth.user$
//  .switchMap(user => this.userService.get(user.uid))
return this.auth.appUser$
  .map((appUser :any) => appUser.isAdmin);
 }}