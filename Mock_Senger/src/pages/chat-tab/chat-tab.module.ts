import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatTabPage } from './chat-tab';

@NgModule({
  declarations: [
    ChatTabPage,
  ],
  imports: [
    IonicPageModule.forChild(ChatTabPage),
  ],
})
export class ChatTabPageModule {}
