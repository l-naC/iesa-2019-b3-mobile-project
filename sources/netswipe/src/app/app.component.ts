import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private ga: GoogleAnalytics,
    private nativeStorage: NativeStorage,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.nativeStorage.setItem('myitem', {property: 'value', anotherProperty: 'anotherValue'})
        .then(
            () => console.log('Stored item!'),
            error => console.error('Error storing item', error)
        );

    this.nativeStorage.getItem('myitem')
        .then(
            data => console.log(data),
            error => console.error(error)
        );
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
}
