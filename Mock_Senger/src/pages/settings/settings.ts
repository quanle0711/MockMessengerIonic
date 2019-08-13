import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-settings',
    templateUrl: 'settings.html',
})
export class SettingsPage {

    constructor(public navCtrl: NavController, public navParams: NavParams, private FireAuth : AngularFireAuth) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad SettingsPage');
    }

    logOut() {
        this.FireAuth.auth.signOut();
        this.navCtrl.setRoot('LoginPage');
    }
}
