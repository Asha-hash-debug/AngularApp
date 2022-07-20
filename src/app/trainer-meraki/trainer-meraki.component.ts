import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { AuthService } from '../auth.service';
import { DashboardService } from '../meraki/dashboard.service';
import * as alertyfy from 'alertifyjs'
import { Router } from '@angular/router';


@Component({
  selector: 'app-trainer-meraki',
  templateUrl: './trainer-meraki.component.html',
  styleUrls: ['./trainer-meraki.component.css']
})
export class TrainerMerakiComponent implements OnInit {

  OrganizationName:any;
  NetworkName:any;
  organizations:any;
  networks:any;
  selectedOrg:any;
  selectedNetwork:any;
  ECMSNetworks:any=[];
  Step1:any="processing";
  Step2:any="processing";
  Step3:any="processing";
  Step3a:any="processing";
  Step3b:any="processing";
  Step3c:any="processing";
  Step4:any="processing";

  constructor(private dashboardservice:DashboardService,private _router:Router,
    private _formBuilder: UntypedFormBuilder){}

  ngOnInit(): void {
    console.log("Welcome to Configure Lab1 ")
    this.dashboardservice.getOrganization().subscribe(response =>{

    this.organizations = response;
    console.log(this.organizations)
    this.selectedOrg = "--Select Organization-"

     })
    
  }
  
  OrganizationSelected(val:any){

      this.OrganizationName = val;
      this.dashboardservice.getNetworks(val).subscribe(response => {
        this.networks = response;
        console.log(this.networks)
        for (let network of this.networks){ 
          if (network.includes('ECMS')){
            this.ECMSNetworks.push(network)
          }
        }
        console.log(this.ECMSNetworks)
      })
  }

  NetworkSelected(val:any){
    this.NetworkName = val;
    console.log(this.selectedNetwork)
}


ConfigureLab3(val1:any,val2:any){


  setTimeout(() => {
     
    for (let network of this.selectedNetwork){
      this.dashboardservice.NetworkDown(this.OrganizationName,network).subscribe(response => {
      this.Step1 = response;
      console.log(this.Step1);
      if (this.Step1==true){alertyfy.success(`Step 1 successfully completed for `+network +`  network`,20)}else{alertyfy.error(`Step 1 Failed for  `+network +`  network`,20)}
    })
  }
  }, 15000)

 
  setTimeout(() => {

    for (let network of this.selectedNetwork){
        this.dashboardservice.OfflineDevice(this.OrganizationName,network).subscribe(response => {
        this.Step2 = response;
        console.log(this.Step2);
        if (this.Step2==true){alertyfy.success(`Step 2 successfully completed for `+network +`  network`,20)}else{alertyfy.error(`Step 2 Failed for  `+network +`  network due to Device has not present in network`,20)}
      })
  }
  }, 40000)

  setTimeout(() => {
    for (let network of this.selectedNetwork){
        this.dashboardservice.Step1(this.OrganizationName,network).subscribe(response => {
        this.Step3a = response;
        console.log(this.Step3a);
        if (this.Step3a==true){alertyfy.success(`Step 3a successfully completed for `+network +`  network`,20)}else{alertyfy.error(`Step 3a Failed for  `+network +`  network`,20)}
      })
    }
  }, 65000)
  
  setTimeout(() => {
    for (let network of this.selectedNetwork){
        this.dashboardservice.Step2(this.OrganizationName,network).subscribe(response => {
        this.Step3b = response;
        console.log(this.Step3b);
        if (this.Step3b==true){alertyfy.success(`Step 3b successfully completed for `+network +`  network`,20)}else{alertyfy.error(`Step 3b Failed for  `+network +`  network`,20)}
      })
    }
  }, 90000)
  

  setTimeout(() => {
    for (let network of this.selectedNetwork){
        this.dashboardservice.Step3(this.OrganizationName,network).subscribe(response => {
        this.Step3c = response;
        console.log(this.Step3c);
        if (this.Step3c==true){alertyfy.success(`Step 3c successfully completed for `+network +`  network`,20)}else{alertyfy.error(`Step 3c Failed for  `+network +`  network due to SSID of name Corporate has not present`,20)}
      })
    }
  }, 115000)
  
  setTimeout(() => {
    for (let network of this.selectedNetwork){
        this.dashboardservice.WirelessReconfiguration(this.OrganizationName,network).subscribe(response => {
        this.Step4 = response;
        console.log(this.Step4);
        if (this.Step4==true){alertyfy.success(`Step 4 successfully completed for `+network +`  network`,20)}else{alertyfy.error(`Step 4 Failed for  `+network +`  network due to Device absence`,20)}
      })
    }
  }, 140000)
  
  
  setTimeout(() => {
      if (this.Step3a==true && this.Step3b==true && this.Step3c==true){
        this.Step3=true;
      }else{
        this.Step3=false;
      }
  }, 142000)

}

Reset(){
  this._router.navigate(['/trainermeraki'], { skipLocationChange: true })
  .then(() => {
    window.location.reload();
  });
  
} 
}
