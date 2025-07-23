# Backend Implementation Plan for Harmonic Paws

This document outlines the plan for implementing the backend services for the Harmonic Paws website using PocketBase.

## What is PocketBase?

PocketBase is an open-source backend consisting of an embedded database (SQLite) with a realtime API, authentication, file storage, and an admin dashboard. It's a great choice for small to medium-sized projects as it's easy to set up and use.

## Setup Instructions

1. Download PocketBase from [pocketbase.io](https://pocketbase.io/docs/)
2. Extract the executable to this directory
3. Run the executable to start the PocketBase server
4. Access the admin dashboard at `http://127.0.0.1:8090/_/`
5. Create an admin account
6. Configure the collections as described below

## Required Collections

### Users Collection

PocketBase comes with a built-in users collection that we'll use for authentication. We'll extend it with the following fields:

- `avatar` (file) - User profile picture
- `displayName` (text) - User's display name
- `role` (select) - User role (user, admin)

### Blog Posts Collection

- `id` (auto-generated)
- `title` (text, required)
- `content` (text, rich editor, required)
- `excerpt` (text)
- `image` (file)
- `author` (relation to Users)
- `created` (date, auto)
- `updated` (date, auto)
- `published` (boolean)
- `tags` (text, multiple)

### Calendar Events Collection

- `id` (auto-generated)
- `title` (text, required)
- `description` (text)
- `startDate` (date, required)
- `endDate` (date, required)
- `user` (relation to Users)
- `service` (select: psychology, pet-service, cat-boarding)
- `status` (select: pending, confirmed, cancelled)
- `created` (date, auto)
- `updated` (date, auto)

### Contact Messages Collection

- `id` (auto-generated)
- `name` (text, required)
- `email` (text, required)
- `phone` (text)
- `subject` (text)
- `message` (text, required)
- `created` (date, auto)
- `read` (boolean)
- `responded` (boolean)

## API Integration

We'll create a service for each collection to handle the API integration:

1. `AuthService` - Handle user authentication (already implemented in the frontend)
2. `BlogService` - Handle blog post CRUD operations
3. `CalendarService` - Handle calendar event CRUD operations
4. `ContactService` - Handle contact form submissions

## Security Rules

We'll configure the following security rules:

1. Blog Posts:
   - Anyone can read published posts
   - Only authenticated users with admin role can create, update, or delete posts

2. Calendar Events:
   - Authenticated users can create events
   - Users can only read, update, or delete their own events
   - Admins can read, update, or delete any event

3. Contact Messages:
   - Anyone can create a message
   - Only admins can read, update, or delete messages

## Implementation Steps

1. Set up PocketBase server
2. Configure collections and security rules
3. Create API services in the Angular application
4. Connect frontend components to the backend services
5. Test the integration

## Deployment

For production deployment, we'll need to:

1. Set up a server to host PocketBase
2. Configure domain and SSL
3. Set up proper backup procedures
4. Configure environment variables for the frontend to connect to the production backend
