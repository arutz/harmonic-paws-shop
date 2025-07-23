import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgClass, NgIf} from '@angular/common';
import {AuthService, User} from '../../core/auth/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgClass],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  user: User | null = null;
  loading = false;
  submitted = false;
  success = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.profileForm = this.formBuilder.group({
      displayName: ['', Validators.required],
      email: [{ value: '', disabled: true }]
    });
  }

  ngOnInit(): void {
    // Get current user
    this.user = this.authService.currentUserValue;

    if (this.user) {
      // Initialize form with user data
      this.profileForm.patchValue({
        displayName: this.user.displayName || '',
        email: this.user.email
      });
    }
  }

  // Convenience getter for easy access to form fields
  get f() { return this.profileForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    // Stop here if form is invalid
    if (this.profileForm.invalid) {
      return;
    }

    this.loading = true;
    this.error = '';
    this.success = false;

    this.authService.updateProfile(this.f['displayName'].value)
      .subscribe({
        next: () => {
          this.success = true;
          this.loading = false;
        },
        error: error => {
          this.error = error.message || 'Fehler beim Aktualisieren des Profils';
          this.loading = false;
        }
      });
  }
}
