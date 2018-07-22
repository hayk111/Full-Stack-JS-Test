import { Component, OnInit } from '@angular/core';
import { Image } from '../classes/image'
import { ImagesService } from '../images.service'

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {
  uploadedImgs: Image[];
  url = "";

  constructor(private imagesService: ImagesService) { }

  ngOnInit() {
  }

  removeUploadedImg(i: number) {
    console.log('remooooving:::', i)
    this.uploadedImgs.splice(i, 1)
  }

  saveUploadedImgs() {
    console.log('save1')
    this.imagesService.saveImages(this.uploadedImgs, 'username') //must be provided real username
  }

  onChange(event: any, input: any) {
    console.log('event itself:', event)
    let files = [].slice.call(event.target.files);

    console.log('changed files:', files)

    this.uploadedImgs = files.map((file) => {
      let reader = new FileReader();
      let img: Image = new Image();

      img.title = file.name
      img.location = ''
      img.date = new Date()
      console.log('in for, event:', <FileReader>event.target)

      reader.onload = (event: ProgressEvent) => {
        img.loading = false
        img.url = (<FileReader>event.target).result;
        console.log('in for, here7777777:', <FileReader>event.target)
      }

      reader.readAsDataURL(file);

      return img
    })

    console.log('uploadedImgs:', this.uploadedImgs)
  }

}
