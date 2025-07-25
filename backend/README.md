# Harmonic Paws Backend Setup

This directory contains the backend setup for the Harmonic Paws application using PocketBase.

## PocketBase Docker Setup

The backend uses PocketBase running in a Docker container. The Docker Compose configuration is in the `docker-compose.yml` file.

To start the PocketBase server:

```bash
cd backend
docker-compose up -d
```

This will start the PocketBase server on port 8090. You can access the admin dashboard at http://localhost:8090/_/.

## Creating an Admin Account

Before running the collection creation script, you need to create an admin account:

1. Access the PocketBase admin dashboard at http://localhost:8090/_/
2. Click on "Create admin account"
3. Fill in your email and password
4. Click "Create"

## Setting Up Collections

This directory includes scripts to automatically create all the required collections for the application and populate them with sample data.

### Prerequisites

- Node.js installed
- PocketBase server running
- Admin account created

### Running the Script

1. Update the admin credentials in the `create-collections.js` file:

```javascript
// Admin credentials - replace with your actual admin credentials
const adminEmail = 'your-admin-email@example.com';
const adminPassword = 'your-admin-password';
```

2. Run the script:

```bash
cd backend
node create-collections.js
```

3. Check the console output to verify that all collections were created successfully.

### Generating Sample Data

After creating the collections, you can populate them with sample data using the provided script:

1. Make sure you've updated the admin credentials in the `generate-sample-data.js` file:

```javascript
// Admin credentials - replace with your actual admin credentials
const adminEmail = 'your-admin-email@example.com';
const adminPassword = 'your-admin-password';
```

2. Run the script:

```bash
cd backend
node generate-sample-data.js
```

3. The script will create:
   - Sample users (admin and regular user)
   - Sample blog posts with rich content
   - Time slots for the next 30 days
   - Sample calendar events
   - Sample contact form submissions

This sample data is useful for testing the frontend components without having to manually create content.

## Collections Created

The script creates the following collections:

1. **Users** (extends the built-in users collection)
   - Added fields: avatar, displayName, role

2. **Blog Posts**
   - Fields: title, content, excerpt, image, author, published, tags
   - Security: Anyone can view published posts, only admins can create/update/delete

3. **Calendar Events**
   - Fields: title, description, startDate, endDate, user, service, status
   - Security: Users can only access their own events, admins can access all

4. **Time Slots**
   - Fields: date, startTime, endTime, available, service
   - Security: Anyone can view, only admins can create/update/delete

5. **Contact Forms**
   - Fields: name, email, phone, subject, message, responded
   - Security: Anyone can submit, only admins can view/update/delete

## Troubleshooting

If you encounter any issues:

1. Make sure the PocketBase server is running
2. Verify that your admin credentials are correct
3. Check the console output for specific error messages
4. If a collection already exists, the script will log an error but continue with the next collection
