import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ItemPage } from '../item/item';
/**
 * Generated class for the CategoriesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html',
})
export class CategoriesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
  }
  navigateToItemPage(){
    this.navCtrl.push(ItemPage);
  }
 

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoriesPage');
  }

  

}
