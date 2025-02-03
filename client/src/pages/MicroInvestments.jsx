import React, { useState } from 'react';
import styles from './MicroInvestments.module.css';

const MicroInvestments = () => {
  const [loanAmount, setLoanAmount] = useState('');
  const [businessPerformance, setBusinessPerformance] = useState('');
  const [communityReputation, setCommunityReputation] = useState('');
  const [eligibilityResult, setEligibilityResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State for dialog box

  const GEMINI_API_KEY = 'AIzaSyA7wzVMQLb7Y2kbuiZrGdmNRv4j_YwNpGQ'; // Replace with your Gemini API key
  const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;

  const handleCheckEligibility = async () => {
    if (!loanAmount || !businessPerformance || !communityReputation) {
      alert('Please fill in all fields.');
      return;
    }

    setIsLoading(true);
    setEligibilityResult('');

    try {
      const response = await fetch(GEMINI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Check loan eligibility for a loan amount of ₹${loanAmount}. Business performance: ${businessPerformance}/10. Community reputation: ${communityReputation}/10. Provide a detailed response.`,
                },
              ],
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch response from Gemini API.');
      }

      const data = await response.json();
      const aiResponse = data.candidates[0].content.parts[0].text;
      setEligibilityResult(aiResponse);
      setIsDialogOpen(true); // Open the dialog box
    } catch (error) {
      console.error('Error:', error);
      setEligibilityResult('Failed to check eligibility. Please try again.');
      setIsDialogOpen(true); // Open the dialog box even on error
    } finally {
      setIsLoading(false);
    }
  };

  const closeDialog = () => {
    setIsDialogOpen(false); // Close the dialog box
  };

  return (
    <div className={styles.microInvestmentsPage}>
      <div className={styles.content}>
        <h1>Micro-Investment & Business Loans</h1>
        <p>Invest with as little as ₹100 and access low-interest micro-loans tailored to rural needs.</p>

        {/* Micro-Investment Options */}
        <div className={styles.investmentOptions}>
          <h2>Micro-Investment Options</h2>
          <p>Allows entrepreneurs to invest from ₹100, with low-risk savings schemes and bonds tailored to rural needs.</p>
          <div className={styles.investmentCards}>
            <div className={styles.card}>
              <h3>Savings Scheme</h3>
              <p>Invest in low-risk savings schemes with guaranteed returns.</p>
              <button>Learn More</button>
            </div>
            <div className={styles.card}>
              <h3>Government Bonds</h3>
              <p>Secure investments with government-backed bonds.</p>
              <button>Learn More</button>
            </div>
            <div className={styles.card}>
              <h3>Mutual Funds</h3>
              <p>Diversify your investments with curated mutual funds.</p>
              <button>Learn More</button>
            </div>
          </div>
        </div>

        {/* AI-Based Loan Accessibility */}
        <div className={styles.loanEligibilitySection}>
          <h2>AI-Based Loan Accessibility</h2>
          <p>Check your eligibility for micro-loans using AI-powered credit scoring based on alternative data.</p>

          <div className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="loanAmount">Loan Amount (₹)</label>
              <input
                type="number"
                id="loanAmount"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                placeholder="Enter loan amount"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="businessPerformance">Business Performance (1-10)</label>
              <input
                type="number"
                id="businessPerformance"
                value={businessPerformance}
                onChange={(e) => setBusinessPerformance(e.target.value)}
                placeholder="Rate your business performance"
                min="1"
                max="10"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="communityReputation">Community Reputation (1-10)</label>
              <input
                type="number"
                id="communityReputation"
                value={communityReputation}
                onChange={(e) => setCommunityReputation(e.target.value)}
                placeholder="Rate your community reputation"
                min="1"
                max="10"
              />
            </div>

            <button onClick={handleCheckEligibility} disabled={isLoading}>
              {isLoading ? 'Checking...' : 'Check Eligibility'}
            </button>
          </div>
        </div>
      </div>

      {/* Dialog Box for Eligibility Result */}
      {isDialogOpen && (
        <div className={styles.dialogOverlay}>
          <div className={styles.dialog}>
            <h3>Eligibility Result</h3>
            <p>{eligibilityResult}</p>
            <button onClick={closeDialog}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MicroInvestments;