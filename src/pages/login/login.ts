import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { User } from '../../models/user';
import { AngularFireAuth } from "angularfire2/auth";
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl } from "@angular/forms";

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


  constructor(private afAuth: AngularFireAuth, 
    public loadingCtrl: LoadingController,
    public navCtrl: NavController, public navParams: NavParams,
    public formbuilder: FormBuilder) {

      this.formgroup = formbuilder.group({
        email:['',[Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9._]+[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$')]],
        password:['',[Validators.required, Validators.minLength(6)]]
      });
      
      this.email = this.formgroup.controls['email'];
      this.password = this.formgroup.controls['password'];
  }

  navigateToRegisterPage(){
    this.navCtrl.push('RegisterPage');
  }

  navigateToLostPasswordPage(){
    this.navCtrl.push('LostPasswordPage');
  }

  async login(user: User) {
    try {
      const result = this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
      let loader = this.loadingCtrl.create({
      });
      loader.present();
      if (result) {
        this.navCtrl.push('HomePage');
        loader.dismiss();
      } 
    } catch (e) {
      console.error(e);
    }
  }
}
