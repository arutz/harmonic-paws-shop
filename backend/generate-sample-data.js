const PocketBase = require('pocketbase/cjs');

// Initialize PocketBase client
const pb = new PocketBase('http://localhost:8090');

// Admin credentials - replace with your actual admin credentials
const adminEmail = 'admin@example.com';
const adminPassword = 'your-admin-password';

async function generateSampleData() {
  try {
    // Authenticate as admin
    await pb.admins.authWithPassword(adminEmail, adminPassword);
    console.log('Admin authentication successful');

    // 1. Create sample users
    const users = await createSampleUsers();

    // 2. Create sample blog posts
    await createSampleBlogPosts(users);

    // 3. Create sample time slots
    await createSampleTimeSlots();

    // 4. Create sample calendar events
    await createSampleCalendarEvents(users);

    // 5. Create sample contact forms
    await createSampleContactForms();

    console.log('All sample data created successfully!');
  } catch (error) {
    console.error('Error:', error);
  }
}

async function createSampleUsers() {
  console.log('Creating sample users...');
  const users = [];

  try {
    // Create admin user
    const adminUser = await pb.collection('users').create({
      email: 'admin@harmonicpaws.com',
      password: 'password123',
      passwordConfirm: 'password123',
      name: 'Admin User',
      role: 'admin'
    });
    users.push(adminUser);
    console.log('Admin user created');

    // Create regular user
    const regularUser = await pb.collection('users').create({
      email: 'user@example.com',
      password: 'password123',
      passwordConfirm: 'password123',
      name: 'Regular User',
      role: 'user'
    });
    users.push(regularUser);
    console.log('Regular user created');

    return users;
  } catch (error) {
    console.error('Error creating sample users:', error);
    // If users already exist, try to fetch them
    try {
      const existingUsers = await pb.collection('users').getList(1, 10);
      return existingUsers.items;
    } catch (fetchError) {
      console.error('Error fetching existing users:', fetchError);
      return [];
    }
  }
}

async function createSampleBlogPosts(users) {
  console.log('Creating sample blog posts...');
  if (!users || users.length === 0) {
    console.error('No users available to create blog posts');
    return;
  }

  const adminUser = users.find(user => user.role === 'admin') || users[0];

  const blogPosts = [
    {
      title: 'Wie Sie Stressanzeichen bei Ihrer Katze erkennen können',
      excerpt: 'Katzen sind Meister darin, ihre Gefühle zu verbergen. Hier sind einige subtile Anzeichen, die darauf hindeuten könnten, dass Ihre Katze gestresst ist.',
      content: '<p>Katzen sind von Natur aus Meister darin, Schwäche und Unbehagen zu verbergen. Dies ist ein Überlebensinstinkt, der von ihren wilden Vorfahren stammt. Daher kann es für Katzenbesitzer schwierig sein, zu erkennen, wann ihre Katze gestresst ist.</p><p>Hier sind einige Anzeichen, auf die Sie achten sollten:</p><ul><li>Übermäßiges Putzen oder Fellrupfen</li><li>Veränderungen im Appetit</li><li>Verstecken oder ungewöhnliche Scheu</li><li>Aggressives Verhalten</li><li>Unsauberkeit (außerhalb der Katzentoilette)</li><li>Übermäßiges Miauen</li></ul><p>Wenn Sie eines dieser Anzeichen bemerken, ist es ratsam, einen Tierarzt oder Tierpsychologen zu konsultieren.</p>',
      author: adminUser.id,
      published: true,
      tags: ['Katzen', 'Verhalten', 'Stress']
    },
    {
      title: 'Die besten Spielzeuge für die geistige Anregung Ihres Hundes',
      excerpt: 'Geistige Stimulation ist für Hunde genauso wichtig wie körperliche Bewegung. Entdecken Sie die besten Spielzeuge, um den Geist Ihres Hundes aktiv zu halten.',
      content: '<p>Hunde brauchen nicht nur körperliche Bewegung, sondern auch geistige Stimulation, um glücklich und gesund zu bleiben. Langeweile kann zu Verhaltensproblemen wie übermäßigem Bellen, Kauen und sogar Depressionen führen.</p><p>Hier sind einige der besten Spielzeuge für die geistige Anregung Ihres Hundes:</p><ul><li>Puzzle-Feeder: Diese Spielzeuge erfordern, dass Ihr Hund Probleme löst, um an Leckerbissen zu gelangen.</li><li>Schnüffelmatten: Diese fördern den natürlichen Jagdinstinkt Ihres Hundes.</li><li>Interaktive Spielzeuge: Spielzeuge, die Geräusche machen oder sich bewegen, wenn Ihr Hund mit ihnen interagiert.</li><li>Kauspielzeug: Langlebiges Kauspielzeug kann Ihren Hund stundenlang beschäftigen.</li></ul><p>Denken Sie daran, die Spielzeuge regelmäßig zu wechseln, um das Interesse Ihres Hundes aufrechtzuerhalten.</p>',
      author: adminUser.id,
      published: true,
      tags: ['Hunde', 'Spielzeug', 'Training']
    },
    {
      title: 'Ernährungstipps für ältere Katzen',
      excerpt: 'Mit zunehmendem Alter ändern sich die Ernährungsbedürfnisse Ihrer Katze. Hier sind einige Tipps, wie Sie die Ernährung Ihrer älteren Katze anpassen können.',
      content: '<p>Wenn Katzen älter werden, ändern sich ihre Ernährungsbedürfnisse. Ab etwa 7 Jahren gelten Katzen als "Senior" und benötigen möglicherweise Anpassungen in ihrer Ernährung.</p><p>Hier sind einige wichtige Ernährungstipps für ältere Katzen:</p><ul><li>Erhöhter Proteinbedarf: Ältere Katzen benötigen oft mehr hochwertiges Protein, um Muskelmasse zu erhalten.</li><li>Leichter verdauliche Nahrung: Die Verdauungsfähigkeit nimmt mit dem Alter ab.</li><li>Angepasster Kaloriengehalt: Ältere, weniger aktive Katzen benötigen möglicherweise weniger Kalorien, während sehr alte Katzen manchmal Schwierigkeiten haben, ihr Gewicht zu halten.</li><li>Erhöhte Flüssigkeitszufuhr: Ältere Katzen sind anfälliger für Nierenprobleme, daher ist eine ausreichende Flüssigkeitszufuhr wichtig.</li><li>Nahrungsergänzungsmittel: Omega-3-Fettsäuren, Glucosamin und Chondroitin können bei Gelenkproblemen helfen.</li></ul><p>Konsultieren Sie immer einen Tierarzt, bevor Sie die Ernährung Ihrer Katze wesentlich umstellen.</p>',
      author: adminUser.id,
      published: true,
      tags: ['Katzen', 'Ernährung', 'Senioren']
    }
  ];

  try {
    for (const post of blogPosts) {
      await pb.collection('blog_posts').create(post);
    }
    console.log(`${blogPosts.length} blog posts created`);
  } catch (error) {
    console.error('Error creating sample blog posts:', error);
  }
}

