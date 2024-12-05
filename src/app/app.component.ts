import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterOutlet } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr'; // Optional for toast notification
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule,ToastrModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [ToastrService]
})
export class AppComponent {
  title = 'beautiful-OTP-verification';
  emailMobile: string = '';
  otp: string = '';
  otpSectionVisible: boolean = false; // Flag to control OTP input section

  constructor(private toastr: ToastrService) { }

  onSubmit() {
    // Simulate OTP send action
    this.toastr.success('OTP has been sent successfully!', 'Success');
    
    // Show OTP input section with smooth transition
    this.otpSectionVisible = true;
  }

  submitOtp() {
    // Simulate OTP submission action
    if (this.otp) {
      this.toastr.success('OTP verified successfully!', 'Success');
    } else {
      this.toastr.error('Please enter a valid OTP.', 'Error');
    }
  }
}
