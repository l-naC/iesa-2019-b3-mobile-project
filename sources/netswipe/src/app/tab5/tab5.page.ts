import { Component } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';


@Component({
  selector: 'app-tab5',
  templateUrl: 'tab5.page.html',
  styleUrls: ['tab5.page.scss']
})
export class Tab5Page {
	constructor( private nativeStorage: NativeStorage,
    ) {
        this.initializeApp();
    }

    initializeApp() {

        this.nativeStorage.getItem('myitem')
            .then(
                data => console.log(data),
                error => console.error(error)
            );
    }
}
