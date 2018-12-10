import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth:AngularFireAuth) { }


  login(email, password){
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }
  signup(email, password){
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }


  saveToken(uid){
    localStorage.setItem('uid', uid);
  }
  getToken(){
    return localStorage.getItem('uid');
  }

  isAuthenticated(){
    console.log(this.getToken())
    if(this.getToken() === null){
      return false;
    }else{
      return true;
    }
  }

  logout(){
    localStorage.clear();
  }


}
