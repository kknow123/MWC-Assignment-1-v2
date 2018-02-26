import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-slider',
  templateUrl: 'slider.html',
})
export class SliderPage {

  @ViewChild(Slides) slides: Slides;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SliderPage');
  }

  skipSlide () {
    this.slides.slideTo(2, 500);
  }

  nextSlide() {
    this.slides.slideTo(1, 500);
  }

  nextNextSlide() {
    this.slides.slideTo(2, 500);
  }

}
