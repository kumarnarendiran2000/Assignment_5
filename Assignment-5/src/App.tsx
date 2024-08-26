import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AddContact from './pages/AddContact';
import EditContact from './pages/EditContact';
import ViewContact from './pages/ViewContact'; // Import the ViewContact component

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddContact />} />
        <Route path="/edit/:id" element={<EditContact />} />
        <Route path="/view/:id" element={<ViewContact />} /> {/* Route to view contact details */}
      </Routes>
    </Router>
  );
};

export default App;
