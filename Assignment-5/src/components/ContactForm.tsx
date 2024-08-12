import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useContactStore } from '../store/ContactStore';

const ContactForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();  // Extract the ID from the URL
  const navigate = useNavigate();
  const { addContact, updateContact, contacts } = useContactStore((state) => ({
    addContact: state.addContact,
    updateContact: state.updateContact,
    contacts: state.contacts,
  }));

  const existingContact = contacts.find((contact) => contact.id === id);

  const [name, setName] = useState(existingContact?.name || '');
  const [phone, setPhone] = useState(existingContact?.phone || '');
  const [email, setEmail] = useState(existingContact?.email || '');
  const [address, setAddress] = useState(existingContact?.address || '');

  const handleSubmit = () => {
    const contact = { id: existingContact ? existingContact.id : '', name, phone, email, address };
    if (existingContact) {
      updateContact(existingContact.id, contact);
    } else {
      addContact(contact);
    }
    navigate('/');
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">{existingContact ? 'Edit' : 'Add'} Contact</h1>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">Phone</label>
        <input
          id="phone"
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">Address</label>
        <input
          id="address"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <button
        onClick={handleSubmit}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        {existingContact ? 'Update' : 'Add'} Contact
      </button>
    </div>
  );
};

export default ContactForm;
