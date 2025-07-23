import { Component } from '@angular/core';
import { NgFor, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [NgFor, NgClass, RouterLink],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent {
  // Main services offered
  services = [
    {
      id: 'psychology',
      title: 'Tierpsychologie',
      description: 'Professionelle Verhaltensberatung und Therapie für Ihr Haustier. Wir helfen bei Verhaltensproblemen und bieten individuelle Lösungen.',
      image: 'assets/images/service-psychology.jpg',
      features: [
        'Individuelle Verhaltensanalyse',
        'Maßgeschneiderte Trainings- und Therapiepläne',
        'Beratung bei Angstzuständen, Aggressionen und anderen Verhaltensproblemen',
        'Unterstützung bei der Integration neuer Haustiere',
        'Folgebetreuung und Anpassung der Therapie nach Bedarf'
      ],
      pricing: [
        {
          title: 'Erstberatung',
          price: '120€',
          description: '90-minütige Sitzung zur Analyse des Verhaltens und Entwicklung eines ersten Therapieplans'
        },
        {
          title: 'Folgesitzungen',
          price: '80€',
          description: '60-minütige Sitzungen zur Überprüfung des Fortschritts und Anpassung der Therapie'
        },
        {
          title: 'Verhaltenspaket',
          price: '350€',
          description: 'Erstberatung plus drei Folgesitzungen für umfassende Verhaltenstherapie'
        }
      ]
    },
    {
      id: 'pet-service',
      title: 'Haustierservice',
      description: 'Umfassende Betreuung für Ihr Haustier, einschließlich Gassi-Service, Fütterung und Pflege während Ihrer Abwesenheit.',
      image: 'assets/images/service-pet-care.jpg',
      features: [
        'Regelmäßige Hausbesuche zur Fütterung und Pflege',
        'Gassi-Service für Hunde (individuelle Routen und Zeiten)',
        'Medikamentengabe nach Bedarf',
        'Grundlegende Pflege wie Bürsten und Reinigung',
        'Regelmäßige Updates mit Fotos und Berichten'
      ],
      pricing: [
        {
          title: 'Einzelbesuch',
          price: '25€',
          description: '30-minütiger Besuch für Fütterung, kurzen Spaziergang oder Spielzeit'
        },
        {
          title: 'Tagespaket',
          price: '60€',
          description: 'Drei Besuche pro Tag für regelmäßige Versorgung'
        },
        {
          title: 'Wochenpaket',
          price: '350€',
          description: 'Tägliche Betreuung für eine Woche (3 Besuche pro Tag)'
        }
      ]
    },
    {
      id: 'cat-boarding',
      title: 'Katzenpension',
      description: 'Liebevolle Unterbringung für Ihre Katze in einer stressfreien Umgebung, während Sie verreisen oder anderweitig beschäftigt sind.',
      image: 'assets/images/service-cat-boarding.jpg',
      features: [
        'Individuelle, geräumige Unterkünfte für jede Katze',
        'Tägliche Spielzeit und Sozialisierung',
        'Hochwertiges Futter (oder Ihr eigenes Futter)',
        'Regelmäßige Reinigung der Unterkünfte',
        'Tägliche Updates mit Fotos und Berichten',
        'Medikamentengabe nach Bedarf'
      ],
      pricing: [
        {
          title: 'Tagesaufenthalt',
          price: '30€',
          description: 'Betreuung für einen Tag ohne Übernachtung'
        },
        {
          title: 'Übernachtung',
          price: '45€',
          description: 'Pro Nacht, inklusive Futter, Pflege und Spielzeit'
        },
        {
          title: 'Wochenpaket',
          price: '280€',
          description: '7 Nächte zum Vorteilspreis, inklusive aller Leistungen'
        }
      ]
    }
  ];

  // Testimonials specific to services
  testimonials = [
    {
      text: 'Die Tierpsychologie-Beratung hat das Verhalten meiner Katze komplett verändert. Jetzt ist sie viel entspannter und glücklicher!',
      author: 'Maria Schmidt',
      service: 'Tierpsychologie'
    },
    {
      text: 'Der Haustierservice ist zuverlässig und professionell. Mein Hund freut sich immer auf die Besuche und wird bestens betreut.',
      author: 'Thomas Müller',
      service: 'Haustierservice'
    },
    {
      text: 'Die Katzenpension ist ein Paradies für Katzen! Meine Mieze kommt immer entspannt und zufrieden zurück.',
      author: 'Laura Weber',
      service: 'Katzenpension'
    }
  ];

  // FAQs about services
  faqs = [
    {
      question: 'Wie läuft eine Erstberatung in der Tierpsychologie ab?',
      answer: 'Bei der Erstberatung besprechen wir zunächst die Vorgeschichte und aktuellen Verhaltensprobleme Ihres Tieres. Anschließend beobachten wir Ihr Tier in seiner gewohnten Umgebung, um sein Verhalten besser zu verstehen. Basierend auf diesen Informationen entwickeln wir einen individuellen Therapieplan.'
    },
    {
      question: 'Kann ich mein eigenes Futter für die Katzenpension mitbringen?',
      answer: 'Ja, Sie können gerne das gewohnte Futter Ihrer Katze mitbringen. Dies hilft oft, den Stress durch die neue Umgebung zu reduzieren, da zumindest das Futter vertraut ist.'
    },
    {
      question: 'Wie oft erhalte ich Updates während der Betreuung meines Haustieres?',
      answer: 'Bei unserem Haustierservice erhalten Sie nach jedem Besuch ein kurzes Update mit Fotos. Bei der Katzenpension senden wir Ihnen täglich ein Update mit Informationen zum Wohlbefinden Ihrer Katze und Fotos von den Aktivitäten des Tages.'
    },
    {
      question: 'Werden auch Medikamente verabreicht?',
      answer: 'Ja, wir verabreichen nach Absprache und Anweisung auch Medikamente. Bitte informieren Sie uns vorab über alle medizinischen Bedürfnisse Ihres Tieres.'
    },
    {
      question: 'Wie weit im Voraus sollte ich für die Katzenpension buchen?',
      answer: 'Besonders in der Ferienzeit empfehlen wir, mindestens 4-6 Wochen im Voraus zu buchen, da wir nur eine begrenzte Anzahl von Plätzen haben, um jedem Tier genügend Aufmerksamkeit widmen zu können.'
    }
  ];
}
