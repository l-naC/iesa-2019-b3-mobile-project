import { Component } from '@angular/core';
import { SMS } from '@ionic-native/sms/ngx';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  constructor(private sms: SMS) { }

  addMessage() {
    var options={
      replaceLineBreaks: false, // true to replace \n by a new line, false by default
      android: {
          // intent: 'INTENT'  // Opens Default sms app
          intent: '' // Sends sms without opening default sms app
        }
    }
    // Send a text message using default options
    this.sms.send('683675983', 'Hello world!', options);
  }
}
