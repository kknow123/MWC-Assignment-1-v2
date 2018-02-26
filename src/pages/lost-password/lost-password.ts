import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage({
  name: 'LostPasswordPage'
})
@Component({
  selector: 'page-lost-password',
  templateUrl: 'lost-password.html',
})
export class LostPasswordPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LostPasswordPage');
  }

  navigateToLoginPage() {
    this.navCtrl.push('LoginPage');
  }

}
