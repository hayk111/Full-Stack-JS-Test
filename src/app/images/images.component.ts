import { Component, OnInit, Output } from '@angular/core';
import { Image } from '../classes/image'
import { ImagesService } from '../images.service'

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {
  uploadedImgs: Image[];
  myImages: Image[];
  url = "";
  savingImages: boolean;
  imagesSaved: boolean;
  uploadImgOuterHover: boolean = false
  myImagesLoading: boolean = false

  public fileIsOver: boolean = false;

  constructor(private imagesService: ImagesService) { 
  }
 
  @Output() public options = {
    readAs: 'Text'
  };
 
  private file: File;
 
  public fileOver(fileIsOver: boolean): void {
    console.log('heeeeey')
    this.fileIsOver = fileIsOver;
  }
 
  public onFileDrop(file: File): void {
    console.log('Got file!', file.toString());
    this.uploadedImgs = [];

    this.uploadedImgs.push({
      url: file.toString(),
      title: '',
      location: '',
      date: new Date,
      loading: true
    })
  }

  ngOnInit() {
    this.savingImages = false
    this.imagesSaved = false
    this.uploadedImgs = []

    this.getMyImgs()

    var dropZone = document.getElementById('klass');

    dropZone.addEventListener('dragover', (e: DragEvent) => {
        this.uploadImgOuterHover = true

        e.stopPropagation();
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
    });

    dropZone.addEventListener('dragleave', e => {
      this.uploadImgOuterHover = false
      
      e.stopPropagation();
      e.preventDefault();
      e.dataTransfer.dropEffect = 'copy';
    });

    // Get file data on drop
    dropZone.addEventListener('drop', e => {
        e.stopPropagation();
        e.preventDefault();
        var files = e.dataTransfer.files; // Array of all files

        this.uploadImgOuterHover = false
        
        for (var i=0, file; file=files[i]; i++) {
            if (file.type.match(/image.*/)) {
                var reader = new FileReader();
                
                let img: Image = new Image();

                img.title = file.name
                img.location = ''
                img.date = new Date()

                reader.onload = function(e2: ProgressEvent) {
                  img.loading = false
                  img.url = (<FileReader>event.target).result;

                    // finished reading file data.
                   /* var img = document.createElement('img');
                    img.src = (<FileReader>e2.target).result;
                    document.body.appendChild(img);*/
                }

                reader.readAsDataURL(file); // start reading the file data.
                
                this.uploadedImgs.push(img)
            }
        }
    });
  }

  getMyImgs() {
    this.myImagesLoading = true

    this.imagesService.getAllImages('username') //must be provided real username'
    .subscribe(data => {
        console.log('get data from server!!!', data.data)
        
        if(data.data === 'no photo') {
          this.myImagesLoading = false
          return;          
        }

        //myImages
        this.myImagesLoading = false
        this.myImages = data.data.slice().map(img => 'data:image/jpeg;base64,' + img) // must come real image names from DB

        console.log('My IMages are::', this.myImages)
    }, error => {
        console.log(JSON.stringify(error.json()));
        this.myImagesLoading = false        
    });
  }

  removeUploadedImg(i: number) {
    this.uploadedImgs.splice(i, 1)
  }

  saveUploadedImgs() {
    console.log('save1')
    this.savingImages = true
    this.imagesService.saveImages(this.uploadedImgs, 'username')
      .subscribe(data => {
          console.log('data from server!!!', data)
          this.savingImages = false
          this.imagesSaved = true

          setTimeout(() => {
            this.imagesSaved = false
          }, 2000)

          this.getMyImgs()
      }, error => {
          console.log(JSON.stringify(error.json()));
          this.savingImages = false
      });

  }

  onChange(event: any, input: any) {
    console.log('event itself:', event)
    let files = [].slice.call(event.target.files);

    console.log('changed files:', files)

    let newImgs = files.map((file) => {
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

    this.uploadedImgs = this.uploadedImgs.concat(newImgs)

    console.log('uploadedImgs:', this.uploadedImgs)
  }

}
