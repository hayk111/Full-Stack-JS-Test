import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
import 'rxjs/add/operator/map'

@Injectable()
export class ImagesService {

  constructor(private http: Http) { }

  saveImages(data: any, username: string) {
    console.log('save2')
    
    console.log('data:', data, 'username:', username)

    return this.http
        .post('/api/images', {data, username})
        .map(res => res.json());
     
  }

  getAllImages(username: string) {
    console.log('getAllImages in service called')
    return this.http.get(`/api/images?username=${username}`)
                    .map(res => res.json());
  }
}
