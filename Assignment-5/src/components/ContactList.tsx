import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useContactStore } from '../store/ContactStore';

const ContactList: React.FC = () => {
  const contacts = useContactStore((state) => state.contacts);
  const fetchContacts = useContactStore((state) => state.fetchContacts);
  const deleteContact = useContactStore((state) => state.deleteContact);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Contact Manager</h1>
      <Link to="/add" className="bg-blue-500 text-white px-4 py-2 rounded">
        Add Contact
      </Link>

      {contacts.length === 0 ? (
        <div className="mt-4">No contacts available</div>
      ) : (
        <ul className="mt-4">
          {contacts.map((contact) => (
            <li key={contact.id} className="mb-4 p-4 border rounded">
              <h2 className="text-2xl">{contact.name}</h2>
              <p>{contact.phone}</p>
              <p>{contact.email}</p>
              <Link to={`/edit/${contact.id}`} className="text-blue-500 mr-4">
                Edit
              </Link>
              <button
                onClick={() => deleteContact(contact.id)}  // Make sure contact.id is passed
                className="text-red-500"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ContactList;
