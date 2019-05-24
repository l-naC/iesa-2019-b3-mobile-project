import { Component } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { TranslateService } from '@ngx-translate/core';
import {Globalization} from '@ionic-native/globalization/ngx';



@Component({
  selector: 'app-tab5',
  templateUrl: 'tab5.page.html',
  styleUrls: ['tab5.page.scss']
})
export class Tab5Page {
    public title: string;
    public title_2: string;
    public description: string;
    public name: string;
    public language: string;
    constructor(
	    private nativeStorage: NativeStorage,
        private _translate: TranslateService
        ,
        private globalization: Globalization
    ) {
        this.initializeApp();
        this.getDeviceLanguage();
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

    _initialiseTranslation(): void {
        // Get data with key 'TITLE'
        this._translate.get('TITLE').subscribe((res: string) => {
            console.log(res);
            this.title = res;
        });
        // Get data with key 'description'
        this._translate.get('description').subscribe((res: string) => {
            console.log(res);
            this.description = res;
        });
        // Get data with key 'TITLE_2' and `value` variable as 'John'
        this._translate.get('TITLE_2', { value: 'John' }).subscribe((res: string) => {
            console.log(res);
            this.title_2 = res;
        });
        // Get data with nested key 'data.name' and `name_value` variable as 'Marissa Mayer'
        this._translate.get('data.name', { name_value: 'Marissa Mayer' }).subscribe((res: string) => {
            console.log(res);
            this.name = res;
        });
    }

    public changeLanguage(): void {
        this._translateLanguage();
    }

    _translateLanguage(): void {
        console.log('language', this.language);
        this.nativeStorage.setItem('language', this.language);
        this._translate.use(this.language);
        this._initialiseTranslation();
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
}