async function createSampleTimeSlots() {
  console.log('Creating sample time slots...');

  // Generate time slots for the next 30 days
  const timeSlots = [];
  const startDate = new Date();

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
      const services = ['psychology', 'pet-service', 'cat-boarding'];
      const service = services[Math.floor(Math.random() * services.length)];

      // 80% chance of being available
      const available = Math.random() < 0.8;

      timeSlots.push({
        date: date.toISOString().split('T')[0],
        startTime,
        endTime,
        available,
        service
      });
    }
  }

  try {
    for (const slot of timeSlots) {
      await pb.collection('time_slots').create(slot);
    }
    console.log(`${timeSlots.length} time slots created`);
  } catch (error) {
    console.error('Error creating sample time slots:', error);
  }
}

async function createSampleCalendarEvents(users) {
  console.log('Creating sample calendar events...');
  if (!users || users.length === 0) {
    console.error('No users available to create calendar events');
    return;
  }

  // Get some available time slots
  let availableSlots;
  try {
    const response = await pb.collection('time_slots').getList(1, 10, {
      filter: 'available = true'
    });
    availableSlots = response.items;
  } catch (error) {
    console.error('Error fetching available time slots:', error);
    return;
  }

  if (!availableSlots || availableSlots.length === 0) {
    console.error('No available time slots found');
    return;
  }

  // Create a few events for each user
  for (const user of users) {
    if (availableSlots.length === 0) break;

    // Take 1-3 slots for this user
    const numEvents = Math.min(Math.floor(Math.random() * 3) + 1, availableSlots.length);

    for (let i = 0; i < numEvents; i++) {
      if (availableSlots.length === 0) break;

      const slot = availableSlots.pop();

      // Create event
      const startDate = new Date(slot.date);
      const [startHour, startMinute] = slot.startTime.split(':').map(Number);
      startDate.setHours(startHour, startMinute);

      const endDate = new Date(slot.date);
      const [endHour, endMinute] = slot.endTime.split(':').map(Number);
      endDate.setHours(endHour, endMinute);

      const event = {
        title: `Termin für ${user.name}`,
        description: `Ein Beispieltermin für den Service ${slot.service}`,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        user: user.id,
        service: slot.service,
        status: ['pending', 'confirmed', 'cancelled'][Math.floor(Math.random() * 3)]
      };

      try {
        await pb.collection('calendar_events').create(event);
        // Mark the slot as unavailable
        await pb.collection('time_slots').update(slot.id, { available: false });
      } catch (error) {
        console.error('Error creating calendar event:', error);
      }
    }
  }

  console.log('Sample calendar events created');
}

async function createSampleContactForms() {
  console.log('Creating sample contact forms...');

  const contactForms = [
    {
      name: 'Maria Schmidt',
      email: 'maria.schmidt@example.com',
      phone: '0123456789',
      subject: 'Anfrage zur Tierpsychologie',
      message: 'Ich habe Fragen zur Verhaltensberatung für meine Katze. Können Sie mir mehr Informationen geben?',
      responded: true
    },
    {
      name: 'Thomas Müller',
      email: 'thomas.mueller@example.com',
      phone: '0987654321',
      subject: 'Haustierservice Verfügbarkeit',
      message: 'Ich möchte wissen, ob Sie in der nächsten Woche für den Gassi-Service verfügbar sind.',
      responded: false
    },
    {
      name: 'Laura Weber',
      email: 'laura.weber@example.com',
      phone: '0123987456',
      subject: 'Katzenpension Buchung',
      message: 'Ich würde gerne meine Katze für zwei Wochen im Dezember in Ihrer Pension unterbringen. Haben Sie noch Plätze frei?',
      responded: false
    }
  ];

  try {
    for (const form of contactForms) {
      await pb.collection('contact_forms').create(form);
    }
    console.log(`${contactForms.length} contact forms created`);
  } catch (error) {
    console.error('Error creating sample contact forms:', error);
  }
}

generateSampleData()
  .then(() => console.log('Sample data generation completed'))
  .catch(err => console.error('Sample data generation failed:', err));
