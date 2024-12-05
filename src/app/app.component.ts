import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterOutlet } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr'; // Optional for toast notification
import { CommonModule } from '@angular/common';
import { ApiServiceService } from './api-service.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
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

  constructor(private toastr: ToastrService,private apiService: ApiServiceService,private http: HttpClient ) { }

  onSubmit() {
      if(this.mobile){
        this.apiService.requestOTP(this.mobile).subscribe({
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
    if(this.mobile && this.otp){
      this.apiService.verifyOTP(this.mobile, this.otp).subscribe({
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
