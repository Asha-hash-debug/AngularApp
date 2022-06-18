import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConsultingServiceService } from '../Services/consulting-service.service';

@Component({
  selector: 'app-consulting-service',
  templateUrl: './consulting-service.component.html',
  styleUrls: ['./consulting-service.component.css']
})
export class ConsultingServiceComponent implements OnInit {
  consultingserviceList:any=[];
  subscription: any;
  Name: string | null | undefined;
  constructor(private consultingservice:ConsultingServiceService,
    private activeRoute:ActivatedRoute) { 

    this.subscription = this.activeRoute.paramMap
    .subscribe(params => {
        this.Name = params.get('ProductName');
    })
  }

  ngOnInit(): void {
    this.subscription = this.activeRoute.paramMap
    .subscribe(params => {
        this.Name = params.get('ProductName');
        console.log(this.Name)
    })
    this.consultingservice.GetService().subscribe(result=>this.consultingserviceList=result)
  }


}
