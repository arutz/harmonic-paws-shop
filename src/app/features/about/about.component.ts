import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [NgFor],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  teamMembers = [
    {
      name: 'Anna Müller',
      position: 'Gründerin & Tierpsychologin',
      bio: 'Anna hat über 10 Jahre Erfahrung in der Arbeit mit Haustieren und ist zertifizierte Tierpsychologin. Ihre Leidenschaft für Tiere begann schon in jungen Jahren und führte sie dazu, Harmonic Paws zu gründen.',
      image: 'assets/images/team-1.jpg'
    },
    {
      name: 'Max Schmidt',
      position: 'Tierbetreuer',
      bio: 'Max ist spezialisiert auf die Betreuung von Katzen und kleinen Haustieren. Er hat eine natürliche Begabung, selbst die scheuesten Tiere zu beruhigen und ihnen ein Gefühl von Sicherheit zu geben.',
      image: 'assets/images/team-2.jpg'
    },
    {
      name: 'Laura Weber',
      position: 'Tiertrainerin',
      bio: 'Laura hat eine Ausbildung in positivem Tiertraining und hilft Haustierbesitzern, eine bessere Beziehung zu ihren Tieren aufzubauen. Sie glaubt an sanfte, belohnungsbasierte Trainingsmethoden.',
      image: 'assets/images/team-3.jpg'
    }
  ];

  values = [
    {
      title: 'Tierliebe',
      description: 'Wir behandeln jedes Tier mit Respekt, Geduld und Liebe, als wäre es unser eigenes.'
    },
    {
      title: 'Professionalität',
      description: 'Wir setzen auf fundiertes Fachwissen und kontinuierliche Weiterbildung, um die bestmögliche Betreuung zu gewährleisten.'
    },
    {
      title: 'Vertrauen',
      description: 'Wir bauen vertrauensvolle Beziehungen zu unseren Kunden und ihren Tieren auf, basierend auf Transparenz und Zuverlässigkeit.'
    },
    {
      title: 'Individualität',
      description: 'Jedes Tier ist einzigartig. Wir passen unsere Dienstleistungen an die individuellen Bedürfnisse jedes Tieres an.'
    }
  ];
}
