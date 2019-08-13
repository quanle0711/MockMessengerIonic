import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';

//firebase imports
import {AngularFireModule} from "angularfire2";
import {AngularFireAuthModule} from "angularfire2/auth";
import {AngularFirestoreModule} from "angularfire2/firestore";

//local imports
import {MyApp} from './app.component';
import {FIREBASE_CONFIG} from "./app.firebase.config";
import {LoginPage} from "../pages/login/login";
import {LoginPageModule} from "../pages/login/login.module";
import {FriendsTabPage} from "../pages/friends-tab/friends-tab";
import {ChatTabPage} from "../pages/chat-tab/chat-tab";
import {UsersTabPage} from "../pages/users-tab/users-tab";
import {ProfileTabPage} from "../pages/profile-tab/profile-tab";
import {Autosize} from "../directives/autosize/autosize";

@NgModule({
    declarations: [
        MyApp,
        FriendsTabPage,
        ChatTabPage,
        UsersTabPage,
        ProfileTabPage,
        Autosize
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        AngularFireModule.initializeApp(FIREBASE_CONFIG),
        AngularFireAuthModule,
        AngularFirestoreModule,
        LoginPageModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        FriendsTabPage,
        ChatTabPage,
        UsersTabPage,
        ProfileTabPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
})
export class AppModule {
}
