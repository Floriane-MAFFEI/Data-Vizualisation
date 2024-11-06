import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Importation de Reactive Forms
import { catchError, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';  // Importation de ReactiveFormsModule pour gérer les formulaires réactifs

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  submitted = false;
  error: string | null = null;

  isSuccess: boolean = false;
  submittedMessage: string | null = null;

  constructor(
    private fb: FormBuilder,  // FormBuilder for create form
    private http: HttpClient,
    private router: Router,
  ) { }

  ngOnInit(): void {
    // Initializing the form with validations
    this.signupForm = this.fb.group({
      username: ['', [Validators.required]],  // UserName is required
      password: ['', [Validators.required]]   // Password is required
    });
  }

  onSubmit(): void {
    // If the form is invalid, we stop execution
    if (this.signupForm.invalid) {
      return;
    }

    // Get the values ​​from the form
    const userData = this.signupForm.value;

    this.http.post('http://localhost:3000/auth/signup', userData).pipe(
      catchError(err => {
        console.error('Erreur lors de l\'inscription', err);
        this.submittedMessage = 'Erreur lors de l\'inscription';
        this.submitted = false;
        this.isSuccess = false;
        return of(null);
      })
    ).subscribe(response => {
      if (response) {
        console.log('Utilisateur inscrit', response);
        this.submittedMessage = 'Inscription valide';
        this.submitted = true;
        this.error = null;
        this.isSuccess = true;
        setTimeout(() => {
          this.router.navigate(['login']);
        }, 1500);
      }
    });
  }
}
