import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController, App} from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
})
export class HomePage {

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private FireAuth: AngularFireAuth,
                private alert : AlertController,
                private app: App) {
    }

    ionViewDidLoad() {
    }

    logOut() {
        this.FireAuth.auth.signOut();
        this.navCtrl.setRoot('LoginPage');
    }

}
