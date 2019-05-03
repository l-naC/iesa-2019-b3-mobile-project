import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { Camera } from '@ionic-native/camera/ngx';
import { Contacts } from '@ionic-native/contacts/ngx';

import { Badge } from '@ionic-native/badge/ngx';


import { MediaCapture} from "@ionic-native/media-capture/ngx";
import { Media} from "@ionic-native/media/ngx";
import { File} from "@ionic-native/file/ngx";

import { IonicStorageModule } from '@ionic/storage';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';

import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, IonicStorageModule.forRoot()],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    Contacts,
    Geolocation,
    NativeGeocoder,
    MediaCapture,
    Media,
    File,
    Badge,
    GoogleAnalytics,
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
