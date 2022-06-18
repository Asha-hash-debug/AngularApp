import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { AuthService } from '../auth.service';
import { DashboardService } from './dashboard.service';
import * as alertyfy from 'alertifyjs'
import { Router } from '@angular/router';

@Component({
  selector: 'app-meraki',
  templateUrl: './meraki.component.html',
  styleUrls: ['./meraki.component.css']
})
export class MerakiComponent implements OnInit {
  
  OrganizationName:any;
  NetworkName:any;
  organizations:any;
  networks:any;
  selectedOrg:any;
  selectedNetwork:any;
  Steps=[" 1. Modifying SD-WAN Uplink Bandwidth Limits of WAN1 and WAN2"," 2. Modifying SD-WAN's Global Bandwidth Limit i.e Per-Client-Limit"," 3. Modifying Wireless Corporate SSID's Per Client Bandwidth Limit to 5Mbps"]
  selectedSteps!:string[];
  step1:any="processing";
  step2:any="processing";
  step3:any="processing";
  step3a:any="processing";
  step3b:any="processing";
  step3c:any="processing";
  step4:any="processing";

  toppings = this._formBuilder.group({
    Step1: false,
    Step2: false,
    Step3: false,
  });
  ECMSNetworks: any =[];

  constructor(private dashboardservice:DashboardService,private _router:Router,
    private _formBuilder: FormBuilder){}

  ngOnInit(): void {
    console.log("Welcome to Configure Lab1 ")
    this.dashboardservice.getOrganization().subscribe(response =>{

    this.organizations = response;
    console.log(this.organizations)
    this.selectedOrg = "--Select Organization-"
    console.log(this.toppings.value) }
    )
    this.selectedSteps = new Array<string>();
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

Step1(OrganizationName:any){
  for (let network of this.selectedNetwork){
    console.log(network)
    this.dashboardservice.NetworkDown(OrganizationName,network).subscribe(response => {
    this.step1 = response;
    console.log(this.step1);
    if (this.step1==true){alertyfy.success(`Step 1 successfully completed for `+network +`  network`,40)}else{alertyfy.error(`Step 1 Failed for  `+network +`  network`,40)}
  })
}
}

Step2(val1:any,val2:any){
  for (let network of this.selectedNetwork){
    this.dashboardservice.OfflineDevice(this.OrganizationName,network).subscribe(response => {
    this.step2 = response;
    console.log(this.step2);
    if (this.step2==true){alertyfy.success(`Step 2 successfully completed for `+network +`  network`,40)}else{alertyfy.error(`Step 2 Failed for  `+network +`  network`,40)}
  })

}
}

Getsteps(e:any,step:string){
    if(e.target.checked)
    {
      console.log(step + 'Checked');
      this.selectedSteps.push(step);
    }
    else
    {
      console.log(step + 'Unchecked');
      this.selectedSteps = this.selectedSteps.filter(m=>m!=step);
    }

    console.log(this.selectedSteps)
}


Step3(val1:any,val2:any){
 
  if (this.selectedSteps.includes(" 1. Modifying SD-WAN Uplink Bandwidth Limits of WAN1 and WAN2")){
    for (let network of this.selectedNetwork){
      this.dashboardservice.Step1(this.OrganizationName,network).subscribe(response => {
      this.step3a = response;
      console.log(this.step3a);
      if (this.step3a==true){alertyfy.success(`Step 3a successfully completed for `+network +`  network`,40)}else{alertyfy.error(`Step 3a Failed for  `+network +`  network`,40)}
  })
}
}

if (this.selectedSteps.includes(" 2. Modifying SD-WAN's Global Bandwidth Limit i.e Per-Client-Limit")){
  for (let network of this.selectedNetwork){
      this.dashboardservice.Step2(this.OrganizationName,network).subscribe(response => {
      this.step3b = response;
      console.log(this.step3b);
      if (this.step3b==true){alertyfy.success(`Step 3b successfully completed for `+network +`  network`,40)}else{alertyfy.error(`Step 3b Failed for  `+network +`  network`,40)}
    })
  }
}

if (this.selectedSteps.includes(" 3. Modifying Wireless Corporate SSID's Per Client Bandwidth Limit to 5Mbps")){
  for (let network of this.selectedNetwork){
    this.dashboardservice.Step3(this.OrganizationName,network).subscribe(response => {
      this.step3c = response;
      console.log(this.step3c);
      if (this.step3c==true){alertyfy.success(`Step 3c successfully completed for `+network +`  network`,40)}else{alertyfy.error(`Step 3c Failed for  `+network +`  network`,40)}
    })
  }
}
}


Step4(val1:any,val2:any){
  for (let network of this.selectedNetwork){
    this.dashboardservice.WirelessReconfiguration(this.OrganizationName,network).subscribe(response => {
    this.step4 = response;
    console.log(this.step4);
    if (this.step4==true){alertyfy.success(`Step 4 successfully completed for `+network +`  network`,40)}else{alertyfy.error(`Step 4 Failed for  `+network +`  network`,40)}
  })
}
}
 
Reset(){
  this._router.navigate(['/meraki'])
  .then(() => {
    window.location.reload();
  });
  
} 
}