import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { cors } from 'hono/cors';
import { v4 as uuidv4 } from 'uuid';

const app = new Hono();

// Enable CORS for all routes
app.use('*', cors());

interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string;
  address?: string;
}

let contacts: Contact[] = [];

// Get all contacts
app.get('/api/contacts', (c) => {
  return c.json(contacts);
});

// Get a single contact by ID
app.get('/api/contacts/:id', (c) => {
  const contact = contacts.find(contact => contact.id === c.req.param('id'));
  if (contact) {
    return c.json(contact);
  }
  return c.json({ message: 'Contact not found' }, 404);
});

// Add a new contact
app.post('/api/contacts', async (c) => {
  const body = await c.req.json();
  const newContact: Contact = {
    id: uuidv4(),
    ...body,
  };
  contacts.push(newContact);
  return c.json(newContact, 201);
});

// Update an existing contact by ID
app.put('/api/contacts/:id', async (c) => {
  const id = c.req.param('id');
  const body = await c.req.json();
  contacts = contacts.map(contact => 
    contact.id === id ? { ...contact, ...body } : contact
  );
  const updatedContact = contacts.find(contact => contact.id === id);
  return c.json(updatedContact || { message: 'Contact not found' }, 404);
});

// Delete a contact by ID
app.delete('/api/contacts/:id', (c) => {
  const id = c.req.param('id');
  const initialLength = contacts.length;
  contacts = contacts.filter(contact => contact.id !== id);
  if (contacts.length < initialLength) {
    return c.json({ message: 'Contact deleted' }, 200);
  }
  return c.json({ message: 'Contact not found' }, 404);
});

// Start the server
serve(app); // You can change the port if needed
