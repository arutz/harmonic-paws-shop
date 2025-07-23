import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, NgFor, NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  services = [
    {
      title: 'Tierpsychologie',
      description: 'Professionelle Verhaltensberatung für Ihr Haustier. Wir helfen bei Verhaltensproblemen und bieten individuelle Lösungen.',
      icon: 'brain',
      link: '/services#psychology'
    },
    {
      title: 'Haustierservice',
      description: 'Umfassende Betreuung für Ihr Haustier, einschließlich Gassi-Service, Fütterung und Pflege während Ihrer Abwesenheit.',
      icon: 'paw',
      link: '/services#pet-service'
    },
    {
      title: 'Katzenpension',
      description: 'Liebevolle Unterbringung für Ihre Katze in einer stressfreien Umgebung, während Sie verreisen oder anderweitig beschäftigt sind.',
      icon: 'cat',
      link: '/services#cat-boarding'
    }
  ];

  testimonials = [
    {
      name: 'Maria Schmidt',
      text: 'Die Tierpsychologie-Beratung hat das Verhalten meiner Katze komplett verändert. Jetzt ist sie viel entspannter und glücklicher!',
      image: 'assets/images/testimonial-1.jpg'
    },
    {
      name: 'Thomas Müller',
      text: 'Der Haustierservice ist zuverlässig und professionell. Mein Hund freut sich immer auf die Besuche und wird bestens betreut.',
      image: 'assets/images/testimonial-2.jpg'
    },
    {
      name: 'Laura Weber',
      text: 'Die Katzenpension ist ein Paradies für Katzen! Meine Mieze kommt immer entspannt und zufrieden zurück.',
      image: 'assets/images/testimonial-3.jpg'
    }
  ];
}
