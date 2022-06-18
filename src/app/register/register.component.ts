import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { UserService } from '../users/user.service';
import * as alertfy from 'alertifyjs';
import { resetFakeAsyncZone } from '@angular/core/testing';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerationForm!: FormGroup;
  route: any;
  userSubmitted: boolean = false;

  constructor(private userservice:UserService,
    private router:Router) { }

  ngOnInit(): void {
    this.registerationForm = new FormGroup({
      UserName:new FormControl(null,Validators.required),
      Role:new FormControl(null,Validators.required),
      Email:new FormControl(null, [Validators.required, Validators.email]),
      Password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      ConfirmPassword: new FormControl(null, [Validators.required]),
      Contact: new FormControl(null, [Validators.required, Validators.maxLength(10)])
      },this.passwordMatchingValidator);
  }

  passwordMatchingValidator(fc: AbstractControl): ValidationErrors | null {
    return fc.get('Password')?.value === fc.get('ConfirmPassword')?.value ? null :
      { notmatched: true }
  };

  onSubmit() {
    console.log(this.registerationForm); 
    console.log(this.registerationForm.value.UserName);
    this.userSubmitted=true;
    
    if (this.registerationForm.valid){
        this.userservice.AddUser(
          this.registerationForm.value.UserName,
          this.registerationForm.value.Role,
          this.registerationForm.value.Email,
          this.registerationForm.value.Password,
          this.registerationForm.value.Contact)
        
        this.registerationForm.reset();
        this.userSubmitted=false;
        alertfy.success('Congrats,You are successfully registered');
        this.router.navigate(["/login"])
  }else{
    alertfy.error('Kindly provide the reguired fields');
  }

}

onReset(): void{
  this.userSubmitted=false;
  this.registerationForm.reset();
}

  get UserName() {
      return this.registerationForm.get('UserName') as FormControl;
  }

  get Role() {
    return this.registerationForm.get('Role') as FormControl;
}  

  get Email() {
    return this.registerationForm.get('Email') as FormControl;
  }

  get Password() {
      return this.registerationForm.get('Password') as FormControl;
    }
  
  get ConfirmPassword() {
      return this.registerationForm.get('ConfirmPassword') as FormControl;
    }
  
  get Contact() {
      return this.registerationForm.get('Contact') as FormControl;
    }

}