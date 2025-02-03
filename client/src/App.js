import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import FinancialEducation from './pages/FinancialEducation';
import Budgeting from './pages/Budgeting';
import MicroInvestments from './pages/MicroInvestments';
import InventoryManagement from './pages/InventoryManagement';
import Marketplace from './pages/Marketplace';
import CommunityLearning from './pages/CommunityLearning';
import Banking from './pages/Banking';
import Login from './pages/Login';
import Signup from './pages/Signup';
import FeaturesPage from "./pages/FeaturesPage";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/financial-education" element={<FinancialEducation />} />
        <Route path="/budgeting" element={<Budgeting />} />
        <Route path="/micro-investments" element={<MicroInvestments />} />
        <Route path="/inventory-management" element={<InventoryManagement />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/community-learning" element={<CommunityLearning />} />
        <Route path="/banking" element={<Banking />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Router>
  );
};

export default App;