import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  footerLinks = [
    { path: '/about', label: 'Über uns' },
    { path: '/services', label: 'Leistungen' },
    { path: '/blog', label: 'Blog' },
    { path: '/contact', label: 'Kontakt' },
    { path: '/impressum', label: 'Impressum' },
    { path: '/datenschutz', label: 'Datenschutz' }
  ];

  socialLinks = [
    { url: 'https://facebook.com', icon: 'facebook', label: 'Facebook' },
    { url: 'https://instagram.com', icon: 'instagram', label: 'Instagram' },
    { url: 'https://twitter.com', icon: 'twitter', label: 'Twitter' }
  ];
}
