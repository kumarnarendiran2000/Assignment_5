import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useContactStore } from '../store/ContactStore';

const ContactDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const contact = useContactStore((state) => state.contacts.find(c => c.id === id));

  if (!contact) {
    return <div className="text-center text-gray-500">Contact not found</div>;
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-4 text-gray-900">{contact.name}</h1>
      <p className="mb-2 text-gray-700"><strong>Phone:</strong> {contact.phone}</p>
      <p className="mb-2 text-gray-700"><strong>Email:</strong> {contact.email}</p>
      <p className="mb-2 text-gray-700"><strong>Address:</strong> {contact.address}</p>
      <Link to={`/edit/${contact.id}`} className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded mt-4 inline-block">
        Edit
      </Link>
    </div>
  );
};

export default ContactDetail;
