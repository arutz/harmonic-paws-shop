import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {environment} from '../../../environments/environment';
import {AuthService} from '../auth/auth.service';

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
  private apiUrl = environment.apiUrl + '/collections/calendar_events/records';

  // Mock data for development until backend is set up
  private mockEvents: CalendarEvent[] = [
    {
      id: '1',
      title: 'Tierpsychologie Beratung',
      description: 'Erstberatung für Katze mit Verhaltensproblemen',
      startDate: new Date(2023, 11, 15, 10, 0),
      endDate: new Date(2023, 11, 15, 11, 30),
      user: {
        id: '1',
        name: 'Maria Schmidt'
      },
      service: 'psychology',
      status: 'confirmed',
      created: new Date(2023, 11, 1),
      updated: new Date(2023, 11, 1)
    },
    {
      id: '2',
      title: 'Haustierservice',
      description: 'Gassi-Service für Hund',
      startDate: new Date(2023, 11, 16, 14, 0),
      endDate: new Date(2023, 11, 16, 15, 0),
      user: {
        id: '2',
        name: 'Thomas Müller'
      },
      service: 'pet-service',
      status: 'pending',
      created: new Date(2023, 11, 2),
      updated: new Date(2023, 11, 2)
    },
    {
      id: '3',
      title: 'Katzenpension',
      description: 'Unterbringung für 1 Woche',
      startDate: new Date(2023, 11, 20, 9, 0),
      endDate: new Date(2023, 11, 27, 18, 0),
      user: {
        id: '3',
        name: 'Laura Weber'
      },
      service: 'cat-boarding',
      status: 'confirmed',
      created: new Date(2023, 11, 5),
      updated: new Date(2023, 11, 5)
    }
  ];

  // Mock time slots
  private mockTimeSlots: TimeSlot[] = this.generateMockTimeSlots();

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  // Generate mock time slots for the next 30 days
  private generateMockTimeSlots(): TimeSlot[] {
    const slots: TimeSlot[] = [];
    const startDate = new Date();
    let id = 1;

    // Generate slots for the next 30 days
    for (let i = 0; i < 30; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);

      // Skip Sundays
      if (date.getDay() === 0) continue;

      // Generate 3-5 slots per day
      const numSlots = Math.floor(Math.random() * 3) + 3;

      for (let j = 0; j < numSlots; j++) {
        // Random start time between 9:00 and 16:00
        const hour = Math.floor(Math.random() * 8) + 9;
        const startTime = `${hour}:00`;
        const endTime = `${hour + 1}:00`;

        // Random service
        const services: Array<'psychology' | 'pet-service' | 'cat-boarding'> = ['psychology', 'pet-service', 'cat-boarding'];
        const service = services[Math.floor(Math.random() * services.length)];

        // 80% chance of being available
        const available = Math.random() < 0.8;

        slots.push({
          id: id.toString(),
          date: new Date(date),
          startTime,
          endTime,
          available,
          service
        });

        id++;
      }
    }

    return slots;
  }

  // Get all available time slots
  getAvailableTimeSlots(
    startDate?: Date,
    endDate?: Date,
    service?: 'psychology' | 'pet-service' | 'cat-boarding'
  ): Observable<TimeSlot[]> {
    // When backend is ready, uncomment this code
    // let url = `${this.apiUrl}/time-slots?filter=(available=true)`;
    //
    // if (startDate) {
    //   url += `&filter=(date>='${startDate.toISOString()}')`;
    // }
    //
    // if (endDate) {
    //   url += `&filter=(date<='${endDate.toISOString()}')`;
    // }
    //
    // if (service) {
    //   url += `&filter=(service='${service}')`;
    // }
    //
    // return this.http.get<any>(url)
    //   .pipe(
    //     map(response => this.mapResponseToTimeSlots(response)),
    //     catchError(error => {
    //       console.error('Error fetching time slots', error);
    //       return throwError(() => new Error('Failed to fetch time slots'));
    //     })
    //   );

    // For now, return filtered mock data
    let filteredSlots = this.mockTimeSlots.filter(slot => slot.available);

    if (startDate) {
      filteredSlots = filteredSlots.filter(slot => slot.date >= startDate);
    }

    if (endDate) {
      filteredSlots = filteredSlots.filter(slot => slot.date <= endDate);
    }

    if (service) {
      filteredSlots = filteredSlots.filter(slot => slot.service === service);
    }

    return of(filteredSlots);
  }

  // Get all events for the current user
  getUserEvents(): Observable<CalendarEvent[]> {
    // When backend is ready, uncomment this code
    // const userId = this.authService.currentUserValue?.uid;
    // if (!userId) {
    //   return throwError(() => new Error('User not authenticated'));
    // }
    //
    // return this.http.get<any>(`${this.apiUrl}?filter=(user='${userId}')&sort=-startDate`)
    //   .pipe(
    //     map(response => this.mapResponseToCalendarEvents(response)),
    //     catchError(error => {
    //       console.error('Error fetching user events', error);
    //       return throwError(() => new Error('Failed to fetch user events'));
    //     })
    //   );

    // For now, return mock data
    const userId = this.authService.currentUserValue?.uid;
    if (!userId) {
      return throwError(() => new Error('User not authenticated'));
    }

    // Simulate user's events
    return of(this.mockEvents.filter(event => event.user.id === userId));
  }

  // Get all events (admin only)
  getAllEvents(): Observable<CalendarEvent[]> {
    // When backend is ready, uncomment this code
    // return this.http.get<any>(`${this.apiUrl}?sort=-startDate`)
    //   .pipe(
    //     map(response => this.mapResponseToCalendarEvents(response)),
    //     catchError(error => {
    //       console.error('Error fetching all events', error);
    //       return throwError(() => new Error('Failed to fetch all events'));
    //     })
    //   );

    // For now, return mock data
    return of(this.mockEvents);
  }

  // Get a single event by ID
  getEventById(id: string): Observable<CalendarEvent> {
    // When backend is ready, uncomment this code
    // return this.http.get<any>(`${this.apiUrl}/${id}`)
    //   .pipe(
    //     map(response => this.mapResponseToCalendarEvent(response)),
    //     catchError(error => {
    //       console.error(`Error fetching event with id ${id}`, error);
    //       return throwError(() => new Error('Failed to fetch event'));
    //     })
    //   );

    // For now, return mock data
    const event = this.mockEvents.find(e => e.id === id);
    if (event) {
      return of(event);
    }
    return throwError(() => new Error('Event not found'));
  }

  // Create a new event
  createEvent(timeSlotId: string, eventData: {
    title: string;
    description?: string;
    service: 'psychology' | 'pet-service' | 'cat-boarding';
  }): Observable<CalendarEvent> {
    // When backend is ready, uncomment this code
    // const userId = this.authService.currentUserValue?.uid;
    // if (!userId) {
    //   return throwError(() => new Error('User not authenticated'));
    // }
    //
    // // First, get the time slot
    // return this.http.get<any>(`${this.apiUrl}/time-slots/${timeSlotId}`)
    //   .pipe(
    //     switchMap(timeSlot => {
    //       if (!timeSlot.available) {
    //         return throwError(() => new Error('Time slot is not available'));
    //       }
    //
    //       const event = {
    //         title: eventData.title,
    //         description: eventData.description,
    //         startDate: timeSlot.date + 'T' + timeSlot.startTime + ':00Z',
    //         endDate: timeSlot.date + 'T' + timeSlot.endTime + ':00Z',
    //         user: userId,
    //         service: eventData.service,
    //         status: 'pending'
    //       };
    //
    //       return this.http.post<any>(this.apiUrl, event);
    //     }),
    //     switchMap(event => {
    //       // Mark the time slot as unavailable
    //       return this.http.patch<any>(`${this.apiUrl}/time-slots/${timeSlotId}`, { available: false })
    //         .pipe(map(() => event));
    //     }),
    //     map(response => this.mapResponseToCalendarEvent(response)),
    //     catchError(error => {
    //       console.error('Error creating event', error);
    //       return throwError(() => new Error('Failed to create event'));
    //     })
    //   );

    // For now, simulate creation with mock data
    const userId = this.authService.currentUserValue?.uid;
    if (!userId) {
      return throwError(() => new Error('User not authenticated'));
    }

    // Find the time slot
    const timeSlot = this.mockTimeSlots.find(slot => slot.id === timeSlotId);
    if (!timeSlot) {
      return throwError(() => new Error('Time slot not found'));
    }

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

    const newEvent: CalendarEvent = {
      id: (this.mockEvents.length + 1).toString(),
      title: eventData.title,
      description: eventData.description,
      startDate,
      endDate,
      user: {
        id: userId,
        name: this.authService.currentUserValue?.displayName || 'User'
      },
      service: eventData.service,
      status: 'pending',
      created: new Date(),
      updated: new Date()
    };

    // Add to mock events
    this.mockEvents.push(newEvent);

    // Mark the time slot as unavailable
    const slotIndex = this.mockTimeSlots.findIndex(slot => slot.id === timeSlotId);
    if (slotIndex !== -1) {
      this.mockTimeSlots[slotIndex].available = false;
    }

    return of(newEvent);
  }

  // Update an event (user can only update their own events)
  updateEvent(id: string, eventData: Partial<CalendarEvent>): Observable<CalendarEvent> {
    // When backend is ready, uncomment this code
    // const userId = this.authService.currentUserValue?.uid;
    // if (!userId) {
    //   return throwError(() => new Error('User not authenticated'));
    // }
    //
    // // First, check if the event belongs to the user
    // return this.http.get<any>(`${this.apiUrl}/${id}`)
    //   .pipe(
    //     switchMap(event => {
    //       if (event.user !== userId) {
    //         return throwError(() => new Error('You can only update your own events'));
    //       }
    //
    //       return this.http.patch<any>(`${this.apiUrl}/${id}`, eventData);
    //     }),
    //     map(response => this.mapResponseToCalendarEvent(response)),
    //     catchError(error => {
    //       console.error(`Error updating event with id ${id}`, error);
    //       return throwError(() => new Error('Failed to update event'));
    //     })
    //   );

    // For now, simulate update with mock data
    const userId = this.authService.currentUserValue?.uid;
    if (!userId) {
      return throwError(() => new Error('User not authenticated'));
    }

    const index = this.mockEvents.findIndex(e => e.id === id);
    if (index === -1) {
      return throwError(() => new Error('Event not found'));
    }

    // Check if the event belongs to the user
    if (this.mockEvents[index].user.id !== userId) {
      return throwError(() => new Error('You can only update your own events'));
    }

    const updatedEvent = {
      ...this.mockEvents[index],
      ...eventData,
      updated: new Date()
    };

    this.mockEvents[index] = updatedEvent;
    return of(updatedEvent);
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
