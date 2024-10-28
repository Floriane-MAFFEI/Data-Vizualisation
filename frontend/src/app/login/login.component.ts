import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { catchError, of, tap } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  // Initialize property with a empty string
  username: string = '';
  password: string = '';

  isSuccess: boolean = false;

  // initialize string type property but initialize currently null
  submittedMessage: string | null = null;

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

  // Method called on form soumission
  onSubmit() {

    // Create User Object
    const userData = { username: this.username, password: this.password };

    // Request POST with userData as request
    this.http.post('http://localhost:3000/auth/login', userData).pipe(
      catchError(err => {
        console.error('Erreur lors de la connexion', err);
        this.submittedMessage = 'Identifiants invalides.';
        this.isSuccess = false;
        return of(null); // Return null to avoid errors
      })
    )
      // Wait for the response to the request 
      .subscribe(response => {
        if (response) {
          console.log('Connexion réussie', response);
          this.authService.setUsername(this.username); // Store username
          this.submittedMessage = `Bonjour ${this.username}, vous êtes à présent connecté.`;
          this.isSuccess = true;
          // Delay before redirection to the chart page
          setTimeout(() => {
            this.router.navigate(['chart']);
          }, 1500);
        }
      });
  }
}
