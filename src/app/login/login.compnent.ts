import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,FormArray,FormBuilder, EmailValidator } from '@angular/forms';
import { Validators } from '@angular/forms';
import { UserService } from '../users/user.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import * as alertyfy from 'alertifyjs'
import { IUser } from '../users/users';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  profileForm = new FormGroup({
    Email: new FormControl('',Validators.required),
    Password: new FormControl('',Validators.required),
  });
  user:any={};
  error: any;
  Warning: any;
  is_login:boolean=false;
  userSubmitted: boolean = false;
  users:IUser[]=[];
  errorMessage: string="";
  Role: any;

  constructor(
    private route:Router,
    private usersService:UserService,
    private authservice:AuthService) { }

  ngOnInit(): void {
      
  }
  postdata(forms:any){
    // console.log(">>>>>",this.angForm.value)
    this.usersService.LoginUser(

      this.profileForm.value.Email,
      this.profileForm.value.Password,
      
    ).
    pipe(first()).subscribe(data => {
      this.is_login=true;
      alertyfy.success("Login Successful")
      this.userSubmitted=true;
      if (this.profileForm.valid){
        this.user = Object.assign(this.user,this.profileForm.value);
        this.authservice.addUser(this.user);
        this.authservice.GetUser(this.user).subscribe({
          next:user=>{
              this.users = user;
          },
          error:err=>this.errorMessage=err
          
      });

        this.profileForm.reset();
        this.userSubmitted=false;
        this.route.navigate(['']);
    }
  },


    (err) => {
      this.error= err;
      console.log(this.error)
      if (this.error){
        console.log("Error")
        this.Warning = " Warning : InCorrect Email address or Password.....Check once";
        alertyfy.error(this.Warning);
        this.profileForm.get("Email")?.setValue("")
        this.profileForm.get("Password")?.setValue("")
      }
   });
  }

  onReset(){
    this.profileForm.reset()
  }

}



