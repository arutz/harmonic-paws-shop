import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf, NgClass } from '@angular/common';

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, NgIf, NgClass],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  // Contact form data
  contactForm: ContactForm = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  };

  // Form submission status
  formSubmitted = false;
  formSuccess = false;
  formError = false;

  // Contact information
  contactInfo = {
    address: 'Musterstraße 123, 12345 Musterstadt',
    phone: '+49 123 456789',
    email: 'info@harmonic-paws.de',
    hours: 'Mo-Fr: 9:00 - 18:00 Uhr, Sa: 10:00 - 14:00 Uhr'
  };

  // Social media links
  socialMedia = [
    { name: 'Facebook', url: 'https://facebook.com', icon: 'facebook' },
    { name: 'Instagram', url: 'https://instagram.com', icon: 'instagram' },
    { name: 'Twitter', url: 'https://twitter.com', icon: 'twitter' }
  ];

  constructor() {}

  // Submit contact form
  submitForm(): void {
    this.formSubmitted = true;

    // Check if form is valid (all required fields are filled)
    if (!this.contactForm.name || !this.contactForm.email || !this.contactForm.message) {
      return;
    }

    // In a real app, this would send the form data to a backend service
    // For now, we'll just simulate a successful submission
    setTimeout(() => {
      // 90% chance of success (for demo purposes)
      if (Math.random() < 0.9) {
        this.formSuccess = true;
        this.formError = false;
      } else {
        this.formSuccess = false;
        this.formError = true;
      }
    }, 1000);
  }

  // Reset form
  resetForm(): void {
    this.contactForm = {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    };
    this.formSubmitted = false;
    this.formSuccess = false;
    this.formError = false;
  }
}
