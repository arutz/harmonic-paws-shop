import { Component } from '@angular/core';

@Component({
  selector: 'app-datenschutz',
  standalone: true,
  imports: [],
  templateUrl: './datenschutz.component.html',
  styleUrl: './datenschutz.component.css'
})
export class DatenschutzComponent {
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
    }
  };

  // Data protection officer
  dataProtectionOfficer = {
    name: 'Max Mustermann',
    company: 'Datenschutz GmbH',
    address: {
      street: 'Datenschutzstraße 456',
      zip: '54321',
      city: 'Datenschutzstadt',
      country: 'Deutschland'
    },
    contact: {
      email: 'datenschutz@example.com'
    }
  };

  // Cookies and tracking information
  cookiesInfo = {
    essential: [
      {
        name: 'Session Cookie',
        purpose: 'Speichert Ihre Sitzungsinformationen während Ihres Besuchs auf unserer Website',
        duration: 'Sitzung'
      },
      {
        name: 'CSRF-Token',
        purpose: 'Schützt vor Cross-Site-Request-Forgery-Angriffen',
        duration: 'Sitzung'
      }
    ],
    functional: [
      {
        name: 'Language',
        purpose: 'Speichert Ihre Spracheinstellungen',
        duration: '1 Jahr'
      }
    ],
    analytics: [
      {
        name: '_ga (Google Analytics)',
        purpose: 'Wird verwendet, um Besucher auf der Website zu unterscheiden',
        duration: '2 Jahre'
      },
      {
        name: '_gid (Google Analytics)',
        purpose: 'Wird verwendet, um Besucher auf der Website zu unterscheiden',
        duration: '24 Stunden'
      }
    ]
  };

  // Third-party services
  thirdPartyServices = [
    {
      name: 'Google Analytics',
      provider: 'Google LLC',
      purpose: 'Webanalyse, statistische Auswertung der Besucherzugriffe',
      dataCollected: 'IP-Adresse, Datum und Uhrzeit des Besuchs, Nutzungsdaten, Geräteinformationen',
      privacyPolicy: 'https://policies.google.com/privacy'
    },
    {
      name: 'Google Maps',
      provider: 'Google LLC',
      purpose: 'Darstellung von Karten',
      dataCollected: 'IP-Adresse, Standortdaten (wenn vom Nutzer erlaubt)',
      privacyPolicy: 'https://policies.google.com/privacy'
    }
  ];

  // User rights
  userRights = [
    'Recht auf Auskunft',
    'Recht auf Berichtigung',
    'Recht auf Löschung',
    'Recht auf Einschränkung der Verarbeitung',
    'Recht auf Datenübertragbarkeit',
    'Widerspruchsrecht',
    'Recht auf Widerruf einer Einwilligung',
    'Recht auf Beschwerde bei einer Aufsichtsbehörde'
  ];
}
