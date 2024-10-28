import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly USERNAME_KEY = 'username';

  //TODO Ajouter les JWT

  getUsername(): string | null {
    return localStorage.getItem(this.USERNAME_KEY); // for retrieve
  }

  setUsername(username: string) {
    localStorage.setItem(this.USERNAME_KEY, username); // to store
  }

  updateUsername(newUsername: string) {
    this.setUsername(newUsername); // Update name with previous method
  }

  isLoggedIn(): boolean {
    return this.getUsername() !== null; // Checks if user is logged in
  }

  logout() {
    localStorage.removeItem(this.USERNAME_KEY);
  }

}
