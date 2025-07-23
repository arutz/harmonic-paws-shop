import { Component } from '@angular/core';

@Component({
  selector: 'app-impressum',
  standalone: true,
  imports: [],
  templateUrl: './impressum.component.html',
  styleUrl: './impressum.component.css'
})
export class ImpressumComponent {
  // Company information
  companyInfo = {
    name: 'Harmonic Paws',
    owner: 'Anna Mustermann',
    address: {
      street: 'Musterstraße 123',
      zip: '12345',
      city: 'Musterstadt',
      country: 'Deutschland'
    },
    contact: {
      phone: '+49 123 456789',
      email: 'info@harmonic-paws.de'
    },
    legal: {
      taxId: 'DE123456789',
      registerCourt: 'Amtsgericht Musterstadt',
      registerNumber: 'HRA 12345'
    }
  };

  // Responsible person according to § 55 Abs. 2 RStV
  responsiblePerson = {
    name: 'Anna Mustermann',
    address: {
      street: 'Musterstraße 123',
      zip: '12345',
      city: 'Musterstadt',
      country: 'Deutschland'
    }
  };
}
