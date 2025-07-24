import {Injectable} from '@angular/core';
import {Observable, from, of, throwError} from 'rxjs';
import {map, catchError, switchMap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {AuthService} from '../auth/auth.service';
import {PocketBaseService} from './pocketbase.service';

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  user: {
    id: string;
    name: string;
  };
  service: 'psychology' | 'pet-service' | 'cat-boarding';
  status: 'pending' | 'confirmed' | 'cancelled';
  created: Date;
  updated: Date;
}

export interface TimeSlot {
  id: string;
  date: Date;
  startTime: string;
  endTime: string;
  available: boolean;
  service: 'psychology' | 'pet-service' | 'cat-boarding';
}

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  constructor(
    private pocketbaseService: PocketBaseService,
    private authService: AuthService
  ) { }


  // Get all available time slots
  getAvailableTimeSlots(
    startDate?: Date,
    endDate?: Date,
    service?: 'psychology' | 'pet-service' | 'cat-boarding'
  ): Observable<TimeSlot[]> {
    let filter = 'available = true';

    if (startDate) {
      filter += ` && date >= "${startDate.toISOString()}"`;
    }

    if (endDate) {
      filter += ` && date <= "${endDate.toISOString()}"`;
    }

    if (service) {
      filter += ` && service = "${service}"`;
    }

    return from(this.pocketbaseService.client.collection('time_slots').getList(1, 100, {
      filter: filter,
      sort: 'date,startTime'
    }))
      .pipe(
        map(response => this.mapResponseToTimeSlots(response)),
        catchError(error => {
          console.error('Error fetching time slots', error);
          return throwError(() => new Error('Failed to fetch time slots'));
        })
      );
  }

  // Get all events for the current user
  getUserEvents(): Observable<CalendarEvent[]> {
    const userId = this.authService.currentUserValue?.id;
    if (!userId) {
      return throwError(() => new Error('User not authenticated'));
    }

    return from(this.pocketbaseService.client.collection('calendar_events').getList(1, 100, {
      filter: `user = "${userId}"`,
      sort: '-startDate',
      expand: 'user'
    }))
      .pipe(
        map(response => this.mapResponseToCalendarEvents(response)),
        catchError(error => {
          console.error('Error fetching user events', error);
          return throwError(() => new Error('Failed to fetch user events'));
        })
      );
  }

  // Get all events (admin only)
  getAllEvents(): Observable<CalendarEvent[]> {
    return from(this.pocketbaseService.client.collection('calendar_events').getList(1, 100, {
      sort: '-startDate',
      expand: 'user'
    }))
      .pipe(
        map(response => this.mapResponseToCalendarEvents(response)),
        catchError(error => {
          console.error('Error fetching all events', error);
          return throwError(() => new Error('Failed to fetch all events'));
        })
      );
  }

  // Get a single event by ID
  getEventById(id: string): Observable<CalendarEvent> {
    return from(this.pocketbaseService.client.collection('calendar_events').getOne(id, {
      expand: 'user'
    }))
      .pipe(
        map(response => this.mapResponseToCalendarEvent(response)),
        catchError(error => {
          console.error(`Error fetching event with id ${id}`, error);
          return throwError(() => new Error('Failed to fetch event'));
        })
      );
  }

  // Create a new event
  createEvent(timeSlotId: string, eventData: {
    title: string;
    description?: string;
    service: 'psychology' | 'pet-service' | 'cat-boarding';
  }): Observable<CalendarEvent> {
    const userId = this.authService.currentUserValue?.id;
    if (!userId) {
      return throwError(() => new Error('User not authenticated'));
    }

    // First, get the time slot
    return from(this.pocketbaseService.client.collection('time_slots').getOne(timeSlotId))
      .pipe(
        switchMap(timeSlot => {
          if (!timeSlot.available) {
            return throwError(() => new Error('Time slot is not available'));
          }

          // Create the event
          const startDate = new Date(timeSlot.date);
          const [startHour, startMinute] = timeSlot.startTime.split(':').map(Number);
          startDate.setHours(startHour, startMinute);

          const endDate = new Date(timeSlot.date);
          const [endHour, endMinute] = timeSlot.endTime.split(':').map(Number);
          endDate.setHours(endHour, endMinute);

          const event = {
            title: eventData.title,
            description: eventData.description,
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
            user: userId,
            service: eventData.service,
            status: 'pending'
          };

          return from(this.pocketbaseService.client.collection('calendar_events').create(event));
        }),
        switchMap(event => {
          // Mark the time slot as unavailable
          return from(this.pocketbaseService.client.collection('time_slots').update(timeSlotId, { available: false }))
            .pipe(map(() => event));
        }),
        map(response => this.mapResponseToCalendarEvent(response)),
        catchError(error => {
          console.error('Error creating event', error);
          return throwError(() => new Error('Failed to create event'));
        })
      );
  }

  // Update an event (user can only update their own events)
  updateEvent(id: string, eventData: Partial<CalendarEvent>): Observable<CalendarEvent> {
    const userId = this.authService.currentUserValue?.id;
    if (!userId) {
      return throwError(() => new Error('User not authenticated'));
    }

    // First, check if the event belongs to the user
    return from(this.pocketbaseService.client.collection('calendar_events').getOne(id))
      .pipe(
        switchMap(event => {
          if (event.user !== userId) {
            return throwError(() => new Error('You can only update your own events'));
          }

          return from(this.pocketbaseService.client.collection('calendar_events').update(id, eventData));
        }),
        map(response => this.mapResponseToCalendarEvent(response)),
        catchError(error => {
          console.error(`Error updating event with id ${id}`, error);
          return throwError(() => new Error('Failed to update event'));
        })
      );
  }

  // Cancel an event (user can only cancel their own events)
  cancelEvent(id: string): Observable<CalendarEvent> {
    return this.updateEvent(id, { status: 'cancelled' });
  }

  // Helper method to map PocketBase response to CalendarEvent objects
  private mapResponseToCalendarEvents(response: any): CalendarEvent[] {
    return response.items.map((item: any) => this.mapResponseToCalendarEvent(item));
  }

  // Helper method to map a single PocketBase response to a CalendarEvent object
  private mapResponseToCalendarEvent(item: any): CalendarEvent {
    return {
      id: item.id,
      title: item.title,
      description: item.description,
      startDate: new Date(item.startDate),
      endDate: new Date(item.endDate),
      user: {
        id: item.expand?.user?.id || '',
        name: item.expand?.user?.name || 'Unknown'
      },
      service: item.service,
      status: item.status,
      created: new Date(item.created),
      updated: new Date(item.updated)
    };
  }

  // Helper method to map PocketBase response to TimeSlot objects
  private mapResponseToTimeSlots(response: any): TimeSlot[] {
    return response.items.map((item: any) => ({
      id: item.id,
      date: new Date(item.date),
      startTime: item.startTime,
      endTime: item.endTime,
      available: item.available,
      service: item.service
    }));
  }
}
