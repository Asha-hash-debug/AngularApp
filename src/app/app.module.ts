import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import { Routes,RouterModule } from '@angular/router';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.compnent';
import { WrongURLComponent } from './wrong-url/wrong-url.component';
import { UserComponent } from './user/user.component';
import { MainUsersComponent } from './main-users/main-users.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RegisterComponent } from './register/register.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AuthGuard } from './guard/auth.guard';
import { ConsultingServiceComponent } from './consulting-service/consulting-service.component';
import { RoleGuard } from './guard/role.guard';
import { HaveChangeGuard } from './guard/have-change.guard';
import { MerakiComponent } from './meraki/meraki.component';
import { MaterialModule } from './material/material.module';
import { DashboardService } from './meraki/dashboard.service';
import { DevicestatusComponent } from './devicestatus/devicestatus.component';
import { DecimalPipe } from '@angular/common';
import { TrainerMerakiComponent } from './trainer-meraki/trainer-meraki.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    HomeComponent,
    LoginComponent,
    WrongURLComponent,
    UserComponent,
    MainUsersComponent,
    NavBarComponent,
    RegisterComponent,
    ConsultingServiceComponent,
    MerakiComponent,
    DevicestatusComponent,
    TrainerMerakiComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path:'login',component:LoginComponent},
      {path:'register',component:RegisterComponent},
      {path:'',component:HomeComponent},
      {path:'consulting-service/:ProductName',component:ConsultingServiceComponent},
      // {path:'users',component:MainUsersComponent},
      {path:'users',component:UsersComponent,canActivate:[RoleGuard],},
      {path:'users/Edit/:id',component:UserComponent,canDeactivate:[HaveChangeGuard]},
      {path:'home',component:HomeComponent},
      {path:'meraki',component:MerakiComponent},
      {path:'trainermeraki',component:TrainerMerakiComponent},
      {path:'devicestatus',component:DevicestatusComponent},
      {path:'**',component:WrongURLComponent},
      
    ], { initialNavigation:'disabled' }
    ),
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    BsDropdownModule.forRoot()
    ],
  providers: [DashboardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
