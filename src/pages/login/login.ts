import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { User } from '../../models/user';
import { AngularFireAuth } from "angularfire2/auth";
import { FormBuilder, FormGroup, Validators, AbstractControl } from "@angular/forms";

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

  formgroup:FormGroup;
  email:AbstractControl;
  password:AbstractControl;


  constructor(public alertCtrl: AlertController,
    private afAuth: AngularFireAuth, 
    public loadingCtrl: LoadingController,
    public navCtrl: NavController, public navParams: NavParams,
    public formbuilder: FormBuilder) {

      this.formgroup = formbuilder.group({
        email:['',[Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
        password:['',[Validators.required, Validators.minLength(6)]]
      });
      
      this.email = this.formgroup.controls['email'];
      this.password = this.formgroup.controls['password'];
  }

  // Go To Register Page
  navigateToRegisterPage(){
    this.navCtrl.push('RegisterPage');
  }

  // Go To Lost Password Page
  navigateToLostPasswordPage(){
    this.navCtrl.push('LostPasswordPage');
  }

  // when login button clicked
  async login(user: User) {
    // create loading 
    let loader = this.loadingCtrl.create({
    })
    loader.present();
    // check whether email and password are valid
    this.afAuth.auth.signInWithEmailAndPassword(this.user.email, this.user.password)
    .then(auth => {
      // if valid; set HomePage as root page
      this.navCtrl.setRoot('TabsPage');
      loader.dismiss();
    })
    .catch(err => {
      // if not valid; create alert message
      let alert = this.alertCtrl.create({
        title: 'Invalid',
        subTitle: 'Incorrect Email / Password <br\> Please Try Again!',
        buttons: ['OK']
      });
      // loading disapear & alert appear
      loader.dismiss();
      alert.present();
    }); 
  }
}

// try {
    //   const result = this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
    //   let loader = this.loadingCtrl.create({
    //   });
    //   loader.present();
    //   if (result) {
    //     loader.dismiss();
    //     this.navCtrl.push('HomePage');
    //   }
    // } catch (e) {
    //   console.error(e);
    // }
