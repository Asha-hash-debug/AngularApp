import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormControl, UntypedFormGroup, ValidationErrors, Validators } from '@angular/forms';
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
  registerationForm!: UntypedFormGroup;
  route: any;
  userSubmitted: boolean = false;

  constructor(private userservice:UserService,
    private router:Router) { }

  ngOnInit(): void {
    this.registerationForm = new UntypedFormGroup({
      UserName:new UntypedFormControl(null,Validators.required),
      Role:new UntypedFormControl(null,Validators.required),
      Email:new UntypedFormControl(null, [Validators.required, Validators.email]),
      Password: new UntypedFormControl(null, [Validators.required, Validators.minLength(8)]),
      ConfirmPassword: new UntypedFormControl(null, [Validators.required]),
      Contact: new UntypedFormControl(null, [Validators.required, Validators.maxLength(10)])
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
        this.router.navigate(["/login"], { skipLocationChange: true , replaceUrl: false })
  }else{
    alertfy.error('Kindly provide the reguired fields');
  }

}

onReset(): void{
  this.userSubmitted=false;
  this.registerationForm.reset();
}

  get UserName() {
      return this.registerationForm.get('UserName') as UntypedFormControl;
  }

  get Role() {
    return this.registerationForm.get('Role') as UntypedFormControl;
}  

  get Email() {
    return this.registerationForm.get('Email') as UntypedFormControl;
  }

  get Password() {
      return this.registerationForm.get('Password') as UntypedFormControl;
    }
  
  get ConfirmPassword() {
      return this.registerationForm.get('ConfirmPassword') as UntypedFormControl;
    }
  
  get Contact() {
      return this.registerationForm.get('Contact') as UntypedFormControl;
    }

}
