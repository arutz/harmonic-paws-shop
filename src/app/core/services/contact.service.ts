import { Injectable } from '@angular/core';
import { Observable, from, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { PocketBaseService } from './pocketbase.service';

export interface ContactForm {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  created?: Date;
  responded?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  constructor(private pocketbaseService: PocketBaseService) { }

  // Submit a contact form
  submitContactForm(formData: ContactForm): Observable<ContactForm> {
    return from(this.pocketbaseService.client.collection('contact_forms').create(formData))
      .pipe(
        map(response => this.mapResponseToContactForm(response)),
        catchError(error => {
          console.error('Error submitting contact form', error);
          return throwError(() => new Error('Failed to submit contact form'));
        })
      );
  }

  // Get all contact form submissions (admin only)
  getAllContactForms(): Observable<ContactForm[]> {
    return from(this.pocketbaseService.client.collection('contact_forms').getList(1, 100, {
      sort: '-created'
    }))
      .pipe(
        map(response => this.mapResponseToContactForms(response)),
        catchError(error => {
          console.error('Error fetching contact forms', error);
          return throwError(() => new Error('Failed to fetch contact forms'));
        })
      );
  }

  // Get a single contact form by ID (admin only)
  getContactFormById(id: string): Observable<ContactForm> {
    return from(this.pocketbaseService.client.collection('contact_forms').getOne(id))
      .pipe(
        map(response => this.mapResponseToContactForm(response)),
        catchError(error => {
          console.error(`Error fetching contact form with id ${id}`, error);
          return throwError(() => new Error('Failed to fetch contact form'));
        })
      );
  }

  // Mark a contact form as responded (admin only)
  markAsResponded(id: string): Observable<ContactForm> {
    return from(this.pocketbaseService.client.collection('contact_forms').update(id, { responded: true }))
      .pipe(
        map(response => this.mapResponseToContactForm(response)),
        catchError(error => {
          console.error(`Error updating contact form with id ${id}`, error);
          return throwError(() => new Error('Failed to update contact form'));
        })
      );
  }

  // Delete a contact form (admin only)
  deleteContactForm(id: string): Observable<void> {
    return from(this.pocketbaseService.client.collection('contact_forms').delete(id))
      .pipe(
        map(() => void 0),
        catchError(error => {
          console.error(`Error deleting contact form with id ${id}`, error);
          return throwError(() => new Error('Failed to delete contact form'));
        })
      );
  }

  // Helper method to map PocketBase response to ContactForm objects
  private mapResponseToContactForms(response: any): ContactForm[] {
    return response.items.map((item: any) => this.mapResponseToContactForm(item));
  }

  // Helper method to map a single PocketBase response to a ContactForm object
  private mapResponseToContactForm(item: any): ContactForm {
    return {
      id: item.id,
      name: item.name,
      email: item.email,
      phone: item.phone,
      subject: item.subject,
      message: item.message,
      created: new Date(item.created),
      responded: item.responded
    };
  }

  // Send an email notification for a new contact form submission
  // This would typically be handled by the backend, but we're simulating it here
  private sendEmailNotification(form: ContactForm): void {
    console.log(`Email notification sent for contact form from ${form.name}`);
    // In a real application, this would call an API endpoint that sends an email
  }
}
