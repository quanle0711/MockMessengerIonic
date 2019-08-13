import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import {AngularFirestore, AngularFirestoreDocument} from "angularfire2/firestore";
import {AngularFireAuth} from "angularfire2/auth";
import {Observable} from "rxjs";

import {User} from "../../models/user";
import {Profile} from "../../models/profile";



/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {
    //fields
    user = {} as User;
    profile = {} as Profile;
    profileDoc : AngularFirestoreDocument<Profile>;
    _profileDoc : Observable<Profile>;
    //constructor
    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private FireAuth: AngularFireAuth,
                private alert : AlertController,
                private FireDB : AngularFirestore
                ) {
    }
    //functions

    async login(user : User) {
        try {
            const result = await this.FireAuth.auth.signInWithEmailAndPassword(user.email, user.password);
            console.log(result);
            if (result) {
                this.FireAuth.authState.take(1).subscribe(data => {
                    this.profileDoc = this.FireDB.doc<Profile>(`profile/${data.uid}`);
                    this._profileDoc = this.profileDoc.valueChanges();
                    this._profileDoc.subscribe( response => {
                        if (response) {
                            this.navCtrl.setRoot('TabsPage');
                        } else {
                            this.navCtrl.setRoot('ProfileCreatePage');
                        }
                    })
                });
            }
        }
        catch (error) {
            this.alert.create({
                title : `Login Failed`,
                subTitle: error,
                buttons: [`dismiss`]
            }).present();
        }
    }

    register() {
        this.navCtrl.push('RegisterPage')
    }

    //test functions
    ionViewDidLoad() {
        console.log('ionViewDidLoad LoginPage');

    }

}
