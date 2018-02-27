import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';

@IonicPage({
  name: 'LoginPage'
})
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  navigateToRegisterPage(){
    this.navCtrl.push('RegisterPage');
  }

  navigateToLostPasswordPage(){
    this.navCtrl.push('LostPasswordPage');
  }

  login() {
    
  }

}
