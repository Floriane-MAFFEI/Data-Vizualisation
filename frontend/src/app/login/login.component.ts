import { CommonModule, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    NgClass
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // Initialize property with a empty string
  username: string = '';
  password: string = '';

  // initialize string type property but initialize currently null
  submittedMessage: string | null = null;

  // Method called on form soumission
  onSubmit() {
    // if username and password is ok displayed a welcome message
    if (this.username && this.password) {
      this.submittedMessage = `Bonjour ${this.username}, Vous êtes à présent connecter. `;
    } else {
      // if username and password is not ok displayed a information message
      this.submittedMessage = 'Veuillez remplir tous les champs.';
    }
  }
}
