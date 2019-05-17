import { Component } from '@angular/core';
import { Badge } from '@ionic-native/badge/ngx';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page{

  constructor(private badge: Badge) { }

  eventSource = [];

  calendar = {
    mode: 'month',
    currentDate: new Date()
  }

  onEventSelected = (event) => {
    console.log(event.title);
};

  onTitleChanged(){
    
  }

  onTimeSelected(){
    
  }


}
