import { Component, OnInit } from '@angular/core';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  faLock = faLock;
  email = ""

  constructor(private authService: AuthService) {

  }

  ngOnInit(): void {
  }

  submit() {
    this.authService.resetPassword(this.email).subscribe()

  }
}
