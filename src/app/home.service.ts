import { Injectable } from '@angular/core';

import { Http } from '@angular/http'
import 'rxjs/add/operator/map'

@Injectable()
export class HomeService {

  constructor(private http: Http) { }

  register(username: string, password: string) {
    return this.http
        .post('/api/register', {username, password})
        .map(res => res.json());  
  }

  login(username: string, password: string) {
    return this.http
        .post('/api/login', {username, password})
        .map(res => res.json());  
  }

}
