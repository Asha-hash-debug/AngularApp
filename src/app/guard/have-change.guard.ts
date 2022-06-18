import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserComponent } from '../user/user.component';

@Injectable({
  providedIn: 'root'
})
export class HaveChangeGuard implements CanDeactivate<UserComponent> {
  canDeactivate(
    component: UserComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return component.Changes();
  }
  
}
