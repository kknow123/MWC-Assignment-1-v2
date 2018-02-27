import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';
import { AngularFireAuth } from "angularfire2/auth";

@IonicPage({
  name: 'LoginPage'
})
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [AngularFireAuth]
})
export class LoginPage {

  user = {} as User;

  constructor(private afAuth: AngularFireAuth, 
    
    public navCtrl: NavController, public navParams: NavParams) {
  }

  navigateToRegisterPage(){
    this.navCtrl.push('RegisterPage');
  }

  navigateToLostPasswordPage(){
    this.navCtrl.push('LostPasswordPage');
  }

  async login(user: User) {
    try {
      const result = this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
      if (result) {
        this.navCtrl.push('HomePage');
      } 
    } catch (e) {
      console.error(e);
    }
   
  }

  // login() {
  //   this.navCtrl.push('HomePage');
  // }

}
