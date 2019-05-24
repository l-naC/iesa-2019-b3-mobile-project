import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MediaCapture, MediaFile, CaptureError, CaptureVideoOptions } from "@ionic-native/media-capture/ngx";
import { Storage } from '@ionic/storage';
import { Media, MediaObject } from "@ionic-native/media/ngx";
import { File} from "@ionic-native/file/ngx";
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder,NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import {
  BarcodeScannerOptions,
  BarcodeScanner
} from "@ionic-native/barcode-scanner/ngx";
import {Router} from '@angular/router';


const MEDIA_FILES_KEY = 'mediaFiles';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page{
  encodeData: any;
  scannedData: {};
  barcodeScannerOptions: BarcodeScannerOptions;

  to = '';
  cc = '';
  bcc = '';
  subject = '';
  message = '';

  trackMail = false;

  geoLatitude: number;
  geoLongitude: number;
  geoAccuracy:number;
  geoAddress: string;

  watchLocationUpdates:any;
  loading:any;
  isWatching:boolean;

  //Geocoder configuration
  geoencoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };

	currentImage: any;
	mediaFiles = [];
	@ViewChild('myvideo') myVideo: any;

  constructor(
    private camera: Camera,
    private mediaCapture: MediaCapture,
    private storage: Storage,
    private file: File,
    private media: Media,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    private emailComposer: EmailComposer,
    private ga: GoogleAnalytics,
    private screenOrientation: ScreenOrientation,
    private barcodeScanner: BarcodeScanner,
    private router: Router

  ){
    this.encodeData = "https://www.FreakyJolly.com";
    //Options
    this.barcodeScannerOptions = {
      showTorchButton: true,
      showFlipCameraButton: true
    };
  }

  settings() {
    this.router.navigateByUrl('/tabs/tab5');
  }
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

  //-------------------END => QR code scan---------------------------------


  //Get current coordinates of device
  getGeolocation(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.geoLatitude = resp.coords.latitude;
      this.geoLongitude = resp.coords.longitude;
      this.geoAccuracy = resp.coords.accuracy;
      this.getGeoencoder(this.geoLatitude,this.geoLongitude);
     }).catch((error) => {
       alert('Error getting location'+ JSON.stringify(error));
     });
  }

  //geocoder method to fetch address from coordinates passed as arguments
  getGeoencoder(latitude,longitude){
    this.nativeGeocoder.reverseGeocode(latitude, longitude, this.geoencoderOptions)
    .then((result: any[]) => {
      this.geoAddress = this.generateAddress(result[0]);
      console.log(this.geoAddress);
    })
    .catch((error: any) => {
      alert('Error getting location'+ JSON.stringify(error));
    });
  }

  //Return Comma saperated address
  generateAddress(addressObj){
      let obj = [];
      let address = "";
      for (let key in addressObj) {
        obj.push(addressObj[key]);
      }
      obj.reverse();
      for (let val in obj) {
        if(obj[val].length)
        address += obj[val]+', ';
      }
    return address.slice(0, -2);
  }


  //Start location update watch
  watchLocation(){
    this.isWatching = true;
    this.watchLocationUpdates = this.geolocation.watchPosition();
    this.watchLocationUpdates.subscribe((resp) => {
      this.geoLatitude = resp.coords.latitude;
      this.geoLongitude = resp.coords.longitude;
      this.getGeoencoder(this.geoLatitude,this.geoLongitude);
    });
  }

  //Stop location update watch
  stopLocationWatch(){
    this.isWatching = false;
    this.watchLocationUpdates.unsubscribe();
  }

  takePicture() {
    const options: CameraOptions = {
      quality: 100,
      saveToPhotoAlbum: true,
      encodingType: this.camera.EncodingType.JPEG,
      destinationType: this.camera.DestinationType.FILE_URI
    }

    this.camera.getPicture(options).then((imageData) => {
      this.currentImage = imageData;
    }, (err) => {
      // Handle error
      console.log("Camera issue:" + err);
    });
	}
	ionViewDidLoad() {
	    this.storage.get(MEDIA_FILES_KEY).then(res => {
	      	this.mediaFiles = JSON.parse(res) || [];
	    })
	}

	captureAudio() {
	    this.mediaCapture.captureAudio().then(res => {
	      	this.storeMediaFiles(res);
	    }, (err: CaptureError) => console.error(err));
	}

  storeMediaFiles(files) {
    this.storage.get(MEDIA_FILES_KEY).then(res => {
      if (res) {
        let arr = JSON.parse(res);
        arr = arr.concat(files);
        this.storage.set(MEDIA_FILES_KEY, JSON.stringify(arr));
      } else {
        this.storage.set(MEDIA_FILES_KEY, JSON.stringify(files))
      }
      this.mediaFiles = this.mediaFiles.concat(files);
    })
  }


  sendEmail() {
    this.emailComposer.isAvailable().then((available: boolean) =>{
      if(available) {
        //Now we know we can send
      }
     });

     let email = {
       to: this.to,
       cc: this.cc,
       bcc: this.bcc,
       attachments: [
         this.currentImage
       ],
       subject: this.subject,
       body: this.message,
       isHtml: true
     }

     // Send a text message using default options
     this.emailComposer.open(email);

    this.ga.trackEvent("form", "submit", "Message programmed").then(() => {
     this.trackMail = true;
     console.log("event tracking");
    });
  }

  async lockScreenOrientation() {
    console.log(this.screenOrientation);
    try{
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
    } catch{
      console.error("error lock");
    }
  }

  unlockScreenOrientation() {
    this.screenOrientation.unlock();
  }
}
