import { Component } from '@angular/core';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page{

  	constructor(private ga: GoogleAnalytics) { }

  	trackingAnalytics() {
  		console.log('dans methode');
		this.ga.startTrackerWithId('UA-139435564-1')
		   	.then(() => {
		     console.log('Google analytics is ready now');
		      this.ga.trackView('test');
		     // Tracker is ready
		     // You can now track pages or set additional information such as AppVersion or UserId
		   	})
		   	.catch(e => console.log('Error starting GoogleAnalytics', e));
  	}
  	
  	
}
