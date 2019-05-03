import { Component } from '@angular/core';
import { SMS } from '@ionic-native/sms/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';


@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
    smsLog = 'test message';
    phoneNumber: number;
    txtMsg: string;

    constructor(private sms: SMS,
                private androidPermissions: AndroidPermissions
    ) { }

    addPermission() {
        console.log('ssssss');
        this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.SMS).then(
            (result) => {
                this.smsLog = 'Has permission?' + result.hasPermission;
                this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.SMS).then(
                    (result2) => {this.smsLog = 'this permission?' + result2.hasPermission; },
                    (erre) => {
                        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.SMS);
                        this.smsLog = 'Has permissionrequest?' + erre;
                        console.log(erre);
                    }

                );},
            (err) => {
                this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.SMS).then(
                    (result) => {this.smsLog = 'Has permission?' + result.hasPermission; },
                    (erre) => {
                        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.SMS);
                        this.smsLog = 'Has permissionrequest?' + erre;
                        console.log(erre);
                    }
                );
                this.smsLog = 'Has permission?' + err;
            }
        );
        this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.SMS, this.androidPermissions.PERMISSION.SEND_SMS]);
    }
    addMessage() {
        this.smsLog = 'start';
        const options = {
            replaceLineBreaks: false, // true to replace \n by a new line, false by default
            android: {
                intent: ''  // Opens Default sms app
                // intent: '' // Sends sms without opening default sms app
            }
        };
        // Send a text message using default options
        this.sms.send('683675983', 'Hello world!', options).then((result) => {
            this.smsLog = 'Message sent successfully';
        }, (err) => {
            this.smsLog = 'Message sent successfully' + err;
            this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.CONTACTS, this.androidPermissions.PERMISSION.SEND_SMS]).then(
                (result) => {console.log(result); });
        });

        // this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
        //     (result) => {
        //       this.smsLog = 'Has permission?' + result.hasPermission;
        //       if (result.hasPermission) {
        //         const options = {
        //           replaceLineBreaks: false, // true to replace \n by a new line, false by default
        //           android: {
        //             intent: ''  // Opens Default sms app
        //             // intent: '' // Sends sms without opening default sms app
        //           }
        //         };
        //         // Send a text message using default options
        //         this.sms.send('683675983', 'Hello world!', options);
        //       } else {
        //         this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.SMS);
        //       }
        //     },
        //     (err) => {
        //       this.smsLog = 'Has permission? is nonnnn';
        //
        //       this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA);
        //     }
        // );
        //
        // this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.SMS]);
    }
    async sendSMS() {
        this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.SEND_SMS).then(
            result => console.log('Has permission?' + result.hasPermission),
            err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.SEND_SMS)
        );
        const options = {
            replaceLineBreaks: true, // true to replace \n by a new line, false by default
            android: {
                intent: '' // send SMS without opening any other app
            }
        };
        try {
            await this.sms.send('683675983', 'Hello world!', options);
            console.log('sent');
            // this.mostrarToast('mensage sent');
        } catch (e) {
            console.log(JSON.stringify(e));
            console.log(e);
            this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.BROADCAST_SMS).then(
                result => console.log(result),
                err => console.log(err)
            );
            this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.SEND_SMS).then(
                result => console.log(result),
                err => console.log(err)
            );
            this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_SMS).then(
                result => console.log(result),
                err => console.log(err)
            );
            // this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.RECEIVE_SMS).then(
            //     result => console.log(result),
            //     err => console.log(err)
            // );
            this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.RECORD_AUDIO).then(
                result => console.log(result),
                err => console.log(err)
            );
            // this.mostrarToast(e);
        }
    }
}
