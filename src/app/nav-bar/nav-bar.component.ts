import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as alertyfy from 'alertifyjs'

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  title = "Bitvuenetworks";
  LoginUser:any;
  UserList: any;
  LoginRole: any;

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  loggedin(){
    if (localStorage.getItem('Users')){
      this.UserList = JSON.parse(localStorage.getItem('Users')||'{}');
      this.LoginUser = this.UserList[0]['Email']
      return (this.LoginUser)
      
    }else{
      return false
    }
  }

  CheckRole(){
    this.LoginRole = JSON.parse(localStorage.getItem('Role')||'{}')
      if (this.LoginRole["Role"]=="Admin"){
        return true;
      }else{
      return false
     }
  }

  onLogout(){
    localStorage.removeItem('Users');
    localStorage.removeItem('Role');
    alertyfy.success("LogOut Successful")
    this.router.navigate(["home"], { skipLocationChange: true })
  }

}
