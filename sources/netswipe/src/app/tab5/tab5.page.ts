import { Component } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { TranslateService } from '@ngx-translate/core';
import {Globalization} from '@ionic-native/globalization/ngx';
import {ScreenOrientation} from '@ionic-native/screen-orientation/ngx';



@Component({
  selector: 'app-tab5',
  templateUrl: 'tab5.page.html',
  styleUrls: ['tab5.page.scss']
})
export class Tab5Page {
    public language: string;
    public screenLock: boolean;
    constructor(
	    private nativeStorage: NativeStorage,
        private _translate: TranslateService,
        private screenOrientation: ScreenOrientation,
        private globalization: Globalization
    ) {
        this.initializeApp();
        this.getDeviceLanguage();
        this.nativeStorage.getItem('screenLock')
            .then(
                data =>  {
                    this.screenLock = data;
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

        this.nativeStorage.getItem('language')
            .then(
                data => console.log(data),
                error => console.error(error)
            );
    }
    ionViewDidEnter(): void {
        // initialize
        this._initTranslate();
    }

    public changeLanguage(): void {
        this._translateLanguage();
    }

    _translateLanguage(): void {
        console.log('language', this.language);
        this.nativeStorage.setItem('language', this.language);
        this._translate.use(this.language);
    }

    _initTranslate() {
        // Set the default language for translation strings, and the current language.
        this._translate.setDefaultLang('en');

        if (this._translate.getBrowserLang() !== undefined) {
            this.nativeStorage.getItem('language')
                .then(
                    data =>  {this.language = data;
                        console.log(data);
                        this._translateLanguage();
                        console.log('browser language is', this._translate.getBrowserLang());

                    },
                    error => console.error(error)
                );
            // this.language = this._translate.getBrowserLang();
            // this._translateLanguage();

        } else {
            // Set your language here
            this.nativeStorage.getItem('language')
                .then(
                    data =>  {this.language = data;
                        console.log(data);this._translateLanguage();
                    },
                    error => console.error(error)
                );
            // this.language = 'en';
        }

    }

    getDeviceLanguage() {
        this.globalization.getPreferredLanguage().then(res => {
// Run other functions after getting device default lang
            this._initTranslate();
        })
            .catch(e => console.log(e));
    }
    changelock(event) {
        console.log(event.detail.checked);
        if (event.detail.checked) {
            this.lockScreenOrientation();
        } else {
            this.unlockScreenOrientation();
        }
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
