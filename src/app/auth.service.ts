import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import { ActivatedRoute } from '@angular/router';
import { AppUser } from './models/app-user';
import { UserService } from './user.service';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>;
  constructor(
    private userService:UserService,
  
    private afAuth :AngularFireAuth, private route: ActivatedRoute) { 
    
    this.user$= afAuth.authState;
  }

login(){
  let returnUrl=this.route.snapshot.queryParamMap.get('returnUrl') || '/';
  localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    


}

logout(){
  this.afAuth.signOut();
}

get appUser$() :Observable<AppUser>{
  return this.user$
  .switchMap(user => {

if(user) return this.userService.get(user.uid)


return Observable.of(null);
  });
}

}
