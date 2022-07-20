import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../users/user.service';

@Component({
  selector: 'bv-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  angForm : UntypedFormGroup
  error: any;
  subscription: any;
  id: any;
  user: any;
  success: any;
  UsernotFound=1;
  is_changed=false;
  UserNameChange="";

  constructor(
    private fb: UntypedFormBuilder,
    private route:Router,
    private userService:UserService,
    private activeRoute:ActivatedRoute
  ){

    this.angForm = this.fb.group({
      id: [''],
      UserName: ['',Validators.required],
      Role: ['',Validators.required],
      Email: ['',[Validators.required,Validators.email]],
      Password: ['',[Validators.required, Validators.minLength(8)]],
      Contact:['',[Validators.required,Validators.maxLength(10)]],
    });

    this.subscription = this.activeRoute.paramMap
    .subscribe(params => {
        this.id = params.get('id');
    })
  }

  ngOnInit(): void {
     this.getSingleUser(this.id);
     this.UserNameChange="";
   
  }

   getSingleUser(id:any): void{
       this.userService.getUserById(id).subscribe(
    (res:any) => {
      this.user = res;
      console.log(res);
      this.angForm.patchValue(this.user)          // this will automatically fill values.
      console.log(this.user);
    },
    (err) => {
      this.error= err;
      console.log(this.error)
      if (this.error){
        this.UsernotFound = 0;
        console.log(this.UsernotFound);
      }
    }
  );
}  

textname(name:any){
  if (name!=this.user.UserName){
    console.log(name);
    console.log(this.user.UserName);
     this.is_changed=true;
  }else{
    this.is_changed=false;
  }
}

Changes(){
  if(this.is_changed){
    if(confirm("You have not saved data...Want to proceed?")){
      return true;
    }else{
      return false;
    }
  }else{
    return true;
  }
}

editData(f:any){
      console.log(this.UsernotFound)
      console.log(f.value)
      console.log(f.value.UserName)
      if (f.valid){
        this.userService.updateUser(f.value)
          .subscribe(
            (res:any) => {
              this.user = res;
              this.success = 'Updated Successfully';
              this.route.navigate(['users']);
              // Reset the form;
              f.reset();
            },
            (err:any) => this.error = err
          );
    }}



  GotoUsers(){
    this.route.navigate(['users'])
    
  }

  get UserName() {
    return this.angForm.get('UserName') as UntypedFormControl;
}

get Role() {
  return this.angForm.get('Role') as UntypedFormControl;
}  

get Email() {
  return this.angForm.get('Email') as UntypedFormControl;
}

get Password() {
    return this.angForm.get('Password') as UntypedFormControl;
  }

get Contact() {
    return this.angForm.get('Contact') as UntypedFormControl;
  }
}