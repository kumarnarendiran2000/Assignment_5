import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AddContact from './pages/AddContact';
import EditContact from './pages/EditContact';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddContact />} />
        <Route path="/edit/:id" element={<EditContact />} />  {/* This expects an ID */}
      </Routes>
    </Router>
  );
};

export default App;
