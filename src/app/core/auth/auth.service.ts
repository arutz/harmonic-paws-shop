import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from, of, throwError } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { PocketBaseService } from '../services/pocketbase.service';
import { environment } from '../../../environments/environment';

export interface User {
  id: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  emailVerified: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private pocketbaseService: PocketBaseService) {
    // Check if user is already authenticated
    if (this.pocketbaseService.client.authStore.isValid) {
      const authData = this.pocketbaseService.client.authStore.model;
      this.setCurrentUser(authData);
    }

    // Listen for auth changes
    this.pocketbaseService.client.authStore.onChange(() => {
      if (this.pocketbaseService.client.authStore.isValid) {
        const authData = this.pocketbaseService.client.authStore.model;
        this.setCurrentUser(authData);
      } else {
        this.currentUserSubject.next(null);
      }
    });
  }

  private setCurrentUser(authData: any): void {
    if (!authData) return;

    const user: User = {
      id: authData.id,
      email: authData.email,
      displayName: authData.name,
      emailVerified: true, // PocketBase doesn't have this concept by default
      photoURL: authData.avatar ? `${environment.pocketbaseUrl}/api/files/${authData.collectionId}/${authData.id}/${authData.avatar}` : undefined
    };

    this.currentUserSubject.next(user);
  }

  // Get current user value without subscribing to the observable
  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  // Check if user is authenticated
  public get isLoggedIn(): boolean {
    return this.pocketbaseService.client.authStore.isValid;
  }

  // Login with email and password
  login(email: string, password: string): Observable<User> {
    return from(this.pocketbaseService.client.collection('users').authWithPassword(email, password))
      .pipe(
        map(response => {
          const userData = response.record;
          const user: User = {
            id: userData.id,
            email: userData.email,
            displayName: userData.name,
            emailVerified: true,
            photoURL: userData.avatar ? `${environment.pocketbaseUrl}/api/files/${userData.collectionId}/${userData.id}/${userData.avatar}` : undefined
          };
          return user;
        }),
        catchError(error => {
          console.error('Login error:', error);
          return throwError(() => new Error('Invalid email or password'));
        })
      );
  }

  // Register a new user
  register(email: string, password: string, name?: string): Observable<User> {
    const data = {
      email,
      password,
      passwordConfirm: password,
      name: name || email.split('@')[0]
    };

    return from(this.pocketbaseService.client.collection('users').create(data))
      .pipe(
        map(userData => {
          // After registration, log the user in
          return this.login(email, password).pipe(
            catchError(error => {
              console.error('Auto-login after registration failed:', error);
              return throwError(() => new Error('Registration successful but login failed'));
            })
          );
        }),
        catchError(error => {
          console.error('Registration error:', error);
          return throwError(() => new Error('Registration failed: ' + error.message));
        })
      );
  }

  // Logout the current user
  logout(): void {
    this.pocketbaseService.client.authStore.clear();
    this.currentUserSubject.next(null);
  }

  // Update user profile
  updateProfile(data: {displayName?: string, photoURL?: string}): Observable<void> {
    if (!this.isLoggedIn) {
      return throwError(() => new Error('User not authenticated'));
    }

    const userId = this.pocketbaseService.client.authStore.model.id;
    const updateData: any = {};

    if (data.displayName) {
      updateData.name = data.displayName;
    }

    // Handle file upload separately if needed for photoURL

    return from(this.pocketbaseService.client.collection('users').update(userId, updateData))
      .pipe(
        map(response => {
          // Update the current user
          this.setCurrentUser(response);
          return;
        }),
        catchError(error => {
          console.error('Profile update error:', error);
          return throwError(() => new Error('Failed to update profile'));
        })
      );
  }
}
