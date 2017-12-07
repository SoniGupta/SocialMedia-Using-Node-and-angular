import { Component } from '@angular/core';
import { DataService } from '../services';

@Component({
  selector: 'login',
  templateUrl: './LoginPage.component.html'
})
export class LoginPageComponent {

  registerObj={
    "userInfo" : {
      "username": "",
      "password":"",
      "firstname":"",
      "lastname":"",
      "address":"",
      "mobileno":""

    }}
    loginObj={
      loginInfo:{
        email:"",
        password:""
      }

  }
  constructor(private dataService:DataService) {

  }
  ngOnInit() {
    this.dataService.get('getusers/1').subscribe(
      response => {
        if (response) {

        }
      }
    )

  }
  saveUser(){
    console.log(this.registerObj);
    this.dataService.post('users',this.registerObj).subscribe(
      response => {
        console.log(this.registerObj.userInfo);
      }
    )

  }

  login(){
    console.log(this.loginObj);
    this.dataService.post('login',this.loginObj).subscribe(
      response => {
        console.log(this.loginObj);
      }
    )
  }
}
