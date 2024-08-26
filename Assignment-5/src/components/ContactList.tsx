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
    <div className="max-w-5xl mx-auto mt-10 bg-gray-50 py-8 px-6 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Contact Manager</h1>
      <Link to="/add" className="bg-green-500 hover:bg-green-700 text-white px-6 py-3 rounded-lg mb-8 inline-block shadow-md">
        Add Contact
      </Link>

      {contacts.length === 0 ? (
        <div className="mt-6 text-center text-gray-500">No contacts available</div>
      ) : (
        <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {contacts.map((contact) => (
            <li key={contact.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h2 className="text-2xl font-bold text-gray-900">{contact.name}</h2>
              <p className="text-gray-700 mt-2"><strong>Phone:</strong> {contact.phone}</p>
              <p className="text-gray-700 mt-2"><strong>Email:</strong> {contact.email}</p>
              <p className="text-gray-700 mt-2"><strong>Address:</strong> {contact.address}</p>
              <div className="mt-6 flex justify-between">
                <Link to={`/view/${contact.id}`} className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded-lg">
                  View
                </Link>
                <Link to={`/edit/${contact.id}`} className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                  Edit
                </Link>
                <button
                  onClick={() => deleteContact(contact.id)}
                  className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ContactList;
