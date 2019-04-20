import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MediaCapture, MediaFile, CaptureError, CaptureVideoOptions } from "@ionic-native/media-capture/ngx";
import { Storage } from '@ionic/storage';
import { Media, MediaObject } from "@ionic-native/media/ngx";
import { File} from "@ionic-native/file/ngx";
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

const MEDIA_FILES_KEY = 'mediaFiles';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{
	currentImage: any;
	mediaFiles = [];

  	constructor(private camera: Camera, private mediaCapture: MediaCapture, private storage: Storage, private file: File, private media: Media) { }

  	takePicture() {
	    const options: CameraOptions = {
	      quality: 100,
	      destinationType: this.camera.DestinationType.DATA_URL,
	      encodingType: this.camera.EncodingType.JPEG,
	      mediaType: this.camera.MediaType.PICTURE
	    }

	    this.camera.getPicture(options).then((imageData) => {
	      this.currentImage = 'data:image/jpeg;base64,' + imageData;
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

	  play(myFile) {
	    if (myFile.name.indexOf('.wav') > -1) {
	      const audioFile: MediaObject = this.media.create(myFile.localURL);
	      audioFile.play();
	    }
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

	  ngOnInit() {
	  }
}
