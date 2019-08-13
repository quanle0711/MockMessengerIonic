import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";
import 'rxjs/operator/take';
import {Observable} from "rxjs";

import {Profile} from "../../models/profile";


/**
 * Generated class for the ProfileCreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-profile-create',
    templateUrl: 'profile-create.html',
})
export class ProfileCreatePage {
    profile = {} as Profile;
    usernameCheck: boolean;

    userCollection: AngularFirestoreCollection<Profile>;
    _userCollection: Observable<Profile[]>;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private FireAuth: AngularFireAuth,
                private FireDB: AngularFirestore,
                private alert: AlertController) {
        this.usernameCheck = true;
    }

    ionViewDidLoad() {
    }

    createProfile() {
        if (this.usernameCheck) {
            this.FireAuth.authState.take(1).subscribe(data => {
                this.FireDB.doc(`profile/${data.uid}`).set(this.profile)
                    .then(() => this.navCtrl.setRoot('TabsPage'));

            });
        } else {
            this.alert.create({
                title: `failed to create profile`,
                subTitle: `the username of "${this.profile.username}" is already taken`,
                buttons: [`dismiss`]
            }).present();
        }
    }

    checkUsername($event) {
        this.userCollection = this.FireDB.collection('profile',
            ref => ref.where("username", "==", this.profile.username));
        this._userCollection = this.userCollection.valueChanges();
        this._userCollection.subscribe(response => {
            if (response.length < 1) {
                this.usernameCheck = true;
            }
            else {
                this.usernameCheck = false;
            }
        });
    }


}
