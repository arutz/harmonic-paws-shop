const PocketBase = require('pocketbase/cjs');

// Initialize PocketBase client
const pb = new PocketBase('http://localhost:8090');

// Admin credentials - replace with your actual admin credentials
const adminEmail = 'admin@example.com';
const adminPassword = 'your-admin-password';

async function createCollections() {
  try {
    // Authenticate as admin
    await pb.admins.authWithPassword(adminEmail, adminPassword);
    console.log('Admin authentication successful');

    // 1. Update Users Collection (already exists, but we need to extend it)
    try {
      const usersCollection = await pb.collections.getOne('users');

      // Add custom fields to users collection
      await pb.collections.update('users', {
        schema: [
          ...usersCollection.schema,
          {
            name: 'avatar',
            type: 'file',
            required: false
          },
          {
            name: 'displayName',
            type: 'text',
            required: false
          },
          {
            name: 'role',
            type: 'select',
            required: false,
            options: {
              values: ['user', 'admin']
            }
          }
        ]
      });
      console.log('Users collection updated successfully');
    } catch (error) {
      console.error('Error updating users collection:', error);
    }

    // 2. Create Blog Posts Collection
    try {
      await pb.collections.create({
        name: 'blog_posts',
        type: 'base',
        schema: [
          {
            name: 'title',
            type: 'text',
            required: true
          },
          {
            name: 'content',
            type: 'editor',
            required: true
          },
          {
            name: 'excerpt',
            type: 'text',
            required: false
          },
          {
            name: 'image',
            type: 'file',
            required: false
          },
          {
            name: 'author',
            type: 'relation',
            required: true,
            options: {
              collectionId: '_pb_users_auth_',
              cascadeDelete: false
            }
          },
          {
            name: 'published',
            type: 'bool',
            required: true,
            default: false
          },
          {
            name: 'tags',
            type: 'text',
            required: false,
            options: {
              isMultiple: true
            }
          }
        ],
        listRule: "published = true",
        viewRule: "published = true",
        createRule: "@request.auth.role = 'admin'",
        updateRule: "@request.auth.role = 'admin'",
        deleteRule: "@request.auth.role = 'admin'"
      });
      console.log('Blog Posts collection created successfully');
    } catch (error) {
      console.error('Error creating blog_posts collection:', error);
    }

    // 3. Create Calendar Events Collection
    try {
      await pb.collections.create({
        name: 'calendar_events',
        type: 'base',
        schema: [
          {
            name: 'title',
            type: 'text',
            required: true
          },
          {
            name: 'description',
            type: 'text',
            required: false
          },
          {
            name: 'startDate',
            type: 'date',
            required: true
          },
          {
            name: 'endDate',
            type: 'date',
            required: true
          },
          {
            name: 'user',
            type: 'relation',
            required: true,
            options: {
              collectionId: '_pb_users_auth_',
              cascadeDelete: false
            }
          },
          {
            name: 'service',
            type: 'select',
            required: true,
            options: {
              values: ['psychology', 'pet-service', 'cat-boarding']
            }
          },
          {
            name: 'status',
            type: 'select',
            required: true,
            options: {
              values: ['pending', 'confirmed', 'cancelled']
            }
          }
        ],
        listRule: "@request.auth.id = user.id || @request.auth.role = 'admin'",
        viewRule: "@request.auth.id = user.id || @request.auth.role = 'admin'",
        createRule: "@request.auth.id != ''",
        updateRule: "@request.auth.id = user.id || @request.auth.role = 'admin'",
        deleteRule: "@request.auth.role = 'admin'"
      });
      console.log('Calendar Events collection created successfully');
    } catch (error) {
      console.error('Error creating calendar_events collection:', error);
    }

    // 4. Create Time Slots Collection
    try {
      await pb.collections.create({
        name: 'time_slots',
        type: 'base',
        schema: [
          {
            name: 'date',
            type: 'date',
            required: true
          },
          {
            name: 'startTime',
            type: 'text',
            required: true
          },
          {
            name: 'endTime',
            type: 'text',
            required: true
          },
          {
            name: 'available',
            type: 'bool',
            required: true,
            default: true
          },
          {
            name: 'service',
            type: 'select',
            required: true,
            options: {
              values: ['psychology', 'pet-service', 'cat-boarding']
            }
          }
        ],
        listRule: "",
        viewRule: "",
        createRule: "@request.auth.role = 'admin'",
        updateRule: "@request.auth.role = 'admin'",
        deleteRule: "@request.auth.role = 'admin'"
      });
      console.log('Time Slots collection created successfully');
    } catch (error) {
      console.error('Error creating time_slots collection:', error);
    }

    // 5. Create Contact Forms Collection
    try {
      await pb.collections.create({
        name: 'contact_forms',
        type: 'base',
        schema: [
          {
            name: 'name',
            type: 'text',
            required: true
          },
          {
            name: 'email',
            type: 'email',
            required: true
          },
          {
            name: 'phone',
            type: 'text',
            required: false
          },
          {
            name: 'subject',
            type: 'text',
            required: false
          },
          {
            name: 'message',
            type: 'text',
            required: true
          },
          {
            name: 'responded',
            type: 'bool',
            required: false,
            default: false
          }
        ],
        listRule: "@request.auth.role = 'admin'",
        viewRule: "@request.auth.role = 'admin'",
        createRule: "",  // Anyone can create
        updateRule: "@request.auth.role = 'admin'",
        deleteRule: "@request.auth.role = 'admin'"
      });
      console.log('Contact Forms collection created successfully');
    } catch (error) {
      console.error('Error creating contact_forms collection:', error);
    }

    console.log('All collections created successfully!');
  } catch (error) {
    console.error('Error:', error);
  }
}

createCollections()
  .then(() => console.log('Script completed'))
  .catch(err => console.error('Script failed:', err));
