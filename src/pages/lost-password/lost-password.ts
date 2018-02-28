import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { User } from '../../models/user';
import { AngularFireAuth } from "angularfire2/auth";
import { FormBuilder, FormGroup, Validators, AbstractControl } from "@angular/forms";

@IonicPage({
  name: 'LostPasswordPage'
})
@Component({
  selector: 'page-lost-password',
  templateUrl: 'lost-password.html',
})
export class LostPasswordPage {

  user = {} as User;

  formgroup:FormGroup;
  email:AbstractControl;

  constructor(public alertCtrl: AlertController,
    private afAuth: AngularFireAuth, 
    public loadingCtrl: LoadingController,
    public navCtrl: NavController, public navParams: NavParams,
    public formbuilder: FormBuilder) {

      this.formgroup = formbuilder.group({
        email:['',[Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]]
      });

      this.email = this.formgroup.controls['email'];
  }

  navigateToLoginPage() {
    this.navCtrl.push('LoginPage');
  }

  async lostPassword(user: User) {
    {
      // create loading 
      let loader = this.loadingCtrl.create({
      })
      loader.present();
      // check whether email are in use
      this.afAuth.auth.sendPasswordResetEmail(this.user.email)
      .then(auth => {
        // if not in use; go back to LoginPage
        let alert = this.alertCtrl.create({
          title: 'We just sent you a reset link to your email',
          buttons: [{
            text: 'OK',
             handler: data => {
              this.navCtrl.push('LoginPage');
              loader.dismiss();
            }
          }]
        });
        alert.present();
      })
      .catch(err => {
        // if it is already in use; create alert message
        let alert = this.alertCtrl.create({
          title: 'Invalid',
          subTitle: 'Incorrect Email <br\> Please Try Again!',
          buttons: ['OK']
        });
        // loading disapear & alert appear
        loader.dismiss();
        alert.present();
      }); 
    }
  }
}
