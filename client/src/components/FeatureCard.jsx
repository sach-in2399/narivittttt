import React from 'react';
import { Link } from 'react-router-dom';
import './FeatureCard.css';

const FeatureCard = ({ title, description, link }) => {
  return (
    <div className="feature-card">
      <h3>{title}</h3>
      <p>{description}</p>
      <Link to={link} className="feature-link">Learn More →</Link>
    </div>
  );
};

export default FeatureCard;