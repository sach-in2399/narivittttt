import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import FeatureCard from '../components/FeatureCard';
import './HomePage.css'; // New CSS file for styling
import './Login';
import './Signup';
import './FeaturesPage';
import './ContactPage';
import './AboutPage';



const HomePage = () => {
  const navigate = useNavigate(); // Hook for navigation

  const features = [
    {
      id: 1,
      title: 'AI-Powered Financial Education',
      description: 'Learn financial concepts in your local language with AI chatbots and voice assistants.',
      link: '/financial-education',
    },
    {
      id: 2,
      title: 'AI-Driven Budgeting & Financial Planning',
      description: 'Track expenses, cash flow, and savings with personalized financial recommendations.',
      link: '/budgeting',
    },
    {
      id: 3,
      title: 'Micro-Investment & Business Loans',
      description: 'Invest with as little as ₹100 and access low-interest micro-loans.',
      link: '/micro-investments',
    },
    {
      id: 4,
      title: 'Smart Inventory Management',
      description: 'Manage stock levels, sales, and resources with automated alerts.',
      link: '/inventory-management',
    },
    {
      id: 5,
      title: 'Marketplace & Farm-to-Market Access',
      description: 'Sell directly through an integrated marketplace and get real-time market insights.',
      link: '/marketplace',
    },
    {
      id: 6,
      title: 'Community Learning & Expert Mentorship',
      description: 'Connect with peers and access mentorship from experienced entrepreneurs.',
      link: '/community-learning',
    },
    {
      id: 7,
      title: 'Simplified Banking & Risk Mitigation',
      description: 'Access micro-savings, low-cost loans, and insurance tailored for rural entrepreneurs.',
      link: '/banking',
    },
  ];

  return (
    <div className="home-page">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="logo">NARIVITT</div>
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/features">Features</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
        <div className="auth-buttons">
          <button onClick={() => navigate('/login')} className="login-button">Login</button>
          <button onClick={() => navigate('/signup')} className="signup-button">Signup</button>
        </div>
      </nav>

      <div className="hero-section">
        <div className="hero-content">
          <h1>Welcome to <span className="highlight">NARIVITT...</span></h1>
          <p>Empowering rural women with AI-driven financial tools and resources.</p>
          <button className="cta-button" onClick={() => navigate('/login')}>
            Get Started
          </button>
        </div>
        <div className="hero-image">
        </div>
      </div>

      <div className="features-grid">
        {features.map((feature) => (
          <FeatureCard
            key={feature.id}
            title={feature.title}
            description={feature.description}
            link={feature.link}
          />
        ))}
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2025 NARIVITT. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;