import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {FriendsTabPage} from "../friends-tab/friends-tab";
import {ChatTabPage} from "../chat-tab/chat-tab";
import {UsersTabPage} from "../users-tab/users-tab";
import {ProfileTabPage} from "../profile-tab/profile-tab";
import {AngularFireAuth} from "angularfire2/auth";

/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-tabs',
    templateUrl: 'tabs.html',
})
export class TabsPage {
    friendsTab: any;
    chatTab: any;
    usersTab: any;
    profileTab: any;
    constructor(public navCtrl: NavController, public navParams: NavParams, private FireAuth : AngularFireAuth) {
        this.friendsTab = FriendsTabPage;
        this.chatTab = ChatTabPage;
        this.usersTab = UsersTabPage;
        this.profileTab = ProfileTabPage;
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad TabsPage');
    }

}
