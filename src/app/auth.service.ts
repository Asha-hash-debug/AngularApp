import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { UserService } from './users/user.service';
import { IUser } from './users/users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://127.0.0.1:5000/';
  
  LoginRole:any;
  constructor(private userService:UserService,
    private http:HttpClient,
    private router:Router) { }

  addUser(user: any){
    let users = [];
    if (localStorage.getItem('Users')){
      users = JSON.parse(localStorage.getItem('Users')||'{}');
      users = [user,...users];
    }else{
      users=[user];
    }
    localStorage.setItem('Users',JSON.stringify(users));
  }

  Role() {
      this.LoginRole = JSON.parse(localStorage.getItem('Role')||'{}')
      if (this.LoginRole["Role"]=="Admin"){
        return true;
      }else{
        this.router.navigate(["/login"])
        return false;
      }
  }
  
  GetUser(user:any):Observable<IUser[]> {
    return this.http.get<IUser[]>(this.baseUrl+'user/'+user.Email).pipe(
        tap(data=>localStorage.setItem('Role',JSON.stringify(data))),
    );
}

  isLoggedin(){
    return localStorage.getItem('Users')
  }
}
