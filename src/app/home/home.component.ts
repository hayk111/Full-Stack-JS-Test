import { Component, OnInit } from '@angular/core';
import { ImagesComponent } from '../images/images.component'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  
})
export class HomeComponent implements OnInit {
  isLoggedIn: boolean;

  constructor() { }

  ngOnInit() {
    this.isLoggedIn = false
  }

  logIn(username: string, password: string) {
    console.log('username', username)
    console.log('password', password)
    
    if(username && password) 
      this.isLoggedIn = true
    else
      alert('Please input both username and password')  
  }

}
