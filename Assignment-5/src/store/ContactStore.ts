import create from 'zustand';
import axios from 'axios';

interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string;
  address?: string;
}

interface ContactStore {
  contacts: Contact[];
  fetchContacts: () => void;
  addContact: (contact: Contact) => void;
  updateContact: (id: string, contact: Contact) => void;
  deleteContact: (id: string) => void;
}

export const useContactStore = create<ContactStore>((set) => ({
  contacts: [],

  fetchContacts: async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/contacts');
      set({ contacts: response.data });
    } catch (error) {
      console.error('Failed to fetch contacts:', error);
      set({ contacts: [] });
    }
  },

  addContact: async (contact: Contact) => {
    try {
      const response = await axios.post('http://localhost:3000/api/contacts', contact);
      set((state) => ({ contacts: [...state.contacts, response.data] }));
    } catch (error) {
      console.error('Failed to add contact:', error);
    }
  },

  updateContact: async (id: string, contact: Contact) => {
    try {
      const response = await axios.put(`http://localhost:3000/api/contacts/${id}`, contact);
      set((state) => ({
        contacts: state.contacts.map((c) => (c.id === id ? response.data : c)),
      }));
    } catch (error) {
      console.error('Failed to update contact:', error);
    }
  },

  deleteContact: async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/api/contacts/${id}`);  // Ensure the ID is appended
      set((state) => ({
        contacts: state.contacts.filter((c) => c.id !== id),
      }));
    } catch (error) {
      console.error('Failed to delete contact:', error);
    }
  },
}));
