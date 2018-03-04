import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

/**
 * Generated class for the AccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'AccountPage'
})

@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {

  constructor(
    public loadingCtrl: LoadingController,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  async logout() {
    let loader = this.loadingCtrl.create({
    })
    loader.present();
    setTimeout(() => {
      loader.dismiss();
      this.navCtrl.setRoot('LoginPage');
    }, 1000);
  }

}
