import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

/**
 * Generated class for the FriendsTabPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-friends-tab',
    templateUrl: 'friends-tab.html',
})
export class FriendsTabPage {

    constructor(public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad FriendsTabPage');
    }

    toSettingsPage() {
        this.navCtrl.push('SettingsPage');
    }
}
