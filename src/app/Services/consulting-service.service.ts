import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConsultingServiceService {

  constructor(private http:HttpClient) { }

  baseUrl = "api/users/consultingservices.json"

  GetService(){
    return this.http.get(this.baseUrl)
  }
}
