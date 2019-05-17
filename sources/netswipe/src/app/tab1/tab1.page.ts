import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {Globalization} from '@ionic-native/globalization/ngx';


@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})

export class Tab1Page {
    //local variables
    public title: string;
    public title_2: string;
    public description: string;
    public name: string;
    public language: string;
    constructor(
        private _translate: TranslateService,
        private globalization: Globalization

    ) {

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
        this._translate.use(this.language);
        this._initialiseTranslation();
    }

    _initTranslate() {
        // Set the default language for translation strings, and the current language.
        this._translate.setDefaultLang('en');

        if (this._translate.getBrowserLang() !== undefined) {
            this.language = this._translate.getBrowserLang();
            console.log('browser language is', this._translate.getBrowserLang());
        } else {
            // Set your language here
            this.language = 'en';
        }

        this._translateLanguage();
    }

    getDeviceLanguage() {
        this.globalization.getPreferredLanguage().then(res => {
// Run other functions after getting device default lang
            this._initTranslate()
        })
            .catch(e => console.log(e));
    }
}
