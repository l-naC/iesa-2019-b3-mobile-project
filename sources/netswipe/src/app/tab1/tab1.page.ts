import { Component } from '@angular/core';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
	constructor(private screenOrientation: ScreenOrientation) { }

	getCurrentScreenOrientation() {
		console.log(this.screenOrientation.type);		
	}

	async lockScreenOrientation() {
		try{
			this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
		} catch{
			console.error("error lock");
		}
	}

	unlockScreenOrientation() {
		this.screenOrientation.unlock();
	}

	observeScreenOrientation() {
		this.screenOrientation.onChange()
			.subscribe(() => console.log("The application orientation has changed"));
	}
}
