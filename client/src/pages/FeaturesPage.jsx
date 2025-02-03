import React from "react";
import FeatureCard from "../components/FeatureCard";
import "./FeaturesPage.css";

const features = [
  { id: 1, title: "AI-Powered Financial Education", description: "Learn financial concepts in your local language with AI chatbots and voice assistants." },
  { id: 2, title: "AI-Driven Budgeting", description: "Track expenses and savings with personalized recommendations." },
  { id: 3, title: "Micro-Investments & Loans", description: "Invest with as little as ₹100 and access low-interest loans." },
  { id: 4, title: "Smart Inventory Management", description: "Automate stock tracking and receive alerts." },
  { id: 5, title: "Marketplace Access", description: "Sell directly through an integrated marketplace." },
  { id: 6, title: "Community Learning", description: "Connect with mentors and fellow entrepreneurs." },
  { id: 7, title: "Simplified Banking", description: "Get access to micro-savings, low-cost loans, and insurance." },
];

const FeaturesPage = () => {
  return (
    <div className="features-page">
      <h1 className="title">Our Features</h1>
      <div className="features-grid">
        {features.map((feature) => (
          <FeatureCard key={feature.id} title={feature.title} description={feature.description} />
        ))}
      </div>
    </div>
  );
};

export default FeaturesPage;
