import React from 'react';
import ContactList from '../components/ContactList';

const Home: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <ContactList />
    </div>
  );
};

export default Home;
