import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  submitted = false;
  error: string | null = null;

  isSuccess: boolean = false;

  submittedMessage: string | null = null;

  constructor(private http: HttpClient, private router: Router) { }

  onSubmit(signupForm: any) {

    const userData = {
      username: signupForm.value.username,
      password: signupForm.value.password
    };

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
