import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

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
  private apiUrl = environment.apiUrl + '/collections/contact_forms/records';

  // Mock data for development until backend is set up
  private mockForms: ContactForm[] = [
    {
      id: '1',
      name: 'Maria Schmidt',
      email: 'maria.schmidt@example.com',
      phone: '0123456789',
      subject: 'Anfrage zur Tierpsychologie',
      message: 'Ich habe Fragen zur Verhaltensberatung für meine Katze. Können Sie mir mehr Informationen geben?',
      created: new Date(2023, 10, 15),
      responded: true
    },
    {
      id: '2',
      name: 'Thomas Müller',
      email: 'thomas.mueller@example.com',
      phone: '0987654321',
      subject: 'Haustierservice Verfügbarkeit',
      message: 'Ich möchte wissen, ob Sie in der nächsten Woche für den Gassi-Service verfügbar sind.',
      created: new Date(2023, 10, 20),
      responded: false
    },
    {
      id: '3',
      name: 'Laura Weber',
      email: 'laura.weber@example.com',
      phone: '0123987456',
      subject: 'Katzenpension Buchung',
      message: 'Ich würde gerne meine Katze für zwei Wochen im Dezember in Ihrer Pension unterbringen. Haben Sie noch Plätze frei?',
      created: new Date(2023, 10, 25),
      responded: false
    }
  ];

  constructor(private http: HttpClient) { }

  // Submit a contact form
  submitContactForm(formData: ContactForm): Observable<ContactForm> {
    // When backend is ready, uncomment this code
    // return this.http.post<any>(this.apiUrl, formData)
    //   .pipe(
    //     map(response => this.mapResponseToContactForm(response)),
    //     catchError(error => {
    //       console.error('Error submitting contact form', error);
    //       return throwError(() => new Error('Failed to submit contact form'));
    //     })
    //   );

    // For now, simulate form submission with mock data
    const newForm: ContactForm = {
      id: (this.mockForms.length + 1).toString(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      subject: formData.subject,
      message: formData.message,
      created: new Date(),
      responded: false
    };

    this.mockForms.push(newForm);
    return of(newForm);
  }

  // Get all contact form submissions (admin only)
  getAllContactForms(): Observable<ContactForm[]> {
    // When backend is ready, uncomment this code
    // return this.http.get<any>(`${this.apiUrl}?sort=-created`)
    //   .pipe(
    //     map(response => this.mapResponseToContactForms(response)),
    //     catchError(error => {
    //       console.error('Error fetching contact forms', error);
    //       return throwError(() => new Error('Failed to fetch contact forms'));
    //     })
    //   );

    // For now, return mock data
    return of(this.mockForms);
  }

  // Get a single contact form by ID (admin only)
  getContactFormById(id: string): Observable<ContactForm> {
    // When backend is ready, uncomment this code
    // return this.http.get<any>(`${this.apiUrl}/${id}`)
    //   .pipe(
    //     map(response => this.mapResponseToContactForm(response)),
    //     catchError(error => {
    //       console.error(`Error fetching contact form with id ${id}`, error);
    //       return throwError(() => new Error('Failed to fetch contact form'));
    //     })
    //   );

    // For now, return mock data
    const form = this.mockForms.find(f => f.id === id);
    if (form) {
      return of(form);
    }
    return throwError(() => new Error('Contact form not found'));
  }

  // Mark a contact form as responded (admin only)
  markAsResponded(id: string): Observable<ContactForm> {
    // When backend is ready, uncomment this code
    // return this.http.patch<any>(`${this.apiUrl}/${id}`, { responded: true })
    //   .pipe(
    //     map(response => this.mapResponseToContactForm(response)),
    //     catchError(error => {
    //       console.error(`Error updating contact form with id ${id}`, error);
    //       return throwError(() => new Error('Failed to update contact form'));
    //     })
    //   );

    // For now, simulate update with mock data
    const index = this.mockForms.findIndex(f => f.id === id);
    if (index === -1) {
      return throwError(() => new Error('Contact form not found'));
    }

    this.mockForms[index].responded = true;
    return of(this.mockForms[index]);
  }

  // Delete a contact form (admin only)
  deleteContactForm(id: string): Observable<void> {
    // When backend is ready, uncomment this code
    // return this.http.delete<void>(`${this.apiUrl}/${id}`)
    //   .pipe(
    //     catchError(error => {
    //       console.error(`Error deleting contact form with id ${id}`, error);
    //       return throwError(() => new Error('Failed to delete contact form'));
    //     })
    //   );

    // For now, simulate deletion with mock data
    const index = this.mockForms.findIndex(f => f.id === id);
    if (index === -1) {
      return throwError(() => new Error('Contact form not found'));
    }

    this.mockForms.splice(index, 1);
    return of(undefined);
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
