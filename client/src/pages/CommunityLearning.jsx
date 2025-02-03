import React, { useState } from 'react';
import styles from './CommunityLearning.module.css'; // Import CSS Module

const CommunityLearning = () => {
  const [question, setQuestion] = useState('');
  const [answers, setAnswers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const GEMINI_API_KEY = 'AIzaSyA7wzVMQLb7Y2kbuiZrGdmNRv4j_YwNpGQ'; // Replace with your Gemini API key
  const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;

  const postQuestion = async () => {
    if (!question) {
      alert('Please enter a question.');
      return;
    }

    setIsLoading(true);

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
                  text: `Provide mentorship advice on: ${question}`,
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
      const mentorResponse = data.candidates[0].content.parts[0].text;
      setAnswers([...answers, `Mentor Response: ${mentorResponse}`]);
    } catch (error) {
      console.error('Error:', error);
      setAnswers([...answers, 'Failed to get a response. Please try again.']);
    } finally {
      setIsLoading(false);
      setQuestion('');
    }
  };

  return (
    <div className={styles.communityLearningPage}>
      <div className={styles.content}>
        <h1>Community Learning & Expert Mentorship</h1>
        <p>Connect with peers and access mentorship from experienced entrepreneurs.</p>

        {/* Ask a Question Section */}
        <div className={styles.questionSection}>
          <h3>Ask a Question</h3>
          <textarea
            placeholder="Type your question here..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            rows="4"
          ></textarea>
          <button onClick={postQuestion} disabled={isLoading}>
            {isLoading ? 'Posting...' : 'Post Question'}
          </button>
        </div>

        {/* Mentor Responses Section */}
        <div className={styles.answersSection}>
          <h3>Mentor Responses</h3>
          <ul>
            {answers.map((answer, index) => (
              <li key={index}>{answer}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CommunityLearning;