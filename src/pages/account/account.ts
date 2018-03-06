import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, App } from 'ionic-angular';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { Profile } from '../../models/profile';
import { AngularFireAuth } from 'angularfire2/auth';

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

  profileData: FirebaseObjectObservable<Profile>

  constructor(
    private afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase,
    public app: App,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewWillLoad() {
    this.afAuth.authState.subscribe(data => {
      this.profileData = this.afDatabase.object(`profile/${data.uid}`)
    })
    
  }

  navigateToSellItemPage() {
    this.navCtrl.push('SellItemPage');
  }

  async logout(): Promise<any> {
    let loader = this.loadingCtrl.create({
    })
    loader.present();
    setTimeout(() => {
      loader.dismiss();
      this.afAuth.auth.signOut();
      this.app.getRootNav().setRoot('LoginPage');
    }, 1000);
  }


  navigateToSettingPage() {
    this.navCtrl.push('SettingsPage');
  }

  
}
