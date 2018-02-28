import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { User } from '../../models/user';
import { AngularFireAuth } from "angularfire2/auth";
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from "@angular/forms";

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

  formgroup:FormGroup;
  email:AbstractControl;
  password:AbstractControl;
  confirmPassword: AbstractControl;

  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private afAuth: AngularFireAuth,
    public navCtrl: NavController, public navParams: NavParams,
    public formbuilder: FormBuilder) {

      this.formgroup = formbuilder.group({
        email:['',[Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
        password:['',[Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
        confirmPassword:['',[Validators.required, Validators.minLength(6), Validators.maxLength(12), this.equalTo('password')]]
      });

      this.email = this.formgroup.controls['email'];
      this.password = this.formgroup.controls['password'];
      this.confirmPassword = this.formgroup.controls['confirmPassword'];
  }

  // check whether both password and confirmPassword are equal
  equalTo(field_name): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
    let input = control.value;
    let isValid=control.root.value[field_name]==input
    if(!isValid) 
    return { 'equalTo': {isValid} }
    else 
    return null;
    };
    }

  // go to 
  navigateToLoginPage() {
    this.navCtrl.push('LoginPage');
  }

  // register new email account
  async register(user: User) {
    {
      // create loading 
      let loader = this.loadingCtrl.create({
      })
      loader.present();
      // check whether email are in use
      this.afAuth.auth.createUserWithEmailAndPassword(this.user.email, this.user.password)
      .then(auth => {
        // if not in use; go back to LoginPage
        let alert = this.alertCtrl.create({
          title: 'Successfully Registered!',
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
          subTitle: 'Email already in-use /<br\> Incorrect Email Format<br\> Please Try Again!',
          buttons: ['OK']
        });
        // loading disapear & alert appear
        loader.dismiss();
        alert.present();
      }); 
    }
  }
}
