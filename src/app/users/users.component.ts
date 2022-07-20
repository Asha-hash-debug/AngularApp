import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { IUser } from "./users";
import { UserService } from "./user.service";
import { Router } from "@angular/router";
import * as alertyfy from 'alertifyjs'

@Component({
    selector:'bv-users',
    templateUrl:'./users.component.html',
    styleUrls:['./users.component.css']
})

export class UsersComponent implements OnInit,OnDestroy{
    pageTitle = "USERS-LIST";
    imageWidth=55;
    imageMargin=3;
    showImage:boolean=false;
    errorMessage: string="";
    sub!:Subscription      
    router: any;
    
    toogleImage(): void{
        this.showImage = !this.showImage;

    }

    private _listFilter:string="";

    get listFilter():string {
        return this._listFilter;
    }

    set listFilter(value:string){
        this._listFilter = value;
        console.log('In setter:',value);
        this.filteredUsers = this.performFilter(value);
        console.log(this.filteredUsers)
        
    }

    users:IUser[]=[];
    
    filteredUsers: IUser[]=[];
    performFilter(filterBy:string): IUser[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.users.filter((user:IUser) =>
         user.UserName.toLocaleLowerCase().includes(filterBy));

    }
    constructor(private userService:UserService,
        private _router:Router){}

    ngOnInit(): void {
        this.sub = this.userService.getUsers().subscribe({
            next:users=>{
                this.users = users;
                this.filteredUsers = this.users;
            },
            error:err=>this.errorMessage=err
        });
        
        console.log(this.users);
        this.listFilter = "";  
    }

    deletesUser(user_id:any): void {
        if(confirm("Do you Want to Delete?")){

            this.userService.deleteUser(user_id)
            .subscribe(data=> {
            this.users = this.users.filter((u: any) => u !== user_id);
            alertyfy.success("Deleted succesfully")
            setTimeout(() => {
                this._router.navigate(['/users'], { skipLocationChange: true })
                .then(() => {
                window.location.reload();
            }); 
            }, 1000)
        
        });
      }
    }

      ngOnDestroy(): void {
        this.sub.unsubscribe(); 
    }

}
