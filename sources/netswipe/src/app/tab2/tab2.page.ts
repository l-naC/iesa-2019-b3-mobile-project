import { Component } from '@angular/core';
import {Contacts, ContactFieldType,  IContactFindOptions, Contact, ContactField, ContactName} from '@ionic-native/contacts';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  ourtype: ContactFieldType[] = ['displayName'];
  contactsFound = [];

  constructor(private contacts: Contacts) {
    this.search('');
  }

  search(q) {
    const option: IContactFindOptions = {
      filter: q
    };
    this.contacts.find(this.ourtype, option).then((conts) => {
      this.contactsFound = conts;
    });
  }
  onKeyUp(ev) {
    this.search(ev.target.value);
  }
}
