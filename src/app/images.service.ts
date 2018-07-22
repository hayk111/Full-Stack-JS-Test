import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
import 'rxjs/add/operator/map'

@Injectable()
export class ImagesService {

  constructor(private http: Http) { }

  saveImages(data: any, username: string) {
    console.log('save2')
    
    console.log('data:', data, 'username:', username)
  }

}
