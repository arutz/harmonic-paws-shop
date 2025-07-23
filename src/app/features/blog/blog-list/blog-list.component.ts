import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgFor, DatePipe } from '@angular/common';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [RouterLink, NgFor, DatePipe],
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.css'
})
export class BlogListComponent {
  // Mock data for blog posts
  blogPosts = [
    {
      id: 1,
      title: 'Wie Sie Stressanzeichen bei Ihrer Katze erkennen können',
      excerpt: 'Katzen sind Meister darin, ihre Gefühle zu verbergen. Hier sind einige subtile Anzeichen, die darauf hindeuten könnten, dass Ihre Katze gestresst ist.',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      image: 'assets/images/blog-1.jpg',
      date: new Date(2023, 5, 15),
      author: 'Anna Müller'
    },
    {
      id: 2,
      title: 'Die besten Spielzeuge für die geistige Anregung Ihres Hundes',
      excerpt: 'Geistige Stimulation ist für Hunde genauso wichtig wie körperliche Bewegung. Entdecken Sie die besten Spielzeuge, um den Geist Ihres Hundes aktiv zu halten.',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      image: 'assets/images/blog-2.jpg',
      date: new Date(2023, 6, 22),
      author: 'Max Schmidt'
    },
    {
      id: 3,
      title: 'Ernährungstipps für ältere Katzen',
      excerpt: 'Mit zunehmendem Alter ändern sich die Ernährungsbedürfnisse Ihrer Katze. Hier sind einige Tipps, wie Sie die Ernährung Ihrer älteren Katze anpassen können.',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      image: 'assets/images/blog-3.jpg',
      date: new Date(2023, 7, 10),
      author: 'Laura Weber'
    },
    {
      id: 4,
      title: 'Wie man Trennungsangst bei Hunden bewältigt',
      excerpt: 'Trennungsangst kann für Hunde und ihre Besitzer belastend sein. Erfahren Sie, wie Sie Ihrem Hund helfen können, sich sicherer zu fühlen, wenn er allein ist.',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      image: 'assets/images/blog-4.jpg',
      date: new Date(2023, 8, 5),
      author: 'Anna Müller'
    },
    {
      id: 5,
      title: 'Die Vorteile einer Katzenpension gegenüber der Betreuung zu Hause',
      excerpt: 'Wenn Sie verreisen, stehen Sie vor der Entscheidung: Katzenpension oder Betreuung zu Hause? Hier sind die Vorteile einer professionellen Katzenpension.',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      image: 'assets/images/blog-5.jpg',
      date: new Date(2023, 9, 18),
      author: 'Max Schmidt'
    },
    {
      id: 6,
      title: 'Grundlegende Gehorsamkeitsübungen für Welpen',
      excerpt: 'Das Training Ihres Welpen sollte früh beginnen. Hier sind einige grundlegende Gehorsamkeitsübungen, die Sie mit Ihrem neuen pelzigen Freund üben können.',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      image: 'assets/images/blog-6.jpg',
      date: new Date(2023, 10, 7),
      author: 'Laura Weber'
    }
  ];
}
