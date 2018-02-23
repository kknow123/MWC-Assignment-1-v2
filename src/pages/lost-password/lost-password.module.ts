import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LostPasswordPage } from './lost-password';

@NgModule({
  declarations: [
    LostPasswordPage,
  ],
  imports: [
    IonicPageModule.forChild(LostPasswordPage),
  ],
})
export class LostPasswordPageModule {}
