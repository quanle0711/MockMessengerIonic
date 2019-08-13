import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UsersTabPage } from './users-tab';

@NgModule({
  declarations: [
    UsersTabPage,
  ],
  imports: [
    IonicPageModule.forChild(UsersTabPage),
  ],
})
export class UsersTabPageModule {}
