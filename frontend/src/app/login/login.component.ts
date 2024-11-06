import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; // Importation des classes nécessaires
import { catchError, of } from 'rxjs';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  isSuccess: boolean = false;
  // initialize string type property but initialize currently null
  submittedMessage: string | null = null;

  constructor(
    private fb: FormBuilder,  // FormBuilder for create form
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    // Initializing the form with validations
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],  // Username is required
      password: ['', [Validators.required]]   // Password is required
    });
  }

  // Method called on form soumission

  onSubmit() {
    // If the form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    // Get the values ​​from the form
    const userData = this.loginForm.value;
    // Request POST with userData as request
    this.http.post('http://localhost:3000/auth/login', userData).pipe(
      catchError(err => {
        console.error('Erreur lors de la connexion', err);
        this.submittedMessage = 'Identifiants invalides.';
        this.isSuccess = false;
        return of(null); // Return null to avoid errors
      })
    )
      .subscribe(response => {
        if (response) {
          console.log('Connexion réussie', response);
          this.authService.setUsername(userData.username); // Store username
          this.submittedMessage = `Bonjour ${userData.username}, vous êtes à présent connecté.`;
          this.isSuccess = true;
          // Delay before redirection to the chart page
          setTimeout(() => {
            this.router.navigate(['chart']);
          }, 1500);
        }
      });
  }
}
