import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './Interfaces';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private baseurl = "/"

  constructor(private http:HttpClient) { }

public getOrganization(): Observable<User> {
    return this.http.get<any>(this.baseurl+"Organizations");
}

public getNetworks(network:any): Observable<User> {
     return this.http.get<any>(this.baseurl+"Networks/"+network);
}

public NetworkDown(organization:any,network:any): Observable<User> {
  return this.http.get<any>(this.baseurl+"meraki/"+organization+"/"+network+"/"+"NetworkDown")

}

public OfflineDevice(organization:any,network:any): Observable<User> {
  return this.http.get<any>(this.baseurl+"meraki/"+organization+"/"+network+"/"+"OfflineDevice")

}

public Step1(organization:any,network:any):Observable<User>{
  return this.http.get<any>(this.baseurl+"meraki/"+organization+"/"+network+"/"+"Step1")
}

public Step2(organization:any,network:any):Observable<User>{
  return this.http.get<any>(this.baseurl+"meraki/"+organization+"/"+network+"/"+"Step2")
}

public Step3(organization:any,network:any):Observable<User>{
  return this.http.get<any>(this.baseurl+"meraki/"+organization+"/"+network+"/"+"Step3")
}

public WirelessReconfiguration(organization:any,network:any):Observable<User> {
  return this.http.get<any>(this.baseurl+"meraki/"+organization+"/"+network+"/"+"WirelessReconfiguration")
}

public DeviceStatus(organization:any,network:any):Observable<User> {
  return this.http.get<any>(this.baseurl+"meraki/"+organization+"/"+network+"/"+"DeviceStatus")
}

}
