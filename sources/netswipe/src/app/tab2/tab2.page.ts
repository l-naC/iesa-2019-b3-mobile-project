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
  valuu = 'tt';

  contactsfound: any;
  search: any;
  contacttobefound: any;

  constructor(private contacts: Contacts) {
    // this.search('');
    this.contacttobefound = '';
    this.contactsfound = [];
    this.getContact('');
  }

  // searchBar(q) {
  //   const option: IContactFindOptions = {
  //     filter: q
  //   };
  //   const contact: Contact = this.contacts.create();
  //   const nm = new ContactName(null, 'Smith', 'John');
  //   contact.name = nm;
  //   this.valuu = nm;
  //   console.log(contact.name);
  //   console.log(contact.name);
  //   console.log(contact['name'] = nm);
  //   console.log(contact.name);
  //   console.log(contact['name']);
  //   contact.phoneNumbers = [new ContactField('mobile', '6471234567')];
  //   // contact.save()
  //   //     .then(
  //   //     () => console.log('Contact saved!', contact),
  //   //     (error: any) => console.error('Error saving contact.', error)
  //   // );
  //   console.log(this.contacts.find(this.ourtype, option));
  //   console.log(this.contacts);
  //   console.log(new ContactName(null, 'Smith', 'John'));
  //   // this.contacts.find(this.ourtype, option).then((conts) => {
  //   //   this.contactsFound = conts;
  //   // });
  //
  // }
  getContact(val) {
    this.contacts.find(['*'], {filter: val, multiple: true}).then((contacts) => {
      this.contactsfound = contacts;
    });

  }
  onKeyUp(ev) {
    this.search(ev.target.value);
  }
}
