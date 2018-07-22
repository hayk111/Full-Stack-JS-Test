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

  logIn() {
    this.isLoggedIn = true
  }

}
