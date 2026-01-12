import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth';

@Component({
  selector: 'app-login-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-panel.html',
  styleUrl: './login-panel.css',
})
export class LoginPanel {
  email = '';
  password = '';
  errorMessage: string | null = null;

  constructor(private auth: AuthService, private router: Router) {
    // si ya está logueado, redirigir al panel
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/panel']);
    }
  }

  submit() {
    this.errorMessage = null;
    const ok = this.auth.login(this.email.trim(), this.password);
    if (!ok) {
      this.errorMessage = 'Correo o contraseña incorrectos';
      return;
    }
    // éxito
    this.router.navigate(['/panel']);
  }
}
