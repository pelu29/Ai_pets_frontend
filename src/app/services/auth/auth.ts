import { Injectable } from '@angular/core';

const AUTH_KEY = 'panel_auth_v1';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // Credenciales predeterminadas
  readonly defaultEmail = 'admin@admin.com';
  readonly defaultPassword = 'admin123';

  login(email: string, password: string): boolean {
    if (email === this.defaultEmail && password === this.defaultPassword) {
      localStorage.setItem(AUTH_KEY, JSON.stringify({ email }));
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem(AUTH_KEY);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(AUTH_KEY);
  }

  getUserEmail(): string | null {
    const raw = localStorage.getItem(AUTH_KEY);
    if (!raw) return null;
    try { return JSON.parse(raw).email; } catch { return null; }
  }
}
