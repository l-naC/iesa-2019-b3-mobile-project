import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {Globalization} from '@ionic-native/globalization/ngx';
import {NativeStorage} from '@ionic-native/native-storage/ngx';

import { Router } from '@angular/router';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})

export class Tab1Page {
    //local variables
    public title: string;
    public description: string;
    public buttonTitle: string;
    public name: string;
    public language: string;

    constructor(
        private _translate: TranslateService,
        private globalization: Globalization,
        private nativeStorage: NativeStorage,
        private router: Router,


    ) {
        this._initTranslate();
    }

    ionViewDidEnter(): void {
        // initializee
        this._initTranslate();
    }

    _initialiseTranslation(): void {
        // Get data with key 'TITLE'
        this._translate.get('title').subscribe((res: string) => {
            // console.log(res);
            this.title = res;
        });
        // Get data with key 'description'
        this._translate.get('description').subscribe((res: string) => {
            // console.log(res);
            this.description = res;
        });
        // Get data with key 'TITLE_2' and `value` variable as 'John'
        this._translate.get('buttonTitle', { value: 'John' }).subscribe((res: string) => {
            // console.log(res);
            this.buttonTitle = res;
        });
    }

    public changeLanguage(): void {
        this._translateLanguage();
    }

    _translateLanguage(): void {
        console.log('language', this.language);
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
            this._initTranslate()
        })
            .catch(e => console.log(e));
    }
    settings() {
        this.router.navigateByUrl('/tabs/tab5');
    }

}
