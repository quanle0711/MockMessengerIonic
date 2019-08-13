import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "angularfire2/firestore";
import {Observable, Subject} from "rxjs";
import {Profile, ProfileID} from "../../models/profile";
import {map} from "rxjs/operators";
import {Conversation} from "../../models/conversation";

/**
 * Generated class for the UsersTabPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-users-tab',
    templateUrl: 'users-tab.html',
})
export class UsersTabPage {
    buttonClicked: boolean;
    searchField: string;
    startMessage = {} as Conversation;
    messageUID: string;
    userCollection: AngularFirestoreCollection<Profile>;
    _userCollection: Observable<ProfileID[]>;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private FireAuth: AngularFireAuth,
                private FireDB: AngularFirestore,
                private alert: AlertController
    ) {
    }

    ionViewDidLoad() {
        this.buttonClicked = false;
    }


    //when user clicks on chat with another user
    newChat(user: ProfileID) {
        this.FireAuth.authState.take(1).subscribe(auth => {

            this.startMessage.messenger1 = auth.uid;
            this.startMessage.messenger2 = user.id;
            //smaller char goes first
            if (auth.uid.charCodeAt(0) <= user.id.charCodeAt(0)) {
                this.messageUID = auth.uid.substring(0, auth.uid.length / 2) +
                    user.id.substring(user.id.length / 2, user.id.length);

            }
            else {
                this.messageUID = user.id.substring(0, user.id.length / 2) +
                    auth.uid.substring(auth.uid.length / 2, auth.uid.length);
            }
            //set the UID... looks gross, yes.,

            this.FireDB.doc(`conversation/${this.messageUID}`).set(this.startMessage).then(
                () => this.navCtrl.push('ChatroomPage', {user: user, messageid: this.messageUID}),
                error => this.alert.create({
                    title: `failed to start conversation`,
                    subTitle: error,
                    buttons: [`dismiss`]
                }).present()
            )
        })

    }

    //go to settings page
    toSettingsPage() {
        this.navCtrl.push('SettingsPage');
    }

    //input of the search bar
    onInput($event) {
        let q = $event.target.value;
        if (this.searchField != "") {
            this.userCollection = this.FireDB.collection('profile',
                ref => ref.orderBy('username')
                    .startAt(this.searchField).endAt(this.searchField + "\uf8ff")
            );
            this._userCollection = this.userCollection.snapshotChanges().pipe(
                map(action => {
                    return action.map(a => {
                        const data = a.payload.doc.data() as Profile;
                        const id = a.payload.doc.id;
                        const buttonClicked = false;
                        return {id, buttonClicked, ...data};
                    });
                })
            )
        }
    }
}
