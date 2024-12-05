import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private http: HttpClient) { }
  requestOTP(mobile:string){
    const payload = {phone: mobile};
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' }); 
    return this.http.post(`https://twilio-otp-backend-with-redis.onrender.com/generateOTP`, payload, { headers })
  }
  verifyOTP(mobile:string, otp:string) {
    const payload = {phone: mobile, otp:otp};
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' }); 
    return this.http.post(`https://twilio-otp-backend-with-redis.onrender.com/verifyOTP`, payload, {headers} );
  }
}
