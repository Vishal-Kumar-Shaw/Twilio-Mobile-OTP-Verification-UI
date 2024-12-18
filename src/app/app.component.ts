import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterOutlet } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr'; // Optional for toast notification
import { CommonModule } from '@angular/common';
import { ApiServiceService } from './api-service.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { countries, IcountryCode } from '../data/countryCode';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule,ToastrModule, FormsModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [ToastrService, ApiServiceService, HttpClient]
})
export class AppComponent {
  title = 'beautiful-OTP-verification';
  mobile: string = '';
  otp: string = '';
  otpSectionVisible: boolean = false; // Flag to control OTP input section
  isTimerRunning: boolean = false;
  countdown: number = 0;
  selectedCountry: string = '+91';
  countries:IcountryCode[] = countries;

  constructor(private toastr: ToastrService,private apiService: ApiServiceService,private http: HttpClient ) { }
  private startTimer(counter:number){
    this.isTimerRunning = true;
    this.countdown = counter;

    const interval = setInterval(() => {
        this.countdown--;
        if(this.countdown<=0){
          clearInterval(interval);
          this.isTimerRunning = false;
        }
    }, 1000)
  }
  onSubmit() {
      if(this.mobile && this.selectedCountry){
        this.isTimerRunning=true;
        this.startTimer(30);
        this.apiService.requestOTP(`${this.selectedCountry}${this.mobile}`).subscribe({
          next: (response) =>{
            console.log('OTP sent successfully', response);
            this.otpSectionVisible = true;
           
          },
          error: (err) =>{
            console.error('Error Sending OTP', err);
            alert('Failed to send OTP. Please try again')
          }
        })
      }
  }

  submitOtp() {
    // Simulate OTP submission action
    if(this.selectedCountry && this.mobile && this.otp){
      this.apiService.verifyOTP(this.selectedCountry+this.mobile, this.otp).subscribe({
        next: (response) =>{
          console.log("OTP Verified Successfully", response);
        },
        error: (error)=>{
          console.log("Some Error occured", error);
        }
      })
    }
  }
}
