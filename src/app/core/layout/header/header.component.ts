import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgClass, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  mobileMenuOpen = false;

  navItems = [
    { path: '/', label: 'Home', exact: true },
    { path: '/about', label: 'Über uns' },
    { path: '/blog', label: 'Blog' },
    { path: '/services', label: 'Leistungen' },
    { path: '/calendar', label: 'Termine' },
    { path: '/contact', label: 'Kontakt' },
    { path: '/impressum', label: 'Impressum' }
  ];

  constructor(public authService: AuthService) {}

  logout(): void {
    this.authService.logout();
  }
}
