import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Profile } from '../../models/profile'
import { AngularFireDatabase } from 'angularfire2/database-deprecated'
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from "@angular/forms";

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'SettingsPage'
})
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  profile = {} as Profile;

  formgroup:FormGroup;
  nickname:AbstractControl;

  constructor(public loadingCtrl: LoadingController,
    public formbuilder: FormBuilder,
    public alertCtrl: AlertController,
    private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase,
    public navCtrl: NavController, public navParams: NavParams) {

      this.formgroup = formbuilder.group({
        nickname:['',[Validators.required, Validators.minLength(6), Validators.maxLength(12)]]
      });

      this.nickname = this.formgroup.controls['nickname'];
  }

  changeNickname() {
    this.afAuth.authState.subscribe(auth => {
      this.afDatabase.object(`profile/${auth.uid}`).set(this.profile)
        .then(() => this.navCtrl.setRoot('AccountPage'));
    })
  }

}
