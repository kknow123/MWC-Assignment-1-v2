import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, App } from 'ionic-angular';

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
    public app: App,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  async logout() {
    let loader = this.loadingCtrl.create({
    })
    loader.present();
    setTimeout(() => {
      loader.dismiss();
      this.app.getRootNav().setRoot('LoginPage');
    }, 1000);
  }

}
