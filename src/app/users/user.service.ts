import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map, tap } from 'rxjs/operators';
import { IUser } from "./users";

@Injectable({
    providedIn:'root'
})
export class UserService{
    private baseUrl = 'http://127.0.0.1:5000/';
    
    constructor(private http:HttpClient){}

    getUsers():Observable<IUser[]> {
        return this.http.get<IUser[]>(this.baseUrl+'users').pipe(
            tap(data=>console.log('All',JSON.stringify(data))),
            catchError(this.handleError)
        );
    }
    
    public AddUser(UserName:any,Role:any,Email:any,Password:any,Contact:any){
      return this.http.post<IUser[]>(this.baseUrl+'users',{UserName,Role,Email,Password,Contact}).subscribe(res=>Response),
      catchError(this.handleError);
    }

    public getUserById(id:number){
      return this.http.get<IUser[]>(this.baseUrl+'user/'+id);
   }
 
   public updateUser(users:any){
     console.log('AA'+users.id)
     let UsernotFound = 1;
     return this.http.put<IUser[]>(this.baseUrl+'user/'+users.id,users);
   }

   public deleteUser(id:any){
    return this.http.delete(this.baseUrl+'user/'+id);
  }

    LoginUser(Email:any,Password:any){
        return this.http.post<IUser[]>(this.baseUrl+'login',{Email,Password});}

    private handleError(err: HttpErrorResponse): Observable<never> {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          errorMessage = `An error occurred: ${err.error.message}`;
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
      }
}