import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';
import { AngularFireAuth } from "angularfire2/auth";

@IonicPage({
  name: 'RegisterPage'
})

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
  providers: [AngularFireAuth]
})
export class RegisterPage {

  user = {} as User;

  constructor(private afAuth: AngularFireAuth,
    
    public navCtrl: NavController, public navParams: NavParams) {
  }

  navigateToLoginPage() {
    this.navCtrl.push('LoginPage');
  }

  async register(user: User) {
    try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
      console.log(result);
    }
    catch(e) {
      console.error(e);
    }
  }
}
