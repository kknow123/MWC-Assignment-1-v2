import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ShoppingItem } from '../../models/shopping-item.interface';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';

@IonicPage({
  name: 'SellItemPage'
})

@Component({
  selector: 'page-sell-item',
  templateUrl: 'sell-item.html',
})
export class SellItemPage {

  shoppingItem = {} as ShoppingItem

  shoppingItemRef$: FirebaseListObservable<ShoppingItem[]>

  constructor(public navCtrl: NavController, public navParams: NavParams,
  private database: AngularFireDatabase) {

    this.shoppingItemRef$ = this.database.list('shopping-list');
  }

  addShoppingItem(shoppingItem: ShoppingItem) {
    this.shoppingItemRef$.push({
      itemName: this.shoppingItem.itemName,
      itemPrice: Number(this.shoppingItem.itemPrice)
  });
  this.shoppingItem = {} as ShoppingItem;
  this.navCtrl.pop();
  }
}
