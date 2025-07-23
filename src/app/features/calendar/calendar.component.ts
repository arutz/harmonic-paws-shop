import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf, DatePipe, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface TimeSlot {
  id: number;
  date: Date;
  startTime: string;
  endTime: string;
  available: boolean;
  service: string;
}

interface Booking {
  id: number;
  timeSlotId: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  petName: string;
  petType: string;
  service: string;
  notes: string;
}

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [NgFor, NgIf, DatePipe, NgClass, FormsModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent implements OnInit {
  // Current date and selected date
  currentDate: Date = new Date();
  selectedDate: Date | null = null;

  // Available services
  services = [
    { id: 'psychology', name: 'Tierpsychologie' },
    { id: 'pet-service', name: 'Haustierservice' },
    { id: 'cat-boarding', name: 'Katzenpension' }
  ];

  // Selected service for filtering
  selectedService: string = '';

  // Calendar view (month, week, day)
  calendarView: 'month' | 'week' | 'day' = 'month';

  // Days of the week
  daysOfWeek = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];

  // Calendar days for the current month view
  calendarDays: { date: Date, isCurrentMonth: boolean, hasAvailableSlots: boolean }[] = [];

  // Time slots for the selected date
  timeSlots: TimeSlot[] = [];

  // Selected time slot for booking
  selectedTimeSlot: TimeSlot | null = null;

  // Booking form data
  bookingForm = {
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    petName: '',
    petType: '',
    service: '',
    notes: ''
  };

  // Mock data for time slots
  allTimeSlots: TimeSlot[] = this.generateMockTimeSlots();

  // Mock data for existing bookings
  existingBookings: Booking[] = [
    {
      id: 1,
      timeSlotId: 5,
      customerName: 'Maria Schmidt',
      customerEmail: 'maria.schmidt@example.com',
      customerPhone: '0123456789',
      petName: 'Luna',
      petType: 'Katze',
      service: 'Tierpsychologie',
      notes: 'Luna zeigt Anzeichen von Trennungsangst.'
    },
    {
      id: 2,
      timeSlotId: 12,
      customerName: 'Thomas Müller',
      customerEmail: 'thomas.mueller@example.com',
      customerPhone: '0987654321',
      petName: 'Max',
      petType: 'Hund',
      service: 'Haustierservice',
      notes: 'Max benötigt zweimal täglich seine Medikamente.'
    }
  ];

  // Booking success flag
  bookingSuccess: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.generateCalendarDays(this.currentDate);
  }

  // Generate mock time slots for the next 30 days
  generateMockTimeSlots(): TimeSlot[] {
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
        const serviceIndex = Math.floor(Math.random() * this.services.length);
        const service = this.services[serviceIndex].id;

        // 80% chance of being available
        const available = Math.random() < 0.8;

        slots.push({
          id: id++,
          date: new Date(date),
          startTime,
          endTime,
          available,
          service
        });
      }
    }

    return slots;
  }

  // Generate calendar days for the month view
  generateCalendarDays(date: Date): void {
    this.calendarDays = [];

    const year = date.getFullYear();
    const month = date.getMonth();

    // First day of the month
    const firstDay = new Date(year, month, 1);
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0);

    // Start from the previous month if the first day is not Sunday
    const daysFromPrevMonth = firstDay.getDay();
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - daysFromPrevMonth);

    // Total days to show (42 = 6 weeks)
    const totalDays = 42;

    for (let i = 0; i < totalDays; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);

      // Check if the date has available slots
      const hasAvailableSlots = this.allTimeSlots.some(slot =>
        slot.available &&
        slot.date.getDate() === currentDate.getDate() &&
        slot.date.getMonth() === currentDate.getMonth() &&
        slot.date.getFullYear() === currentDate.getFullYear() &&
        (this.selectedService === '' || slot.service === this.selectedService)
      );

      this.calendarDays.push({
        date: currentDate,
        isCurrentMonth: currentDate.getMonth() === month,
        hasAvailableSlots
      });
    }
  }

  // Change the current month
  changeMonth(delta: number): void {
    const newDate = new Date(this.currentDate);
    newDate.setMonth(newDate.getMonth() + delta);
    this.currentDate = newDate;
    this.generateCalendarDays(this.currentDate);
  }

  // Select a date and show available time slots
  selectDate(date: Date): void {
    this.selectedDate = date;
    this.selectedTimeSlot = null;
    this.bookingSuccess = false;

    // Filter time slots for the selected date and service
    this.timeSlots = this.allTimeSlots.filter(slot =>
      slot.date.getDate() === date.getDate() &&
      slot.date.getMonth() === date.getMonth() &&
      slot.date.getFullYear() === date.getFullYear() &&
      (this.selectedService === '' || slot.service === this.selectedService)
    );
  }

  // Select a time slot for booking
  selectTimeSlot(slot: TimeSlot): void {
    if (!slot.available) return;

    this.selectedTimeSlot = slot;
    this.bookingForm.service = this.services.find(s => s.id === slot.service)?.name || '';
  }

  // Filter time slots by service
  filterByService(): void {
    if (this.selectedDate) {
      this.selectDate(this.selectedDate);
    }
    this.generateCalendarDays(this.currentDate);
  }

  // Submit booking form
  submitBooking(): void {
    if (!this.selectedTimeSlot) return;

    // In a real app, this would send the booking to a backend service
    const newBooking: Booking = {
      id: this.existingBookings.length + 1,
      timeSlotId: this.selectedTimeSlot.id,
      customerName: this.bookingForm.customerName,
      customerEmail: this.bookingForm.customerEmail,
      customerPhone: this.bookingForm.customerPhone,
      petName: this.bookingForm.petName,
      petType: this.bookingForm.petType,
      service: this.bookingForm.service,
      notes: this.bookingForm.notes
    };

    // Add to existing bookings
    this.existingBookings.push(newBooking);

    // Mark the time slot as unavailable
    const slotIndex = this.allTimeSlots.findIndex(slot => slot.id === this.selectedTimeSlot?.id);
    if (slotIndex !== -1) {
      this.allTimeSlots[slotIndex].available = false;
    }

    // Update the time slots for the selected date
    if (this.selectedDate) {
      this.selectDate(this.selectedDate);
    }

    // Show success message
    this.bookingSuccess = true;

    // Reset form
    this.resetForm();
  }

  // Reset booking form
  resetForm(): void {
    this.bookingForm = {
      customerName: '',
      customerEmail: '',
      customerPhone: '',
      petName: '',
      petType: '',
      service: '',
      notes: ''
    };
    this.selectedTimeSlot = null;
  }

  // Get service name by ID
  getServiceName(serviceId: string): string {
    return this.services.find(s => s.id === serviceId)?.name || serviceId;
  }

  // Check if a time slot is booked
  isTimeSlotBooked(slotId: number): boolean {
    return this.existingBookings.some(booking => booking.timeSlotId === slotId);
  }
}
