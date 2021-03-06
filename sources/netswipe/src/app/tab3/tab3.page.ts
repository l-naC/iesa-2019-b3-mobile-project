import { Component } from '@angular/core';
import { Badge } from '@ionic-native/badge/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { File } from '@ionic-native/file/ngx';
import {Router} from '@angular/router';
import {BarcodeScanner, BarcodeScannerOptions} from '@ionic-native/barcode-scanner/ngx';
import {ScreenOrientation} from '@ionic-native/screen-orientation/ngx';


@Component({
    selector: 'app-tab3',
    templateUrl: 'tab3.page.html',
    styleUrls: ['tab3.page.scss']
})
export class Tab3Page{
    encodeData: any;
    scannedData: {};
    barcodeScannerOptions: BarcodeScannerOptions;

    constructor(private badge: Badge, private socialSharing: SocialSharing, private file: File, private router: Router,
                private screenOrientation: ScreenOrientation,
                private barcodeScanner: BarcodeScanner,
    ) {
        this.encodeData = "https://www.FreakyJolly.com";
        //Options
        this.barcodeScannerOptions = {
            showTorchButton: true,
            showFlipCameraButton: true
        };
    }

    eventSource;
    viewTitle;
    isToday: boolean;
    calendar = {
        mode: 'month',
        currentDate: new Date()
    };
    text: 'Viens me rejoindre sur Netswipe';
    url: '';

    //-------------------QR code scan---------------------------------
    scanCode() {
        this.barcodeScanner
            .scan()
            .then(barcodeData => {
                alert("Barcode data " + JSON.stringify(barcodeData));
                this.scannedData = barcodeData;
            })
            .catch(err => {
                console.log("Error", err);
            });
    }

    encodedText() {
        this.barcodeScanner
            .encode(this.barcodeScanner.Encode.TEXT_TYPE, this.encodeData)
            .then(
                encodedData => {
                    console.log(encodedData);
                    this.encodeData = encodedData;
                },
                err => {
                    console.log("Error occured : " + err);
                }
            );
    }
    async shareFacebook() {
        // Either URL or Image
        this.socialSharing.shareViaFacebookWithPasteMessageHint('Message via Facebook', null /* img */, null /* url */, 'Tu as fait le bon choix.').then((suc) => {
            console.log(suc);
            // Success
        }).catch((e) => {
            console.log(e);
        });
    }

    async resolveLocalFile() {
        return this.file.copyFile(`${this.file.applicationDirectory}www/assets/imgs/`, 'academy.jpg', this.file.cacheDirectory, `${new Date().getTime()}.jpg`);
    }

    removeTempFile(name) {
        this.file.removeFile(this.file.cacheDirectory, name);
    }

    loadEvents() {
        this.eventSource = this.createRandomEvents();
    }
    onViewTitleChanged(title) {
        this.viewTitle = title;
    }
    onEventSelected(event) {
        console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
    }
    changeMode(mode) {
        this.calendar.mode = mode;
    }
    today() {
        this.calendar.currentDate = new Date();
    }
    onTimeSelected(ev) {
        console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
            (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
    }
    onCurrentDateChanged(event:Date) {
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        event.setHours(0, 0, 0, 0);
        this.isToday = today.getTime() === event.getTime();
    }
    createRandomEvents() {
        var events = [];
        for (var i = 0; i < 50; i += 1) {
            var date = new Date();
            var eventType = Math.floor(Math.random() * 2);
            var startDay = Math.floor(Math.random() * 90) - 45;
            var endDay = Math.floor(Math.random() * 2) + startDay;
            var startTime;
            var endTime;
            if (eventType === 0) {
                startTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + startDay));
                if (endDay === startDay) {
                    endDay += 1;
                }
                endTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + endDay));
                events.push({
                    title: 'All Day - ' + i,
                    startTime: startTime,
                    endTime: endTime,
                    allDay: true
                });
            } else {
                var startMinute = Math.floor(Math.random() * 24 * 60);
                var endMinute = Math.floor(Math.random() * 180) + startMinute;
                startTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + startDay, 0, date.getMinutes() + startMinute);
                endTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + endDay, 0, date.getMinutes() + endMinute);
                events.push({
                    title: 'Event - ' + i,
                    startTime: startTime,
                    endTime: endTime,
                    allDay: false
                });
            }
        }
        return events;
    }
    onRangeChanged(ev) {
        console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
    }
    markDisabled = (date:Date) => {
        var current = new Date();
        current.setHours(0, 0, 0);
        return date < current;
    }
    settings() {
        this.router.navigateByUrl('/tabs/tab5');
    }

}
