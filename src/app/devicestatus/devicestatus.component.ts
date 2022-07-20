import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../meraki/dashboard.service';
import * as alertyfy from 'alertifyjs'
import { Router } from '@angular/router';
import { UntypedFormControl } from '@angular/forms';
import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-devicestatus',
  templateUrl: './devicestatus.component.html',
  styleUrls: ['./devicestatus.component.css']
})
export class DevicestatusComponent implements OnInit {
  organizations:any;
  selectedOrg:any;
  OrganizationName:any;
  NetworkName:any;
  networks:any;
  selectedNetwork:any;
  OfflineDevices:any=[];
  TotalNetworkDevices:any=[];
  ErrorList:string[]=[];
  username: string = '';
  selectedSteps!:string[];
  organizationList = new UntypedFormControl('');
  NetworkList = new UntypedFormControl('');
  subscription !: Subscription;
  status:any;

  constructor(private dashboardservice:DashboardService,
    private router:Router) { }

  ngOnInit(): void {
    
    console.log("Welcome to Configure Lab1 ")
    this.dashboardservice.getOrganization().subscribe(response =>{

    this.organizations = response;
    console.log(this.organizations);
    this.selectedOrg = "";
    this.selectedSteps = new Array<string>();
    })

  }

  OrganizationSelected(val:any){

    this.OrganizationName = val;
    console.log(this.OrganizationName)
    this.dashboardservice.getNetworks(val).subscribe(response => {
      this.networks = response;
      console.log(this.networks)})


}

NetworkSelected(val:any){
  this.NetworkName = val;
  console.log(this.selectedNetwork);

}


clickme(OrganizationName:any,networkList:any){
  this.status=true;
  for (let network of this.selectedNetwork){
    this.subscription = timer(0, 50000).pipe(
      switchMap(() => this.dashboardservice.DeviceStatus(OrganizationName,network))
    ).subscribe(response => {
           this.OfflineDevices = response 
           console.log(this.OfflineDevices)

           for(let device of this.OfflineDevices){
            alertyfy.error(device+` is not present in `+network,30);
           } 
            // this.TotalNetworkDevices.push({
            //   'key':network,
            //   'value':this.OfflineDevices
            // })
            // console.log(this.TotalNetworkDevices)  
          })     
    }
    
  }

  Reset(){
    this.status=false;
    // this.selectedOrg=null;
    // console.log(this.selectedOrg)
    // this.selectedNetwork=null;
    // console.log(this.selectedNetwork)
    // this.networks=null
    // console.log(this.networks)
    this.subscription.unsubscribe();
    setTimeout(() => {
      this.router.navigate(['/devicestatus'], { skipLocationChange: true })
      .then(() => {
        window.location.reload();
      });
  }, 10000)
    
  }
 
}

