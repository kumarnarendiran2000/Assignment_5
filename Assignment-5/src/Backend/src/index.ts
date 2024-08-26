import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { cors } from 'hono/cors';
import { v4 as uuidv4 } from 'uuid';

const app = new Hono();

app.use('*', cors());

interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string;
  address?: string;
}

let contacts: Contact[] = [];

app.get('/api/contacts', (c) => {
  return c.json(contacts);
});

app.get('/api/contacts/:id', (c) => {
  const contact = contacts.find(contact => contact.id === c.req.param('id'));
  if (contact) {
    return c.json(contact);
  }
  return c.json({ message: 'Contact not found' }, 404);
});

app.post('/api/contacts', async (c) => {
  const body = await c.req.json();
  const newContact: Contact = {
    id: uuidv4(),
    name: body.name,
    phone: body.phone,
    email: body.email,
    address: body.address,
  };
  contacts.push(newContact);
  return c.json(newContact, 201);
});

app.put('/api/contacts/:id', async (c) => {
  const id = c.req.param('id');
  const body = await c.req.json();
  const contactIndex = contacts.findIndex(contact => contact.id === id);
  
  if (contactIndex !== -1) {
    contacts[contactIndex] = { ...contacts[contactIndex], ...body };
    return c.json(contacts[contactIndex]);
  }

  return c.json({ message: 'Contact not found' }, 404);
});

app.delete('/api/contacts/:id', (c) => {
  const id = c.req.param('id');
  const initialLength = contacts.length;
  contacts = contacts.filter(contact => contact.id !== id);

  if (contacts.length < initialLength) {
    return c.json({ message: 'Contact deleted' }, 200);
  }

  return c.json({ message: 'Contact not found' }, 404);
});

serve(app);
