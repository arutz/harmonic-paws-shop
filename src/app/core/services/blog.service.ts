import {Injectable} from '@angular/core';
import {Observable, from, of, throwError} from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {PocketBaseService} from './pocketbase.service';

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
  constructor(private pocketbaseService: PocketBaseService) { }

  // Get all published blog posts
  getAllPosts(): Observable<BlogPost[]> {
    return from(this.pocketbaseService.client.collection('blog_posts').getList(1, 50, {
      filter: 'published = true',
      sort: '-created',
      expand: 'author'
    }))
      .pipe(
        map(response => this.mapResponseToBlogPosts(response)),
        catchError(error => {
          console.error('Error fetching blog posts', error);
          return throwError(() => new Error('Failed to fetch blog posts'));
        })
      );
  }

  // Get a single blog post by ID
  getPostById(id: string): Observable<BlogPost> {
    return from(this.pocketbaseService.client.collection('blog_posts').getOne(id, {
      expand: 'author'
    }))
      .pipe(
        map(response => this.mapResponseToBlogPost(response)),
        catchError(error => {
          console.error(`Error fetching blog post with id ${id}`, error);
          return throwError(() => new Error('Failed to fetch blog post'));
        })
      );
  }

  // Create a new blog post (admin only)
  createPost(post: Omit<BlogPost, 'id' | 'created' | 'updated'>): Observable<BlogPost> {
    return from(this.pocketbaseService.client.collection('blog_posts').create(post))
      .pipe(
        map(response => this.mapResponseToBlogPost(response)),
        catchError(error => {
          console.error('Error creating blog post', error);
          return throwError(() => new Error('Failed to create blog post'));
        })
      );
  }

  // Update an existing blog post (admin only)
  updatePost(id: string, post: Partial<BlogPost>): Observable<BlogPost> {
    return from(this.pocketbaseService.client.collection('blog_posts').update(id, post))
      .pipe(
        map(response => this.mapResponseToBlogPost(response)),
        catchError(error => {
          console.error(`Error updating blog post with id ${id}`, error);
          return throwError(() => new Error('Failed to update blog post'));
        })
      );
  }

  // Delete a blog post (admin only)
  deletePost(id: string): Observable<void> {
    return from(this.pocketbaseService.client.collection('blog_posts').delete(id))
      .pipe(
        map(() => void 0),
        catchError(error => {
          console.error(`Error deleting blog post with id ${id}`, error);
          return throwError(() => new Error('Failed to delete blog post'));
        })
      );
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
      image: item.image ? `${environment.pocketbaseUrl}/api/files/${item.collectionId}/${item.id}/${item.image}` : '',
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
