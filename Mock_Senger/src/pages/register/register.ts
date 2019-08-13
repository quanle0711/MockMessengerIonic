import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {User} from "../../models/user";
import {AngularFireAuth} from "angularfire2/auth";

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-register',
    templateUrl: 'register.html',
})
export class RegisterPage {
    //fields
    user = {} as User;

    //constructor
    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private FireAuth: AngularFireAuth,
                private alert : AlertController) {
    }

    //functions

    async register(user: User) {
        try {
            const result = await this.FireAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
            if (result) {
                this.alert.create({
                    title : `Sign up successful!`,
                    subTitle: `Try logging in now!`,
                    buttons: [`okay`]
                }).present();

                this.navCtrl.popToRoot();
            }
        }
        catch (error) {
            this.alert.create({
                title : `Registration Failed`,
                subTitle: error,
                buttons: [`dismiss`]
            }).present();
        }
    }


    ionViewDidLoad() {
        console.log('ionViewDidLoad RegisterPage');
    }

}
