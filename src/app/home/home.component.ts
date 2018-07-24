import { Component, OnInit } from '@angular/core';
import { ImagesComponent } from '../images/images.component'
import { HomeService } from '../home.service'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  
})
export class HomeComponent implements OnInit {
  isLoggedIn: boolean = false;
  register: boolean = false;

  constructor(private homeService: HomeService) { }

  ngOnInit() {
    if(sessionStorage.getItem('username'))
      this.isLoggedIn = true
  }

  goRegister() {
    this.register = true
  }

  goLogin() {
    this.register = false
  }

  signUp(username: string, password: string) {
    if(username && password) {
      this.homeService.register(username, password)
        .subscribe(data => {
          if(data.status === 'exists') {
            alert('User with this username exists.')
          }
          else
            alert('User created. Go to login page and log in.')
        }, error => {
          if(error.json().status === 'exists')
            alert('User with this username exists.')
        })
      } else 
          alert('Please input both username and password')  
  }

  logIn(username: string, password: string) {
    if(username && password) {
      this.homeService.login(username, password)
        .subscribe(data => {
          if(data.status === 'invalid_creds')
            alert('Invalid username or password.')
          else {
            this.isLoggedIn = true
            sessionStorage.setItem('username', username)
          }
        }, error => {
          console.log(JSON.stringify(error.json()));
        })
    }
    else
      alert('Please input both username and password')  
  }

}
