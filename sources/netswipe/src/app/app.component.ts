import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';
// import { Globalization } from '@ionic-native/globalization/ngx';

import { NativeStorage } from '@ionic-native/native-storage/ngx';
import {TranslateService} from '@ngx-translate/core';
import {ScreenOrientation} from '@ionic-native/screen-orientation/ngx';
import {Globalization} from '@ionic-native/globalization/ngx';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public screenLock: boolean;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private ga: GoogleAnalytics,
    private screenOrientation: ScreenOrientation,
    // private globalization: Globalization
    private nativeStorage: NativeStorage,
  ) {
    this.initializeApp();
    this.nativeStorage.getItem('screenLock')
        .then(
            data =>  {
              if (data) {
                this.lockScreenOrientation();
              } else {
                this.unlockScreenOrientation();
              }
            },
            error => {
              console.error(error); this.screenLock = false;
              this.unlockScreenOrientation();
            }
        );
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.show();

      this.ga.startTrackerWithId('UA-139435564-1')
        .then(() => {
         console.log('Google analytics is ready now');
          this.ga.trackView('tab3');
         // Tracker is ready
         // You can now track pages or set additional information such as AppVersion or UserId
        })
        .catch(e => console.log('Error starting GoogleAnalytics', e));
    });
  }
  async lockScreenOrientation() {
    this.screenLock = true;
    this.nativeStorage.setItem('screenLock', this.screenLock);
    try{
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
    } catch{
      console.error("error lock");
    }
  }

  unlockScreenOrientation() {
    this.screenLock = false;
    this.nativeStorage.setItem('screenLock', this.screenLock);
    this.screenOrientation.unlock();
  }
}
