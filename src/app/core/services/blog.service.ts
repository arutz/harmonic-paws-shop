import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {environment} from '../../../environments/environment';

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  image: string;
  author: {
    id: string;
    name: string;
  };
  created: Date;
  updated: Date;
  published: boolean;
  tags: string[];
}

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private apiUrl = environment.apiUrl + '/collections/blog_posts/records';

  // Mock data for development until backend is set up
  private mockPosts: BlogPost[] = [
    {
      id: '1',
      title: 'Wie Sie Stressanzeichen bei Ihrer Katze erkennen können',
      excerpt: 'Katzen sind Meister darin, ihre Gefühle zu verbergen. Hier sind einige subtile Anzeichen, die darauf hindeuten könnten, dass Ihre Katze gestresst ist.',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      image: 'assets/images/blog-1.jpg',
      created: new Date(2023, 5, 15),
      updated: new Date(2023, 5, 15),
      published: true,
      author: {
        id: '1',
        name: 'Anna Müller'
      },
      tags: ['Katzen', 'Verhalten', 'Stress']
    },
    {
      id: '2',
      title: 'Die besten Spielzeuge für die geistige Anregung Ihres Hundes',
      excerpt: 'Geistige Stimulation ist für Hunde genauso wichtig wie körperliche Bewegung. Entdecken Sie die besten Spielzeuge, um den Geist Ihres Hundes aktiv zu halten.',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      image: 'assets/images/blog-2.jpg',
      created: new Date(2023, 6, 22),
      updated: new Date(2023, 6, 22),
      published: true,
      author: {
        id: '2',
        name: 'Max Schmidt'
      },
      tags: ['Hunde', 'Spielzeug', 'Training']
    },
    {
      id: '3',
      title: 'Ernährungstipps für ältere Katzen',
      excerpt: 'Mit zunehmendem Alter ändern sich die Ernährungsbedürfnisse Ihrer Katze. Hier sind einige Tipps, wie Sie die Ernährung Ihrer älteren Katze anpassen können.',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      image: 'assets/images/blog-3.jpg',
      created: new Date(2023, 7, 10),
      updated: new Date(2023, 7, 10),
      published: true,
      author: {
        id: '3',
        name: 'Laura Weber'
      },
      tags: ['Katzen', 'Ernährung', 'Senioren']
    }
  ];

  constructor(private http: HttpClient) { }

  // Get all published blog posts
  getAllPosts(): Observable<BlogPost[]> {
    // When backend is ready, uncomment this code
    // return this.http.get<any>(`${this.apiUrl}?filter=(published=true)&sort=-created`)
    //   .pipe(
    //     map(response => this.mapResponseToBlogPosts(response)),
    //     catchError(error => {
    //       console.error('Error fetching blog posts', error);
    //       return throwError(() => new Error('Failed to fetch blog posts'));
    //     })
    //   );

    // For now, return mock data
    return of(this.mockPosts);
  }

  // Get a single blog post by ID
  getPostById(id: string): Observable<BlogPost> {
    // When backend is ready, uncomment this code
    // return this.http.get<any>(`${this.apiUrl}/${id}`)
    //   .pipe(
    //     map(response => this.mapResponseToBlogPost(response)),
    //     catchError(error => {
    //       console.error(`Error fetching blog post with id ${id}`, error);
    //       return throwError(() => new Error('Failed to fetch blog post'));
    //     })
    //   );

    // For now, return mock data
    const post = this.mockPosts.find(p => p.id === id);
    if (post) {
      return of(post);
    }
    return throwError(() => new Error('Blog post not found'));
  }

  // Create a new blog post (admin only)
  createPost(post: Omit<BlogPost, 'id' | 'created' | 'updated'>): Observable<BlogPost> {
    // When backend is ready, uncomment this code
    // return this.http.post<any>(this.apiUrl, post)
    //   .pipe(
    //     map(response => this.mapResponseToBlogPost(response)),
    //     catchError(error => {
    //       console.error('Error creating blog post', error);
    //       return throwError(() => new Error('Failed to create blog post'));
    //     })
    //   );

    // For now, simulate creation with mock data
    const newPost: BlogPost = {
      ...post as any,
      id: (this.mockPosts.length + 1).toString(),
      created: new Date(),
      updated: new Date()
    };
    this.mockPosts.push(newPost);
    return of(newPost);
  }

  // Update an existing blog post (admin only)
  updatePost(id: string, post: Partial<BlogPost>): Observable<BlogPost> {
    // When backend is ready, uncomment this code
    // return this.http.patch<any>(`${this.apiUrl}/${id}`, post)
    //   .pipe(
    //     map(response => this.mapResponseToBlogPost(response)),
    //     catchError(error => {
    //       console.error(`Error updating blog post with id ${id}`, error);
    //       return throwError(() => new Error('Failed to update blog post'));
    //     })
    //   );

    // For now, simulate update with mock data
    const index = this.mockPosts.findIndex(p => p.id === id);
    if (index !== -1) {
      const updatedPost = {
        ...this.mockPosts[index],
        ...post,
        updated: new Date()
      };
      this.mockPosts[index] = updatedPost;
      return of(updatedPost);
    }
    return throwError(() => new Error('Blog post not found'));
  }

  // Delete a blog post (admin only)
  deletePost(id: string): Observable<void> {
    // When backend is ready, uncomment this code
    // return this.http.delete<void>(`${this.apiUrl}/${id}`)
    //   .pipe(
    //     catchError(error => {
    //       console.error(`Error deleting blog post with id ${id}`, error);
    //       return throwError(() => new Error('Failed to delete blog post'));
    //     })
    //   );

    // For now, simulate deletion with mock data
    const index = this.mockPosts.findIndex(p => p.id === id);
    if (index !== -1) {
      this.mockPosts.splice(index, 1);
      return of(void 0);
    }
    return throwError(() => new Error('Blog post not found'));
  }

  // Helper method to map PocketBase response to BlogPost objects
  private mapResponseToBlogPosts(response: any): BlogPost[] {
    return response.items.map((item: any) => this.mapResponseToBlogPost(item));
  }

  // Helper method to map a single PocketBase response to a BlogPost object
  private mapResponseToBlogPost(item: any): BlogPost {
    return {
      id: item.id,
      title: item.title,
      content: item.content,
      excerpt: item.excerpt,
      image: item.image ? `${environment.apiUrl}/files/${item.collectionId}/${item.id}/${item.image}` : '',
      author: {
        id: item.expand?.author?.id || '',
        name: item.expand?.author?.name || 'Unknown'
      },
      created: new Date(item.created),
      updated: new Date(item.updated),
      published: item.published,
      tags: item.tags || []
    };
  }
}
