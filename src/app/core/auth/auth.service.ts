import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

export interface User {
  uid: string;
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

  // Mock authentication state for development
  private isAuthenticated = false;

  constructor() {
    // Check if user is stored in localStorage (for persistence)
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
      this.isAuthenticated = true;
    }
  }

  // Get current user value without subscribing to the observable
  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  // Check if user is authenticated
  public get isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  // Login with email and password
  login(email: string, password: string): Observable<User> {
    // This is a mock implementation - in a real app, this would call Firebase Auth
    if (email && password) {
      // Simulate successful login
      const user: User = {
        uid: '123456',
        email: email,
        displayName: email.split('@')[0],
        emailVerified: true
      };

      // Store user in localStorage for persistence
      localStorage.setItem('currentUser', JSON.stringify(user));

      // Update authentication state
      this.isAuthenticated = true;

      // Update the BehaviorSubject with the new user
      this.currentUserSubject.next(user);

      return of(user);
    }

    // Simulate login failure
    return of(null as any).pipe(
      catchError(error => {
        throw new Error('Invalid email or password');
      })
    );
  }

  // Register a new user
  register(email: string, password: string): Observable<User> {
    // This is a mock implementation - in a real app, this would call Firebase Auth
    if (email && password) {
      // Simulate successful registration
      const user: User = {
        uid: '123456',
        email: email,
        displayName: email.split('@')[0],
        emailVerified: false
      };

      // Store user in localStorage for persistence
      localStorage.setItem('currentUser', JSON.stringify(user));

      // Update authentication state
      this.isAuthenticated = true;

      // Update the BehaviorSubject with the new user
      this.currentUserSubject.next(user);

      return of(user);
    }

    // Simulate registration failure
    return of(null as any).pipe(
      catchError(error => {
        throw new Error('Registration failed');
      })
    );
  }

  // Logout the current user
  logout(): void {
    // Remove user from localStorage
    localStorage.removeItem('currentUser');

    // Update authentication state
    this.isAuthenticated = false;

    // Update the BehaviorSubject
    this.currentUserSubject.next(null);
  }

  // Update user profile
  updateProfile(displayName?: string, photoURL?: string): Observable<void> {
    // This is a mock implementation - in a real app, this would call Firebase Auth
    const currentUser = this.currentUserValue;

    if (currentUser) {
      const updatedUser = {
        ...currentUser,
        displayName: displayName || currentUser.displayName,
        photoURL: photoURL || currentUser.photoURL
      };

      // Update localStorage
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));

      // Update the BehaviorSubject
      this.currentUserSubject.next(updatedUser);

      return of(void 0);
    }

    return of(null as any).pipe(
      catchError(error => {
        throw new Error('User not authenticated');
      })
    );
  }
}
