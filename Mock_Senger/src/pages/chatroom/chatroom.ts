import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";
import {ProfileID} from "../../models/profile";
import {Message} from "../../models/message";
import * as firebase from "firebase";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

/**
 * Generated class for the ChatroomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-chatroom',
    templateUrl: 'chatroom.html',
})
export class ChatroomPage {
    user = {} as ProfileID;
    messageID :string;

    message = {} as Message;
    title : string;

    chatLog: AngularFirestoreCollection<Message>;
    _chatLog: Observable<Message[]>;

    currentUser : string;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private FireAuth: AngularFireAuth,
                private FireDB: AngularFirestore) {
    }

    ionViewDidLoad() {

        console.log('ionViewDidLoad ChatroomPage');
        this.user = this.navParams.get('user');
        this.messageID = this.navParams.get('messageid');
        this.title = this.user.username;

        this.showChatLog()
    }

    sendMessage() {
        this.message.fullDate = firebase.firestore.Timestamp.now().toDate();
        this.message.nearDate = this.message.fullDate.getHours().toString() + ":"
            + new Date().getMinutes().toString();

        this.FireAuth.authState.take(1).subscribe(auth => {
            this.message.senderUID = auth.uid;
            this.FireDB.collection(`conversation/${this.messageID}/message`).add(this.message).then(
                () => this.message.messageStr = "",
            )
        })
    }

    showChatLog() {
        this.FireAuth.authState.take(1).subscribe(auth => {
            this.currentUser = auth.uid;
        });

        this.chatLog = this.FireDB.collection<Message>(`conversation/${this.messageID}/message`,
                ref => ref.orderBy('fullDate'));
        this._chatLog = this.chatLog.valueChanges();
    }
}
